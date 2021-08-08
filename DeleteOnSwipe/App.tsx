import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ListItem from './components/ListItem'

const TITLES = [
  'Leave your mark to the world ✨',
  "Help only those who don't expect to be helped again by you.",
  'Water 🌊 is always effective on fire 🔥🔥',
  "Don't care about anyone, if you wanna succeed in life",
  'Leave a ⭐️ on the GitHub Repo',
]

interface TaskInterface {
  title: string
  index: number
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }))

const BACKGROUND_COLOR = '#FAFBFF'

export default function App() {
  const [tasks, setTasks] = useState(TASKS)

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks((tasks) => tasks.filter((item) => item.index !== task.index))
  }, [])

  const scrollRef = useRef(null)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <Text style={styles.title}>Tasks</Text>
      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        {tasks.map((task) => (
          <ListItem
            simultaneousHandlers={scrollRef}
            key={task.index}
            task={task}
            onDismiss={onDismiss}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '5%',
  },
})

export { TaskInterface }
