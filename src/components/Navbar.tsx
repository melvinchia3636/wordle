/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
import { Icon } from '@iconify/react';
import React from 'react';
import Logo from './logo';

function Navbar({
  theme, setTheme, setShowTutorial, setShowSettings,
}: {
  theme: string;
  setTheme: (theme: string) => void;
  setShowTutorial: (showTutorial: boolean) => void;
  setShowSettings: (showSettings: boolean) => void;
}) {
  return (
    <nav className="flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-6">
        <button type="button" onClick={() => setShowTutorial(true)}>
          <Icon
            icon="uil:question-circle"
            className="w-[1.45rem] h-[1.45rem] text-neutral-500"
          />
        </button>
        <button type="button">
          <Icon
            icon="uil:graph-bar"
            className="w-5 h-5 text-neutral-500"
          />
        </button>
        <button type="button" onClick={() => setShowSettings(true)}>
          <Icon
            icon="uil:setting"
            className="w-[1.4rem] h-[1.4rem] text-neutral-500"
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
  );
}

export default Navbar;
