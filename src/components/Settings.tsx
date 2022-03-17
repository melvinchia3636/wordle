/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';

function Settings({ showSettings, setShowSettings }: {
  showSettings: boolean;
  setShowSettings: (showTutorial: boolean) => void;
}) {
  const [changeColor, setChangeColor] = useState(false);

  useEffect(() => {
    if (showSettings) {
      setTimeout(() => {
        setChangeColor(true);
      }, 500);
    } else {
      setChangeColor(false);
    }
  }, [showSettings]);

  return (
    <div className={`w-full h-screen absolute top-0 left-0 flex flex-col items-center py-12 bg-zinc-100 dark:bg-neutral-800 px-24 tutorial ${showSettings ? 'opacity-100 translate-y-0 z-0 in' : 'opacity-0 translate-y-[30%] z-[-1] out'}`}>
      <button type="button" onClick={() => setShowSettings(false)}>
        <Icon icon="uil:multiply" className="stroke-neutral-500 stroke-2 absolute top-0 right-0 m-6" />
      </button>
      <h2 className="text-3xl font-medium mb-6">Settings</h2>
      <p className="text-sm leading-loose absolute bottom-4 left-1/2 -translate-x-1/2">
        Made with ❤️ by
        {' '}
        <a target="_blank" rel="noreferrer" className="underline underline-offset-2 text-lime-500" href="https://thecodeblog.net">Melvin Chia</a>
        .
        Project under MIT License.
      </p>
    </div>
  );
}

export default Settings;
