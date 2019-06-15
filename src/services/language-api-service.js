import TokenService from './token-service'
import config from '../config'

const LanguageApiService ={
  getLanguageWord(){
    return fetch(`${config.REACT_APP_API_BASE}/language`,{
     headers:{
      'authorization':`bearer ${TokenService.getAuthToken()}`
     }, 
    })
    .then(res=>
      (!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        :res.json()
    )
  },
  getLearnWord(){
    return fetch(`${config.REACT_APP_API_BASE}/language/head`,{
      headers:{
       'authorization':`bearer ${TokenService.getAuthToken()}`
      }, 
     })
     .then(res=>
      (!res.ok)
        ? res.json().then(e=>Promise.reject(e))
        :res.json()
    )
  },
  submitGuessWord(word){
    return fetch(`${config.REACT_APP_API_BASE}/language/guess`,{
      method:'POST',
      headers:{
        'content-type':'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`
       },
       body:JSON.stringify(
        word
       ),
    })
    .then(res=>
      (!res.ok)
          ?res.json().then(e=>Promise.reject(e))
          :res.json())
    
  },

}

export default LanguageApiService
