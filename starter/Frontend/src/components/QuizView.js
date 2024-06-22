import React, { Component } from 'react';
import axios from 'axios';

import '../stylesheets/QuizView.css';

const questionsPerPlay = 2;

class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizCategory: null,
      previousQuestions: [],
      showAnswer: false,
      categories: {},
      numCorrect: 0,
      currentQuestion: {},
      guess: '',
      forceEnd: false
    }
  }

  componentDidMount() {
    axios.get('/categories')
      .then(result => {
        this.setState({ categories: result.data.categories });
      })
      .catch(error => {
        alert('Unable to load categories. Please try your request again');
      });
  }

  selectCategory = ({ type, id = 0 }) => {
    this.setState({ quizCategory: { type, id } }, this.getNextQuestion);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  getNextQuestion = () => {
    const { previousQuestions, quizCategory } = this.state;

    axios.post('http://localhost:5000/quizzes', {
      previous_questions: previousQuestions,
      quiz_category: quizCategory
    })
    .then(response => {
      const result = response.data;
      this.setState({
        showAnswer: false,
        previousQuestions: [...previousQuestions, result.question.id],
        currentQuestion: result.question,
        guess: '',
        forceEnd: result.question ? false : true
      });
    })
    .catch(error => {
      console.error('Error loading next question:', error);
      alert('Unable to load question. Please try your request again');
    });
  }

  submitGuess = (event) => {
    event.preventDefault();
    const formatGuess = this.state.guess.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
    const evaluate = this.evaluateAnswer();
    this.setState({
      numCorrect: !evaluate ? this.state.numCorrect : this.state.numCorrect + 1,
      showAnswer: true,
    });
  }

  restartGame = () => {
    this.setState({
      quizCategory: null,
      previousQuestions: [],
      showAnswer: false,
      numCorrect: 0,
      currentQuestion: {},
      guess: '',
      forceEnd: false
    });
  }

  renderPrePlay() {
    return (
      <div className="quiz-play-holder">
        <div className="choose-header">Choose Category</div>
        <div className="category-holder">
          <div className="play-category" onClick={this.selectCategory}>ALL</div>
          {Object.keys(this.state.categories).map(id => {
            return (
              <div
                key={id}
                value={id}
                className="play-category"
                onClick={() => this.selectCategory({ type: this.state.categories[id], id })}
              >
                {this.state.categories[id]}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderFinalScore() {
    return (
      <div className="quiz-play-holder">
        <div className="final-header"> Your Final Score is {this.state.numCorrect}</div>
        <div className="play-again button" onClick={this.restartGame}> Play Again? </div>
      </div>
    )
  }

  evaluateAnswer = () => {
    const formatGuess = this.state.guess.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
    const answerArray = this.state.currentQuestion.answer.toLowerCase().split(' ');
    return answerArray.every(el => formatGuess.includes(el));
  }

  renderCorrectAnswer() {
    const formatGuess = this.state.guess.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
    const evaluate = this.evaluateAnswer();
    return (
      <div className="quiz-play-holder">
        <div className="quiz-question">{this.state.currentQuestion.question}</div>
        <div className={`${evaluate ? 'correct' : 'wrong'}`}>{evaluate ? "You were correct!" : "You were incorrect"}</div>
        <div className="quiz-answer">{this.state.currentQuestion.answer}</div>
        <div className="next-question button" onClick={this.getNextQuestion}> Next Question </div>
      </div>
    )
  }

  renderPlay() {
    return this.state.previousQuestions.length === questionsPerPlay || this.state.forceEnd
      ? this.renderFinalScore()
      : this.state.showAnswer
        ? this.renderCorrectAnswer()
        : (
          <div className="quiz-play-holder">
            <div className="quiz-question">{this.state.currentQuestion.question}</div>
            <form onSubmit={this.submitGuess}>
              <input type="text" name="guess" onChange={this.handleChange} />
              <input className="submit-guess button" type="submit" value="Submit Answer" />
            </form>
          </div>
        )
  }

  render() {
    return this.state.quizCategory
      ? this.renderPlay()
      : this.renderPrePlay()
  }
}

export default QuizView;
