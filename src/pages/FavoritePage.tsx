import React from 'react'
import { useAppSelector } from '../hooks/redux'

const FavoritePage = () => {
  const { favorites } = useAppSelector(state => state.github)
    if (favorites.length === 0) return <p className='text-center'>No items</p> 
  return (

    <div className='flex justify-center pt-10 mx-auto h-screen w-screen '>
      <div className='list-none'>
        {favorites.map(f => (
          <li className='mb-2' key={f}>
            <a href={f} target="_blank" rel="noreferrer">{ f}</a>
       </li>
     ))}
      </div>
  </div>
    
  
  )
}

export default FavoritePage
