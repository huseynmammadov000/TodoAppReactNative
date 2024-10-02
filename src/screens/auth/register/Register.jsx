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
import Input from '../components/Input';
import PasswordInput from '../components/PasswordInput';
import {storage} from '../../../utils/MMKVStorage';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    // surname: '',
    email: '',
    password: '',
    // username: '',
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleInputChange = (inputName, inputValue) => {
    setFormData(prevState => ({...prevState, [inputName]: inputValue}));
  };

  // const handleInputChange = (inputName, inputValue) => {
  //   setFormData(prevState => {
  //     const newFormData = {...prevState, [inputName]: inputValue};
  //     if (inputName === 'name' || inputName === 'surname') {
  //       newFormData.username = `${newFormData.name} ${newFormData.surname}`;
  //     }
  //     return newFormData;
  //   });
  // };

  const [errors, setErrors] = useState();
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const submitData = async () => {
    try {
      const response = await fetch('http://192.168.199.1:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log(response);
      const data = await response.json();

      if (response.ok) {
        storage.set('token', data.token);

        console.log('Token:', data.token);

        navigation.navigate('Homepage');
      } else {
        setErrors({general: data.message});
        console.log('Something went wrong', data.message);
      }
    } catch (error) {
      console.log('Network failed', error);
    }
  };

  // const submitData = () => {
  //   console.log(formData);
  // };

  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: 'white'}}
      contentContainerStyle={{flex: 1}}>
      <StyledView className="flex-1 bg-white items-center justify-center px-5">
        <StyledText className="text-3xl font-semibold mb-4">
          Register
        </StyledText>
        <Input
          inputName="username"
          inputValue={formData?.username}
          handleInputChange={handleInputChange}
          placeholder="Enter username"
          error={errors?.username}
        />
        {/* <Input
          inputName="name"
          inputValue={formData?.name}
          handleInputChange={handleInputChange}
          placeholder="Enter name"
          error={errors?.name}
        /> */}

        {/* <Input
          inputName="surname"
          inputValue={formData?.surname}
          handleInputChange={handleInputChange}
          placeholder="Enter surname"
          error={errors?.surname}
        /> */}

        {/* <Input
          inputName="about"
          inputValue={formData?.about}
          handleInputChange={handleInputChange}
          placeholder="Write about yourself"
          error={errors?.about}
          multiline={true}
          height={100}
        /> */}

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
            navigation.navigate('Login');
          }}
          className="w-full mt-5">
          <StyledText className="text-center text-black">
            Already have an account?
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({});
