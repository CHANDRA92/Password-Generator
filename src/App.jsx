import { useState,useCallback, useEffect } from 'react'
import { useRef } from 'react'

function App() {
  const [lenth, setLength] = useState(0)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password,setpassword] = useState("")
  // useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass= ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str+= "0123456789"

    if (charAllowed) str+= "!@#$%^&*()_+-=[]{}"

    for (let i = 1; i <= lenth; i++) {
      let char = Math.floor((Math.random()*str.length)+1)  
      pass += str.charAt(char)
    }
    setpassword(pass)

  },[lenth,numberAllowed,charAllowed,setpassword])
  
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    // up to select 100 character for copy clipboard
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[lenth,numberAllowed,charAllowed,setpassword])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-xl rounded-lg px-4 my-8 py-3 text-black-500 mb-4 bg-white-50 opacity-70 hover:opacity-100">
      <h1 className="font-semibold text-2xl text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}

        />
        <button
          type="button"
          class="outline-none font-mono px-3 py-0.5 shrink-0 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..."
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-3">
        <div className="flex items-center gap-x-1">
          <input type="range" 
            id="default-range"
            min={6} 
            max={100} 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-500"
            onChange={(e) => {setLength(e.target.value)}}
            />
        </div>
          <label for="default-range" className="">Length:{lenth}</label>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setnumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charactersInput">Characters</label>
        </div>

      </div>
    </div>
  </>
  )
}

export default App
