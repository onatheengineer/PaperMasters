import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { createBrowserHistory } from 'history'
//import configureStore from './store';
import configureAppStore from "./store"
import './index.css';
import App from './App';
const { BrowserRouter  } = require("react-router-dom");

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
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
