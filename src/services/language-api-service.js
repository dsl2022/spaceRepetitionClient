import TokenService from '../services/token-service'
import config from '../config'

const LanguageApiService ={
  getLanguageWord(){
    return fetch(`${config.API_ENDPOINT}/language`,{
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
    return fetch(`${config.API_ENDPOINT}/language/head`,{
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
    return fetch(`${config.API_ENDPOINT}/language/guess`,{
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
