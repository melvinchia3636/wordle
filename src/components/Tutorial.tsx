/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';

function Tutorial({ showTutorial, setShowTutorial, highContrast }: {
  showTutorial: boolean;
  setShowTutorial: (showTutorial: boolean) => void;
  highContrast: boolean;
}) {
  const [changeColor, setChangeColor] = useState(false);

  useEffect(() => {
    if (showTutorial) {
      setTimeout(() => {
        setChangeColor(true);
      }, 500);
    } else {
      setChangeColor(false);
    }
  }, [showTutorial]);

  return (
    <div className={`w-full h-screen absolute top-0 left-0 overflow-y-auto flex flex-col items-center py-16 bg-zinc-100 dark:bg-neutral-800 tutorial ${showTutorial ? 'opacity-100 translate-y-0 z-0 in' : 'opacity-0 translate-y-[30%] z-[-1] out'}`}>
      <div className="flex flex-col items-center w-full px-8 510:w-3/4">
        <button type="button" onClick={() => setShowTutorial(false)}>
          <Icon icon="uil:multiply" className="stroke-neutral-500 stroke-2 absolute top-0 right-0 m-6" />
        </button>
        <h2 className="text-3xl font-medium mb-6">How to play</h2>
        <p className="text-lg leading-loose">
          Guess the
          {' '}
          <span className="font-semibold">WORDLE</span>
          {' '}
          in six tries.
          <br />
          Each guess must be a valid five-letter word. Hit the enter button to submit.
          <br />
          After each guess, the color of the tiles will change to show how close your guess was to the word.
        </p>
        <span className="w-full border-b border-neutral-500 my-4" />
        <h3 className="font-medium text-2xl">Examples</h3>
        {([
          ['WEARY', 0, highContrast ? 'bg-sky-400' : 'bg-lime-500',
            <>
              The letter
              {' '}
              <span className="font-semibold">W</span>
              {' '}
              is in the word and in the correct spot.
            </>],
          ['PILLS', 1, highContrast ? 'bg-orange-400' : 'bg-yellow-500',
            <>
              The letter
              {' '}
              <span className="font-semibold">I</span>
              {' '}
              is in the word but in the wrong spot.
            </>],
          ['VAGUE', 3, 'bg-neutral-300 dark:bg-neutral-500',
            <>
              The letter
              {' '}
              <span className="font-semibold">U</span>
              {' '}
              is not in the word in any spot.
            </>],
        ] as [string, number, string, JSX.Element][]).map(([word, index, color, desc], idx) => (
          <>
            <div className="flex gap-2 items-center justify-center mt-6">
              {Array.from(word).map((e, i) => (
                <div
                  className={`w-16 h-16 flex items-center justify-center text-2xl font-semibold rounded-md border-2 border-neutral-300 dark:border-neutral-600 duration-500 delay-[${idx * 0.5}s] ${i === index && changeColor ? `${color} transition-all` : 'bg-zinc-100 dark:bg-neutral-800'}`}
                >
                  {e}
                </div>
              ))}
            </div>
            <p className="text-lg leading-loose mt-2">
              {desc}
            </p>
          </>
        ))}
        <span className="w-full border-b border-neutral-500 my-4" />
        <p className="text-lg leading-loose font-semibold">
          You can play WORDLE as many time as you want!
        </p>
      </div>
    </div>
  );
}

export default Tutorial;
