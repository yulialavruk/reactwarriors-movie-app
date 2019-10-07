import React from "react";
import CallApi from "../../../api/api";
import validateFields from "./validate";
import Field from "./Field";
import withUserHOC from "../../HOC/withUser";
import withAuthHOC from "../../HOC/withAuth";

class LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      values: {
        username: "belka",
        password: "zxcvbn",
        repeatPassword: "zxcvbn"
      },
      errors: {},
      submitting: false
    };
  }

  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null
      }
    }));
  };

  handleBlur = event => {
    const name = event.target.name;
    const errors = validateFields(this.state.values);
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [name]: errors[name]
        }
      }));
    }
    console.log("on blur");
  };

  onSubmit = () => {
    this.setState({
      submitting: true
    });
    CallApi.get("/authentication/token/new")
      .then(data => {
        return CallApi.post("/authentication/token/validate_with_login", {
          body: {
            username: this.state.values.username,
            password: this.state.values.password,
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        return CallApi.post("/authentication/session/new", {
          body: {
            request_token: data.request_token
          }
        });
      })
      .then(data => {
        this.props.updateSessionId(data.session_id);
        return CallApi.get("/account", {
          params: {
            session_id: data.session_id
          }
        });
      })
      .then(user => {
        this.setState(
          {
            submitting: false
          },
          () => {
            this.props.updateUser(user);
          }
        );
      })
      .then(() => {
        this.props.getFavoriteList();
      })
      .then(() => {
        this.props.getWatchList();
      })
      .catch(error => {
        console.log("error", error);
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message
          }
        });
      });
  };

  onLogin = e => {
    e.preventDefault();
    const errors = validateFields(this.state.values);
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    } else {
      this.onSubmit();
    }
  };

  render() {
    const {
      values: { username, password, repeatPassword },
      errors,
      submitting
    } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
          <Field
            id="username"
            labelText="Пользователь"
            type="text"
            placeholder="Пользователь"
            name="username"
            value={username}
            onChange={this.onChange}
            handleBlur={this.handleBlur}
            error={errors.username}
          />
          <Field
            id="password"
            labelText="Пароль"
            type="password"
            placeholder="Пароль"
            name="password"
            value={password}
            onChange={this.onChange}
            handleBlur={this.handleBlur}
            error={errors.password}
          />
          <Field
            id="repeatPassword"
            labelText="Повторите пароль"
            type="password"
            placeholder="Повторите пароль"
            name="repeatPassword"
            value={repeatPassword}
            onChange={this.onChange}
            handleBlur={this.handleBlur}
            error={errors.repeatPassword}
          />
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >
            Вход
          </button>
          {errors.base && (
            <div className="invalid-feedback text-center">{errors.base}</div>
          )}
        </form>
      </div>
    );
  }
}

export default withUserHOC(withAuthHOC(LoginForm));
