import React from 'react'
import Map from 'Components/Map'
import Categories from 'Components/Categories'
import { Button } from '@mui/material'

const Home: React.FC = () => {
  return (
    <div className="relative flex flex-col">
      <Categories />
      <Map />
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 gap-3 lg:gap-4 flex justify-center items-center z-[999] w-full px-4 sm:w-auto">
        <Button className="!p-0 !min-w-10 !lg:min-w-[42px]">
          <img
            src="https://officialguidemap.com:5173/src/assets/icons/grid.png"
            alt=""
            className="p-2 bg-white !border !border-black !border-opacity-50 rounded size-10 lg:size-[42px]"
          />
        </Button>

        <Button
          disableElevation
          size="large"
          variant="contained"
          className="!w-full sm:!w-80 !capitalize !bg-[#034885] !text-sm sm:!text-base mt-2 sm:mt-0"
        >
          Featured Attraction
        </Button>
      </div>
    </div>
  )
}

export default Home
