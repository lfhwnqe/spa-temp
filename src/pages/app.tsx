import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAdaptiveLayout } from "@/hooks/useAdaptiveFontSize/useAdaptiveFontSize";

const App = () => {
  const [state, setState] = useState({ num: 1 });
  console.log("app rendered");

  useAdaptiveLayout();

  const handleClick = () => {
    setState({ num: 1 });
  };
  const commonStyles = {
    font: "text-base font-medium font-['Roboto Mono'] leading-none",
  };
  return (
    <>
      <h1 className="text-red-500 text-4xl font-bold">app:{state.num}</h1>
      <div>
        <Button>按钮</Button>
      </div>
      <div
        className={clsx(
          commonStyles.font,
          "flex items-center justify-center p-8"
        )}
      >
        <button
          onClick={handleClick}
          className="relative overflow-hidden group px-8 py-3 rounded-lg 
        bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
        hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
        transform hover:scale-105 transition-all duration-300 ease-out
        shadow-lg hover:shadow-xl
        text-white font-semibold text-lg
        ring-2 ring-blue-500/50 ring-inset
        before:absolute before:inset-0 
        before:bg-gradient-to-r before:from-blue-400/50 before:via-transparent before:to-transparent
        before:translate-x-[-100%] before:transition-transform before:duration-500
        hover:before:translate-x-[100%]
        after:absolute after:inset-0 
        after:shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)]"
        >
          <span className="relative z-10 flex items-center">
            <span>Click Me</span>
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
};

export default App;
