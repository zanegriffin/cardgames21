import React, {useState, useEffect} from 'react'
import './App.css';

function App() {

  const [deckID, setDeckID] = useState('')
  const [hand, setHand] = useState([])
  const [remainingCards, setRemainingCards] = useState(0)

  const getDeck = () => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(response => {
      setDeckID(response.deck_id)
      setRemainingCards(response.remaining)
    })
  }

  const drawCards = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    .then(response => {
      setHand(response.cards)
      setRemainingCards(response.remaining)
    })
  }

  const hitCard = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then(response => {
      setHand([...hand, response.cards])
    })
  }

  const newRound = () => {
    setHand([])
  }

  const shuffleDeck = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
  }


  return (
    <div className="App">
      <div className='table'>
        
      </div>
    </div>
  );
}

export default App;
