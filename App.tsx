import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppRoot} from './src/app/AppRoot';
import {PlatformProvider} from './src/core/state/PlatformProvider';
export default function App():React.ReactElement{
 return <SafeAreaProvider><PlatformProvider><StatusBar style="dark"/><AppRoot/></PlatformProvider></SafeAreaProvider>;
}
