import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import authService from "../features/auth/authService";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface IAxiosError extends AxiosError {
  message: string;
  stack: string;
}

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const { username, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent) => {
    const element = e.currentTarget as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [element.name]: element.value,
    }));
  };

  const onRegister = (e: React.MouseEvent) => {
    e.preventDefault();

    if (
      !username.length ||
      !email.length ||
      !password.length ||
      !confirmPassword.length
    ) {
      setError("Please fill in ALL fields!");
      return;
    }

    if (password != confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const userData: RegisterData = {
      username,
      email,
      password,
    };

    const res = authService.register(userData);

    res
      .then((res) => {
        // 200 OK - we can setAuth and redirect the user to their lists page
        setAuth({ name: res.username, email: res.email, token: res.token });
        navigate("/");
      })
      .catch((err: IAxiosError) => {
        if (
          axios.isAxiosError<IAxiosError, Record<string, unknown>>(err) &&
          err.response.data.message === "User already exists"
        ) {
          setError("This email is taken! Try another or check for typos.");
        } else {
          setError("Invalid credentials! Try again.");
        }
      });
  };

  if (localStorage.getItem("user")) {
    toast("You are already logged in!");
    navigate("/");
  }

  return (
    <>
      <div className="flex gap-2">
        <FaUser size={70} />
        <h1 className="text-7xl">Register</h1>
      </div>
      <span className="text-3xl my-1 text-slate-400 font-bold">
        Create an Account
      </span>
      {error ? (
        <span className="text-2xl mb-2 text-red-600 font-bold">{error}</span>
      ) : (
        <></>
      )}
      <form className="flex items-center justify-center flex-col gap-4 text-black">
        <input
          className="rounded h-10 p-2"
          type="text"
          id="username"
          name="username"
          placeholder="Enter a username"
          value={username}
          onChange={onChange}
        />
        <input
          className="rounded h-10 p-2"
          type="email"
          id="email"
          name="email"
          placeholder="Enter an email"
          value={email}
          onChange={onChange}
        />
        <input
          className="rounded h-10 p-2"
          type="password"
          id="reg-password"
          name="password"
          placeholder="Enter a password"
          value={password}
          onChange={onChange}
        />
        <input
          className="rounded h-10 p-2"
          type="password"
          id="confirm-password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={onChange}
        />
        <button
          className="rounded bg-white py-2.5 px-20 font-bold transition hover:bg-gray-400"
          onClick={onRegister}
        >
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
