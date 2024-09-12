import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../screens/profile/Profile';
const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: 'skyblue',
          },
          headerTitleStyle:{
            color:'white'
          }
        }}
        name="ProfileScreen"
        component={Profile}
      />
      {/* <Stack.Screen name='Register' component={Register}/> */}
    </Stack.Navigator>
  );
};

export default ProfileStack;
