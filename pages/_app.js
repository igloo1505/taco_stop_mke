import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../stateManagement/store";
import setAuthToken from "../stateManagement/setAuth";
// import { setModalInstance } from "../stateManagement/uiActions";
import { SET_VIEWPORT_DIMENSIONS } from "../stateManagement/TYPES";

function MyApp({ Component, pageProps }) {
  // if (localStorage.token) {
  //   setAuthToken(localStorage.token);
  // }
  const setViewPortDimensions = () => {
    if (typeof window !== "undefined") {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      store.dispatch({
        type: SET_VIEWPORT_DIMENSIONS,
        payload: {
          width: vw,
          height: vh,
        },
      });
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewPortDimensions();
      window.addEventListener("resize", () => setViewPortDimensions());
    }
  }, []);
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
