import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-center items-center h-32 border-b border-b-slate-900 bg-slate-900">
      <span className="font-bold text-5xl mr-auto ml-4">
        <Link to="/">Movies</Link>
      </span>
      <ul className="flex gap-20 mr-4">
        <li className="text-3xl border-b border-slate-900 hover:border-white transition-all">
          <Link to="/">Lists</Link>
        </li>
        <li className="text-3xl border-b border-slate-900 hover:border-white transition-all">
          <Link to="/login">Login</Link>
        </li>
        <li className="text-3xl border-b border-slate-900 hover:border-white transition-all">
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
