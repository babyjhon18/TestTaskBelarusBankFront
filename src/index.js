import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Components/Main/Main';
import { Provider } from 'react-redux';
import { store } from './Store/Store'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Main />
  </Provider>
);

