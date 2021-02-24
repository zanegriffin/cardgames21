import React, {useState, useEffect} from 'react'
import './App.scss';
import {Button} from 'react-bootstrap'

import Rules from './Components/Rules'
import Card from './Components/Card'

function App() {

  // states
  const [deckID, setDeckID] = useState('')
  const [hand, setHand] = useState([])
  const [dealerhand, setDealerHand] = useState([])
  const [remainingCards, setRemainingCards] = useState(0)
  const [money, setMoney] = useState(1000)

  // api calls
  const getDeck = () => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(response => {
      response.json().then(data => {
        setDeckID(data.deck_id)
        setRemainingCards(data.remaining)
        drawCards(data.deck_id)
      })
      
    })
    
  }

  const drawCards = (deckID) => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    .then(response => response.json().then(data => {
      setHand(data.cards)
      setRemainingCards(data.remaining)
    }))
  }

  const drawDealerCards = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    .then(response => {
      setDealerHand(response.cards)
      setRemainingCards(response.remaining)
    })
  }

  const hitCard = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then(response => response.json().then(data => {
      setHand([...hand, data.cards[0]])
      rerenderHand()
    }))
  }

  const newRound = () => {
    setHand([])
  }

  const shuffleDeck = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/shuffle/`)
  }

  // game logic
  // game start on load
  useEffect(() => {
    getDeck()
  }, [])

  // rendering 
  let playerhand = hand.map((card) => {
    return(
      <Card image={card.image} />
    )
  })

  const rerenderHand = () => {
    playerhand = hand.map((card) => {
      return(
        <Card image={card.image} />
      )
    })
  }
  let halfwayThrough = Math.floor(playerhand.length / 2)
// or instead of floor you can use ceil depending on what side gets the extra data

  let arrayFirstHalf = playerhand.slice(0, halfwayThrough);
  let arraySecondHalf = playerhand.slice(halfwayThrough, playerhand.length);
  console.log(hand)
  return (
    <div className="App">
      <Rules />
      <div className='table'>
        <div className='options'>
          <Button variant="danger" onClick={hitCard}>Hit</Button>
          <Button variant="danger">Stand</Button>
        </div>
        <div className='hand'>
          {playerhand.length > 5 ? 
          <>
          <div className='row-container'>
            <div className='card-row'>{arrayFirstHalf}</div>
            <div className='card-row'>{arraySecondHalf}</div>
          </div>
          </>
          : <div className='card-container'>{playerhand}</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
