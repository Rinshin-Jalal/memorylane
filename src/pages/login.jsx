import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { FaEnvelope } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { useRouter } from "next/router";

const Login = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setEmail("");
      setPassword("");
      login(data);

      // Add this block for success toast
      toast({
        title: "Login successful",
        description: "You are now logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/");
    } else {
      // Add this block for error toast
      toast({
        title: "Login failed",
        description: data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  const formBackground = useColorModeValue("#060E17", "gray.700");

  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center flex-col">
      {isAuthenticated === false ? (
        <form className="w-full max-w-lg">
          <div className="bg-primary rounded-lg px-8 py-10 mb-6">
            <h1 className="text-2xl text-center mb-6">Create an Account</h1>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    className="h-6 w-6 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 0H2C.895 0 0 .895 0 2v16c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2V2c0-1.105-.895-2-2-2zM7 14H3v-2h4v2zm6 0h-4v-2h4v2zm4 0h-2v-2c0-.552-.448-1-1-1h-2c-.552 0-1 .448-1 1v2H7v-2c0-.552-.448-1-1-1H4c-.552 0-1 .448-1 1v2H2V2h16v12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  id="name"
                  placeholder="Sid"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="block w-full border border-primary rounded-lg py-2 pl-10 pr-3 text-primary placeholder-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:placeholder-gray-400 sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    className="h-6 w-6 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="sid@techoptimum.org"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="block w-full border border-primary rounded-lg py-2 pl-10 pr-3 text-primary placeholder-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:placeholder-gray-400 sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg
                    className="h-6 w-6 text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="********"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="block w-full border border-primary rounded-lg py-2 pl-10 pr-3 text-primary placeholder-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:placeholder-gray-400 sm:text-sm sm:leading-5"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary transition duration-150 ease-in-out"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm leading-5 text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-5">
                <a
                  href="#"
                  className="font-medium text-primary hover:text-primary-light focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary bg-gray-300 hover:bg-gray-400 focus:outline-none focus:border-gray-400 focus:shadow-outline-gray active:bg-gray-400 transition duration-150 ease-in-out"
                >
                  Sign up
                </button>
              </span>
            </div>
          </div>
          <p className="text-center text-gray-300 text-sm">
            Already have an account?{" "}
            <a href="#" className="text-primary font-medium">
              Sign in
            </a>
          </p>
        </form>
      ) : (
        <div>
          <h1 className="text-2xl text-center mb-6">
            Already logged in as {user.name}
          </h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
