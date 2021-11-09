import {v1} from "uuid";
import {addTodolistActionType, removeTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";


export type taskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type tasksStateType = {
    [key: string]: Array<taskType>
}
const initialState: tasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "React Native", isDone: true},
        {id: v1(), title: "Icons", isDone: false},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "Android studio", isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: "Html", isDone: false},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "Toolkit", isDone: false},
    ]
}

type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    todolistId: string,
    taskId: string,
    title: string
}
type removeTaskActionType = {
    type: "REMOVE-TASK",
    todolistId: string,
    taskId: string
}
type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    todolistId: string,
    taskId: string,
    value: boolean
}
type addTaskActionType = {
    type: "ADD-TASK",
    todolistId: string,
    title: string
}

type ActionType =
    changeTaskTitleActionType
    | removeTaskActionType
    | changeTaskStatusActionType
    | addTaskActionType
    | addTodolistActionType
    | removeTodolistActionType

export const tasksReducer = (state: tasksStateType = initialState, action: ActionType): tasksStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            const copyState = {...state};
            const newTask: taskType = {id: v1(), title: action.title, isDone: false};
            copyState[action.todolistId] = [newTask, ...copyState[action.todolistId]];
            return copyState;
        }
        case "REMOVE-TASK": {
            const copyState = {...state};
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId);
            return copyState;
        }
        case "CHANGE-TASK-STATUS": {
            const copyState = {...state};
            copyState[action.todolistId] = copyState[action.todolistId].map(task => task.id === action.taskId
                ? {...task, isDone: action.value}
                : task);
            return copyState;
        }
        case "CHANGE-TASK-TITLE": {
            const copyState = {...state};
            copyState[action.todolistId] = copyState[action.todolistId].map(task => task.id === action.taskId
                ? {...task, title: action.title}
                : task);
            return copyState;
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []};
        }
        default:
            return state;
    }
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", todolistId, taskId, title};
}
export const removeTaskAC = (todolistId: string, taskId: string): removeTaskActionType => {
    return {type: "REMOVE-TASK", todolistId, taskId};
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, value: boolean): changeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", todolistId, taskId, value};
}
export const addTaskAC = (todolistId: string, title: string): addTaskActionType => {
    return {type: "ADD-TASK", todolistId, title};
}