import { StyleSheet, Text } from 'react-native'

import Layout from '../layouts/Main'
import { RouteProp } from '@react-navigation/native'
import RootStackParamList from '../types/navigation'

type Props = {
  route: RouteProp<RootStackParamList, 'Upsert'>
}

const Upsert = ({ route }: Props) => {
  return (
    <Layout route={route}>
      <Text>Upsert</Text>
    </Layout>
  )
}

export default Upsert

const styles = StyleSheet.create({})
