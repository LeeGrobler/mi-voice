import 'react-native-gesture-handler'
import React from 'react'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import RootStackParamList from './types/navigation'
import Screens from './screens'

const Drawer = createDrawerNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Drawer.Navigator>
        {Screens.map((screen, index) => (
          <Drawer.Screen
            key={index}
            name={screen.name}
            component={screen.component}
            options={screen.options}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})

export default App
