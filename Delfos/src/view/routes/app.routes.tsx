import React from "react";
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';

import { Home } from "../screens/Home";
import { OneTimeFilter } from "../screens/OneTimeFilter";
import { SemanalFilter } from "../screens/SemanalFilter";
import { AddTodo } from "../screens/AddTodo";
import { Groups } from "../screens/Groups";
import { Splash } from "../screens/Splash";
import { Notes } from "../screens/Notes";

export type AppRoutesParamList = {
  Home: undefined;
  OneTimeFilter: undefined;
  SemanalFilter: undefined;
  AddTodo: undefined;
  TabRoutes: undefined;
  Groups: undefined;
  Splash: undefined;
  Notes: undefined;
};

export function AppRoutes() {

  const { Navigator, Screen } = createNativeStackNavigator<AppRoutesParamList>();

  return (
    <Navigator>

      <Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Screen
        name="TabRoutes"
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Screen
        name="AddTodo"
        component={AddTodo}
        options={{ headerShown: false }}
      />
      <Screen
        name="Groups"
        component={Groups}
        options={{ headerShown: false }}
      />
    </Navigator>
  );
}

export function TabRoutes() {

  const theme = useTheme();
  const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: (({ size, color }) =>
            <Feather
              name="list"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name="OneTimeFilter"
        component={OneTimeFilter}
        options={{
          tabBarIcon: (({ size, color }) =>
            <Feather
              name="clock"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name="SemanalFilter"
        component={SemanalFilter}
        options={{
          tabBarIcon: (({ size, color }) =>
            <Feather
              name="calendar"
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: (({ size, color }) =>
            <Feather
              name="file-text"
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  );
}

