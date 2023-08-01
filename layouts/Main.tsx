import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { RouteProp } from '@react-navigation/native'

import RootStackParamList from '../types/navigation'
import Screens from '../screens'

type Props = {
  children: React.ReactNode
  route: RouteProp<RootStackParamList>
}

const Main = ({ children, route }: Props) => {
  const statusbarPadding =
    Screens.find(screen => screen.name === route.name)?.options?.headerShown ===
    false

  return (
    <SafeAreaView style={statusbarPadding && styles.statusbarPadding}>
      <View style={styles.regularPadding}>{children}</View>
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  regularPadding: {
    padding: 8,
  },

  statusbarPadding: {
    paddingTop: StatusBar.currentHeight,
  },
})
