import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  };

  const onLogin = (e: any) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
  };

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
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="Enter an email"
          onChange={onChange}
        />
        <input
          className="rounded h-10 p-2"
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Enter a password"
          onChange={onChange}
        />
        <button className="rounded bg-white py-2.5 px-20 font-bold transition hover:bg-gray-500">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
