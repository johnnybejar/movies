import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Lists from "./pages/Lists";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListCreator from "./pages/ListCreator";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import List from "./pages/List";
import ListUpdate from "./pages/ListUpdate";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="w-full">
          <Header />
          <div className="flex items-center justify-center flex-col gap-3 m-4">
            <Routes>
              <Route path="/" element={<Lists />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/create" element={<ListCreator />}></Route>
              <Route path="/list/*" element={<List />}></Route>
              <Route path="/list/update" element={<ListUpdate />}></Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
}

export default App;
