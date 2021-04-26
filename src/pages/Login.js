import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/login.css';

class Login extends Component {
  render() {
    return (
      <section className="login-page container-fluid vh-100 d-flex align-content-center">
        <LoginForm />
      </section>
    );
  }
}

export default Login;
