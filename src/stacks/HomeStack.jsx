
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../common/CustomHeader';
import DetailsPage from '../screens/detailsPage/DetailsPage';
import Homepage from '../screens/homepage/Homepage';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
   <Stack.Navigator >
    <Stack.Screen options={{header:()=><CustomHeader title="HomePage"/> }} name='Homepage' component={Homepage}/>

    <Stack.Screen options={{header:()=><CustomHeader title="Details Page"/> }} name='DetailsPage' component={DetailsPage}/>
   </Stack.Navigator>
   
  )
}

export default HomeStack

