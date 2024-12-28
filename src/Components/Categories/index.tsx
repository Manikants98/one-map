import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Category, featuredCategoriesFn } from 'Services/Categories'
import { Chip, Skeleton } from '@mui/material'
import { baseURL } from 'Configs'

const Categories: React.FC = () => {
  const [selected, setSelected] = useState<Category>({} as Category)

  const { data, isLoading } = useQuery({
    queryKey: ['featuredCategories'],
    queryFn: featuredCategoriesFn,
  })

  const categories = data?.data

  return (
    <div className="flex p-1.5 dark:bg-black dark:bg-opacity-90 gap-2 overflow-x-auto">
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="!rounded-full !h-8 !w-96 !scale-100" />
          ))
        : categories?.map((i) => (
            <Chip
              key={i.id}
              icon={<img alt="" src={baseURL + i.filename} className="h-5 mx-3" />}
              variant={selected?.id === i.id ? 'filled' : 'outlined'}
              label={i.category_name}
              onClick={() => setSelected(i)}
              className="!min-w-max"
            />
          ))}
    </div>
  )
}

export default Categories
