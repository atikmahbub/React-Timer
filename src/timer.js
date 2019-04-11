import React, { Component } from 'react';
import './keypad.css';



const Button = props => {
  return (
    <button type="button" id={props.id} onClick={props.click}>
      {props.value}
    </button>
  );
};

const ButtonGroup = ({ click, buttons = [] }) => {
  let btns = buttons.map(value =>
    <Button value={value} id={value} key={value} click={() => click(value)} />
  );
  return (
    <div>
      {btns}
    </div>
  );
};

export const Body = props => {
  const buttons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

  return (
    <div className="display">
      <div className="keyPad">
        <ButtonGroup buttons={buttons} click={props.click} />
      </div>
    </div>
  );
};