// CORE
import React, { useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { useDemo } from "../../contexts/DemoContext";

// CSS and ICONS
import "./SignIn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const DEMO_EMAIL =
  process.env.REACT_APP_DEMO_EMAIL || "demo@example.com";
const DEMO_PASSWORD =
  process.env.REACT_APP_DEMO_PASSWORD || "demo123";

function SignIn() {
  const firebase = useFirebase();
  const history = useHistory();
  const { enterDemo } = useDemo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then(() => {
        history.push("/daycare");
      });
  };

  const signInWithEmail = () => {
    if (
      email.trim().toLowerCase() === DEMO_EMAIL &&
      password === DEMO_PASSWORD
    ) {
      enterDemo();
      return;
    }
    firebase
      .login({
        email,
        password,
      })
      .then(() => {
        history.push("/daycare");
      })
      .catch(() => {
        window.location.reload();
      });
  };

  const handleEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <div className="SignIn bg_pattern">
      <div className="SignIn--bg-color bg_pattern-color1">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            signInWithEmail();
          }}
          action="submit"
        >
          <div className="SignIn_box">
            <b className="SignIn_box_title">Sign In</b>
            <div className="SignIn_box_input">
              <label htmlFor="signin-email">Enter your Email</label>
              <input
                value={email}
                type="email"
                id="signin-email"
                onChange={handleEmail}
                required
                autoComplete={"email"}
              />
            </div>
            <div className="SignIn_box_input">
              <label htmlFor="signin-password">Enter your Password</label>
              <input
                value={password}
                type="password"
                id="signin-password"
                onChange={handlePassword}
                required
                autoComplete={"current-password"}
              />
            </div>
            <button
              className="SignIn_box_go"
              onClick={(event) => {
                event.preventDefault();
                signInWithEmail();
              }}
            >
              Enter
            </button>
            <p style={{ textAlign: "center" }}>
              ~ OR ~
              <br />
              Sign in with:
            </p>
            <div className="SignIn_box_methods">
              <FontAwesomeIcon
                icon={faGoogle}
                onClick={(event) => {
                  event.preventDefault();
                  signInWithGoogle();
                }}
              />
              <FontAwesomeIcon
                icon={faFacebook}
                color="var(--bg-color-primary)"
              />
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <p style={{ textAlign: "center", marginTop: "1rem" }}>
              ~ OR ~
            </p>
            <button
              type="button"
              className="SignIn_box_go"
              onClick={(event) => {
                event.preventDefault();
                enterDemo();
              }}
              style={{ marginTop: "0.5rem" }}
            >
              View Demo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
