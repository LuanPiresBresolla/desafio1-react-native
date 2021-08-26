import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.length > 0) {
      const taks = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
  
      setTasks(state => [...state, taks]);
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    setTasks(state => state.map(item => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done,
        };
      }

      return item;
    }));
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    setTasks(state => state.filter(item => item.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})