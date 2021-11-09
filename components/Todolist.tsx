import React from "react";
import {filterValuesType, removeTodolistAC} from "../state/todolists-reducer";
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, taskType} from "../state/tasks-reducer";
import {AddItemForm} from "./AddItemForm";
import {Text} from "react-native-elements";
import {Task} from "./Task";
import {MaterialIcons} from '@expo/vector-icons';

type todolistPropsType = {
    todolistId: string,
    filter: filterValuesType,
    title: string,
}

export const Todolist = (props: todolistPropsType) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, Array<taskType>>(store => store.tasks[props.todolistId]);

    const addTask = (title: string) => {
        dispatch(addTaskAC(props.todolistId, title));
    }
    const changeTaskStatus = (taskId: string, value: boolean) => {
        dispatch(changeTaskStatusAC(props.todolistId, taskId, value));
    }
    const removeTask = (taskId: string) => {
        dispatch(removeTaskAC(props.todolistId, taskId));
    }
    const removeTodolist = () => {
        dispatch(removeTodolistAC(props.todolistId));
    }
    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text h3>{props.title}</Text>
                <MaterialIcons name="delete-forever" size={32} color="black" onPress={removeTodolist}/>
            </View>
            <AddItemForm addItem={addTask}/>
            {tasks.map(task => <Task
                key={task.id}
                task={task}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}/>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
    },
    center: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
});