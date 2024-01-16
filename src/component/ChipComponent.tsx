import React, { useState,useRef } from 'react';
  import name from '../name.json';

  type chip = {
    name: string;
    avatar: string;
  }

  const ChipComponent: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState<chip[]>(name);
    const [chips, setChips] = useState<chip[]>([]);
    const [showItems, setShowItems] = useState(false);
    const inputRef = useRef(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      setShowItems(true);
    };

    const handleItemClick = (item:any) => {
      console.log("hello");
      
      setChips([...chips, item]);
      setItems(items.filter((i) => i.name.toLowerCase() !== item.name.toLowerCase()));
      setInputValue('');
      setShowItems(false);
    };

    const handleChipRemove = (removedChip: chip) => {
      setChips(chips.filter((chip,i) => chip.name !== removedChip.name));
      setItems([...items, removedChip]);
    };

    const filteredItems = items.filter(
      (item) => item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;
      const trimmedInput:any = inputValue.trim();

      if (key === ',' && trimmedInput.length && !chips.includes(trimmedInput)) {
        e.preventDefault();
        const newChip = { name: trimmedInput, avatar: "https://xsgames.co/randomusers/avatar.php?g=female" };
        setChips((prevState) => [...prevState, newChip]);
        setInputValue('');
    
        setInputValue('');
      }

      if (key === 'Backspace' && !inputValue.length && chips.length) {
        e.preventDefault();
        const lastChip = chips[chips.length - 1];
        setChips(chips.slice(0, -1));
        setItems((prevState) => [...prevState, lastChip]);
        setInputValue(lastChip.name);
      }
    };

    const handleKeyUp = () => {
      setShowItems(true);
    };

    const handleInputFocus = () => {
      if (inputRef.current && inputValue === '') {
        setShowItems(true);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (inputRef.current && !((inputRef.current as HTMLElement).contains(target))) {
        setShowItems(false);
      }
    };
  
    // Attach a click event listener to the document to handle clicks outside the input
    React.useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

    return (
      <div className='lg:bg-gray-50  m-auto px-4 lg:h-[300px] lg:w-[700px] w-[390px]'>
        <h3 className='mt-12 text-blue-600 text-xl font-mono'>Pick Users</h3>
        <div className='' >
          <div className='container mt-12 flex-wrap flex p-2 w-[300px]' id='chips-container'>
          
            <div className='flex flex-wrap gap-2'>
            {chips.map((chip) => (
              <div className="">
              <button
                key={chip.name}
                className={`chip bg-gray-400 text-gray-900 min-w-32 max-w-72  m-auto rounded-3xl p-1 justify-around flex items-center`}
                onClick={() => handleChipRemove(chip)}
              >
                <img src='https://xsgames.co/randomusers/avatar.php?g=female' className='rounded-full ml-[-10px] w-[28px] mr-2' alt={`${chip.name} avatar`} />
                {chip.name} <span className='mr-1'>X</span>
              </button>
              </div>
            ))}
            </div>
            <input
              type='text'
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onKeyUp={handleKeyUp}
              ref={inputRef}
              placeholder='Add new user...'
              className='outline-none border lg:w-[400px] m-auto p-2 mt-2 bg-gray-50'
            />
          </div>

          {showItems && (
            <ul className='scrollable-list overflow-y-scroll overflow-x-hidden h-32 flex pt-2 m-auto  shadow-md lg:w-[300px] justify-center flex-col bg-white border-2 border-gray-200 w-[200px]'>
              {filteredItems.length === 0 && inputValue !== '' ? (
                <li className='p-2 m-1 ml-2'>No data found</li>
              ) : (
                filteredItems.length > 0 &&
                filteredItems.map((item) => (
                  <li
                  key={item.name}
                  className={`p-2 m-1 cursor-pointer hover:bg-slate-50  w-full pt-2 flex items-center text-center`}
                  onClick={() => handleItemClick(item)}
                >
                  <img src={item.avatar} alt={`${item.name} avatar`} className="rounded-full ml-[-10px] w-[28px] mr-2" />
                  {item.name}
                </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    );
  };

  export default ChipComponent;