import React, { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/router";

const Login = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(email, password);

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

      router.push("/");
    } else {
      console.log(data);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center flex-col">
      {!isAuthenticated ? (
        <div className="w-full max-w-lg bg-gray-900 py-30 rounded-2xl">
          <form>
            <div className="bg-primary rounded-lg px-8 py-10 mb-6">
              <h1 className="text-3xl font-bold font-mono text-center mb-6">
                Login
              </h1>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg
                      className="h-6 w-6 text-gray-800"
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
                    placeholder="rinzo@memorylane.io"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="block w-full border border-primary rounded-lg py-2 pl-10 pr-3 text-primary placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:placeholder-gray-400 sm:text-sm sm:leading-5"
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
                      className="h-6 w-6 text-gray-500"
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
                    className="block w-full border border-primary rounded-lg py-2 pl-10 pr-3 text-primary placeholder-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:placeholder-gray-400 sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-300 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-500 transition duration-150 ease-in-out"
                  >
                    login
                  </button>
                </span>
              </div>

              <div className="flex items-center justify-between my-2">
                <div className="text-sm leading-5">
                  <a
                    href="#"
                    className="font-medium text-white hover:text-gray-300 focus:outline-none focus:underline transition ease-in-out duration-150"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="text-sm leading-5">
                  <p className="font-medium text-gray-300">
                    Don't have an account?
                    <a
                      href="/register"
                      className="font-medium text-white hover:text-gray-300 focus:outline-none focus:underline transition ease-in-out duration-150"
                    >
                      {" "}
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-primary rounded-lg px-8 py-10 mb-6">
          <h1 className="text-2xl text-center mb-6">Welcome {user?.name}</h1>
          <div className="mt-6">
            <span className="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                onClick={logout}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary bg-gray-300 hover:bg-gray-400 focus:outline-none focus:border-gray-400 focus:shadow-outline-gray active:bg-gray-400 transition duration-150 ease-in-out"
              >
                Logout
              </button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
