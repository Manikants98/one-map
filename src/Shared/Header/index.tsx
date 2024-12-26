import { LocationOnOutlined, Search } from '@mui/icons-material'
import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import { useQuery } from '@tanstack/react-query'
import { Location, searchLocationsFn } from '../../Services/SearchLocation'
import useDebounce from '../../Hooks/useDebounce'
import { useSelectedLocation } from '../../Context/SelectedLocation'
import { Collapse } from '@mui/material'

const Header: React.FC = () => {
  const [search, setSearch] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const { setSelectedLocation } = useSelectedLocation()
  const debouncedSearch = useDebounce(search, 500)

  const { data: searchResults } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () => searchLocationsFn(debouncedSearch),
    enabled: !!debouncedSearch && isTyping,
  })

  const handleResultClick = (result: Location) => {
    setSearch(result.SEARCHVAL)
    setSelectedLocation(result)
    setIsTyping(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setIsTyping(true)
  }

  return (
    <div className="lg:p-4 p-1 bg-[#B71141] flex justify-between items-center">
      <Sidebar />
      <div className="relative">
        <div className="flex lg:bg-white items-center rounded px-2 relative w-80 lg:w-96">
          <LocationOnOutlined className="text-white lg:text-black" />
          <input
            value={search}
            placeholder="Ex. Marina Bay"
            className="outline-none p-2 lg:text-black text-white lg:bg-white lg:placeholder:text-black lg:placeholder:text-opacity-60 placeholder:text-white placeholder:text-opacity-60 bg-transparent rounded w-full"
            onChange={handleInputChange}
          />
          <Search className="text-white lg:text-black" />
        </div>
        <Collapse in={!!(debouncedSearch && !!searchResults?.data?.results.length && isTyping)}>
          <div className="absolute z-[9999] bg-white shadow-lg mt-2.5 right-0 rounded lg:w-96 max-h-64 overflow-y-auto">
            {searchResults?.data.results.map((result, index) => (
              <div
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleResultClick(result)}
              >
                <p className="text-sm">{result.SEARCHVAL}</p>
                <p className="text-sm text-black text-opacity-60">{result.ADDRESS}</p>
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    </div>
  )
}

export default Header
