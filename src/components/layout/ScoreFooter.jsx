/* eslint-disable react/prop-types */

import { useContext } from "react";
import { MainContext } from "../../context/ThemeContext";

export default function ScoreFooter({ score }) {
  const { light, setLight } = useContext(MainContext);

  return (
    <div className="fixed bottom-6 max-w-7xl mx-auto w-full px-10 flex justify-between items-center">
      <div className="font-teko text-emerald-50 text-3xl">Score: {score}</div>
      <div className="flex flex-col items-end">
        <img
          src={light ? "/dark.svg" : "/light.svg"}
          alt="Theme"
          className="w-6 cursor-pointer"
          onClick={() => setLight(!light)}
        />
        <div className="text-xs text-gray-400 w-full flex justify-end mt-3">
          <div>Designs:</div>
          <a
            href="https://www.figma.com/design/iuqwEnUj24PkJCD2GqXgNI/Figma-Playing-Cards-(Community)"
            target="_blank"
            className="underline ml-1 mr-2"
          >
            Light
          </a>
          <a
            href="https://www.figma.com/design/HLtBBVhWACYCNuo44cgucT/Fully-designed-52-card-deck-%2B-78-card-tarot-template-(Community)"
            target="_blank"
            className="underline"
          >
            Dark
          </a>
        </div>
      </div>
    </div>
  );
}
