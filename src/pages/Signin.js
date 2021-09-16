import axios from "axios";
import React, { useState } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useAppContext } from "../utils/context";
import useToastManager from "../utils/hooks/useToastManager";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const { currentUser, setCurrentUser } = useAppContext();
  const { onError, onWarning, onSuccess } = useToastManager();

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: formData.email,
      pass: formData.password,
    };

    axios
      .post("login.php", data)
      .then((res) => {
        if (res.data.token != null) {
          const { message, ...rest } = res.data;
          onSuccess(message);
          setCurrentUser(rest);
          history.push("/app");
        } else {
          onWarning(res.data.message);
        }
      })
      .catch((err) => {
        onError(err.message);
      });
  }

  return currentUser ? (
    <Redirect to="/app" />
  ) : (
    <div class="container p-50">
      <p class="mt-4 text-center">Sign In to your account</p>
      <div class="card col-md-4 mx-auto">
        <div class="card-body">
          <form onSubmit={handleSubmit} class="row g-3">
            <h4>Welcome Back</h4>
            <div class="col-md-12">
              <label for="email" class="form-label">
                Email Address
              </label>
              <input
                type="text"
                class="form-control"
                required
                onChange={handleInputChange}
              />
            </div>
            <div class="col-md-12">
              <label for="pass" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                required
                onChange={handleInputChange}
              />
            </div>
            <div class="col-12 d-flex justify-content-between">
              <button class="btn btn-primary" type="submit">
                SignIn
              </button>
              <p>
                Have an account? <NavLink to="/forgot">Sign in</NavLink>
              </p>
              <p>
                <NavLink to="/forgot">Forgot password</NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
