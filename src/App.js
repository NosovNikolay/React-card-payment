import React from 'react';
import CardFormInner from './components/CardForm/CardFormInner';
import CardList from './components/CardList';
import './style/style.css'
import {CardContextProvider} from "./components/CardContext";


function App() {
    return (
        <div className="App">
            <CardContextProvider>
                <CardList/>
                <CardFormInner/>
            </CardContextProvider>
        </div>
    );
}

export default App;
