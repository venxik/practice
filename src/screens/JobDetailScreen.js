import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  View,
  Image,
  Linking,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchJobDetails} from '../redux/actions/getJobDetails';
import LoadingIndicator from '../components/LoadingIndicator';
import HTML from 'react-native-render-html';

const JobDetailScreen = ({navigation, route}) => {
  const {params} = route;
  const dispatch = useDispatch();

  // const supported = await Linking.canOpenURL(company_url);

  const {jobDetails, isFetching, error} = useSelector(
    (state) => state.getJobDetailsReducers,
  );

  console.log(jobDetails)

  const {
    company,
    company_logo,
    company_url,
    description,
    how_to_apply,
    location,
    title,
    type
  } = jobDetails;

  useEffect(() => {
    dispatch(fetchJobDetails(params.id));
  }, [params]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {isFetching ? (
        <LoadingIndicator />
      ) : (
        <ScrollView>
          <View styl={{flex: 1}}>
            <View style={styles.headerContainer}>
              <View>
                <Image
                  source={{uri: company_logo}}
                  style={{width: 80, height: 80, marginHorizontal: 10}}
                  resizeMode="contain"
                />
              </View>
              <View style={{marginLeft: 10, flex: 0.8}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
                <Text style={{fontSize: 14, marginVertical: 8}}>{company}</Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'blue',
                    textDecorationLine: 'underline',
                  }}
                  onPress={() => Linking.openURL(company_url)}>
                  {' '}
                  Go to Website
                </Text>
                {/* <Text>{location}</Text> */}
              </View>
            </View>
            <View style={styles.contentContainer}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Title</Text>
              <Text>{title}</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Type</Text>
              <Text>{type === "Full Time" ? "Yes" : "No"}</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Description</Text>
              <HTML html={description}/>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: 10,
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
});

export default JobDetailScreen;
