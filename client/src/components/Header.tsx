import { Link } from "react-router-dom";
import authService from "../features/auth/authService";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { User } from "../types/user";

function Header() {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("user"))
      setAuth(JSON.parse(localStorage.getItem("user")) as User);
  }, []);

  function logout() {
    setAuth({ name: "" } as User);
    authService.logout();
  }

  return (
    <div className="flex justify-between items-center mr-auto h-32 border-b border-b-slate-900 bg-slate-900">
      <Link to="/" className="flex items-center gap-1">
        <img src="./assets/movie-icon.png" className=" max-h-20" />
        <span className="font-bold text-5xl mr-auto">Film Docket</span>
      </Link>
      <ul className="flex gap-20 mr-4">
        <li className="text-3xl border-b-2">
          {auth.name ? <span>Hello, {auth.name}!</span> : <></>}
        </li>
        <li className="text-3xl border-b border-slate-900 hover:border-white transition-all">
          <Link to="/">Lists</Link>
        </li>
        {auth.name ? (
          <>
            <li className="text-3xl border-b border-slate-900 hover:border-white transition-all">
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-3xl border-b border-slate-900 hover:border-white transition-all">
              <Link to="/login">Login</Link>
            </li>
            <li className="text-3xl border-b border-slate-900 hover:border-white transition-all">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
