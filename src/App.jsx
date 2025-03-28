import axios from 'axios'
import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  axios.get('https://api.freeapi.app/api/v1/public/books').then((response)=>  {
    console.log(response);
    
  });

  return (
    <>
      <h2>Movie</h2>
    </>
  )
}

export default App
