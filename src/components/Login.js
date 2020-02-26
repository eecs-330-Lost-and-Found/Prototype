import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase/app";
import "firebase/auth";

const Login = () => {
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: "/messages"
  };

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
};

export default Login;
