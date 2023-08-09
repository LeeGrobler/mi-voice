import { StyleSheet } from 'react-native'
import { RouteProp } from '@react-navigation/native'

import Layout from '../layouts/Main'
import RootStackParamList from '../types/navigation'
import UpsertForm from '../components/UpsertForm'

type Props = {
  route: RouteProp<RootStackParamList, 'Upsert'>
}

const Upsert = ({ route }: Props) => {
  return (
    <Layout route={route}>
      <UpsertForm />
    </Layout>
  )
}

export default Upsert

const styles = StyleSheet.create({})
