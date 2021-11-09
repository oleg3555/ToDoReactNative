import React from 'react';
import {ScrollView, StatusBar, StyleSheet} from 'react-native';
import {AddItemForm} from "./components/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, store} from "./state/store";
import {addTodolistAC, changeTodolistFilterAC, filterValuesType, todolistType} from "./state/todolists-reducer";
import {Todolist} from "./components/Todolist";
import {Header} from "react-native-elements";
import {SafeAreaProvider} from "react-native-safe-area-view";


export const MainContent = () => {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<todolistType>>(store => store.todolists);

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title));
    }
    const changeTodolistFilter = (todolistId: string, filter: filterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }
    return (
        <SafeAreaProvider style={styles.container}>
            <Header
                placement="left"
                leftComponent={{icon: 'menu', color: '#fff'}}
                centerComponent={{text: 'Todolist', style: {color: '#fff'}}}
                rightComponent={{icon: 'home', color: '#fff'}}
            />
            <ScrollView style={styles.scrollView}>
                <AddItemForm addItem={addTodolist}/>
                {todolists.map(tl => <Todolist key={tl.id}
                                               todolistId={tl.id}
                                               filter={tl.filter}
                                               title={tl.title}
                                               changeTodolistFilter={changeTodolistFilter}
                />)}
            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        height: 10000,
        backgroundColor: '#fff',
        marginHorizontal: 10,
    },
});
