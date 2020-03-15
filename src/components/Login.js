import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { StyledFirebaseAuth } from "react-firebaseui";
import "../styles/Login.css";
import firebase from "firebase/app";
import "firebase/auth";

const Login = () => {
  const params = new URLSearchParams(useLocation().search);
  const mode = params.get("mode");

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: "/",
    callbacks: {
      signInSuccessWithAuthResult: () => {
        alert("Successfully logged in.");
        return true;
      }
    }
  };

  const buttonStyle = mode === "select" ? "center" : "flex-start";
  const colWidth = desiredWidth => (mode === "select" ? 12 : desiredWidth);

  return (
    <Container>
      <Row>
        {mode !== "select" && (
          <Col className="description-col" xs={4} sm={4} md={6}>
            <div className="login-description">
              Sign in with your Google account:
            </div>
            <div className="login-description">
              Create account / sign in with email:
            </div>
          </Col>
        )}
        <Col
          className="auth-col"
          style={{ justifyContent: buttonStyle }}
          xs={colWidth(8)}
          sm={colWidth(8)}
          md={colWidth(6)}
        >
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
