import React from'react';

function Welcome(props) {

  return (
    <div className="App">
      <h1>Quizzical</h1>
      <h3>5 Questions will be selected at random - try and answer as many correctly as you can!</h3>
      <button onClick={props.getQuestions}>Start Quiz</button>
    </div>
  );
}

export default Welcome;