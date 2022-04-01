import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { useFonts } from 'expo-font';
import { Archivo_400Regular } from '@expo-google-fonts/archivo';
import { Roboto_500Medium } from '@expo-google-fonts/roboto';

import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import theme from './src/view/components/theme/theme';

import { Routes } from './src/view/routes';
import { Splash} from './src/view/screens/Splash';

import { ContextProvider, getContext } from './src/control/contextControl';

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Roboto_500Medium,
  });

  const { load } = getContext();

  if (!fontsLoaded || load) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="dark" />
      <ContextProvider>
        <Routes />
      </ContextProvider>
    </ThemeProvider>
  );
}

