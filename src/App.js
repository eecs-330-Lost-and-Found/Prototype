import React, { useState, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Login from "./components/Login";
import Inbox from "./components/Inbox";
import FileItem from "./components/FileItem";
import Home from "./components/Home";

// CSS imports
import "bootstrap/dist/css/bootstrap.min.css";

// Firebase initialization
import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCOFVnjXdYG_ugQxFjoSIjKM7959nm_GFE",
  authDomain: "hcilogin.firebaseapp.com",
  databaseURL: "https://hcilogin.firebaseio.com",
  projectId: "hcilogin",
  storageBucket: "hcilogin.appspot.com",
  messagingSenderId: "373194240137",
  appId: "1:373194240137:web:610a7e6eda790da581d658",
  measurementId: "G-LEPXSGNEMR"
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [user, setUser] = useState(null);
  const [authHandlerCalled, setAuthStateHandlerCalled] = useState(false);
  firebase.auth().onAuthStateChanged(user => {
    setUser(user);
    setAuthStateHandlerCalled(true);
  });

  return (
    <Fragment>
      {authHandlerCalled && <Banner user={user} />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/file-item" component={FileItem} />
        <Route path="/login" component={Login} />
        <Route path="/inbox" component={Inbox} />
      </Switch>
    </Fragment>
  );
};

export default App;
