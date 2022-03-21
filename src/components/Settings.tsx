/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import { Icon } from '@iconify/react';
import React, { useState } from 'react';

function Settings({
  showSettings, setShowSettings, theme, setTheme, hardMode, setHardMode, currentLine, highContrast, setHighContrast,
}: {
  showSettings: boolean;
  setShowSettings: (showTutorial: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
  hardMode: boolean;
  setHardMode: (hardMode: boolean) => void;
  currentLine: number;
  highContrast: boolean;
  setHighContrast: (highContrast: boolean) => void;
}) {
  const [warning, setWarning] = useState(false);

  return (
    <div className={`w-full h-screen absolute top-0 left-0 flex flex-col items-center py-12 bg-zinc-100 dark:bg-neutral-800 tutorial ${showSettings ? 'opacity-100 translate-y-0 z-0 in' : 'opacity-0 translate-y-[30%] z-[-1] out'}`}>
      <div className="flex flex-col items-center w-3/4">
        <button type="button" onClick={() => setShowSettings(false)}>
          <Icon icon="uil:multiply" className="stroke-neutral-500 stroke-2 absolute top-0 right-0 m-6" />
        </button>
        <h2 className="text-3xl font-medium mb-6">Settings</h2>
        <div className="flex flex-col items-center justify-between w-full divide-y divide-neutral-300 dark:divide-neutral-600">
          <div className="flex py-4 px-2 items-center justify-between w-full">
            <div>
              <h3 className="text-xl font-medium">Hard Mode</h3>
              <p className="text-sm text-neutral-500 font-medium">Any revealed hints must be used in subsequent guesses</p>
            </div>
            <div>
              <div className="form-check form-switch">
                <input
                  checked={hardMode}
                  onClick={() => {
                    if (currentLine < 1) {
                      setHardMode(!hardMode);
                    } else {
                      setWarning(true);
                      setTimeout(() => {
                        setWarning(false);
                      }, 3000);
                    }
                  }}
                  className={`form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-neutral-300 dark:bg-neutral-700 focus:outline-none ${highContrast ? 'checked:!bg-sky-400' : 'checked:!bg-lime-500'} cursor-pointer shadow-sm`}
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
          </div>
          <div className="flex py-4 px-2 items-center justify-between w-full">
            <h3 className="text-xl font-medium">Dark Theme</h3>
            <div>
              <div className="form-check form-switch">
                <input checked={theme === 'dark'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-neutral-300 dark:bg-neutral-700 focus:outline-none ${highContrast ? 'checked:!bg-sky-400' : 'checked:!bg-lime-500'} cursor-pointer shadow-sm`} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              </div>
            </div>
          </div>
          <div className="flex py-4 px-2 items-center justify-between w-full">
            <div>
              <h3 className="text-xl font-medium">High Contrast Mode</h3>
              <p className="text-sm text-neutral-500 font-medium">For improved color vision</p>
            </div>
            <div>
              <div className="form-check form-switch">
                <input checked={highContrast} onClick={() => setHighContrast(!highContrast)} className={`form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-neutral-300 dark:bg-neutral-700 focus:outline-none ${highContrast ? 'checked:!bg-sky-400' : 'checked:!bg-lime-500'} cursor-pointer shadow-sm`} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
              </div>
            </div>
          </div>
          <div className="flex py-4 px-2 items-center justify-between w-full">
            <h3 className="text-xl font-medium">Feedback</h3>
            <a href="mailto:melvinchia@thecodeblog.net" className={`font-medium underline underline-offset-1 ${highContrast ? 'text-sky-400' : 'text-lime-500'}`}>Email</a>
          </div>
          <div className="flex py-4 px-2 items-center justify-between w-full">
            <h3 className="text-xl font-medium">Source Code</h3>
            <a target="_blank" rel="noreferrer" href="https://github.com/melvinchia3636/wordle" className={`font-medium underline underline-offset-1 ${highContrast ? 'text-sky-400' : 'text-lime-500'}`}>Github</a>
          </div>
        </div>
        <p className="text-sm leading-loose text-center w-full px-8 absolute bottom-4 left-1/2 -translate-x-1/2">
          Made with ❤️ by
          {' '}
          <a target="_blank" rel="noreferrer" className={`underline underline-offset-2 ${highContrast ? 'text-sky-400' : 'text-lime-500'}`} href="https://thecodeblog.net">Melvin Chia</a>
          .
          Project under MIT License.
        </p>
        <div className={`p-4 px-8 bg-neutral-200 dark:bg-neutral-700 font-medium rounded-md shadow-md text-neutral-600 dark:text-neutral-100 absolute z-10 top-6 left-1/2 -translate-x-1/2 w-[calc(100vw-3rem)] flex items-center transition-transform duration-500 gap-2 ${warning ? 'translate-y-0' : '-translate-y-[150%]'}`}>
          <Icon icon="ph:warning" className="w-6 h-6 flex-shrink-0 text-orange-400" />
          Hard mode can only be enabled at the start of a round
        </div>
      </div>
    </div>
  );
}

export default Settings;
