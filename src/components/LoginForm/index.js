import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import actionUser from '../../actions/user';
import 'font-awesome/css/font-awesome.min.css';
import logo from '../../images/logoTrybeWallet.png';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      shouldRedirect: false,
    };
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  checkValidity() {
    const { email, password } = this.state;
    const passwordLength = 6;
    if (password.length < passwordLength) return false;
    if (!/^[A-Z0-9._-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email)) return false;
    return true;
    // Usei o regex para validação feito com base em https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, email, password } = this.state;
    const { saveEmailAndPassword } = this.props;
    saveEmailAndPassword(username, email, password);
    this.setState({ shouldRedirect: true });
  }

  render() {
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/carteira" />;
    return (
      <form
        onSubmit={ this.handleSubmit }
        autoComplete="on"
        className="login-form container-fluid d-flex rounded shadow-lg my-auto bg-light"
      >
        <div className="d-flex flex-column m-4 m-auto">
          <img src={ logo } alt="Trybe Wallet" className="logo w-100 d-block mb-3" />
          <div className="form-floating mb-3">
            <input
              placeholder=" &#xf007; Name"
              name="username"
              id="name"
              type="text"
              className="form-control w-100 bg-transparent"
              onChange={ this.handleChange }
            />
          </div>
          <div className="form-floating w-100 mb-3">
            <input
              data-testid="email-input"
              placeholder="&#xf0e0; Email Address"
              name="email"
              id="email"
              type="text"
              className="form-control bg-transparent"
              onChange={ this.handleChange }
            />
          </div>
          <div className="form-floating w-100 mb-3">
            <input
              data-testid="password-input"
              placeholder=" &#xf023;  Password"
              name="password"
              id="password"
              type="password"
              className="form-control bg-transparent"
              onChange={ this.handleChange }
            />
          </div>
          <button type="submit" className="btn login w-100" disabled={ !this.checkValidity() }>
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  saveEmailAndPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmailAndPassword: (username, email, password) => dispatch(
    actionUser(username, email, password),
  ),
});

export default connect(null, mapDispatchToProps)(LoginForm);
