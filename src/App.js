import paste_icon from './Assets/paste.png'
import './App.css';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './Character'
import { COPY_Fail, COPY_SUCCESS } from './Message';

function App() {

  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(6)
  const [includeUpperCase, setIncludeUpperCase] = useState(false)
  const [includeLowerCase, setIncludeLowerCase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const handleGeneratePassword = () => {
    if(passwordLength<8)
      notify("Size should be atleat 8",true);
    else if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      notify("To generate password you must select atleast one checkbox", true)
    }
    else {
      let characterList = ""
      if (includeNumbers) {
        characterList = characterList + numbers
      }
      if (includeUpperCase) {
        characterList = characterList + upperCaseLetters
      }
      if (includeLowerCase) {
        characterList = characterList + lowerCaseLetters
      }
      if (includeSymbols) {
        characterList = characterList + specialCharacters
      }
      setPassword(createPassword(characterList))
      notify("Password is generated successfully", false)
    }


  }
  const createPassword = (characterList) => {
    let password = ""
    const characterListLength = characterList.length
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }
  const copyToClipboard = (password) => {

    navigator.clipboard.writeText(password)
  }
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  const handleCopyPassword = (e) => {
    if (password === "") {
      notify(COPY_Fail, true)
    }
    else {
      copyToClipboard(password)
      notify(COPY_SUCCESS)
    }

  }

  return (
    <div className="container">
      <h1>PASSWORD GENERATOR</h1>

      <div className="input">
        <input type="text" value={password}/>
        <img onClick={handleCopyPassword} src={paste_icon} alt="" />
      </div>

      <div className="size">
        <p>Password length</p>
        <input type="number" value={passwordLength} onChange={(e)=> setPasswordLength(e.target.value)} min="8"/>
      </div>

      <div className="features">
        <div className="feature-box">
          <p>Add Uppercase Letters</p>
          <input checked={includeUpperCase} onChange={(e)=> setIncludeUpperCase(e.target.checked)} type="checkbox" />
        </div>
        <div className="feature-box">
          <p>Add Lowercase Letters</p>
          <input checked={includeLowerCase} onChange={(e)=> setIncludeLowerCase(e.target.checked)} type="checkbox" />
        </div>
        <div className="feature-box">
          <p>Include Numbers</p>
          <input checked={includeNumbers} onChange={(e)=> setIncludeNumbers(e.target.checked)} type="checkbox" />
        </div>
        <div className="feature-box">
          <p>Include Symbols</p>
          <input checked={includeSymbols} onChange={(e)=> setIncludeSymbols(e.target.checked)} type="checkbox" />
        </div>
      </div>
      <div onClick={handleGeneratePassword} className="generate-button">
        <p>Generate Password</p>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      </div> 
    </div>
  );
}

export default App;
