'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      let newValue = currentValue;

      switch (operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '*':
          newValue = currentValue * inputValue;
          break;
        case '/':
          newValue = currentValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      let newValue = previousValue;

      switch (operation) {
        case '+':
          newValue = previousValue + inputValue;
          break;
        case '-':
          newValue = previousValue - inputValue;
          break;
        case '*':
          newValue = previousValue * inputValue;
          break;
        case '/':
          newValue = previousValue / inputValue;
          break;
      }

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.display}>{display}</div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={clear}>C</button>
          <button className={styles.button} onClick={() => performOperation('/')}>/</button>
          <button className={styles.button} onClick={() => performOperation('*')}>×</button>
          <button className={styles.button} onClick={() => performOperation('-')}>-</button>
          
          <button className={styles.button} onClick={() => inputDigit('7')}>7</button>
          <button className={styles.button} onClick={() => inputDigit('8')}>8</button>
          <button className={styles.button} onClick={() => inputDigit('9')}>9</button>
          <button className={`${styles.button} ${styles.operation}`} onClick={() => performOperation('+')}>+</button>
          
          <button className={styles.button} onClick={() => inputDigit('4')}>4</button>
          <button className={styles.button} onClick={() => inputDigit('5')}>5</button>
          <button className={styles.button} onClick={() => inputDigit('6')}>6</button>
          <button className={`${styles.button} ${styles.equals}`} onClick={handleEquals} style={{gridRow: 'span 2'}}>=</button>
          
          <button className={styles.button} onClick={() => inputDigit('1')}>1</button>
          <button className={styles.button} onClick={() => inputDigit('2')}>2</button>
          <button className={styles.button} onClick={() => inputDigit('3')}>3</button>
          
          <button className={styles.button} onClick={() => inputDigit('0')} style={{gridColumn: 'span 2'}}>0</button>
          <button className={styles.button} onClick={inputDecimal}>.</button>
        </div>
      </div>
    </div>
  );
}