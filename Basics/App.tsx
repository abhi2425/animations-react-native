import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  useAnimatedGestureHandler,
} from 'react-native-reanimated'

type ContextType = {
  translateX: number
  translateY: number
}

const SIZE = 100.0

const handleRotation = (progress: Animated.SharedValue<number>) => {
  'worklet'

  return `${progress.value * 2 * Math.PI}rad`
}

export default function App() {
  const progress = useSharedValue(1)
  const scale = useSharedValue(2)
  const color = useSharedValue('hotpink')
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true)
    scale.value = withRepeat(withSpring(1), -1, true)
  }, [])

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value
      context.translateY = translateY.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX
      translateY.value = event.translationY + context.translateY
    },
    onEnd: (event) => {},
  })

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [
        { scale: scale.value },
        { skewX: '40deg' },
        { rotate: handleRotation(progress) },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    }
  }, [])

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[
            { height: SIZE, width: SIZE, backgroundColor: color.value },
            reanimatedStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
