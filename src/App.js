import { useState } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const changeInput = (t) => {
    setText(t.target.value);
  };

  const handleClick = () => {
    console.log(text);
  };

  return (
    <div className="App">
      <h1>Teste</h1>
      <input className="input" onChange={(t) => changeInput(t)} value={text} type="text" />
      <button onClick={handleClick} className="button" type="button">Clique</button>
    </div>
  );
}

export default App;
