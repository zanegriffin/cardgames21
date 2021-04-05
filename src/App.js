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
  const [start, setStart] = useState(false)
  const [bust, setBust] = useState(false)
  const [win, setWin] = useState(false)

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
  let score = 0
  let ace = false
  const calculateScore = () => {
    score = 0
    for(let i = 0 ; i < hand.length; i++){
      if( hand[i].value === 'ACE'){
        score += 1
        ace = true
      } else if(!parseInt(hand[i].value)){
        score += 10
        // console.log('here', score)
      } else {
        score += parseInt(hand[i].value)
        // console.log('there', parseInt(hand[i].value))
      }
    }
    if(score < 12 && ace === true){
      score += 10
    }
    console.log(score)
  }
  calculateScore()

  //bust logic
  const isBust = () => {
    if(score > 21){
      setBust(true)
      setStart(false)
      setHand([])
      score = 0
    }
  }
  isBust()


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
  
  return (
    <div className="App">
      <Rules />
      <section>
          {start ? <div className='table'>
            <div className='options'>
              <Button variant="danger" onClick={hitCard}>Hit</Button>
              <Button variant="danger">Stand</Button>
            </div>
            <div className='stats'> 
              <p>Hand: {score}</p>
              <p>Money: {money}</p>
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
          : <div>
              <button onClick={() => {
                setStart(true)
                setBust(false)
                getDeck()
                }}>Start</button>
            </div>}
      </section>
      <section>{bust ? <div>Busted. Play Again?</div> : ''}</section>
      <section>{win ? <div>Winner! Play another round?</div> : ''}</section>
      
    </div>
  );
}

export default App;
