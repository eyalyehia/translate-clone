import { useEffect, useState } from 'react'
import TextBox from './components/TextBox'
import Arrows from './components/Arrows'
import Button from './components/Button'
import Modal from './components/Modal'
import axios from 'axios'

const App = () => {

  const [showModal, setShowModal] = useState(false)
  const [languages, setLanguages] = useState([])
  const [inputLanguage, setInputLanguage] = useState('English')
  const [outputLanguage, setOutputLanguage] = useState('Polish')
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')


  const getLanguages = async() => {
    const options = {
      method: 'GET',
      url: 'https://g-translate1.p.rapidapi.com/languages',
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': ''
      }
    };
    try {
      const response = await axios.request(options);
      const valueOfData = Object.keys(response.data.data).map((key) => response.data.data[key])
      console.log(valueOfData);
      setLanguages(valueOfData)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getLanguages();
  },[])

  const translate = async() => {
    const options = {
      method: 'GET',
      url: 'https://g-translate1.p.rapidapi.com/translate',
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage
      },
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': ''
      }
    };
    
    try {
      const response = await axios.request(options);
      setTranslatedText(response.data.data.translation);
    } catch (error) {
      console.error(error);
    }
  }


  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
  }

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            style="input"
            setShowModal={setShowModal}
            selectedLanguage={inputLanguage}
            setTextToTranslate={setTextToTranslate}
            textToTranslate={textToTranslate}
            setTranslatedText={setTranslatedText}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
          <TextBox
            style="output"
            setShowModal={setShowModal}
            selectedLanguage={outputLanguage}
            translatedText={translatedText}
          />
          <div className="button-container" onClick={translate}>
            <Button />
          </div>
        </>
      )}
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={
            showModal === 'input' ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === 'input' ? setInputLanguage : setOutputLanguage
          }
        />
      )}
            <div id="google_translate_element" style={{width:'200px',height:'50px',position:'absolute',top:0}}></div>

    </div>
  )
}

export default App
