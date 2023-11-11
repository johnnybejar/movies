import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./features/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode causes re-renders which makes unnecessary db calls
  // <React.StrictMode>
  //   <AuthProvider>
  //     <App />
  //   </AuthProvider>
  // </React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
);
