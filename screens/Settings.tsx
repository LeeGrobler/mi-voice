import { StyleSheet, Text } from 'react-native'

import Layout from '../layouts/Main'
import { RouteProp } from '@react-navigation/native'
import RootStackParamList from '../types/navigation'

type Props = {
  route: RouteProp<RootStackParamList, 'Settings'>
}

const Settings = ({ route }: Props) => {
  return (
    <Layout route={route}>
      <Text>Settings</Text>
    </Layout>
  )
}

export default Settings

const styles = StyleSheet.create({})
