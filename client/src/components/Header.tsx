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
    <div className="flex justify-between items-center mr-auto h-32 max-sm:h-16 bg-slate-90 max-lg:flex-col">
      <Link to="/" className="flex items-center gap-1">
        <img
          src="./assets/movie-icon.png"
          className="max-h-20 max-sm:max-h-12"
        />
        <span className="font-bold text-5xl mr-auto max-sm:text-3xl">
          Film Docket
        </span>
      </Link>
      <ul className="flex gap-20 mr-4 max-md:gap-4">
        <li className="text-3xl max-sm:text-lg border-b">
          {auth.name ? <span>Hello, {auth.name}!</span> : <></>}
        </li>
        <li className="text-3xl max-sm:text-lg border-b border-transparent hover:border-white transition-all">
          <Link to="/">Lists</Link>
        </li>
        {auth.name ? (
          <>
            <li className="text-3xl max-sm:text-lg border-b border-transparent hover:border-white transition-all">
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-3xl max-sm:text-lg border-b border-slate-900 hover:border-white transition-all">
              <Link to="/login">Login</Link>
            </li>
            <li className="text-3xl max-sm:text-lg border-b border-slate-900 hover:border-white transition-all">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Header;
