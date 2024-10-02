
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../common/CustomHeader';
import DetailsPage from '../screens/detailsPage/DetailsPage';
import Homepage from '../screens/homepage/Homepage';
import AddTodo from '../screens/homepage/components/AddTodo';
import EditTodo from '../screens/editPage/EditTodo';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
   <Stack.Navigator >
    <Stack.Screen options={{header:()=><CustomHeader title="HomePage"/> }} name='Homepage' component={Homepage}/>

    <Stack.Screen options={{header:()=><CustomHeader title="Details Page"/> }} name='DetailsPage' component={DetailsPage}/>

    <Stack.Screen options={{header:()=><CustomHeader title="Create New Todo"/> }} name='AddTodo' component={AddTodo}/>
    
    <Stack.Screen options={{header:()=><CustomHeader title="Edit Todo"/> }} name='EditTodo' component={EditTodo}/>
   </Stack.Navigator>
   
   
  )
}

export default HomeStack

