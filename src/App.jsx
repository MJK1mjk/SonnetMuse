import { useState, useEffect,useRef} from 'react'
import InputField from './components/InputField'
import './App.css'

function App() {
  const [rhymes, setRhymes] = useState([])
  const [valid, setValid] = useState([])
  const [active, setActive] = useState(-1)

  useEffect(() => {
    const Rhymes=[];
    const Valid=[];
    for (let i=0;i<14;i++) {
      Rhymes.push('');
      Valid.push(false);
    }
    setRhymes(Rhymes);
    setValid(Valid);
  }, []);

  const changeValid = (val,id) =>{
    let arr= valid;
    if(arr[id]!=val)
    {
      arr[id]=val;
      setValid(arr);
    }
  }

  const changeRhyme = (val,id) =>{
    let arr= rhymes;
    if(arr[id]!=val)
    {
      arr[id]=val;
      setRhymes(arr);
    }
  }

  const changeActive = (val) =>{
    setActive(val)
  }

  const inputFields =[]
  for (let i=0;i<14;i++) {
    inputFields.push(<InputField key={`line-${i}`} 
                                 changeValid={changeValid} 
                                 changeRhyme={changeRhyme} 
                                 changeActive={changeActive} 
                                 valid={valid}
                                 line={i}
                                 />)
  }

  return (
    <div className='Input-Container'>
      {inputFields.map(a=> a)}
    </div>
  )
}

export default App
