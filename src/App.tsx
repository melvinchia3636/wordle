/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import wordList from './assets/words.json';
import allowedWordList from './assets/allowedWords.json';
import 'animate.css';
import Navbar from './components/Navbar';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import WinBox from './components/WinBox';
import Tutorial from './components/Tutorial';
import Settings from './components/Settings';

function App() {
  const [theme, setTheme] = React.useState<string>(localStorage.theme);

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

  const [board, setBoard] = useState(
    localStorage.board && localStorage.board !== '[]' ? JSON.parse(localStorage.board) : Array(6)
      .fill(0)
      .map(
        () => Array(5)
          .fill(0)
          .map(() => ''),
      ),
  );
  const [targetWord, setTargetWord] = useState(
    localStorage.targetWord
    || wordList[
      Math.floor(
        Math.random() * wordList.length,
      )
    ].toUpperCase(),
  );

  const [currentLine, setCurrentLine] = useState(parseInt(localStorage.currentLine, 10) || 0);
  const [currentLetter, setCurrentLetter] = useState(parseInt(localStorage.currentLetter, 10) || 0);

  const [isWin, setIsWin] = useState(localStorage.isWin === 'true');
  const [isWrong, setWrong] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHardWrong, setHardWrong] = useState(false);

  const [showKeyboardStat, setShowKeyboardStat] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [hardMode, setHardMode] = useState(localStorage.hardMode === 'true');
  const [errorMessage, setErrorMessage] = useState('');
  const [highContrast, setHighContrast] = useState(localStorage.highContrast === 'true');

  const [stats, setStats] = useState(localStorage.stats && localStorage.stats !== '{}' ? JSON.parse(localStorage.stats) : {
    correct: 0,
    total: 0,
    streak: 0,
    maxStreak: 0,
  });

  useEffect(() => {
    localStorage.hardMode = hardMode;
  }, [hardMode]);

  useEffect(() => {
    localStorage.highContrast = highContrast;
  }, [highContrast]);

  useEffect(() => {
    localStorage.targetWord = targetWord;
  }, [targetWord]);

  useEffect(() => {
    localStorage.board = JSON.stringify(board);
  }, [board]);

  useEffect(() => {
    localStorage.currentLine = currentLine;
  }, [currentLine]);

  useEffect(() => {
    localStorage.currentLetter = currentLetter;
  }, [currentLetter]);

  useEffect(() => {
    localStorage.isWin = isWin;
  }, [isWin]);

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
    if (currentLine < 6 && currentLetter === 4 && board[currentLine][currentLetter]) {
      if (wordList.concat(allowedWordList).includes(board[currentLine].join('').toLowerCase())) {
        if (board[currentLine].join('') === targetWord) {
          setTimeout(() => {
            setIsWin(true);
          }, 2000);
        }
        if (hardMode) {
          if (currentLine >= 1) {
            for (let i = 0; i < 5; i++) {
              if (board[currentLine - 1][i] === targetWord[i] && board[currentLine][i] !== board[currentLine - 1][i]) {
                if (!isHardWrong) {
                  setHardWrong(true);
                  setTimeout(() => {
                    setHardWrong(false);
                  }, 2000);
                  setErrorMessage(`${i + 1}${['st', 'nd', 'rd', 'th', 'th'][i]} letter must be ${board[currentLine - 1][i]}`);
                }
                return;
              }
              if (targetWord.includes(board[currentLine - 1][i]) && !board[currentLine].includes(board[currentLine - 1][i])) {
                if (!isHardWrong) {
                  setHardWrong(true);
                  setTimeout(() => {
                    setHardWrong(false);
                  }, 2000);
                  setErrorMessage(`Guess must contain ${board[currentLine - 1][i]}`);
                }
                return;
              }
            }
          }
        }
        setCurrentLine(currentLine + 1);
        setCurrentLetter(0);
        setIsAnimating(true);
        setShowKeyboardStat(false);
        setTimeout(() => {
          setIsAnimating(false);
          setTimeout(() => {
            setShowKeyboardStat(true);
          }, 200);
        }, 2100);
      } else if (isWrong === false) {
        setWrong(true);
        setTimeout(() => {
          setWrong(false);
        }, 1000);
      }
    }
  };

  const getBoardColor = (x: string, y: string[], iX: number, iY: number) => {
    if (iY < currentLine) {
      if (x === targetWord[iX]) {
        return highContrast ? 'bg-sky-400' : 'bg-lime-500';
      }
      const greenCount = y.filter((e: string, i: number) => e === targetWord[i] && x === e).length;
      const letterCount = targetWord.split(x).length - 1;
      const red = letterCount - greenCount
        ? y
          .map((e, i) => [e, i])
          .filter(([e, i]) => e
            !== targetWord[i as number]
            && targetWord.includes(e as string)
            && x === e)
          .map(([, i]) => i)
          .slice(0, letterCount - greenCount)
        : [];
      if (red.includes(iX)) {
        return highContrast ? 'bg-orange-400' : 'bg-yellow-500';
      }
      return 'bg-neutral-300 dark:bg-neutral-600';
    }
    return '';
  };

  document.onkeydown = (e) => {
    if (!showTutorial && !showSettings) {
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
    }
  };

  const newGame = () => {
    setBoard(
      Array(6)
        .fill(0)
        .map(
          () => Array(5)
            .fill(0)
            .map(() => ''),
        ),
    );
    setCurrentLine(0);
    setCurrentLetter(0);
    setIsWin(false);
    setIsAnimating(false);
    setShowKeyboardStat(true);
    setWrong(false);
    setTargetWord(
      wordList[
        Math.floor(
          Math.random() * wordList.length,
        )
      ].toUpperCase(),
    );
  };

  return (
    <main className={`${theme} w-full h-screen overflow-hidden ${highContrast ? 'bg-sky-400' : 'bg-lime-500'} flex items-center justify-center`}>
      <div className="w-full h-screen p-6 bg-zinc-100 relative dark:bg-neutral-800 text-neutral-600 dark:text-neutral-100 mx-48 shadow-[0_25px_50px_-12px_rgb(0,0,0,0.6)] flex flex-col">
        <Navbar
          theme={theme}
          setTheme={setTheme}
          setShowTutorial={setShowTutorial}
          setShowSettings={setShowSettings}
          highContrast={highContrast}
        />
        <Board
          board={board}
          isAnimating={isAnimating}
          isWrong={isWrong}
          isHardWrong={isHardWrong}
          currentLine={currentLine}
          getBoardColor={getBoardColor}
        />
        <Keyboard
          isWin={isWin}
          updateBoard={updateBoard}
          onEnter={onEnter}
          onBackspace={onBackspace}
          currentLine={currentLine}
          showKeyboardStat={showKeyboardStat}
          targetWord={targetWord}
          board={board}
          highContrast={highContrast}
        />
        <Tutorial
          showTutorial={showTutorial}
          setShowTutorial={setShowTutorial}
          highContrast={highContrast}
        />
        <Settings
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          theme={theme}
          setTheme={setTheme}
          hardMode={hardMode}
          setHardMode={setHardMode}
          currentLine={currentLine}
          highContrast={highContrast}
          setHighContrast={setHighContrast}
        />
      </div>
      <WinBox
        board={board}
        getBoardColor={getBoardColor}
        isWin={isWin}
        newGame={newGame}
        highContrast={highContrast}
      />
      <div className={`p-4 px-8 bg-neutral-200 dark:bg-neutral-700 font-medium rounded-md shadow-md text-neutral-600 dark:text-neutral-100 absolute z-10 top-6 left-1/2 -translate-x-1/2 flex items-center transition-transform duration-500 gap-2 ${isWrong ? 'translate-y-0' : '-translate-y-[150%]'}`}>
        <Icon icon="ph:warning" className="w-6 h-6 text-orange-400" />
        Not in word list
      </div>
      <div className={`p-4 px-8 bg-neutral-2
      00 dark:bg-neutral-700 font-medium rounded-md shadow-md text-neutral-600 dark:text-neutral-100 absolute z-10 top-6 left-1/2 -translate-x-1/2 flex items-center transition-transform duration-500 gap-2 ${isHardWrong ? 'translate-y-0' : '-translate-y-[150%]'}`}
      >
        <Icon icon="ph:warning" className="w-6 h-6 text-orange-400" />
        {errorMessage}
      </div>
    </main>
  );
}

export default App;
