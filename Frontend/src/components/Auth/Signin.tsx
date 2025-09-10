import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface loginForm {
  email: string;
  password: string;
}

const Signin = () => {
  const [formData, setFormData] = useState<loginForm>({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;

    login.mutate({ email, password });
  };

  const linksUnderline = `relative text-stalker-offwhite transition duration-300 after:content-[''] after:absolute after:left-1/2 after:-bottom-1 after:w-0 after:h-[2px] after:bg-stalker-offwhite after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:w-full`;
  return (
    <>
      <section className="bg-stalker-offwhite min-h-screen flex items-center justify-center">
        <div className="bg-stalker-brown w-full max-w-md rounded-2xl shadow-xl p-10">
          <h1 className="text-stalker-offwhite text-4xl font-bold text-center mb-8">
            Sign In
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-stalker-offwhite text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full rounded-full px-4 py-3 bg-white text-stalker-brown placeholder-stalker-brown/50 focus:ring-2 focus:ring-stalker-offwhite focus:outline-none"
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-stalker-offwhite text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full rounded-full px-4 py-3 bg-white text-stalker-brown placeholder-stalker-brown/50 focus:ring-2 focus:ring-stalker-offwhite focus:outline-none"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stalker-offwhite text-stalker-brown font-semibold py-3 rounded-xl hover:bg-stalker-brown hover:text-stalker-offwhite border hover:border-stalker-offwhite transition-all duration-300"
            >
              Sign In
            </button>
          </form>
          <div className="text-stalker-offwhite text-md pt-4 text-center">
            <p>
              Don't have an Account ?{" "}
              <NavLink to="/signup" className={linksUnderline}>
                SignUp
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
