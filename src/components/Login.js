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
    signInSuccessUrl: "/inbox",
    callbacks: {
      signInSuccessWithAuthResult: () => {
        alert("Successfully logged in.");
        return true;
      }
    }
  };

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
};

export default Login;
