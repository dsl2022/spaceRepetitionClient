import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'
class LearningRoute extends Component {
  state={
    totalScore:null,
    nextWord:'',
    correctCount:0,
    incorrectCount:0

  }
  componentDidMount(){
    LanguageApiService.getLearnWord()
    .then(data=>{
      console.log(data.totalScore,'test total')
      this.setState({
        totalScore:data.totalScore,
        nextWord:data.nextWord,
        correctCount:data.wordCorrectCount,
        incorrectCount:data.wordIncorrectCount})      
      })
    }
  handleSubmitGuessWord=(e)=>{
    e.preventDefault()
    const {guess_word}=e.target
    // console.log(guess_word.value,'test target value')
    const guessWord={
      guess:guess_word.value
    }
    LanguageApiService.submitGuessWord(guessWord)
    .then(data=>{
      
      this.setState({correctCount:data.wordCorrectCount})
    })
  }
  render() {
    console.log(this.state.correctCount)
    return (
      <section>
        <div>
          current score:{this.state.totalScore}
        </div>
        <h2>Translate the word:</h2>
        <span>{this.state.nextWord}</span>
        <p>Your total score is: {this.state.totalScore}</p>
        <form className='guess_word_form'
          onSubmit={this.handleSubmitGuessWord}
        >
          <label htmlFor='learn-guess-input'>
          What's the translation for this word?
          </label>
          <input
          required
          id ='learn-guess-input'
          name='guess_word'
          type='text'
          placeholder='enter word'
          
          ></input>
          <button type='submit' className='guess_word_submit'>
          Submit your answer
          </button>
        </form>
        <div>
        You have answered this word correctly {this.state.correctCount} times.
        </div>
        <div>
        You have answered this word incorrectly {this.state.incorrectCount} times.
        </div>
      </section>
    );
  }
}

export default LearningRoute
