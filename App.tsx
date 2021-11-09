import React from 'react';
import {Provider} from "react-redux";
import {store} from "./state/store";
import {MainContent} from "./MainContent";


export default function App(){
    return (
        <Provider store={store}>
            <MainContent/>
        </Provider>
    );
}

