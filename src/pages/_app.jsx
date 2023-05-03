// pages/_app.js
import "@/styles/globals.css";
import "react-markdown-editor-lite/lib/index.css";
import Sidebar from "@/components/Sidebar";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
