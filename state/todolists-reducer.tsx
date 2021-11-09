import {v1} from "uuid";

export const todolistId1 = v1();
export const todolistId2 = v1();

export type filterValuesType = "all" | "active" | "completed";
export type todolistType = {
    id: string,
    title: string,
    filter: filterValuesType
}
const initialState: Array<todolistType> = [
    {id: todolistId1, title: "What to use", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
];

export type addTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string,
    todolistId: string
}
export type removeTodolistActionType = {
    type: "REMOVE-TODOLIST",
    todolistId: string
}
type changeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    todolistId: string,
    title: string
}
type changeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    todolistId: string,
    filter: filterValuesType
}

type ActionType =
    changeTodolistFilterActionType
    | changeTodolistTitleActionType
    | removeTodolistActionType
    | addTodolistActionType

export const todolistsReducer = (state: Array<todolistType> = initialState, action: ActionType): Array<todolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodolist: todolistType = {id: action.todolistId, title: action.title, filter: "all"};
            return [...state, newTodolist];
        }
        case "CHANGE-TODOLIST-FILTER": {
            let copyState = [...state];
            copyState = copyState.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);
            return copyState;
        }
        case "CHANGE-TODOLIST-TITLE": {
            let copyState = [...state];
            copyState = copyState.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl);
            return copyState;
        }
        case "REMOVE-TODOLIST": {
            const copyState=[...state];
            return copyState.filter(tl => tl.id !== action.todolistId);
        }
        default:
            return state;
    }
}

export const changeTodolistFilterAC = (todolistId: string, filter: filterValuesType): changeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", todolistId, filter};
}
export const changeTodolistTitleAC = (todolistId: string, title: string): changeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", todolistId, title};
}
export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
    return {type: "REMOVE-TODOLIST", todolistId};
}
export const addTodolistAC = (title: string): addTodolistActionType => {
    return {type: "ADD-TODOLIST", todolistId: v1(), title};
}