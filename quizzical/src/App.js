import './App.css';
import Welcome from './components/Welcome';
import Blobs from './components/blobs';
import React from'react';
import QuestionsForm from './components/QuestionsForm';

function App() {

  const [currentpage, SetCurrentPage] = React.useState("Welcome");

  //1. Create questionsObj which will hold 5 question objects
  const [questionsObj, setquestionsObj] = React.useState([]);

  //2. Query online DB for 5 questions - store these in questionsObj
  React.useEffect(() => {
    getNewQuestions();
  }, [])

  function getNewQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&category=22&encode=base64")
    //fetch("https://opentdb.com/api.php?amount=5&type=boolean&encode=base64")
        .then(res => res.json())
        .then(data => setquestionsObj(data.results))
  }

  //3. Create Array of both correct and incorrect answers

  // takes a question object containing both correct and incorrect answers. 
  // Combines both into a single array, shuffles the array and returns the new randomly ordered answers.

  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const correctAnswerHolder = [];

  function CreateAllAnswersArray(questionObject) {
    const allAnswersArray = questionObject.incorrect_answers;
    allAnswersArray.push(questionObject.correct_answer);
    correctAnswerHolder.push(window.atob(questionObject.correct_answer.toString()));
    setCorrectAnswers(correctAnswerHolder);
    console.log("questionObject.correct_answer")
    console.log(window.atob(questionObject.correct_answer))
    allAnswersArray.sort((a, b) => 0.5 - Math.random());
    return allAnswersArray;
  }



  //4. Add this array as a property to each question object
  // uses the CreateAllAnswersArray to add another property to the questionsObj containing the all answers array
  function addAllAnswersArraytoQuestionsObject(questionsObj) {
    //const newQuestionsObj = questionsObj.forEach(questionObject => {
    let key = 0;
    const newQuestionsObj = questionsObj.map(questionObject => {

      let newObject = {
        ...questionObject,
        all_answers: CreateAllAnswersArray(questionObject),
        key: key++
      }

      return newObject
    })
    
    //setquestionsObj(newQuestionsObj);
    return newQuestionsObj;
  }

  function printButtonName(e) {
    e.target.style.backgroundColor = "black"
    const newSelectedAnswersArray = selectedAnswers
    const newSelectedAnswersArrayText = selectedAnswersText
    //newSelectedAnswersArray[e.target.value] = e.target.textContent
    newSelectedAnswersArray[e.target.value] = e.target
    newSelectedAnswersArrayText[e.target.value] = e.target.textContent
    console.log("SELECTED ANSWERS CHANGING!!!!!!!!!!!!!!!!!!!!!!!!")
    setSelectedAnswers(newSelectedAnswersArray)
    setSelectedAnswersText(newSelectedAnswersArrayText)
    console.log(newSelectedAnswersArrayText)

    let allButtons = document.getElementsByClassName("btnAnswers");
    allButtons = Array.from(allButtons)

    allButtons.forEach(button => {
      
      //if (button.value === e.target.value && selectedAnswers.includes(button.textContent)) {
      if (selectedAnswers.includes(button)) {
        button.style.backgroundColor = "#94D7A2"
      }
      else {
        button.style.backgroundColor = "rgb(239, 237, 243)"
      }
    })

    
  }

  const [selectedAnswers, setSelectedAnswers] = React.useState([null, null, null, null, null])

  const [selectedAnswersText, setSelectedAnswersText] = React.useState(["", "", "", "", ""]);

  

  //5. Create a JSX version of the questionsObj that serves question as text and all answers as buttons

  function mapObjectIntoJSX(questionsObj) {

    const fullQuestionJSX = questionsObj.map((singleQuestion, questionNum) => {
      const JSXAnswers = singleQuestion.all_answers.map((answer, index) => {
        return <button key={index} selected="no" value={questionNum} className="btnAnswers" onClick={printButtonName}>{window.atob(answer)}</button>
      })
      return (
        <div key={singleQuestion.key}>
          <p>{window.atob(singleQuestion.question)}</p>
          {JSXAnswers}
        </div>
      )
    })
    return fullQuestionJSX;
  }

  const [fullQuestionJSX, setFullQuestionJSX] = React.useState("");

  function StartQuiz() {
    const fullQuestionsObj = addAllAnswersArraytoQuestionsObject(questionsObj);

    setFullQuestionJSX(mapObjectIntoJSX(fullQuestionsObj));

    SetCurrentPage("Questions")
  }

  const [message, setMessage] = React.useState("");

  function checkWin(selectedAnswers, correctAnswers) {
    //if (selectedAnswers.split(",").includes("")) {
    if (selectedAnswers.includes("")) {
      setMessage("Please answer all questions before submitting");
      setTimeout(() => { setMessage(""); }, 5000)
      
    }
    else {
      SetCurrentPage("Results")
      if (selectedAnswers === correctAnswers) {
        console.log("You've got them all correct!");
        
      }
      else {
        console.log(selectedAnswers + " SelectedAnswers variable")
        console.log(correctAnswers + " correctAnswers variable")
        //colourButtons(selectedAnswersText, correctAnswers.split(','));
        colourButtons(selectedAnswersText, correctAnswers);
      }
    }
    
  }

  function colourButtons(selectedAnswersText, correctAnswers) {

    let incorrectAnsCount = 0;
    let buttons = document.getElementsByClassName("btnAnswers");
    buttons = Array.from(buttons)
    for (let i=0;i<correctAnswers.length;i++) {
      // eslint-disable-next-line no-loop-func
      buttons.forEach(button => {
        // eslint-disable-next-line eqeqeq
        if (button.textContent == correctAnswers[i] && button.value == i) {
          console.log("right answer found " + button.textContent)
          button.style.backgroundColor = "#94D7A2"
        }
        // eslint-disable-next-line eqeqeq
        if (button.textContent != correctAnswers[i] && button.value == i && button.textContent == selectedAnswersText[i]) {
          console.log("wrong answer found " + button.textContent)
          button.style.backgroundColor = "pink"
          incorrectAnsCount = incorrectAnsCount + 1;
        }
      })
    }
    
    setMessage(`You've got ${correctAnswers.length - incorrectAnsCount} out of ${correctAnswers.length} questions correct`)
  }

  function RestartGame() {
    // getNewQuestions();
    // StartQuiz();
    // setMessage("");
    // setSelectedAnswers([null, null, null, null, null])
    // setSelectedAnswersText(["", "", "", "", ""])

    document.location.reload();
  }


  return (
    <div className="App">
      {currentpage === "Welcome" && <Welcome getQuestions={StartQuiz}/>}
      {(currentpage === "Questions" || currentpage === "Results") && <QuestionsForm JSXQuestions={fullQuestionJSX}/>}
      <Blobs />
      {//currentpage === "Questions" && <button onClick={() => checkWin(selectedAnswersText.toString(), correctAnswers.toString())}>Submit Answers</button>
      }
      {currentpage === "Questions" && <button onClick={() => checkWin(selectedAnswersText, correctAnswers)}>Submit Answers</button>}
      <p>{message}</p>
      {currentpage === "Results" && <button onClick={RestartGame}>Play Again</button>}
    </div>
  );
}

export default App;


