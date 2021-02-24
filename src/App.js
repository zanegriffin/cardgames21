import React, {useState, useEffect} from 'react'
import './App.css';

function App() {

  const [deckID, setDeckID] = useState('')

  const getDeck = () => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(response => {

    })
  }


  return (
    <div className="App">
      
    </div>
  );
}

export default App;
