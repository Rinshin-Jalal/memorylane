// pages/_app.js
import "@/styles/globals.css";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useRef, useState } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
