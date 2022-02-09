import React from "react";
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { Home } from "../screens/Home";
import { OneTimeFilter } from "../screens/OneTimeFilter";
import { SemanalFilter } from "../screens/SemanalFilter";
import { BackgroundLinear } from "../components/BackgroundLinear";

export type AppRoutesParamList = {
  Home: undefined;
  OneTimeFilter: undefined;
  SemanalFilter: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

export function AppRoutes() {
  const theme = useTheme();

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
    </Navigator>
  );
}