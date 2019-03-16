import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './history';
import { Provider } from 'react-redux';
import store from './modules/configureStore';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import './mocks';

ReactDOM.render(
    <Provider store={store}>
        <DragDropContextProvider backend={HTML5Backend}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </DragDropContextProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
