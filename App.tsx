import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppRoot } from './src/app/AppRoot';

export default function App(): React.ReactElement {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppRoot />
    </SafeAreaProvider>
  );
}
