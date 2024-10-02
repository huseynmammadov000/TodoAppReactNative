import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  StyledText,
  StyledTextInput,
  StyledTouchableOpacity,
  StyledView,
} from '../../../common/StyledComponents';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';
import PasswordInput from '../components/PasswordInput';
import Input from '../components/Input';
import { storage } from '../../../utils/MMKVStorage';

const Login = () => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});

  const handleInputChange = (inputName, inputValue) => {
    setFormData(prevState => ({...prevState, [inputName]: inputValue}));
  };

  const submitData = async () => {
    try {
      const response = await fetch('http://192.168.199.1:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        storage.set('token', data.token);

        console.log('Token:', data.token);
        
       navigation.navigate('Homepage')
      } else {
        setErrors({ general: data.message });
        console.log('Login failed:', data.message);
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: 'white'}}
      contentContainerStyle={{flex: 1}}>
      <StyledView className="flex-1 bg-white items-center justify-center px-5">
        <StyledText className="text-3xl font-semibold mb-4">Login</StyledText>

        <Input
          inputName="email"
          inputValue={formData?.email}
          handleInputChange={handleInputChange}
          placeholder="Enter email"
          error={errors?.email}
        />

        <PasswordInput
          inputName="password"
          inputValue={formData.password}
          handleInputChange={handleInputChange}
          placeholder="Enter password"
          error={errors?.password}
        />

        <StyledTouchableOpacity
          onPress={submitData}
          className="w-full py-5 bg-blue-700 mt-3 rounded-lg">
          <StyledText className="text-center text-white">Submit</StyledText>
        </StyledTouchableOpacity>

        <StyledTouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}
          className="w-full mt-5">
          <StyledText className="text-center text-black">
            Don't have an account?
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({});
