import React from 'react';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import '../styles/wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div
        className="wallet-page container-fluid vh-100 d-flex
        flex-column m-0 p-0 table-responsive"
      >
        <Header />
        <ExpenseForm />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
