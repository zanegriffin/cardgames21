import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const Component = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className='rules'>
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
        </div>
    )
}

export default Component