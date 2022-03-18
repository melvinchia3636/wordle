/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-filename-extension */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';

function WinBox({
  board,
  getBoardColor,
  isFinished,
  newGame,
  highContrast,
  showStats,
  setShowStats,
  stats,
  currentLine,
}: {
  board: string[][];
  getBoardColor: (x: string, y: string[], iX: number, iY: number) => '' | 'bg-sky-400' | 'bg-lime-500' | 'bg-orange-400' | 'bg-neutral-300 dark:bg-neutral-600' | 'bg-yellow-500';
  isFinished: boolean;
  newGame: () => void;
  highContrast: boolean;
  showStats: boolean;
  setShowStats: (showStats: boolean) => void;
  stats: {
    correct: number;
    total: number;
    streak: number;
    maxStreak: number;
    guess: number[];
  };
  currentLine: number;
}) {
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    if (!isFinished) {
      setShowStats(false);
    } else {
      setTimeout(() => {
        setShowStats(true);
      }, 1000);
    }
  }, [isFinished]);

  const copyBoard = () => {
    const copiedBoard: string[][] = [];
    for (let i = 0; i < 6; i++) {
      copiedBoard.push([]);
      for (let j = 0; j < 5; j++) {
        const color = getBoardColor(board[i][j], board[i], j, i);
        switch (color) {
          case 'bg-sky-400': case 'bg-lime-500':
            copiedBoard[i].push(['🟩', '🟦'][Number(highContrast)]);
            break;
          case 'bg-orange-400': case 'bg-yellow-500':
            copiedBoard[i].push(['🟨', '🟧'][Number(highContrast)]);
            break;
          default:
            copiedBoard[i].push(['⬜️', '⬛️'][Number(highContrast)]);
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
      <div className={`w-full h-screen bg-neutral-900 transition-colors duration-500 absolute top-0 left-0 ${showStats ? 'bg-opacity-50 z-0' : 'bg-opacity-0 z-[-1]'}`} />
      <div className={`flex items-center justify-center w-full h-screen absolute top-0 left-0 transition-all duration-500 ${showStats ? 'translate-y-0' : 'translate-y-[110%]'}`}>
        <div className="bg-neutral-100 dark:bg-neutral-800 text-zinc-700 dark:text-zinc-100 flex relative flex-col rounded-lg items-center justify-center w-1/2 py-8 shadow-2xl">
          <button type="button" className="absolute top-0 right-0 m-6" onClick={() => setShowStats(false)}>
            <Icon icon="uil:multiply" className="w-5 h-5" />
          </button>
          <h2 className="font-medium text-3xl mb-8">Statistic</h2>
          <div className="flex gap-8">
            <div className="flex flex-col items-center text-5xl font-semibold gap-2">
              {stats.total}
              <span className="text-sm">Played</span>
            </div>
            <div className="flex flex-col items-center text-5xl font-semibold gap-2 ">
              {Math.round((stats.correct / stats.total) * 100) || 0}
              %
              <span className="text-sm">Win %</span>
            </div>
            <div className="flex flex-col items-center text-5xl font-semibold gap-2 ">
              {stats.streak}
              <span className="text-sm text-center">
                Current
                <br />
                Streak
              </span>
            </div>
            <div className="flex flex-col items-center text-5xl font-semibold gap-2 ">
              {stats.maxStreak}
              <span className="text-sm text-center">
                Max Streak
              </span>
            </div>
          </div>
          <h2 className="font-medium text-3xl mb-8 mt-12">Guess Distribution</h2>
          <div className="flex flex-col gap-2 w-full px-20">
            {stats.guess.map((e, i) => (
              <div className="flex items-center gap-2">
                <span className="font-semibold w-4">{i + 1}</span>
                <div
                  className={`w-8 rounded-md p-1 px-3 ${isFinished && currentLine - 1 === i && stats.streak > 0 ? 'bg-lime-500' : 'bg-neutral-600'} font-semibold`}
                  style={{
                    width: e ? `${(e / Math.max(...stats.guess)) * 100}%` : '2rem',
                  }}
                >
                  {e}
                </div>
              </div>
            ))}
          </div>
          {isFinished && (
            <div className="flex items-center gap-2 w-full px-12 mt-8">
              <button type="button" onClick={newGame} className={`border-2 ${highContrast ? 'border-sky-400' : 'border-lime-500'} ${highContrast ? 'text-sky-400' : 'text-lime-500'} flex-1 py-4 text-xl font-semibold rounded-md`}>New game</button>
              <button type="button" onClick={copyBoard} className={`border-2 ${highContrast ? 'border-sky-400' : 'border-lime-500'} ${highContrast ? 'bg-sky-400' : 'bg-lime-500'} text-white flex-1 flex items-center gap-2 justify-center py-4 text-xl font-semibold rounded-md`}>
                Share
                <Icon icon="mdi:share-variant" className="mt-0.5 w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={`p-4 px-8 bg-neutral-200 dark:bg-neutral-700 font-medium rounded-md shadow-md text-neutral-600 dark:text-neutral-100 absolute z-10 top-6 left-1/2 -translate-x-1/2 flex items-center transition-transform duration-500 gap-2 ${showCopied ? 'translate-y-0' : '-translate-y-[150%]'}`}>
        <Icon icon="ph:copy" className={`w-6 h-6 ${highContrast ? 'text-sky-400' : 'text-lime-500'}`} />
        Results copied to clipboard
      </div>
    </>
  );
}

export default WinBox;
