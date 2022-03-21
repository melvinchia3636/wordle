/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-filename-extension */
import { Icon } from '@iconify/react';
import React from 'react';

function Keyboard({
  isFinished,
  updateBoard,
  onEnter,
  onBackspace,
  currentLine,
  showKeyboardStat,
  targetWord,
  board,
  highContrast,
}: {
  isFinished: boolean;
  updateBoard: (letter: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  currentLine: number;
  showKeyboardStat: boolean;
  targetWord: string;
  board: string[][];
  highContrast: boolean;
}) {
  const getKeyboardColor = (letter: string) => {
    let result = 0;
    if (currentLine > 0) {
      for (let i = 0; i <= 5; i++) {
        const linesToCheck = board.slice(0, showKeyboardStat ? currentLine : currentLine - 1);
        if (linesToCheck.some(
          (line) => line[i] === targetWord[i] && targetWord[i] === letter,
        )) {
          result = Math.max(result, 3);
        } else if (linesToCheck.some(
          (line) => line.includes(letter) && targetWord.includes(letter),
        )) {
          result = Math.max(result, 2);
        } else if (linesToCheck.some(
          (line) => line.includes(letter),
        )) {
          result = Math.max(result, 1);
        } else {
          result = Math.max(result, 0);
        }
      }
      return ['', '!bg-neutral-400 dark:!bg-neutral-800', `${highContrast ? '!bg-orange-400' : '!bg-yellow-500'}`, `${highContrast ? '!bg-sky-400' : '!bg-lime-500'}`][result];
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center gap-1 510:gap-2 text-lg">
      <div className="flex gap-1 510:gap-2">
        {Array
          .from('qwertyuiop')
          .map(
            (e) => (
              <button
                disabled={isFinished}
                type="button"
                onClick={() => updateBoard(e)}
                className={`font-semibold text-sm 510:text-base w-[2.2rem] h-12 510:w-9 510:h-12 md:w-12 md:h-16 bg-neutral-300 dark:bg-neutral-600 shadow-lg hover:bg-neutral-400 dark:hover:bg-neutral-500 rounded-md transition-all ${getKeyboardColor(
                  e.toUpperCase(),
                )}`}
              >
                {e.toUpperCase()}
              </button>
            ),
          )}
      </div>
      <div className="flex gap-1 510:gap-2">
        {Array
          .from('asdfghjkl')
          .map((e) => (
            <button
              disabled={isFinished}
              type="button"
              onClick={() => updateBoard(e)}
              className={`font-semibold text-sm 510:text-base w-[2.2rem] h-12 510:w-9 510:h-12 md:w-12 md:h-16 bg-neutral-300 dark:bg-neutral-600 shadow-lg hover:bg-neutral-400 dark:hover:bg-neutral-500 rounded-md transition-all ${getKeyboardColor(
                e.toUpperCase(),
              )}`}
            >
              {e.toUpperCase()}
            </button>
          ))}
      </div>
      <div className="flex gap-1 510:gap-2">
        <button
          disabled={isFinished}
          type="button"
          onClick={onEnter}
          className="text-sm 510:text-base w-12 h-12 510:w-6 510:h-12 md:w-12 md:h-16 flex items-center justify-center bg-neutral-300 shadow-lg dark:bg-neutral-600 rounded-md hover:bg-neutral-400 dark:hover:bg-neutral-500 transition-all"
        >
          <Icon
            icon="uil:enter"
            className="w-6 h-6 -ml-1"
          />
        </button>
        {Array
          .from('zxcvbnm')
          .map((e) => (
            <button
              disabled={isFinished}
              type="button"
              onClick={() => updateBoard(e)}
              className={`font-semibold text-sm 510:text-base w-[2.2rem] h-12 510:w-9 510:h-12 md:w-12 md:h-16 bg-neutral-300 dark:bg-neutral-600 shadow-lg hover:bg-neutral-400 dark:hover:bg-neutral-500 rounded-md transition-all ${getKeyboardColor(
                e.toUpperCase(),
              )}`}
            >
              {e.toUpperCase()}
            </button>
          ))}
        <button
          disabled={isFinished}
          type="button"
          onClick={onBackspace}
          className="w-12 h-12 510:w-9 510:h-12 md:w-12 md:h-16 flex items-center justify-center bg-neutral-300 shadow-lg dark:bg-neutral-600 rounded-md hover:bg-neutral-400 dark:hover:bg-neutral-500 transition-all"
        >
          <Icon
            icon="uil:backspace"
            className="w-5 h-5 510:w-6 510:h-6 -ml-1"
          />
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
