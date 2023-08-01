import React from 'react'
import { DrawerNavigationOptions } from '@react-navigation/drawer'

import RootStackParamList from '../types/navigation'
import Home from './Home'
import Upsert from './Upsert'
import Settings from './Settings'

interface Screen {
  name: keyof RootStackParamList
  component: React.ComponentType<any>
  options?: DrawerNavigationOptions
}

const screens: Screen[] = [
  { name: 'Home', component: Home, options: { headerShown: false } },
  { name: 'Upsert', component: Upsert, options: { title: 'New Phrase' } },
  { name: 'Settings', component: Settings },
]

export default screens
