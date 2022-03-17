/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-filename-extension */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';

function WinBox({
  board, getBoardColor, isWin, newGame,
}: {
  board: string[][];
  getBoardColor: (x: string, y: string[], iX: number, iY: number) => 'bg-lime-500' | 'bg-yellow-500' | 'bg-neutral-300 dark:bg-neutral-600' | '';
  isWin: boolean;
  newGame: () => void;
}) {
  const [winboxShow, setWinboxShow] = useState(true);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    if (!isWin) {
      setWinboxShow(false);
    } else {
      setWinboxShow(true);
    }
  }, [isWin]);

  const copyBoard = () => {
    const copiedBoard: string[][] = [];
    for (let i = 0; i < 6; i++) {
      copiedBoard.push([]);
      for (let j = 0; j < 5; j++) {
        const color = getBoardColor(board[i][j], board[i], j, i);
        switch (color) {
          case 'bg-lime-500':
            copiedBoard[i].push('🟩');
            break;
          case 'bg-yellow-500':
            copiedBoard[i].push('🟨');
            break;
          default:
            copiedBoard[i].push('⬜️');
        }
      }
    }
    navigator.clipboard.writeText(copiedBoard.map((line) => line.join('')).join('\n'));
    if (!showCopied) {
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className={`w-full h-screen bg-neutral-900 transition-colors duration-500 absolute top-0 left-0 ${isWin && winboxShow ? 'bg-opacity-50 z-0 delay-[3s]' : 'bg-opacity-0 z-[-1]'}`} />
      <div className={`flex items-center justify-center w-full h-screen absolute top-0 left-0 transition-all duration-500 ${isWin && winboxShow ? 'translate-y-0 delay-[3s]' : 'translate-y-[110%]'}`}>
        <div className="bg-neutral-100 dark:bg-neutral-800 text-zinc-700 dark:text-zinc-100 flex relative flex-col rounded-lg items-center justify-center w-1/2 h-96 shadow-2xl">
          <button type="button" className="absolute top-0 right-0 m-6" onClick={() => setWinboxShow(false)}>
            <Icon icon="uil:multiply" className="w-5 h-5" />
          </button>
          <h2 className="font-medium text-4xl mb-6">You win the game! 🎉</h2>
          <div className="flex items-center gap-2 w-full px-12">
            <button type="button" onClick={newGame} className="border-2 border-lime-500 text-lime-500 flex-1 py-4 text-xl font-semibold rounded-md">New game</button>
            <button type="button" onClick={copyBoard} className="border-2 border-lime-500 bg-lime-500 text-white flex-1 flex items-center gap-2 justify-center py-4 text-xl font-semibold rounded-md">
              Share
              <Icon icon="mdi:share-variant" className="mt-0.5 w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <div className={`p-4 px-8 bg-neutral-200 dark:bg-neutral-700 font-medium rounded-md shadow-md text-neutral-600 dark:text-neutral-100 absolute z-10 top-6 left-1/2 -translate-x-1/2 flex items-center transition-transform duration-500 gap-2 ${showCopied ? 'translate-y-0' : '-translate-y-[150%]'}`}>
        <Icon icon="ph:copy" className="w-6 h-6 text-lime-500" />
        Results copied to clipboard
      </div>
    </>
  );
}

export default WinBox;
