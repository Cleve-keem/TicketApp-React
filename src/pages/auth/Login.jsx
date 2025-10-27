import React from "react";
import { useForm } from "react-hook-form";
import { login, getSession } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../../components/Toasts";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const nav = useNavigate();

  React.useEffect(() => {
    if (getSession()) nav("/dashboard", { replace: true });
  }, []);

  async function onSubmit(values) {
    try {
      await login({ username: values.username, password: values.password });
      toast.success("Logged in successfully");
      nav("/dashboard", { replace: true });
    } catch (e) {
      toast.error(e.message || "Invalid credentials");
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            {...register("username", { required: "Username required" })}
          />
          {errors.username && (
            <p role="alert" style={{ color: "var(--error)" }}>
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password required" })}
          />
          {errors.password && (
            <p role="alert" style={{ color: "var(--error)" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            margin: "2rem 0 0",
          }}
        >
          <button className="btn primary" type="submit" disabled={isSubmitting}>
            Login
          </button>
          <Link to="/auth/signup" className="helper">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
