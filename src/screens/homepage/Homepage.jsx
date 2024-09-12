import React, {useEffect, useState} from 'react';
import Layout from '@common/Layout';
import InfoCard from './components/InfoCard';
import {FlatList} from 'react-native';
import NoData from './components/NoData';
const Homepage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );

      const data2 = await response.json();
      setData(data2);
      console.log(data);
      // console.log(response);
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => <InfoCard cardItem={item} />;

  return (
    <Layout title="HomePage">
      <FlatList
        // scrollEnabled={false}
        contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 20}}
        data={data}
        renderItem={({item}) => <InfoCard cardItem={item} />}
        ListEmptyComponent={() => <NoData />}
      />
    </Layout>
  );
};

export default Homepage;
