/* eslint-disable react/prop-types */
import { useContext } from "react";
import { MainContext } from "../../context/ThemeContext";

const StockPile = ({ stock, onClick }) => {
  const { light } = useContext(MainContext);

  return (
    <div
      className="w-24 h-36 bg-transparent border-none flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      {stock.length > 0 ? (
        <img
          src={light ? "/cards/card-back.svg" : "/cards/card-back_dark.svg"}
          alt="Card Back"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div
          className={`rounded-full border-[7px] ${
            light ? "border-emerald-400" : "border-gray-200"
          } p-5 opacity-70`}
        ></div>
      )}
    </div>
  );
};

export default StockPile;
