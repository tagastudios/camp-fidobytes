// CORE
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useDemo } from "../../contexts/DemoContext";

// CSS AND PICTURES / ICONS
import "./AppBar.css";
import logo from "../../images/logo_alt_white.png";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function AppBar() {
  const firebase = useFirebase();
  const { isDemoMode, exitDemo } = useDemo();
  const { displayName, photoURL } = useSelector((state) => state.firebase.auth);

  const handleSignOut = () => {
    if (isDemoMode) {
      exitDemo();
    } else {
      firebase.logout();
    }
  };

  return (
    <header className="AppBar">
      <nav className="AppBar_nav">
        <img src={logo} alt="Fidobytes - Logo" />
      </nav>
      {/* <form action="submit" className="AppBar_search">
        <input type="text" name="search" id="search" placeholder="Pet..." />
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form> */}
      <span className="AppBar_user">
        <p onClick={handleSignOut}>
          {isDemoMode ? "Demo User" : displayName ? displayName : "Sign Out"}
        </p>

        {isDemoMode ? (
          <FontAwesomeIcon
            icon={faUserCircle}
            size="2x"
            onClick={handleSignOut}
            title="Exit Demo"
          />
        ) : photoURL ? (
          <img
            src={photoURL}
            alt="Fidobytes - User"
            onClick={handleSignOut}
          />
        ) : (
          <FontAwesomeIcon
            icon={faUserCircle}
            size="2x"
            onClick={handleSignOut}
          />
        )}
      </span>
    </header>
  );
}

export default AppBar;
