import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { createBrowserHistory } from 'history'
//import configureStore from './store';
import store from './store';
import configureAppStore from "./store"
import './index.css';


const history = createBrowserHistory() as any;
const { store, persistor } = configureAppStore(history);

interface IHistCtxProps {
    history: History;
}

export const HistoryContext = React.createContext<IHistCtxProps>({} as IHistCtxProps);


ReactDOM.render(
    <HistoryContext.Provider value={{ history }}>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter location={history.location} navigator={history}>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </HistoryContext.Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. DashboardProducts more: https://bit.ly/CRA-vitals
reportWebVitals();
