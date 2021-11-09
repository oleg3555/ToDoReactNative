import React, {useState} from "react";
import { Button } from 'react-native-elements';
import {
    Keyboard,
    NativeSyntheticEvent,
    StyleSheet,
    TextInput,
    TextInputChangeEventData,
    View
} from "react-native";

type addItemPropsType = {
    addItem: (title: string) => void,
}

export const AddItemForm = (props: addItemPropsType) => {
    const [title, setTitle] = useState<string>("");
    const onChangeInputTitle = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setTitle(e.nativeEvent.text);
    }
    const addItem = () => {
        const newTitle = title.trim();
        if (newTitle) {
            props.addItem(newTitle);
        }
        Keyboard.dismiss();
        setTitle("");
    }
    return (
        <View style={styles.container}>
            <TextInput placeholder="Type value"
                       style={styles.input}
                       maxLength={24}
                       onChange={onChangeInputTitle}
                       value={title}/>
            <Button  title="Add" onPress={addItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        margin: 12,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius:5,
        height: 40,
        paddingLeft:15,
        width:260,
    }
});