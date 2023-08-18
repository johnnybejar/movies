import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  return (
    <>
      <div className="flex gap-4">
        <FaSignInAlt size={70} />
        <h1 className="text-7xl">Login</h1>
      </div>
      <h1 className="text-3xl my-4 text-slate-400 font-bold">
        Login to access your lists
      </h1>
      <form className="flex items-center justify-center flex-col gap-4 text-black">
        <input
          className="rounded h-10 p-2"
          type="text"
          placeholder="Enter an email"
        />
        <input
          className="rounded h-10 p-2"
          type="text"
          placeholder="Enter a password"
        />
        <input
          className="rounded h-10 p-2"
          type="text"
          placeholder="Confirm password"
        />
      </form>
    </>
  );
}

export default Login;
