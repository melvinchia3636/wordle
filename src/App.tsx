/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import logo from './logo.svg';

const wordList = ['Abuse', 'Adult', 'Agent', 'Anger', 'Apple', 'Award', 'Basis', 'Beach', 'Birth', 'Block', 'Blood', 'Board', 'Brain', 'Bread', 'Break', 'Brown', 'Buyer', 'Cause', 'Chain', 'Chair', 'Chest', 'Chief', 'Child', 'China', 'Claim', 'Class', 'Clock', 'Coach', 'Coast', 'Court', 'Cover', 'Cream', 'Crime', 'Cross', 'Crowd', 'Crown', 'Cycle', 'Dance', 'Death', 'Depth', 'Doubt', 'Draft', 'Drama', 'Dream', 'Dress', 'Drink', 'Drive', 'Earth', 'Enemy', 'Entry', 'Error', 'Event', 'Faith', 'Fault', 'Field', 'Fight', 'Final', 'Floor', 'Focus', 'Force', 'Frame', 'Frank', 'Front', 'Fruit', 'Glass', 'Grant', 'Grass', 'Green', 'Group', 'Guide', 'Heart', 'Henry', 'Horse', 'Hotel', 'House', 'Image', 'Index', 'Input', 'Issue', 'Japan', 'Jones', 'Judge', 'Knife', 'Laura', 'Layer', 'Level', 'Lewis', 'Light', 'Limit', 'Lunch', 'Major', 'March', 'Match', 'Metal', 'Model', 'Money', 'Month', 'Motor', 'Mouth', 'Music', 'Night', 'Noise', 'North', 'Novel', 'Nurse', 'Offer', 'Order', 'Other', 'Owner', 'Panel', 'Paper', 'Party', 'Peace', 'Peter', 'Phase', 'Phone', 'Piece', 'Pilot', 'Pitch', 'Place', 'Plane', 'Plant', 'Plate', 'Point', 'Pound', 'Power', 'Press', 'Price', 'Pride', 'Prize', 'Proof', 'Queen', 'Radio', 'Range', 'Ratio', 'Reply', 'Right', 'River', 'Round', 'Route', 'Rugby', 'Scale', 'Scene', 'Scope', 'Score', 'Sense', 'Shape', 'Share', 'Sheep', 'Sheet', 'Shift', 'Shirt', 'Shock', 'Sight', 'Simon', 'Skill', 'Sleep', 'Smile', 'Smith', 'Smoke', 'Sound', 'South', 'Space', 'Speed', 'Spite', 'Sport', 'Squad', 'Staff', 'Stage', 'Start', 'State', 'Steam', 'Steel', 'Stock', 'Stone', 'Store', 'Study', 'Stuff', 'Style', 'Sugar', 'Table', 'Taste', 'Terry', 'Theme', 'Thing', 'Title', 'Total', 'Touch', 'Tower', 'Track', 'Trade', 'Train', 'Trend', 'Trial', 'Trust', 'Truth', 'Uncle', 'Union', 'Unity', 'Value', 'Video', 'Visit', 'Voice', 'Waste', 'Watch', 'Water', 'While', 'White', 'Whole', 'Woman', 'World', 'Youth', 'Alcon', 'Aught', 'Hella', 'One’s', 'Ought', 'Thame', 'There', 'Thine', 'Thine', 'Where', 'Which', 'Whose', 'Whoso', 'Yours', 'Yours', 'Admit', 'Adopt', 'Agree', 'Allow', 'Alter', 'Apply', 'Argue', 'Arise', 'Avoid', 'Begin', 'Blame', 'Break', 'Bring', 'Build', 'Burst', 'Carry', 'Catch', 'Cause', 'Check', 'Claim', 'Clean', 'Clear', 'Climb', 'Close', 'Count', 'Cover', 'Cross', 'Dance', 'Doubt', 'Drink', 'Drive', 'Enjoy', 'Enter', 'Exist', 'Fight', 'Focus', 'Force', 'Guess', 'Imply', 'Issue', 'Judge', 'Laugh', 'Learn', 'Leave', 'Let’s', 'Limit', 'Marry', 'Match', 'Occur', 'Offer', 'Order', 'Phone', 'Place', 'Point', 'Press', 'Prove', 'Raise', 'Reach', 'Refer', 'Relax', 'Serve', 'Shall', 'Share', 'Shift', 'Shoot', 'Sleep', 'Solve', 'Sound', 'Speak', 'Spend', 'Split', 'Stand', 'Start', 'State', 'Stick', 'Study', 'Teach', 'Thank', 'Think', 'Throw', 'Touch', 'Train', 'Treat', 'Trust', 'Visit', 'Voice', 'Waste', 'Watch', 'Worry', 'Would', 'Write', 'Above', 'Acute', 'Alive', 'Alone', 'Angry', 'Aware', 'Awful', 'Basic', 'Black', 'Blind', 'Brave', 'Brief', 'Broad', 'Brown', 'Cheap', 'Chief', 'Civil', 'Clean', 'Clear', 'Close', 'Crazy', 'Daily', 'Dirty', 'Early', 'Empty', 'Equal', 'Exact', 'Extra', 'Faint', 'False', 'Fifth', 'Final', 'First', 'Fresh', 'Front', 'Funny', 'Giant', 'Grand', 'Great', 'Green', 'Gross', 'Happy', 'Harsh', 'Heavy', 'Human', 'Ideal', 'Inner', 'Joint', 'Large', 'Legal', 'Level', 'Light', 'Local', 'Loose', 'Lucky', 'Magic', 'Major', 'Minor', 'Moral', 'Naked', 'Nasty', 'Naval', 'Other', 'Outer', 'Plain', 'Prime', 'Prior', 'Proud', 'Quick', 'Quiet', 'Rapid', 'Ready', 'Right', 'Roman', 'Rough', 'Round', 'Royal', 'Rural', 'Sharp', 'Sheer', 'Short', 'Silly', 'Sixth', 'Small', 'Smart', 'Solid', 'Sorry', 'Spare', 'Steep', 'Still', 'Super', 'Sweet', 'Thick', 'Third', 'Tight', 'Total', 'Tough', 'Upper', 'Upset', 'Urban', 'Usual', 'Vague', 'Valid', 'Vital', 'White', 'Whole', 'Wrong', 'Young', 'Afore', 'After', 'Bothe', 'Other', 'Since', 'Slash', 'Until', 'Where', 'While', 'Aback', 'Abaft', 'Aboon', 'About', 'Above', 'Accel', 'Adown', 'Afoot', 'Afore', 'Afoul', 'After', 'Again', 'Agape', 'Agogo', 'Agone', 'Ahead', 'Ahull', 'Alife', 'Alike', 'Aline', 'Aloft', 'Alone', 'Along', 'Aloof', 'Aloud', 'Amiss', 'Amply', 'Amuck', 'Apace', 'Apart', 'Aptly', 'Arear', 'Aside', 'Askew', 'Awful', 'Badly', 'Bally', 'Below', 'Canny', 'Cheap', 'Clean', 'Clear', 'Coyly', 'Daily', 'Dimly', 'Dirty', 'Ditto', 'Drily', 'Dryly', 'Dully', 'Early', 'Extra', 'False', 'Fatly', 'Feyly', 'First', 'Fitly', 'Forte', 'Forth', 'Fresh', 'Fully', 'Funny', 'Gaily', 'Gayly', 'Godly', 'Great', 'Haply', 'Heavy', 'Hella', 'Hence', 'Hotly', 'Icily', 'Infra', 'Intl.', 'Jildi', 'Jolly', 'Laxly', 'Lento', 'Light', 'Lowly', 'Madly', 'Maybe', 'Never', 'Newly', 'Nobly', 'Oddly', 'Often', 'Other', 'Ought', 'Party', 'Piano', 'Plain', 'Plonk', 'Plumb', 'Prior', 'Queer', 'Quick', 'Quite', 'Ramen', 'Rapid', 'Redly', 'Right', 'Rough', 'Round', 'Sadly', 'Secus', 'Selly', 'Sharp', 'Sheer', 'Shily', 'Short', 'Shyly', 'Silly', 'Since', 'Sleek', 'Slyly', 'Small', 'So-So', 'Sound', 'Spang', 'Srsly', 'Stark', 'Still', 'Stone', 'Stour', 'Super', 'Tally', 'Tanto', 'There', 'Thick', 'Tight', 'Today', 'Tomoz', 'Truly', 'Twice', 'Under', 'Utter', 'Verry', 'Wanly', 'Wetly', 'Where', 'Wrong', 'Wryly', 'Abaft', 'Aboon', 'About', 'Above', 'Adown', 'Afore', 'After', 'Along', 'Aloof', 'Among', 'Below', 'Circa', 'Cross', 'Furth', 'Minus', 'Neath', 'Round', 'Since', 'Spite', 'Under', 'Until', 'Aargh', 'Adieu', 'Adios', 'Alack', 'Aloha', 'Avast', 'Bakaw', 'Basta', 'Begad', 'Bless', 'Blige', 'Brava', 'Bravo', 'Bring', 'Chook', 'Damme', 'Dildo', 'Ditto', 'Frick', 'Fudge', 'Golly', 'Gratz', 'Hallo', 'Hasta', 'Havoc', 'Hella', 'Hello', 'Howay', 'Howdy', 'Hullo', 'Huzza', 'Jesus', 'Kapow', 'Loose', 'Lordy', 'Marry', 'Mercy', 'Night', 'Plonk', 'Psych', 'Quite', 'Salve', 'Skoal', 'Sniff', 'Sooey', 'There', 'Thiam', 'Thwap', 'Tough', 'Twirp', 'Viola', 'Vivat', 'Wacko', 'Wahey', 'Whist', 'Wilma', 'Wirra', 'Woops', 'Wowie', 'Yecch', 'Yeeha', 'Yeesh', 'Yowch', 'Zowie'];

function App() {
  const [board, setBoard] = useState(Array(5).fill(0).map(() => Array(5).fill(0).map(() => '')));
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

  useEffect(() => {
    console.log(targetWord);
  }, [targetWord]);

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
    if (currentLine < 5 && currentLetter === 4) {
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
      for (let i = 0; i <= 4; i++) {
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
      return ['', '!bg-neutral-700', '!bg-yellow-500', '!bg-lime-500'][result];
    }
  };

  return (
    <main className="w-full h-screen overflow-hidden bg-lime-500 flex items-center justify-center">
      <div className="w-full h-screen p-6 bg-neutral-800 mx-48 shadow-[0_25px_50px_-12px_rgb(0,0,0,0.6)] flex flex-col">
        <nav className="flex justify-between items-center">
          <img
            className="pl-4 w-44"
            src={logo}
            alt="logo"
          />
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
              className="bg-lime-500 rounded-md p-3"
            >
              <Icon
                icon="uil:moon"
                className="w-5 h-5 text-white"
              />
            </button>
          </div>
        </nav>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2">
            {board.map((y, iY) => (
              <div className="flex gap-2">
                {y.map((x, iX) => (
                  <div className={`w-16 h-16 flex items-center justify-center text-white text-2xl font-semibold rounded-md border-2 border-neutral-500 ${x
                    ? (iY >= currentLine
                      ? 'bg-neutral-500'
                      : (
                        targetWord[iX] === x
                          ? 'bg-lime-500 border-lime-500'
                          : (targetWord.includes(x)
                            ? 'bg-yellow-500 border-yellow-500'
                            : 'bg-neutral-700 border-neutral-700'
                          )
                      )
                    )
                    : ''
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
                    className={`text-white font-semibold w-12 bg-neutral-500 hover:bg-neutral-400 h-16 rounded-md transition-all ${getStats(
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
                  className={`text-white font-semibold w-12 bg-neutral-500 hover:bg-neutral-400 h-16 rounded-md transition-all ${getStats(
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
              className="text-white w-24 flex items-center justify-center bg-neutral-500 h-16 rounded-md hover:bg-neutral-400 transition-all"
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
                  className={`text-white font-semibold w-12 bg-neutral-500 hover:bg-neutral-400 h-16 rounded-md transition-all ${getStats(
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
              className="text-white w-24 flex items-center justify-center bg-neutral-500 h-16 rounded-md hover:bg-neutral-400 transition-all"
            >
              <Icon
                icon="uil:backspace"
                className="w-6 h-6 -ml-1"
              />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
