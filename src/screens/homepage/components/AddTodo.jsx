import React, {useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '../../../common/StyledComponents';
import {storage} from '../../../utils/MMKVStorage';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [token, setToken] = useState();

  const handleSubmit = async () => {
    if (title.trim() === '') {
      Alert.alert('Warning');
      return;
    }

    try {
      const response = await fetch('http://192.168.199.1:5000/api/todos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify({title}),
      });

      if (response.ok) {
        const newTodo = await response.json();
        Alert.alert('Successfull', 'Created new todo!');
        setTitle(''); 
      } else {
        const errorData = await response.json();
        console.log('Create Todo failed:');
      }
    } catch (error) {
        console.log('Something went wrong', error);
    }
  };

  useEffect(() => {
    const storedToken = storage.getString('token');
    setToken(storedToken);

    console.log(token);
  }, []);

  return (
    <StyledView className="flex-1 bg-white items-center justify-center px-5">
      <TextInput
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
        placeholder="New Todo Title"
        value={title}
        onChangeText={setTitle}
      />
      <StyledTouchableOpacity
        className="w-full py-5 bg-blue-700 mt-3 rounded-lg"
        onPress={handleSubmit}>
        <StyledText className="text-center text-white">Create Todo</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default AddTodo;
