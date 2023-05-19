import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { useParams, useNavigate, useLocation } from "react-router-dom";

class LoginFormC extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const location = this.props.location;

      if (location.state) {
        const prevUrl = location.state.prevUrl;
        window.location = prevUrl;
      } else window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const navigate = this.props.navigate;
    if (auth.getCurrentUser()) return setTimeout(() => navigate("/"));
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export function LoginForm(props) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <LoginFormC
      params={params}
      navigate={navigate}
      location={location}
    ></LoginFormC>
  );
}

export default LoginForm;
