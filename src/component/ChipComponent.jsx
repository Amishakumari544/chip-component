import { useState } from 'react';
import name from '../name.json'

const ChipComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState(name);
  const [chips, setChips] = useState([]);
  const [showItems, setShowItems] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowItems(true); 
  };

  const handleItemClick = (item) => {
    setChips([...chips, item]);
    setItems(items.filter((i) => i.name.toLowerCase() !== item.name.toLowerCase()));
    setInputValue('');
    setShowItems(false);
  };

  const handleChipRemove = (removedChip) => {
    setChips(chips.filter((chip) => chip.name !== removedChip.name));
    setItems([...items, removedChip]);
  };

  const filteredItems = items.filter(
    (item) => item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <div className='inline-flex flex-wrap w-[800px] gap-2 mt-12' id='chips-container'>
        {chips.map((chip) => (
          <button
            key={chip.name}
            className={`chip bg-gray-100 text-gray-900 w-34 m-auto rounded-3xl p-2 flex items-center`}
            onClick={() => handleChipRemove(chip)}
          >
            <img src='https://i.pravatar.cc/25?img=3' className='rounded-xl mr-2' alt={`${chip.name} avatar`} />
            {chip.name} <span className='ml-2'>X</span>
          </button>
        ))}
      </div>
      <div className=''>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowItems(true)} 
          placeholder='Type to filter items'
          className='outline-none border w-[300px] p-2 mt-2'
        />
        {showItems && inputValue.trim() !== '' && (
          <ul className='flex m-auto shadow-md items-center justify-center flex-col bg-white border-2 border-gray-200 w-[300px]'>
            {filteredItems.length === 0 && inputValue.trim() !== '' ? (
              <li className='p-2 m-1'>No data found</li>
            ) : (
              filteredItems.length > 0 &&
              filteredItems.map((item) => (
                <li
                  key={item.name}
                  className={` p-2 m-1 cursor-pointer hover:bg-slate-50  w-[300px] text-center`}
                  onClick={() => handleItemClick(item)}
                >
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
