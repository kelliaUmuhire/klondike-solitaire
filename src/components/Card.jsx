/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { MainContext } from "../context/CardContext";

const Card = ({ card, onClick, styles, lastIndex }) => {
  const [{ isDragging }, dragRef, preview] = useDrag({
    type: "CARD",
    item: { card },
    canDrag: () =>
      card.isFaceUp && (card.pile == "waste" ? lastIndex == 1 : true),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const { lightTheme: light } = useContext(MainContext);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return (
    <div
      ref={dragRef}
      className={`${styles} h-36 w-24 bg-white ${
        light ? "border-2" : "border border-gray-500"
      } rounded-lg flex items-center justify-center cursor-pointer ${
        isDragging && "opacity-0"
      }`}
      onClick={() => onClick(card)}
    >
      {card.isFaceUp ? (
        <img
          src={`/cards/${card.rank}_of_${card.suit}${
            !light ? "_dark" : ""
          }.svg`}
          alt={`${card.rank} of ${card.suit}`}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <img
          src={light ? "/cards/card-back.svg" : "/cards/card-back_dark.svg"}
          alt="Card Back"
          className="w-full h-full object-cover rounded-lg"
        />
      )}
    </div>
  );
};

export default Card;
