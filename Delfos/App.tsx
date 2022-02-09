import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { useFonts } from 'expo-font';
import { Archivo_400Regular } from '@expo-google-fonts/archivo';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';

import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/theme';

import { Home } from './src/screens/Home';
import { OneTimeFilter } from './src/screens/OneTimeFilter';
import { SemanalFilter } from './src/screens/SemanalFilter';
import { Routes } from './src/routes';


export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
        <StatusBar style="dark" />
        <Routes />
    </ThemeProvider>
  );
}

