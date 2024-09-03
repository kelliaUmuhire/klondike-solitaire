/* eslint-disable react/prop-types */
import Card from "../layout/Card";
import { MainContext } from "../../context/ThemeContext";
import { useContext } from "react";

const WastePile = ({ waste, onClick }) => {
  const { light } = useContext(MainContext);

  return (
    <div
      className={`w-24 h-36 bg-transparent  ${
        light ? "border-2 border-emerald-500" : "border border-gray-500"
      } rounded-lg flex items-center justify-center relative`}
    >
      {waste.length > 0 &&
        waste.map((card, index) => (
          <div
            key={index}
            className="absolute"
            style={{ left: index * 16 + "px" }}
          >
            <Card
              card={{ ...card, isFaceUp: true }}
              onClick={onClick}
              lastIndex={waste.length - index}
            />
          </div>
        ))}
    </div>
  );
};

export default WastePile;
