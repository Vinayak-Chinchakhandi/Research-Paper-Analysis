import {
  useState,
} from "react";

import { useNavigate }
  from "react-router-dom";

import {
  registerUser,
} from "../services/authService";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const data =
        await registerUser(formData);

      if (data.token) {

        alert(
          "Registration successful"
        );

        navigate("/login");

      } else {

        alert(data.message);
      }
    };

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-[#0B1120]
      text-white
    ">

      <form
        onSubmit={handleSubmit}
        className="
          bg-[#111827]
          p-8
          rounded-2xl
          w-full
          max-w-md
          space-y-4
        "
      >

        <h1 className="
          text-3xl
          font-bold
          text-center
        ">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="
            w-full
            p-3
            rounded-xl
            bg-gray-800
          "
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="
            w-full
            p-3
            rounded-xl
            bg-gray-800
          "
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="
            w-full
            p-3
            rounded-xl
            bg-gray-800
          "
        />

        <button
          type="submit"
          className="
            w-full
            bg-blue-600
            p-3
            rounded-xl
          "
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;