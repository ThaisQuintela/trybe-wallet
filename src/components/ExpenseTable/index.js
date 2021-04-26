import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionDelete, actionEdit } from '../../actions/wallet';

class ExpenseTable extends Component {
  renderHeadForm() {
    return (
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }

  render() {
    const { expenses, deleteExpense, editExpense } = this.props;
    return (
      <table className="expensesTable container h-50 table table-hover">
        {this.renderHeadForm()}
        <tbody className="">
          {expenses.length > 0 && expenses
            .map((expense) => (
              <tr key={ expense.id } className="rounded">
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>
                  {expense.value}
                </td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>
                  {(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td className="d-flex">
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="btn btn-info mx-2"
                    onClick={ () => editExpense(expense.id) }
                  >
                    <i className="far fa-edit" />
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="btn btn-danger"
                    onClick={ () => deleteExpense(expense.id) }
                  >
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

ExpenseTable.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenseId) => dispatch(
    actionDelete(expenseId),
  ),
  editExpense: (expenseId) => dispatch(
    actionEdit(expenseId),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
