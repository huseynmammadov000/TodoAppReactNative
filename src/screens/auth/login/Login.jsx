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

const Login = () => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});

  const handleInputChange = (inputName, inputValue) => {
    setFormData(prevState => ({...prevState, [inputName]: inputValue}));
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const submitData = () => {
    console.log(formData);
  };

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

        {/* <StyledTextInput
          value={formData.email}
          onChangeText={value =>
            setFormData(prevState => ({...prevState, email: value}))
          }
          placeholder="Enter your email"
          className="w-full border border-zinc-300 p-3 rounded-lg bg-white shador shadow-zinc-200 mb-3"></StyledTextInput>
        <StyledView className="w-full border border-zinc-300  rounded-lg bg-white shador shadow-zinc-200">
          <StyledTextInput
            secureTextEntry={!passwordVisible}
            value={formData.password}
            onChangeText={value =>
              setFormData(prevState => ({...prevState, password: value}))
            }
            placeholder="Enter your password"
            className="w-full p-3"></StyledTextInput>
          <StyledTouchableOpacity
            onPress={() => {
              setPasswordVisible(prevState => !prevState);
            }}
            className="absolute right-3 top-3">
            <StyledText>X</StyledText>
          </StyledTouchableOpacity>
      <StyledTouchableOpacity
        onPress={submitData}
        className="w-full py-5 bg-blue-700 mt-3 rounded-lg">
        <StyledText className="text-center text-white">Submit</StyledText>
      </StyledTouchableOpacity> */}

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
