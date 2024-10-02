import React, {useEffect, useState} from 'react';
import Layout from '@common/Layout';
import InfoCard from './components/InfoCard';
import {FlatList} from 'react-native';
import NoData from './components/NoData';
import {Dimensions} from 'react-native';
import {Platform} from 'react-native';
import {storage} from '../../utils/MMKVStorage';
import {
  StyledText,
  StyledTouchableOpacity,
} from '../../common/StyledComponents';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';

const Homepage = () => {
  const os = Platform.OS;
  const [data, setData] = useState([]);
  const width = Dimensions.get('screen').width;
  const height = Dimensions.get('screen').height;

  const loginInfo = storage.getString('loginInfo');
  const storedToken = storage.getString('token');
  // console.log(token);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [token, setToken] = useState(storedToken);
  const [flag, setFlag] = useState(false);

  // useEffect(() => {
    
  // }, [token, isFocused]);

  const handleAddTodo = () => {
    {
      setFlag(true);
    }
    navigation.navigate('AddTodo');
  };
  const renderItem = ({item}) => <InfoCard cardItem={item} />;

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const response = await fetch('http://192.168.199.1:5000/api/todos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token} `,
          },
        });
  
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data2 = await response.json();
        setData(data2);
        // console.log("Data:",data);
        // console.log("Data:",data2);
        // console.log(response);
        // console.log(token);
      };
  
      fetchData();
    }, [token,isFocused])
  );

  return (
    <Layout title="HomePage">
      <FlatList
        // scrollEnabled={false}
        keyExtractor={item => item._id}
        contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 20}}
        data={data}
        renderItem={({item}) => <InfoCard cardItem={item} />}
        ListEmptyComponent={() => <NoData />}
      />

      <StyledTouchableOpacity
        onPress={handleAddTodo}
        className="absolute bottom-7 right-5 bg-slate-500 p-5 rounded-lg shadow-lg">
        <StyledText>Add</StyledText>
      </StyledTouchableOpacity>
    </Layout>
  );
};

export default Homepage;
