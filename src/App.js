import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Card from './components/Card/Card';

class App extends React.PureComponent {

  state = {
    input: '',
    divider: [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1],
    error: '',
    disabled: true,
    result: [],
    totalDispensed: 0
  }

  render() {
    const { input, error, disabled, totalDispensed } = this.state;
    let btnClass = ['get-money-btn'];
    if (input === '') {
      btnClass.push('disabled');
    }

    return (
      <div className="wrapper">
        <Header title="ATM Money Dispenser" />
        <div className="main">
          <Card>
            <h1 className="heading">Welcome to ATM</h1>
            <div className="input-header">Enter the Amount</div>
            <input type="text" className="money-input" value={input} onChange={this.handleInput} />
            <button className={btnClass.join(' ')} onClick={this.handleGetMoneyBtn} disabled={disabled}>Get Money</button>
            <span className="error">{error}</span>
          </Card>
          <div className="output">
            <h3>You will get following amount</h3>
            {this.renderResults()}
            <h3>Total notes dispensed: {totalDispensed}</h3>
          </div>
        </div>
      </div>
    );
  }

  handleGetMoneyBtn = (event) => {
    const { input, divider } = this.state;
    if (input !== '') {
      const result = [];
      let inputValue = parseInt(input);
      divider.forEach(element => {
        let quotient = inputValue / element;
        result.push(parseInt(quotient));
        let remainder = inputValue % element;
        inputValue = remainder;
      });
      const totalDispensed = result.reduce((acc, cur) => acc + cur);
      this.setState({ result: [...result], totalDispensed });

    } else {
      this.setState({ error: 'Please enter the Integer only' })
    }
  }

  handleInput = (event) => {
    const value = event.target.value;
    if (value === "") {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
    const regex = /^[0-9\b]+$/;
    if (value === '' || regex.test(value)) {
      this.setState({ input: value });
    }
  }

  renderResults = () => {
    const { result, divider } = this.state;

    if (result.length !== 0) {
      const reversedResult = result.reverse();
      const reversedDivider = divider.reverse();
      return reversedResult.map((count, index) => {
        return (
          <div key={`result${index}`}>{count} notes of Rs {reversedDivider[index]}</div>
        )
      });
    }
  }
}

export default App;
