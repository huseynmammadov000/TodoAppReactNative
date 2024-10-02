import React, {useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';
import {
  StyledText,
  StyledTouchableOpacity,
  StyledView,
} from '@common/StyledComponents';
import {storage} from '@utils/MMKVStorage';
import {useNavigation, useRoute} from '@react-navigation/native';

const EditTodo = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [token, setToken] = useState();
  const id = route.params?.id;

  const handleSubmit = async () => {
    if (title.trim() === '') {
      Alert.alert('Warning');
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.199.1:5000/api/todos/edit/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token} `,
          },
          body: JSON.stringify({title}),
        },
      );

      if (response.ok) {
        
        Alert.alert('Successfull', 'Edited todo!');
        setTitle('');
        navigation.navigate('Homepage');
        
      } else {
        const errorData = await response.json();
        console.log('Edited Todo failed:');
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const storedToken = storage.getString('token');
      if (!storedToken) {
        console.error('Token not found');
        return;
      }
      setToken(storedToken);
      console.log('object');
      console.log(id);

      try {
        const response = await fetch(
          `http://192.168.199.1:5000/api/todos/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );

        console.log(response);
        if (response.ok) {
          const todo = await response.json();
          console.log('Hi');
          console.log(todo);
          console.log(storedToken);
          setTitle(todo.title);
        } else {
          console.log(response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchData();
    }
    fetchData();
  }, []);

  return (
    <StyledView className="flex-1  bg-white items-center justify-center px-5">
      <TextInput
        className="border border-zinc-300 rounded-lg p-2 w-full mb-4"
        value={title}
        onChangeText={setTitle}
      />
      <StyledTouchableOpacity
        className="w-full py-5 bg-blue-700 mt-3 rounded-lg"
        onPress={handleSubmit}>
        <StyledText className="text-center text-white">Edit Todo</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default EditTodo;
