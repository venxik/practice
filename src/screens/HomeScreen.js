import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  Switch,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import {fetchJobList} from '../redux/actions/getJobList';
import FastImage from 'react-native-fast-image';
import {debounce} from 'lodash';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const animatedValue = useRef(new Animated.Value(0)).current;

  const translateAnimated = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const showFilterView = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setShowFilter(true);
  };

  const hideFilterView = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setShowFilter(false);
    });
  };

  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [isFullTime, setIsFullTime] = useState(false);
  const [locationText, setLocationText] = useState('');
  const [isFetchMore, setIsFetchMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const toggleSwitch = () => setIsFullTime((previousState) => !previousState);

  const {
    jobList,
    isFetching,
    error,
    isFetchingWithPaging,
    cantGetAnyData,
  } = useSelector((state) => state.getJobListReducers);

  useEffect(() => {
    dispatch(fetchJobList(searchText, isFullTime, locationText, pageNumber));
  }, []);

  const handleSearch = useCallback(debounce((value) => fetchJob(value), 2000), []);

  const onChangeSearchText = (value) => {
    setSearchText(value);
    handleSearch(value);
  };

  const fetchJob = (value) => {
    var searchValue = value || searchText
    setPageNumber(1);
    dispatch(fetchJobList(searchValue, isFullTime, locationText, pageNumber))
      .then(() => setIsFetchMore(false))
      .catch(() => setIsFetchMore(false));
  };

  useEffect(() => {
    if (isFetchMore) {
      dispatch(fetchJobList(searchText, isFullTime, locationText, pageNumber))
        .then(() => setIsFetchMore(false))
        .catch(() => setIsFetchMore(false));
    }
  }, [isFetchMore]);

  useEffect(() => {
    if (cantGetAnyData) {
      setIsFetchMore(false);
    }
  }, [cantGetAnyData]);

  const renderEmptyJob = () => {
    if (error !== null || jobList.length < 1 || cantGetAnyData) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>Job is Empty</Text>
        </View>
      );
    }
  };

  const renderJobList = (item) => {
    return (
      <TouchableOpacity
        style={styles.jobListContainer}
        onPress={() => navigation.navigate('JobDetailScreen', item)}>
        <View>
          <FastImage
            source={{uri: item.company_logo}}
            style={{width: 80, height: 80, marginHorizontal: 10}}
            resizeMode="contain"
          />
        </View>
        <View style={{marginLeft: 10, flex: 0.8}}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
          <Text style={{fontSize: 14, marginVertical: 8}}>{item.company}</Text>
          <Text>{item.location}</Text>
        </View>
        <View style={{flex: 0.2, alignItems: 'flex-end'}}>
          <FastImage
            source={require('../assets/images/icon_arrow_right.png')}
            style={styles.searchIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderisFetchMoreLoading = () => {
    if (!isFetchingWithPaging || jobList.length < 1 || cantGetAnyData)
      return null;
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  const memo = useMemo(() => {
    return jobList;
  }, [jobList]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <FastImage
            source={require('../assets/images/icon_search.png')}
            style={styles.searchIcon}
          />
          <View style={styles.searchBar}>
            <TextInput
              value={searchText}
              style={styles.searchInput}
              onChangeText={(value) => onChangeSearchText(value)}
              placeholder={'Search'}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.arrowIconContainer}
          onPress={() => {
            if (!showFilter) {
              showFilterView();
            } else hideFilterView();
          }}>
          <FastImage
            source={require('../assets/images/icon_arrow_down.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
      {/* FILTER */}
      {showFilter && (
        <Animated.View
          style={[
            styles.filterContainer,
            {transform: [{translateY: translateAnimated}]},
          ]}>
          <View style={styles.filterInnerContainer}>
            <Text style={styles.filterText}>Full time</Text>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSwitch()}
              value={isFullTime}
            />
          </View>
          <View style={[styles.filterInnerContainer, {marginVertical: 10}]}>
            <Text style={styles.filterText}>Location</Text>
            <View style={{width: '70%', borderWidth: 0.5, borderRadius: 1}}>
              <TextInput
                value={locationText}
                style={styles.searchInput}
                onChangeText={(value) => setLocationText(value)}
                placeholder={'Search'}
              />
            </View>
          </View>
          <View
            style={[styles.filterInnerContainer, {justifyContent: 'flex-end'}]}>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                borderWidth: 0.5,
                padding: 10,
                backgroundColor: 'black',
              }}
              onPress={() =>
                fetchJob()
              }>
              <Text style={{color: 'white'}}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      {isFetching ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          removeClippedSubviews
          data={memo}
          initialNumToRender={10}
          renderItem={({item}) => renderJobList(item)}
          keyExtractor={(item, index) => item.id}
          ListEmptyComponent={() => renderEmptyJob()}
          ListFooterComponent={() => renderisFetchMoreLoading()}
          removeClippedSubviews={true}
          onEndReached={() => {
            console.log('onEndReach');
            if (!isFetchMore && !cantGetAnyData) {
              setPageNumber(pageNumber + 1);
              setIsFetchMore(true);
            }
          }}
          onEndReachedThreshold={0.01}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchContainer: {
    width: '90%',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  searchBar: {
    width: '100%',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  arrowIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    fontSize: 18,
    borderRadius: 10,
  },
  filterContainer: {
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  filterText: {
    fontSize: 18,
  },
  filterInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  jobListContainer: {
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
