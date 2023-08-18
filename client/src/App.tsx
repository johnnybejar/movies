import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Lists from "./pages/Lists";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";

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
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
