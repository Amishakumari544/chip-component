import React, { useState, useRef, ChangeEvent } from 'react'
import name from '../name.json'

type chip = {
  name: string
  avatar: string
  email: string
}

const ChipComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState<chip[]>(name)
  const [chips, setChips] = useState<chip[]>([])
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const inputRef = useRef(null)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setIsClicked(true)
  }

  const handleItemClick = (item: any) => {
    console.log('hello')

    setChips([...chips, item])
    setItems(
      items.filter(i => i.name.toLowerCase() !== item.name.toLowerCase())
    )
    setInputValue('')
    setIsClicked(false)
  }

  const handleChipRemove = (removedChip: chip) => {
    setChips(chips.filter((chip, i) => chip.name !== removedChip.name))
    setItems([...items, removedChip])
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e
    const trimmedInput: any = inputValue.trim()

    if (key === ',' && trimmedInput.length && !chips.includes(trimmedInput)) {
      e.preventDefault()
      const foundItem = items.find(
        item => item.name.toLowerCase() === trimmedInput.toLowerCase()
      )
      if (foundItem) {
        const newChip = {
          name: trimmedInput,
          avatar: foundItem.avatar,
          email: foundItem.email
        }
        setChips(prevState => [...prevState, newChip])
        setInputValue('')
      }
    }

    if (key === 'Backspace' && !inputValue.length && chips.length) {
      e.preventDefault()
      const lastChip = chips[chips.length - 1]
      setChips(chips.slice(0, -1))
      setItems(prevState => [...prevState, lastChip])
      setInputValue(lastChip.name)
    }
  }

  const handleKeyUp = () => {
    setIsClicked(true)
  }

  const handleInputFocus = () => {
    if (inputRef.current && inputValue === '') {
      setIsClicked(true)
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node
    if (
      inputRef.current &&
      !(inputRef.current as HTMLElement).contains(target)
    ) {
      setIsClicked(false)
    }
  }

  // Attach a click event listener to the document to handle clicks outside the input
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
    <div className="mt-12 font-bold">
      <h3 className="text-blue-600 text-xl font-semibold">Pick Users</h3>
      <h4>Made by @amisha</h4>
      </div>
      <div className='relative m-auto mt-48 flex flex-wrap border-b-2 border-blue-500  bg-slate-100 min-h-14 lg:max-w-[1100px] w-full'>
        {chips.map((person, index) => (
          <div
            key={index}
            className={`flex gap-2 items-center justify-between p-1 m-2 bg-gray-400 rounded-full text-gray-900 border-2  
          `}
          >
            <div className='flex items-center'>
              <img
                className='w-8 h-8 rounded-full'
                src={person.avatar}
                alt='avatar'
              />
              <span className='ml-2 font-semibold '>{person.name}</span>
            </div>
            <button onClick={() => handleChipRemove(person)} className='px-0.5'>
              X
            </button>
          </div>
        ))}

        <div className='relative'>
          <div className='absolute'>
            <input
              className='p-2 m-2 bg-gray-200 bg-transparent focus:outline-none'
              type='text'
              value={inputValue}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onKeyUp={handleKeyUp}
              ref={inputRef}
              placeholder='Add new user...'
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setInputValue(e.target.value)
                setIsClicked(true)
              }}
            />

            {isClicked && (
              <div className='scrollable-list overflow-x-hidden flex flex-col overflow-y-auto h-48'>
                {filteredItems.length === 0 && inputValue !== '' ? (
                  <span className='flex items-center  mt-2 text-gray-950 bg-gray-200 p-2 cursor-pointer hover:bg-gray-300'>
                    No data found
                  </span>
                ) : (
                  filteredItems.length > 0 &&
                  filteredItems.map((person, index) => (
                    <div
                      key={index}
                      className='flex items-center justify-between p-2 bg-gray-200 cursor-pointer hover:bg-gray-300'
                      onClick={() => handleItemClick(person)}
                    >
                      <div className='flex items-center text-gray-500 rounded-full hover:bg-gray-300'>
                        <img
                          className='w-8 h-8 rounded-full'
                          src={person.avatar}
                          alt='avatar'
                        />
                        <span className='ml-2 font-semibold'>
                          {person.name}
                        </span>
                        <span className='ml-2 text-xs text-gray-400'>
                          {person.email}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ChipComponent
