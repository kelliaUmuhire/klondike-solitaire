export const suits = ["heart", "diamond", "club", "spade"];
export const ranks = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
];

export const createDeck = () => {
  const deck = [];
  let id = 1;
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, rank, isFaceUp: false, id: id++ });
    }
  }
  return deck;
};

export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const isFit = (card1, card2) =>
  ranks.findIndex((x) => x == card1.rank) ==
    ranks.findIndex((x) => x == card2.rank) - 1 &&
  ((cardColor(card1) == "red" && cardColor(card2) == "black") ||
    (cardColor(card2) == "red" && cardColor(card1) == "black"));

const cardColor = (card) =>
  card.suit == "heart" || card.suit == "diamond" ? "red" : "black";
