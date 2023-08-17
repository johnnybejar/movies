import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-center items-center h-32 border-b border-b-slate-900 bg-slate-900">
      <span className="font-bold text-5xl mr-auto ml-4">Movies</span>
      <ul className="flex gap-20 mr-4">
        <li className="text-3xl">
          <Link to="/">Lists</Link>
        </li>
        <li className="text-3xl">
          <Link to="/login">Login</Link>
        </li>
        <li className="text-3xl">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
