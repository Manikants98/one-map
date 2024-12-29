import { Button } from '@mui/material'
import Categories from 'Components/Categories'
import Map from 'Components/Map'
import React from 'react'
import { GridIcon } from 'Resources/SVG'

const Home: React.FC = () => {
  return (
    <div className="relative flex flex-col">
      <Categories />
      <Map />
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 gap-3 lg:gap-4 flex justify-center items-center z-[999] w-full px-4 sm:w-auto">
        <Button
          color="info"
          size="large"
          className="!border !p-2 !bg-white !border-black !border-solid !min-w-min"
        >
          <GridIcon className="!text-white" />
        </Button>
        <Button
          disableElevation
          size="large"
          variant="contained"
          className="!w-full lg:!mt-0.5 !p-2 sm:!w-80 !capitalize !bg-[#034885]"
        >
          View Featured Attraction
        </Button>
      </div>
    </div>
  )
}

export default Home
