import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../images/logoTrybeWallet.png';

class Header extends Component {
  render() {
    const { username, email, expenses } = this.props;
    return (
      <header className="d-flex w-100 pt-4 flex-column">
        <img src={ logo } alt="Trybe Wallet" className="logo d-flex w-25 mx-auto" />
        <div
          className="user-info d-flex flex-wrap
          justify-content-between align-items-center"
        >
          <span className="username fs-2 m-3">{`Olá, ${username}!`}</span>
          <span data-testid="email-field" className="m-3">{`Email: ${email}`}</span>
          <div>
            <span data-testid="total-field " className="m-3">
              Despesa Total:
              {expenses.length === 0 ? 0
                : expenses.reduce((total, expense) => total + (
                  expense.value * expense.exchangeRates[expense.currency].ask
                ), 0).toFixed(2)}
              {/* Peguei a dica no repositório do Vítor Cançado https://github.com/tryber/sd-08-project-trybewallet/pull/141/files */}
            </span>
            <span data-testid="header-currency-field" className="m-3">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  username: state.user.username,
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
