import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExistName = tasks.find(item => item.title === newTaskTitle);

    if (taskExistName) {
      Alert.alert(`Task já cadastrada`, `Você não pode cadastrar uma task com o mesmo nome`);
      return;
    }

    const taks = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
  
    setTasks(state => [...state, taks]);
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

  function handleEditTask(id: number, newTaskTitle: string) {
    //TODO - toggle task done if exists
    setTasks(state => state.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: newTaskTitle,
        };
      }

      return item;
    }));
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      `Remover item`,
      `Tem certeza que você deseja remover esse item?`,
      [
        { text: `Não` },
        { text: `Sim`, onPress: () => setTasks(state => state.filter(item => item.id !== id))},
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
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