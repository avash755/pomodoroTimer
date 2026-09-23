import React, { useEffect, useState } from 'react'

const App = () => {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(25);
  const [status, setStatus] = useState("Study");
  const [running, setRunning] = useState(false);
  const [button, setButton] = useState("Start");

  useEffect(()=>{
    if(!running) return
    const Timer = setInterval(()=>{
      setSec(s => {
        if(s === 0){
          setMin(m => {
            if(m !== 0){ 
              setSec(59);
              return m - 1;
            }
            if(m === 0){
              if(status === "Study"){
                setMin(5);
                setSec(0);
                setStatus("Rest");
              }
              else{
                setSec(0);
                setMin(0);
                setRunning(false);
                setStatus("Finish");
              }
            }
          })
        }
        return s - 1;
      })
    }, 1000)

    return ()=> clearInterval(Timer);
  }, [running, status])

  function oneClick(){
    setRunning(true);
    setButton("Pause");
  }
  function doubleClick(){
    setRunning(false);
    setButton("Start");
  }
  
  return (
    <div className='flex flex-col justify-center bg-amber-200 items-center h-screen w-screen'>
      <h1 className='bg-amber-950 px-8 text-amber-200  py-3 text-4xl font-bold rounded-2xl mb-5'>POMODORO TIMER</h1>
      
      <div className='bg-amber-500 w-2/3 h-2/3 flex flex-col justify-center rounded-2xl items-center'>
        <div className='flex gap-2'>
          <h1 className='text-amber-950 mt-1 pl-7 py-2  text-3xl font-bold'>Time to </h1> 
          <h1 className='text-amber-200 px-7 py-2  mt-1 bg-amber-950  text-3xl font-bold'>{status}</h1>
        </div>
        <h1 className='font-bold mt-5 text-7xl'>{min}:{sec}</h1>
        <button className='bg-amber-300 px-6 py-2 text-2xl font-bold mt-6 active:scale-80 rounded-2xl active:bg-amber-200' onDoubleClick={doubleClick} onClick={oneClick}>{button}</button>
      </div>
    </div>
  )
}

export default App