import { useState,useCallback,useEffect,useRef} from "react";
import "./App.css";

export default function App() {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  //useRef hook
  const passwordRef = useRef(null)

  const randomPassword = useCallback(()=>{
    let str="ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwyz"
    let pass = ""
    if(numberAllowed) str+='1234567890'
    if(specialCharacter) str+='!@#$%^&*'

    for(let i=0;i<length;i++){
    let char = Math.floor(Math.random()*str.length+1) 
    pass+=str.charAt(char)
    } 

    setPassword(pass)
  },[length,specialCharacter,numberAllowed,setPassword])

  const copyText = ()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }

 useEffect(()=>{
  randomPassword()
 },[length,numberAllowed,specialCharacter,randomPassword])
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className=" text-white text-center my-3 text-3xl">
        Password generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyText}>
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
           <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
         <input 
         type="checkbox" 
         defaultChecked={specialCharacter}
         id="characterInput"
         onChange={()=>{setSpecialCharacter((prev)=>!prev)}}
         />
         <label htmlFor="numberInput">Characters</label>
        </div>
      </div>
    </div>
  );
}
