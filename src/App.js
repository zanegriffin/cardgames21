import React, {useState, useEffect} from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import './App.scss';

function App() {

  // states
  const [deckID, setDeckID] = useState('')
  const [hand, setHand] = useState([])
  const [remainingCards, setRemainingCards] = useState(0)
  const [money, setMoney] = useState(1000)

  // bootstrap modal - rules pop up logic
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // api calls
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

  // game logic
  // game start
  useEffect(() => {
    getDeck()
    drawCards()
  }, [])

  // rendering 

  return (
    <div className="App">
      <Button variant="primary" onClick={handleShow}>
        <FontAwesomeIcon icon={faQuestionCircle} size='lg'/>
      </Button>

      <Modal show={show} 
             onHide={handleClose} 
             size='lg'
             centered 
             backdrop="static" 
             >
        <Modal.Header closeButton>
          <Modal.Title>How to play 21</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Beat the dealer's hand without going over 21.</li>
            <li>Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.</li>
            <li>You start with 2 cards, dealer's hand is revealed at the end.</li>
            <li>You may 'hit' to get another card, or 'stand' to pass and end the round.</li>
            <li>Dealer wins if you 'bust' or go over 21.</li>
            <li>Dealer will hit until their hand is 17 or higher.</li>
            <li>Doubles and splitting currently unavailable.</li>
            <li>Leave your feed back <a target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSe7e6aPBwjQHnIPerQeNcV7dQfuLi-cciCFlUV8dR6amDlTEg/viewform?usp=sf_link'>here</a></li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='table'>

      </div>
    </div>
  );
}

export default App;
