/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import FoundationPile from "./FoundationPile";
import TableauPile from "./TableauPile";
import StockPile from "./StockPile";
import WastePile from "./WastePile";
import { createDeck, isFit, ranks, shuffleDeck } from "./config";

const SolitaireBoard = () => {
  const [tableau, setTableau] = useState([[], [], [], [], [], [], []]);
  const [foundations, setFoundations] = useState({
    heart: [],
    diamond: [],
    club: [],
    spade: [],
  });
  const [stock, setStock] = useState([]);
  const [waste, setWaste] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newDeck = shuffleDeck(createDeck());
    const newTableau = [[], [], [], [], [], [], []];
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j <= i; j++) {
        newTableau[i].push({
          ...newDeck.pop(),
          isFaceUp: j === i,
          pile: `tableau${i}`,
        });
      }
    }
    setTableau(newTableau);
    setStock(newDeck.map((c) => ({ ...c, pile: "waste" })));
  }, []);

  const handleStockClick = () => {
    if (stock.length === 0) {
      setStock(waste.reverse());
      setWaste([]);
    } else {
      setWaste([...waste, stock.pop()]);
    }
  };

  //todo: to be implemented
  const handleCardClick = (card) => {
    // Implement card click logic here
  };

  //todo: to be improved
  const removeCards = (cards, noTurnOver) => {
    if (cards[0].pile == "waste") {
      setWaste(waste.filter((x) => !cards.find((c) => c.id == x.id)));
    } else {
      const index = Number(cards[0].pile.at(-1));
      let _tableau = [...tableau];
      _tableau[index] = _tableau[index].filter(
        (x) => !cards.find((c) => c.id == x.id)
      );
      const lastItem = _tableau[index].at(-1);
      if (lastItem) {
        _tableau[index][_tableau[index].length - 1] = {
          ...lastItem,
          isFaceUp: true,
        };
        if (!noTurnOver) setScore(score + 5);
      }
      setTableau(_tableau);
    }
  };

  //for foundation at the moment
  const handleCardDrop = (card, suit) => {
    if (card.suit == suit) {
      if (
        (foundations[suit].length == 0 && card.rank == "ace") ||
        (foundations[suit].length > 0 &&
          ranks.findIndex((x) => x == foundations[suit].at(-1).rank) ==
            ranks.findIndex((x) => x == card.rank) - 1)
      ) {
        setFoundations((prevFoundations) => ({
          ...prevFoundations,
          [suit]: [...prevFoundations[suit], { ...card, pile: "foundation" }],
        }));
        removeCards([card]);
        setScore(score + 10);
      }
    }
  };

  const handleTableauDrop = (card, position) => {
    const topCard = tableau[position].at(-1);
    if (
      (!topCard && card.rank == "king") ||
      (topCard && isFit(card, topCard))
    ) {
      //todo: can't this be improved by passing down the card index? but what of when it changes?
      let pile =
        card.pile == "waste" ? waste : tableau[Number(card.pile.at(-1))];
      let index = pile.findIndex((x) => x.id == card.id);
      setTableau(
        tableau.map((t, i) =>
          i == position
            ? (t.push(
                ...pile.slice(index).map((x) => ({
                  ...x,
                  pile: `tableau${position}`,
                  isFaceUp: true,
                }))
              ),
              t)
            : t
        )
      );
      //todo: handle for tableau drop from face-up card and last index
      setScore(
        score +
          (card.pile == "waste"
            ? 5
            : card.pile == "foundation"
            ? -15
            : index == pile.length - 1
            ? 5
            : 0)
      );
      removeCards(pile.slice(index), true);
    }
  };

  return (
    <div className="w-full min-h-screen bg-emerald-800 flex flex-col items-center p-10 relative gap-14 max-w-6xl mx-auto">
      <div className="fixed text-emerald-50 text-3xl font-semibold bottom-6 left-6">
        Score: {score}
      </div>
      <div className="flex justify-between w-full mb-4">
        <div className="flex lg:flex-row flex-col lg:gap-6 gap-4">
          <StockPile stock={stock} onClick={handleStockClick} />
          <WastePile waste={waste} onClick={handleCardDrop} />
        </div>
        <div className="flex space-x-4">
          <FoundationPile
            suit="heart"
            foundation={foundations.heart}
            onDrop={handleCardDrop}
          />
          <FoundationPile
            suit="diamond"
            foundation={foundations.diamond}
            onDrop={handleCardDrop}
          />
          <FoundationPile
            suit="club"
            foundation={foundations.club}
            onDrop={handleCardDrop}
          />
          <FoundationPile
            suit="spade"
            foundation={foundations.spade}
            onDrop={handleCardDrop}
          />
        </div>
      </div>
      <div className="flex justify-center w-full lg:gap-5 gap-4">
        {tableau.map((pile, index) => (
          <TableauPile
            key={index}
            cards={pile}
            onClick={handleCardDrop}
            position={index}
            onDrop={handleTableauDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default SolitaireBoard;
