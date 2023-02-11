import React from 'react';
import axios from 'axios';
import List from './src/screens/List';
import AddNewRecord from './src/screens/List/AddNewRecord';
import ListDetails from './src/screens/List/ListDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListContextProvider } from './src/context/List';
Icon.loadFont();

const Stack = createNativeStackNavigator();

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:3007/api/';
const App = () => {
  return (
    <NavigationContainer>
      <ListContextProvider>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={List} />
          <Stack.Screen name="ListDetails" component={ListDetails} />
          <Stack.Screen name="AddNewRecord" component={AddNewRecord} />
        </Stack.Navigator>
      </ListContextProvider>
    </NavigationContainer>
  );
};

export default App;
