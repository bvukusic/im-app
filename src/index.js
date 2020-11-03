import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyDXXN1lMvxze7EvpEHryTX3TXAzvldQQTw",
  authDomain: "im-app-c5bec.firebaseapp.com",
  databaseURL: "https://im-app-c5bec.firebaseio.com",
  projectId: "im-app-c5bec",
  storageBucket: "im-app-c5bec.appspot.com",
  messagingSenderId: "346116646069",
  appId: "1:346116646069:web:b65b9dda41fc54de318afc",
  measurementId: "G-KF5ELCK0FX"
});

const routing = (
  <Router>
    <div id='routing-container'>
    <Route path='/login' component={LoginComponent}></Route>
    <Route path='/signup' component={SignupComponent}></Route>
    <Route path='/dashboard' component={DashboardComponent}></Route>
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
