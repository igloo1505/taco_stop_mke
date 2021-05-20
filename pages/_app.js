import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../stateManagement/store";
import setAuthToken from "../stateManagement/setAuth";
// import { setModalInstance } from "../stateManagement/uiActions";
// import { SET_MODAL_INSTANCE } from "../stateManagement/TYPES";

function MyApp({ Component, pageProps }) {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }
  return (
    <Provider store={store}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
