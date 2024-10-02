import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {StyledText, StyledView} from '@common/StyledComponents';
import {useRoute} from '@react-navigation/native';
const DetailsPage = () => {
  const route = useRoute();
  // const { itemDetails } = route.params;
  const item = route.params?.item;
  const id = route.params?.id;
  const [fetchedData, setFetchedData] = useState(null);

  const getItemData = async () => {
    const response = await fetch(`http://192.168.199.1:5000/api/todos/${id}`);

    const data = await response.json();
    response.ok && setFetchedData(data);
  };
  // console.log(item);

  useEffect(() => {
    id && getItemData();
  }, [id]);

  return item ? (
    <StyledView className="p-4 py-5">
      <StyledView className="mb-4 p-4 rounded-lg bg-white shadow shadow-zinc-300">
        <StyledText className="font-extrabold text-slate-700 text-lg m-2">Todo info</StyledText>
        <StyledText className="font-medium  text-lg m-2">{item.title}</StyledText>
        
      </StyledView>
    </StyledView>
  ) : (
    <StyledText>{JSON.stringify(fetchedData)}</StyledText>
  );
};

export default DetailsPage;
