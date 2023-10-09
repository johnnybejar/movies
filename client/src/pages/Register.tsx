import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = formData;

  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-2">
        <FaUser size={70} />
        <h1 className="text-7xl">Register</h1>
      </div>
      <span className="text-3xl my-4 text-slate-400 font-bold">
        Create an Account
      </span>
      <form className="flex items-center justify-center flex-col gap-4 text-black">
        <input
          className="rounded h-10 p-2"
          type="text"
          placeholder="Enter a username"
        />
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
          placeholder="Confirm your password"
        />
        <button className="rounded bg-white py-2.5 px-20 font-bold transition hover:bg-gray-500">
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
