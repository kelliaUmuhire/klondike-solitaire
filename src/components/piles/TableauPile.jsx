/* eslint-disable react/prop-types */
import { useDrop } from "react-dnd";
import Card from "../layout/Card";

const TableauPile = ({ cards, onClick, position, onDrop }) => {
  const [, dropRef] = useDrop({
    accept: "CARD",
    drop: (item) => onDrop(item.card, position),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={`flex flex-col relative min-w-24 min-h-screen pt-[7.8rem]`}
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          onClick={onClick}
          styles={
            card.isFaceUp && index !== 0 ? "-mt-[6.6rem]" : "-mt-[7.8rem]"
          }
        />
      ))}
    </div>
  );
};

export default TableauPile;
