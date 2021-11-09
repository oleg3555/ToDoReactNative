import React from "react";
import {filterValuesType, removeTodolistAC} from "../state/todolists-reducer";
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, taskType} from "../state/tasks-reducer";
import {AddItemForm} from "./AddItemForm";
import {Button, Text} from "react-native-elements";
import {Task} from "./Task";
import {MaterialIcons} from '@expo/vector-icons';

type todolistPropsType = {
    todolistId: string,
    filter: filterValuesType,
    title: string,
    changeTodolistFilter: (todolistId: string, filter: filterValuesType) => void
}

export const Todolist = (props: todolistPropsType) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, Array<taskType>>(store => store.tasks[props.todolistId]);

    let tasksForTodolist = tasks;
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
    }

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
    const onPressAllFilterButton = () => props.changeTodolistFilter(props.todolistId, "all");
    const onPressActiveFilterButton = () => props.changeTodolistFilter(props.todolistId, "active");
    const onPressCompletedFilterButton = () => props.changeTodolistFilter(props.todolistId, "completed");
    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text h3>{props.title}</Text>
                <MaterialIcons name="delete-forever" size={32} color="black" onPress={removeTodolist}/>
            </View>
            <AddItemForm addItem={addTask}/>
            {tasksForTodolist.map(task => <Task
                key={task.id}
                task={task}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}/>
            )}
            <View style={styles.buttonGroup}>
                <Button onPress={onPressAllFilterButton} style={styles.button} title="all"/>
                <Button onPress={onPressActiveFilterButton} style={styles.button} title="active"/>
                <Button onPress={onPressCompletedFilterButton} style={styles.button} title="completed"/>
            </View>
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
    buttonGroup: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        width: 90,
        margin: 5
    },
});