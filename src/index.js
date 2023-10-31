import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)



  // const translate = async () => {
  //   console.log('trainsalte')
  //   const data = {
  //     textToTranslate, outputLanguage, inputLanguage
  //   }
  //   const response = await axios.get('http://localhost:8000/translation', {
  //     params : data
  //   })
  //   console.log('response', response)
  //   setTranslatedText(response.data)
  // }


    // const getLanguages = async () => {
  //   const response = await axios.get('http://localhost:8000/languages')
  //   setLanguages(response.data)
  // }