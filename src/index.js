import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router basename={ process.env.PUBLIC_URL }>
    <Provider store={ store }>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
