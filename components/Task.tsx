import React from "react";
import {CheckBox, Text} from "react-native-elements";
import {StyleSheet, View} from "react-native";
import {taskType} from "../state/tasks-reducer";
import {AntDesign} from '@expo/vector-icons';

type taskPropsType = {
    task: taskType,
    changeTaskStatus: (taskId: string, value: boolean) => void,
    removeTask: (taskId: string) => void,
}
export const Task = (props: taskPropsType) => {
    const onCheckBoxPress = () => {
        props.changeTaskStatus(props.task.id, !props.task.isDone);
    }
    const removeTask = () => {
        props.removeTask(props.task.id);
    }
    return (
        <View style={styles.container}>
            <CheckBox onPress={onCheckBoxPress} checked={props.task.isDone}/>
            <Text h4 style={props.task.isDone ? styles.isDone : null}>{props.task.title}</Text>
            <AntDesign name="delete" size={24} color="black" onPress={removeTask}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    isDone: {
        opacity: 0.5
    }
});