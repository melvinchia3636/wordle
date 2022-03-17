/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

function Board({
  board, isAnimating, isWrong, currentLine, getBoardColor, isHardWrong,
}: {
  board: string[][],
  isAnimating: boolean,
  isWrong: boolean,
  currentLine: number,
  getBoardColor: (x: string, y: string[], iX: number, iY: number) => 'bg-lime-500' | 'bg-yellow-500' | 'bg-neutral-300 dark:bg-neutral-600' | '',
  isHardWrong: boolean,
}) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2">
        {board.map((y, iY) => (
          <div className="flex gap-2">
            {y.map((x, iX) => (
              <div
                className={`w-16 h-16 flex items-center justify-center text-2xl font-semibold rounded-md border-2 border-neutral-300 dark:border-neutral-600 transition-all duration-500 ${isAnimating && `delay-[${iX / 2}s]`} ${(isWrong || isHardWrong) && iY === currentLine && 'animate__animated animate__shakeX animate__faster'} ${getBoardColor(x, y, iX, iY)
                }`}
              >
                {x}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
