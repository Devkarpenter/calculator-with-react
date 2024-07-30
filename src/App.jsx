import React, { useState } from 'react';
import './App.css';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    const operationMap = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    };

    const operation = operationMap[operator];
    if (operation) {
      return operation(firstOperand, secondOperand);
    }
    return secondOperand;
  };

  // Function to get display value including operator
  const getDisplay = () => {
    if (waitingForSecondOperand) {
      return `${firstOperand} ${operator} `;
    }
    return displayValue;
  };
  

  return (
    <div>
    <div className="sky any calculator ">
      <div className="display input">{getDisplay()}</div>
      <div className="keypad">
        <div>
        
        <button className="btn" onClick={() => inputDigit(7)}>7</button>
        <button className="btn" onClick={() => inputDigit(8)}>8</button>
        <button className="btn" onClick={() => inputDigit(9)}>9</button>
        <button className="operator" onClick={() => performOperation('/')}>/</button>
        <button className="operator" onClick={() => clearDisplay()}>AC</button>
        </div>
        
        <div>
        <button className="btn"onClick={() => inputDigit(4)}>4</button>
        <button className="btn"onClick={() => inputDigit(5)}>5</button>
        <button className="btn"onClick={() => inputDigit(6)}>6</button>
        <button value="ac"  className="operator" onClick={() => performOperation('*')}>*</button>
        </div>

        <div>
        <button className="btn"onClick={() => inputDigit(1)}>1</button>
        <button className="btn"onClick={() => inputDigit(2)}>2</button>
        <button className="btn"onClick={() => inputDigit(3)}>3</button>
        <button className="operator" onClick={() => performOperation('-')}>-</button>
        </div>

        <button className="btn"onClick={() => inputDigit(0)}>0</button>
        <button className="btn"onClick={() => inputDecimal()}>.</button>
        <button className="btn"onClick={() => performOperation('+')}>+</button>
        

        <button className="operator" onClick={() => {
          if (displayValue !== '0') {
            setDisplayValue(displayValue.slice(0, -1));
          }
        }}>DEL</button>

        <button className="operator" onClick={() => {
          const result = calculate(firstOperand, parseFloat(displayValue), operator);
          setDisplayValue(String(result));
          setFirstOperand(null);
          setOperator(null);
          setWaitingForSecondOperand(false);
        }}>=</button>
      </div>
    </div>
    </div>
  );
}

export default Calculator;

