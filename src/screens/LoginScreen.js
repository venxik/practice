import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigateToHome = () => {
    if ((username || password)) {
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Please input username and password');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          width: '50%',
          borderRadius: 10,
          borderWidth: 0.5,
          height: 40,
          justifyContent: 'center',
          padding: 10,
        }}>
        <TextInput
          value={username}
          style={styles.textInput}
          onChangeText={(value) => setUsername(value)}
          placeholder={'Username'}
        />
      </View>
      <View style={{margin: 5}} />
      <View
        style={{
          width: '50%',
          borderRadius: 10,
          borderWidth: 0.5,
          height: 40,
          justifyContent: 'center',
          padding: 10,
        }}>
        <TextInput
          secureTextEntry
          value={password}
          style={styles.textInput}
          onChangeText={(value) => setPassword(value)}
          placeholder={'Password'}
        />
      </View>
      <View style={{margin: 5}} />
      <TouchableOpacity
        style={{
          borderRadius: 5,
          borderWidth: 0.5,
          padding: 10,
          backgroundColor: 'black',
        }}
        onPress={() => {
          navigateToHome();
        }}>
        <Text style={{color: 'white'}}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 18,
  },
});

export default LoginScreen;
