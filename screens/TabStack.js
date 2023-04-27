import 'react-native-gesture-handler';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NewsUpdate from '../components/NewsUpdate';
import HomePage from '../components/HomePage';
const Tab = createMaterialTopTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#03296a',
        },
        tabBarShowLabel: true,
        headerShown: false,
      }}
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: 'white',
        },
        tabStyle: {
          borderTopWidth: 8,
          borderTopColor: '#03296a',
        },
      }}>
      <Tab.Screen name="الرئيسية" component={HomePage} />
      <Tab.Screen name="أخر الأخبار" component={NewsUpdate} />
    </Tab.Navigator>
  );
};

export default TabStack;
