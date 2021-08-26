import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/Pen.png';
import Icon from 'react-native-vector-icons/Feather';

interface TaskItemProps {
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, title: string) => void;
  removeTask: (id: number) => void;
  task: Task;
}

export function TaskItem({ task, editTask, removeTask, toggleTaskDone }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEditing, setTitleEditing] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setTitleEditing(task.title);
  }

  function handleSubmitEditing() {
    editTask(task.id, titleEditing);
    setIsEditing(false);
  }
  
  return (
    <>
    <View>
      <TouchableOpacity
      activeOpacity={0.7}
      style={styles.taskButton}
      onPress={() => toggleTaskDone(task.id)}
      >
      <View 
      style={ task.done ? styles.taskMarkerDone : styles.taskMarker }
      >
      { task.done && (
        <Icon 
        name="check"
        size={12}
        color="#FFF"
        />
        )}
        </View>
        
        {/* <Text 
        style={ task.done ? styles.taskTextDone : styles.taskText}
        >
        {task.title}
        </Text> */}
        <TextInput
          style={ task.done ? styles.taskTextDone : styles.taskText}
          value={titleEditing}
          onChangeText={setTitleEditing}
          ref={textInputRef}
          editable={isEditing}
          onSubmitEditing={handleSubmitEditing}
        />
        </TouchableOpacity>
      </View>
      
      {/* <TouchableOpacity
      onPress={() => removeTask(task.id)}
      style={{ paddingHorizontal: 24 }}
      >
      <Image source={trashIcon} />
      </TouchableOpacity> */}
      <View style={ styles.iconsContainer } >
        { isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        ) }

        <View 
          style={ styles.iconsDivider }
        />

        <TouchableOpacity
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: `row`,
    paddingHorizontal: 24
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 10,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
});