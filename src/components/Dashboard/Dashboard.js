import React,{Component} from 'react'
import LanguageApiService from '../../services/language-api-service'
import {Link} from 'react-router-dom'

class Dashboard extends Component{
  state={
    language:[],
    words:[],
    currentWord:'',    
    correct_count:'',
    incorrect_count:''
  }

  componentDidMount(){
    LanguageApiService.getLanguageWord()
    .then(data=>{
      this.setState({language:data.language,words:data.words})
    })
  }

  updateCurrentWord=(e)=>{
    const currentWord=e.target.value
    const selectedIndex = e.target.options.selectedIndex
    const currentWordId = e.target.options[selectedIndex].getAttribute('data-key')
    const currentWordObj = this.state.words.filter(word=>word.id ===Number(currentWordId))[0]     
    console.log(currentWordObj,'test obj')
    this.setState({correct_count:currentWordObj.correct_count,currentWord:currentWord,incorrect_count:currentWordObj.incorrect_count})
  }

  render(){
    
   
    const wordList = this.state.words.map(word=>
          {
      return <option key={word.id} data-key={word.id} value={word.original}>      
                {word.original}      
            </option>
          })
          
    console.log(this.state)
          
         
    return(
      <div className='Dashboard'>
        <div className='language_name'>
          <h2>Language:{this.state.language.name}</h2>
        </div>
        <div className='total_score'>

          <h2>Total score is {this.state.language.total_score}</h2>
        </div>

        <div className='word_list'>
          <select onChange={this.updateCurrentWord} className='select_word'>                             
            {wordList}
          </select>
        </div>
      <div className='current_word'>
       {this.state.currentWord}
      </div>
      <div className='correct_count'>
       {this.state.correct_count}
      </div>
      <div className='incorrect_count'>
      {this.state.incorrect_count}
      </div>
      <div className='start_practice'>
      <Link to='/learn'>
          Start Practicing
        </Link>
      </div>
      </div>
    )
  }
}

export default Dashboard
