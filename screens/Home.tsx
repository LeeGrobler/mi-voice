import { Button, StyleSheet, Text } from 'react-native'
import { NavigationProp, RouteProp } from '@react-navigation/native'

import Layout from '../layouts/Main'
import RootStackParamList from '../types/navigation'

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Home'>
  route: RouteProp<RootStackParamList, 'Home'>
}

const Home = ({ navigation, route }: Props) => {
  return (
    <Layout route={route}>
      <Text>Home</Text>
      <Button
        title="Create Word"
        onPress={() => navigation.navigate('Upsert')}
      />
    </Layout>
  )
}

export default Home

const styles = StyleSheet.create({})
