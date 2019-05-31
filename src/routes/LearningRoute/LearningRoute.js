import React, { Component } from 'react'
import LanguageApiService from '../../services/language-api-service'
import './LearningRoute.css'
class LearningRoute extends Component {
  state={
    totalScore:null,
    nextWord:'',
    correctCount:0,
    incorrectCount:0,
    isCorrect:null,
    answer:'',
    attempted:'',
    currentword:''

  }
  componentDidMount(){
    LanguageApiService.getLearnWord()
    .then(data=>{      
      this.setState({
        totalScore:data.totalScore,
        nextWord:data.nextWord,
        correctCount:data.wordCorrectCount,
        incorrectCount:data.wordIncorrectCount,
        currentword:data.nextWord})      
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
      let currentWord = this.state.nextWord
      this.setState({
      totalScore:data.totalScore,
      nextWord:data.nextWord,  
      correctCount:data.wordCorrectCount,    
      incorrectCount:data.wordIncorrectCount,
      isCorrect:data.isCorrect,
      answer:data.answer,
      attempted:guess_word.value,
      currentword:currentWord})
     
    })
  }
  render() {   
    console.log(this.state,'test state')
    const isCorrectMessage=this.state.isCorrect?'You were correct! :D':'Good try, but not quite right :('
    return (
      <section>
        <div className='current_score'>
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
        <h3>{isCorrectMessage}</h3>
        <div className='DisplayScore'>
        <p>Your total score is: {this.state.totalScore}</p>
        </div>

        <div className='DisplayFeedback'>
          <p>
          The correct translation for {this.state.currentword} was {this.state.answer} and you chose {this.state.attempted}! 
          </p>
        </div>
      </section>
    );
  }
}

export default LearningRoute
