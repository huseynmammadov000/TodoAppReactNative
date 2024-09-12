import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import {StyledText, StyledView} from '@common/StyledComponents';
import {useRoute} from '@react-navigation/native';
const DetailsPage = () => {
  const route = useRoute();
  // const { itemDetails } = route.params;
  const item = route.params?.item;
  const id = route.params?.id;
const [fetchedData,setFetchedData] = useState(null)


  const getItemData = async ()=>{
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    )

    const data = await response.json();
   response.ok && setFetchedData(data);
  }
  // console.log(item);

  useEffect (()=>{
    id && getItemData();
  },[id])

  return (
  item?  <StyledView className="p-4 py-5">

  <StyledView className="mb-4 p-4 rounded-lg bg-white shadow shadow-zinc-300">
          <StyledText className="font-bold text-lg m-2">User info</StyledText>
          <StyledText >{item.name}</StyledText>
          <StyledText >
            {item.phone}
          </StyledText>
          <StyledText >
            {item.email}
          </StyledText>
          <StyledText >
            {item.website}
          </StyledText>
        </StyledView>
  
  
  
        <StyledView className="mb-4 p-4 rounded-lg bg-white shadow shadow-zinc-300">
       <StyledText className="font-bold text-lg m-2">Address</StyledText>
          <StyledText >
            {item.address.city}
          </StyledText>
          <StyledText >
            {item.address.street}
          </StyledText>
          <StyledText >
            {item.address.suite}
          </StyledText>
        </StyledView>
  
        <StyledView className="mb-4 p-4 rounded-lg bg-white shadow shadow-zinc-300">
        <StyledText className="font-bold text-lg m-2">Company</StyledText>
  
          <StyledText >
            {item.company.name}
          </StyledText>
          <StyledText >
            {item.company.catchPhrase}
          </StyledText>
        </StyledView>
  
       
      </StyledView>:<StyledText>{JSON.stringify(fetchedData)}</StyledText>
  );
};

export default DetailsPage;
