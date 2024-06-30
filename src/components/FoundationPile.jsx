/* eslint-disable react/prop-types */
import Card from "./Card";
import { useDrop } from "react-dnd";
import { MainContext } from "../context/CardContext";
import { useContext } from "react";

const FoundationPile = ({ foundation, onDrop, suit }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "CARD",
    drop: (item) => onDrop(item.card, suit),
    canDrop: (item) => item.card.isFaceUp && item.card.suit === suit,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  const { lightTheme: light } = useContext(MainContext);

  return (
    <div
      ref={dropRef}
      className={`w-24 h-36 bg-transparent ${
        light ? "border-2 border-emerald-500" : "border border-gray-500"
      } rounded-lg flex items-center justify-center ${
        isOver ? "border-emerald-200" : ""
      }`}
    >
      {foundation.length > 0 ? (
        <Card card={foundation[foundation.length - 1]} />
      ) : (
        <span
          className={`uppercase ${
            light ? "text-emerald-200" : "text-gray-400"
          } text-sm`}
        >
          {suit}
        </span>
      )}
    </div>
  );
};

export default FoundationPile;
