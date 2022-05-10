import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BusSearch } from './components/BusSearch';



function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Favorites" component={SettingsScreen} />
      <Tab.Screen name="Buses" component={BusSearch} />
    </Tab.Navigator>
  );
}

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      UID: null
    }
  }

  render() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  }
}
