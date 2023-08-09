import { useState } from 'react'
import { Alert, Image, StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import * as ImagePicker from 'expo-image-picker'
import { Audio } from 'expo-av'
import { Recording } from 'expo-av/build/Audio'
import { Ionicons } from '@expo/vector-icons'

type Props = {}

type Form = {
  label: string
  image: string | null
  sound: string | null | undefined
}

type PreviewState = {
  sound?: Audio.Sound
  status?: {
    position: number
    duration: number
    isPlaying: boolean
  }
}

const UpsertForm = ({}: Props) => {
  const [recording, setRecording] = useState<Recording>()
  const [preview, setPreview] = useState<PreviewState>()
  const [form, setForm] = useState<Form>({
    label: '',
    image: null,
    sound: undefined,
  })

  const takePhoto = async () => {
    const permissions = await ImagePicker.requestCameraPermissionsAsync()

    if (!permissions.granted) {
      Alert.alert('Permission to access camera roll is required')
      return
    }

    const result = await ImagePicker.launchCameraAsync()
    if (!result.canceled) setForm(v => ({ ...v, image: result.assets![0].uri }))
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync()
    if (!result.canceled) setForm(v => ({ ...v, image: result.assets![0].uri }))
  }

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      )

      setRecording(recording)
    } catch (err) {
      Alert.alert(`Failed to start recording: ${err}`)
    }
  }

  const stopRecording = async () => {
    setRecording(undefined)

    await recording?.stopAndUnloadAsync()
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false })

    const uri = recording?.getURI()
    setForm(v => ({ ...v, sound: uri }))
  }

  const playPreview = async () => {
    const play = async (preview: PreviewState) => {
      await preview?.sound?.playAsync()
      previewStatusHandler(preview)
    }

    if (preview) return play(preview)

    const { sound } = await Audio.Sound.createAsync({ uri: form.sound! })
    setPreview(curr => {
      const updated = { ...curr, sound }
      play(updated)
      return updated
    })
  }

  const pausePreview = async () => {
    if (preview) {
      preview.status?.isPlaying
        ? await preview.sound?.pauseAsync()
        : await preview.sound?.playAsync()

      previewStatusHandler(preview)
    }
  }

  const previewStatusHandler = (preview: PreviewState) => {
    if (!preview) return

    preview.sound?.setOnPlaybackStatusUpdate(async status => {
      if (status.isLoaded) {
        setPreview(curr => ({
          ...curr,
          status: {
            duration: status.durationMillis!,
            position: status.positionMillis,
            isPlaying: status.isPlaying,
          },
        }))

        if (status.didJustFinish) {
          preview.sound?.unloadAsync()
          setPreview(undefined)
        }
      }
    })
  }

  const deletePreview = async () => {
    setRecording(undefined)
    setPreview(undefined)
    setForm(v => ({ ...v, sound: undefined }))
  }

  const submit = () => {
    console.log('form:', form)
  }

  return (
    <View>
      <TextInput
        label="Label"
        mode="outlined"
        value={form.label}
        onChangeText={label => setForm(v => ({ ...v, label }))}
      />

      <View style={styles.controls}>
        <Button onPress={takePhoto} mode="elevated" style={styles.button}>
          Photo
        </Button>

        <Button onPress={pickImage} mode="elevated" style={styles.button}>
          Image
        </Button>
      </View>

      {form.image && (
        <View style={styles.preview}>
          <Image style={styles.image} source={{ uri: form.image }} />
        </View>
      )}

      {form.sound ? (
        <View style={styles.controls}>
          <Button
            onPress={preview ? pausePreview : playPreview}
            mode="elevated"
            style={styles.button}
          >
            {preview?.status &&
              `${preview.status.position} / ${preview.status.duration} | `}
            {preview?.status?.isPlaying ? 'Pause' : 'Play'} Preview
          </Button>

          <Button onPress={deletePreview} mode="elevated" style={styles.button}>
            <Ionicons name="close" size={24} />
          </Button>
        </View>
      ) : (
        <Button
          onPress={recording ? stopRecording : startRecording}
          mode="elevated"
        >
          {recording ? 'Stop' : 'Start'} Recording
        </Button>
      )}

      <Button onPress={submit} mode="elevated">
        Create Word
      </Button>
    </View>
  )
}

export default UpsertForm

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },

  button: {
    flex: 1,
  },

  preview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },
})
