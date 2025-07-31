import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { toast, ToastContainer } from 'react-toastify'

function App() {

  const [length, setlength] = useState(8)
  const [numChecked, setnumChecked] = useState(false)
  const [charChecked, setcharChecked] = useState(false)
  const [password, setpassword] = useState("")

  //useCallback(function, [arrays of dependencies])
  // DEPENDENCIES MATLAB IS VUS VALUE MAI CHANGE HOTA HAI THEN RE-RUN THE RESPECTIVE FUNCTION

  const passwordGenerator = useCallback(
    () => {
      let pass = "";        //USE TO STORE OG PASSWORD
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnmopqrstuvwxzy";
      if(numChecked){
        str+="1234567890"
      }
      if(charChecked){
        str+="!@#$%^&*()-+=`,./;'[]}{:?><"
      }

      for(let i=1; i<= length; i++){
        let char = Math.floor(Math.random()* str.length +1);      //+1 done so 0 can't be multiplied
        pass += str.charAt(char);        //gives character located at specific random index.
      }
      setpassword(pass);      //storing new random value.
    },
    [length, numChecked, charChecked, setpassword],
  )
  
  // SYNATX IS ALMOST SAME AS useCallback,
  //HERE TOO IF ANY CHANGE IN DEPENDENCIE'S VALUE WILL RE-RUN THE RESPECTIVE FUNCTION.
  useEffect(() => {
    passwordGenerator();
  }, [length, numChecked, charChecked, passwordGenerator])
  
  const passwordReference = useRef(null);

  const btnClicked = useCallback(
    ()=>{
      // HERE AFTER current  ? IS WRITTEN, SO IF VALUE IS BLANK DONT RUN
      passwordReference.current?.select();
      // passwordReference.current?.setSelectionRange(0,9);
      // SELECTIONRAGE WILL NOT BE USED HERE, BUT JUST FOR KNOWLEDGE I HAVE WRITTEN IT
      window.navigator.clipboard.writeText(password);
      toast("Copied!");
    }
    ,[])
  return (
    <>
      <div id="wrapper" className='flex flex-col items-center text-white py-8 px-15 my-5 bg-gray-600 w-fit mx-auto rounded-lg border-2 border-white/80'>
        <h1 className='text-[3vw] uppercase leading-none tracking-tight'> Password Generator </h1>
        <div id="input" className=' flex items-center justify-center w-full my-5 text-[1.2vw] rounded-lg overflow-hidden'>
          <input type="text" readOnly placeholder='Password' value={password} className='bg-white flex-1 px-2 py-2 text-gray-600 outline-none' ref={passwordReference}/>
          <button className='px-6 py-2 bg-blue-500 font-bold tracking-wide uppercase hover:bg-blue-600 hover:text-blue-100 hover:cursor-pointer transition-all ease-in-out duration-300' onClick={btnClicked}> copy </button>
        </div>
        <div id="btns" className='flex items-center text-[#FFA333] font-semibold gap-7'>
          <div id="range" className='flex items-center gap-2 text-[1.2vw]'>
            <input type="range" id='range' min={8} max={30} value={length} onChange={(e)=>{setlength(e.target.value)}} />
            <label htmlFor="range"> Range: {length} </label>
          </div>
          <div id="num" className='flex items-center gap-2 text-[1.2vw]'>
            <input type="checkbox" id='num' value={numChecked} onChange={()=>{setnumChecked(prev=>!prev)}}/>
            <label htmlFor="num"> Number </label>
          </div>
          <div id="char" className='flex items-center gap-2 text-[1.2vw]'>
            <input type="checkbox" id='char' onChange={()=>{setcharChecked(prev=>!prev)}}/>
            <label htmlFor="char"> Character </label>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1500}/>
    </>
  )
}

export default App
