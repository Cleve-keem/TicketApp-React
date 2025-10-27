import React from "react";
import { useForm } from "react-hook-form";
import { signup, getSession } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "../../components/Toasts";

export default function Signup() {
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
      await signup({
        username: values.username,
        password: values.password,
        name: values.name,
      });
      toast.success("Account created — you are logged in");
      nav("/dashboard", { replace: true });
    } catch (e) {
      toast.error(e.message || "Failed to create account");
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <h2>Sign up</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            {...register("name", { required: "Name required" })}
          />
          {errors.name && (
            <p role="alert" style={{ color: "var(--error)" }}>
              {errors.name.message}
            </p>
          )}
        </div>

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
            {...register("password", {
              required: "Password required",
              minLength: { value: 6, message: "Password must be 6+ chars" },
            })}
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
            marginTop: 15,
          }}
        >
          <button className="btn primary" type="submit" disabled={isSubmitting}>
            Create account
          </button>
          <p className="helper">
            Have an account?
            <Link to="/auth/login"> Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
