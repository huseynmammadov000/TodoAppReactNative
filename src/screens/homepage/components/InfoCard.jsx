import {Alert, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {StyledText, StyledView} from '@common/StyledComponents';
import {StyledTouchableOpacity} from '../../../common/StyledComponents';
import {useNavigation} from '@react-navigation/native';
import { storage } from '../../../utils/MMKVStorage';

const InfoCard = ({cardItem}) => {
  // console.log(cardItem);
  const navigation = useNavigation();
  const editTodo = (id) => {
    navigation.navigate('EditTodo',{id});
  };
  const storedToken = storage.getString('token');

  const [token, setToken] = useState(storedToken);

  const deleteTodo = async (id)=>{
    try {
      if (!token) {
        console.error('Token not found');
        return;
      }
      console.log(token);
  
      const response = await fetch(`http://192.168.199.1:5000/api/todos/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
       
        Alert.alert('Successfull', 'Todo deleted!');
       
      } else {
        const errorData = await response.json();
        console.log('Deleted Todo failed:');
      }
    } catch (error) {
        console.log('Something went wrong', error);
    }
  }
  return (
    <StyledTouchableOpacity
      onPress={() => {
        navigation.navigate('DetailsPage', {
          item: cardItem,
        });
      }}
      className="flex-row justify-between items-center bg-white p-4 mb-3 rounded-lg shadow-md">
      <StyledText className="mb-2 text-lg font-semibold">
        {cardItem.title}
      </StyledText>
      {/* <StyledText className="mb-2 font-light">{cardItem.email}</StyledText>
      <StyledText className=" text-right text-zinc-400">
        {cardItem.company.name}
      </StyledText> */}
      <StyledView className="flex-row space-x-2">
        <StyledTouchableOpacity
        onPress={() => editTodo(cardItem._id)}
        className="bg-blue-500 px-4 py-2 rounded-lg">
        <StyledText className="text-white">Edit</StyledText>
      </StyledTouchableOpacity>
      

      <StyledTouchableOpacity
          onPress={() => deleteTodo(cardItem._id)} 
          className="bg-red-500 px-4 py-2 rounded-lg">
          <StyledText className="text-white">Delete</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledTouchableOpacity>
  );
};

export default InfoCard;
