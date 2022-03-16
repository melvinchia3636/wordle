/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import wordList from './words.json';
import Logo from './logo';

function App() {
  const [theme, setTheme] = React.useState(localStorage.theme);

  React.useEffect(() => {
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.theme = theme;
  }, [theme]);

  const [board, setBoard] = useState(Array(6).fill(0).map(() => Array(5).fill(0).map(() => '')));
  const [targetWord] = useState(
    wordList[
      Math.floor(
        Math.random() * wordList.length,
      )
    ].toUpperCase(),
  );

  const [currentLine, setCurrentLine] = useState(0);
  const [currentLetter, setCurrentLetter] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [winboxShow, setWinboxShow] = useState(true);

  const updateBoard = (letter: string) => {
    if (currentLetter <= 4 && !board[currentLine][currentLetter]) {
      const newBoard = [...board];
      newBoard[currentLine][currentLetter] = letter.toUpperCase();
      setBoard(newBoard);
      if (currentLetter + 1 <= 4) {
        setCurrentLetter(currentLetter + 1);
      }
    }
  };

  const onBackspace = () => {
    if (currentLetter >= 0) {
      const newBoard = [...board];
      if (newBoard[currentLine][currentLetter]) {
        newBoard[currentLine][currentLetter] = '';
      } else {
        const newLetterIndex = currentLetter - 1 >= 0 ? currentLetter - 1 : currentLetter;
        newBoard[currentLine][newLetterIndex] = '';
        setCurrentLetter(newLetterIndex);
      }
      setBoard(newBoard);
    }
  };

  const onEnter = () => {
    if (currentLine < 6 && currentLetter === 4 && wordList.includes(board[currentLine].join('').toLowerCase())) {
      if (board[currentLine].join('') === targetWord) {
        setIsWin(true);
      }
      setCurrentLine(currentLine + 1);
      setCurrentLetter(0);
    }
  };

  const getStats = (letter: string) => {
    let result = 0;
    if (currentLine > 0) {
      for (let i = 0; i <= 5; i++) {
        const linesToCheck = board.slice(0, currentLine);
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
      return ['', '!bg-neutral-400 dark:!bg-neutral-800', '!bg-yellow-500', '!bg-lime-500'][result];
    }
  };

  const getBoxColor = (x: string, y: string[], iX: number, iY:number) => {
    if (iY < currentLine) {
      if (x === targetWord[iX]) {
        return 'bg-lime-500';
      }
      const greenCount = y.filter((e: string, i: number) => e === targetWord[i] && x === e).length;
      const letterCount = targetWord.split(x).length - 1;
      const yellow = letterCount - greenCount
        ? y
          .map((e, i) => [e, i])
          .filter(([e, i]) => e
            !== targetWord[i as number]
            && targetWord.includes(e as string)
            && x === e)
          .map(([, i]) => i)
          .slice(0, letterCount - greenCount)
        : [];
      if (yellow.includes(iX)) {
        return 'bg-yellow-500';
      }
      return 'bg-neutral-300 dark:bg-neutral-600';
    }
  };

  document.onkeydown = (e) => {
    e.preventDefault();
    if (!isWin) {
      if (e.key === 'Backspace') {
        onBackspace();
      } else if (e.key === 'Enter') {
        onEnter();
      } else if ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.includes(e.key)) {
        updateBoard(e.key);
      }
    }
  };

  return (
    <main className={`${theme} w-full h-screen overflow-hidden bg-lime-500 flex items-center justify-center`}>
      <div className="w-full h-screen p-6 bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-100 mx-48 shadow-[0_25px_50px_-12px_rgb(0,0,0,0.6)] flex flex-col">
        <nav className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-6">
            <button type="button">
              <Icon
                icon="uil:question-circle"
                className="w-6 h-6 text-neutral-500"
              />
            </button>
            <button type="button">
              <Icon
                icon="uil:graph-bar"
                className="w-5 h-5 text-neutral-500"
              />
            </button>
            <button
              type="button"
              className="bg-lime-500 p-3 rounded-md shadow-md text-zinc-100"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Icon
                icon={`uil:${theme === 'dark' ? 'moon' : 'sun'}`}
                className="w-6 h-6"
              />
            </button>
          </div>
        </nav>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2">
            {board.map((y, iY) => (
              <div className="flex gap-2">
                {y.map((x, iX) => (
                  <div className={`w-16 h-16 flex items-center justify-center text-2xl font-semibold rounded-md border-2 border-neutral-300 dark:border-neutral-600 ${getBoxColor(x, y, iX, iY)
                  }`}
                  >
                    {x}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 text-lg">
          <div className="flex gap-2">
            {Array
              .from('qwertyuiop')
              .map(
                (e) => (
                  <button
                    disabled={isWin}
                    type="button"
                    onClick={() => updateBoard(e)}
                    className={`font-semibold w-12 bg-neutral-300 dark:bg-neutral-600 shadow-lg hover:bg-neutral-400 dark:hover:bg-neutral-500 h-16 rounded-md transition-all ${getStats(
                      e.toUpperCase(),
                    )}`}
                  >
                    {e.toUpperCase()}
                  </button>
                ),
              )}
          </div>
          <div className="flex gap-2">
            {Array
              .from('asdfghjkl')
              .map((e) => (
                <button
                  disabled={isWin}
                  type="button"
                  onClick={() => updateBoard(e)}
                  className={`font-semibold w-12 bg-neutral-300 dark:bg-neutral-600 shadow-lg hover:bg-neutral-400 dark:hover:bg-neutral-500 h-16 rounded-md transition-all ${getStats(
                    e.toUpperCase(),
                  )}`}
                >
                  {e.toUpperCase()}
                </button>
              ))}
          </div>
          <div className="flex gap-2">
            <button
              disabled={isWin}
              type="button"
              onClick={onEnter}
              className="w-24 flex items-center justify-center bg-neutral-300 shadow-lg dark:bg-neutral-600 h-16 rounded-md hover:bg-neutral-400 dark:hover:bg-neutral-500 transition-all"
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
                  disabled={isWin}
                  type="button"
                  onClick={() => updateBoard(e)}
                  className={`font-semibold w-12 bg-neutral-300 dark:bg-neutral-600 shadow-lg hover:bg-neutral-400 dark:hover:bg-neutral-500 h-16 rounded-md transition-all ${getStats(
                    e.toUpperCase(),
                  )}`}
                >
                  {e.toUpperCase()}
                </button>
              ))}
            <button
              disabled={isWin}
              type="button"
              onClick={onBackspace}
              className="w-24 flex items-center justify-center bg-neutral-300 shadow-lg dark:bg-neutral-600 h-16 rounded-md hover:bg-neutral-400 dark:hover:bg-neutral-500 transition-all"
            >
              <Icon
                icon="uil:backspace"
                className="w-6 h-6 -ml-1"
              />
            </button>
          </div>
        </div>
      </div>
      {isWin && winboxShow && (
      <div className="flex items-center justify-center w-full h-screen bg-neutral-900 absolute top-0 left-0 bg-opacity-30">
        <div className="bg-neutral-100 dark:bg-neutral-800 text-zinc-700 dark:text-zinc-100 flex relative flex-col rounded-lg items-center justify-center w-1/2 h-96 shadow-2xl">
          <button type="button" className="absolute top-0 right-0 m-6" onClick={() => setWinboxShow(false)}>
            <Icon icon="uil:multiply" className="w-5 h-5" />
          </button>
          <h2 className="font-medium text-4xl mb-6">You win the game!</h2>
          <div className="flex items-center gap-2 w-full px-12">
            <button type="button" className="border-2 border-lime-500 text-lime-500 flex-1 py-4 text-xl font-semibold rounded-md">New game</button>
            <button type="button" className="border-2 border-lime-500 bg-lime-500 flex-1 flex items-center gap-2 justify-center py-4 text-xl font-semibold rounded-md">
              Share
              <Icon icon="mdi:share-variant" className="mt-0.5 w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      )}
    </main>
  );
}

export default App;
