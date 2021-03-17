import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrency, actionExpense } from '../../actions/wallet';
import { fetchCurrencies, fetchCurrentExchange } from '../../services/api';

class ExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  async componentDidMount() {
    const currencies = await fetchCurrencies();
    const { saveCurrencyList } = this.props;
    saveCurrencyList(currencies);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let { id } = this.state;
    const { value, currency, method, tag, description } = this.state;
    const expense = { id, value, currency, method, tag, description };
    const exchangeRates = await fetchCurrentExchange(currency);
    const { saveExpense } = this.props;
    const newExpense = { ...expense, exchangeRates };
    saveExpense(newExpense);
    id += 1;
    this.setState({
      id,
    });
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input name="value" data-testid="value-input" onChange={ this.handleChange } />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencies.map((item) => (
              <option value={ item } data-testid={ item } key={ item }>{item}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de Pagamento:
          <select name="method" data-testid="method-input" onChange={ this.handleChange }>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select name="tag" data-testid="tag-input" onChange={ this.handleChange }>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            name="description"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>
        <button type="submit" onClick={ this.handleSubmit }>Adicionar despesa</button>
      </form>
    );
  }
}

ExpenseForm.propTypes = {
  saveCurrencyList: PropTypes.func.isRequired,
  saveExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  saveCurrencyList: (currencies) => dispatch(
    actionCurrency(currencies),
  ),
  saveExpense: (newExpense) => dispatch(
    actionExpense(newExpense),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);