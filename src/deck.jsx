import { useEffect, useState, useRef } from "react";
import Card from "./card";

function Deck() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/")
      .then((res) => res.json())
      .then((data) => {
        setDeck(data);
      });
  }, []);
  const shuffleButton = useRef();
  function drawCard(id) {
    fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`)
      .then((res) => res.json())
      .then((data) => {
        if (data.cards.length < 1) {
          alert("out of cards");
        } else {
          setCards([...cards, data.cards[0]]);
        }
      });
  }
  function shuffleDeck() {
    shuffleButton.current.disabled = true;
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((res) => res.json())
      .then((data) => {
        setDeck(data);
        setCards([]);
        shuffleButton.current.disabled = false;
      });
  }
  return (
    <div>
      {cards.map((val) => (
        <Card img={val.image} />
      ))}
      <button onClick={() => drawCard(deck.deck_id)}>Draw a Card</button>
      <button onClick={shuffleDeck} ref={shuffleButton}>
        Shuffle Deck
      </button>
    </div>
  );
}

export default Deck;
