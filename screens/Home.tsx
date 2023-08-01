import { Button, StyleSheet, Text, View } from 'react-native'
import { NavigationProp } from '@react-navigation/native'

import RootStackParamList from '../types/navigation'

type Props = {
  navigation: NavigationProp<RootStackParamList, 'Home'>
}

const Home = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Create Word"
        onPress={() => navigation.navigate('Upsert')}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
