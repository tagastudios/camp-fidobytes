// CORE
import React from "react";
// import { render } from "react-dom";
// import registerServiceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// STORES AND CONFIGS
import createStore from "./stores/store";
import * as config from "./configs/firebase";

// PAGES
import Central from "./Central";
import { DemoProvider } from "./contexts/DemoContext";

// Initialize Firebase instance
firebase.initializeApp(config.fbConfig);
// Init Firestore
firebase.firestore();

// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center",
// };

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={config.rfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <BrowserRouter>
          <DemoProvider>
            <Central />
          </DemoProvider>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
