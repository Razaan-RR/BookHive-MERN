import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Auth/SocialLogin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveOrUpdateUser } from "../../utils/index";

const Login = () => {
  const { signInUser, user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (user) return <Navigate to={from} replace={true} />;

  const handleLogIn = async (data) => {
    try {
      await signInUser(data.email, data.password);
      await saveOrUpdateUser({
        name: data.name,
        email: data.email,
      });
      toast.success("Welcome back to BookHive!");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 800);
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const onError = (errors) => {
    if (errors.email) toast.error("Valid email is required");
    if (errors.password) toast.error("Password is invalid");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="card w-full max-w-md animate-fadeInUp">
        <h3 className="text-3xl font-extrabold text-center mb-2">
          Welcome Back to <span style={{ color: "var(--primary)" }}>BookHive</span>
        </h3>
        <p className="text-center mb-6 text-sm">
          Discover, read, and manage your books seamlessly
        </p>

        <form onSubmit={handleSubmit(handleLogIn, onError)} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">Email is required</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                Password must be at least 6 characters with upper & lower case
              </p>
            )}
          </div>

          <div className="text-right">
            <a className="text-sm cursor-pointer">Forgot password?</a>
          </div>

          <button type="submit" className="btn w-full" style={{ backgroundColor: "var(--primary)", color: "#fff" }}>
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          New to BookHive?{" "}
          <Link to="/auth/register" className="font-semibold">
            Create an account
          </Link>
        </p>

        <div className="mt-5">
          <SocialLogin />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;