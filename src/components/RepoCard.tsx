import React, { useState } from 'react'
import { IRepo } from '../models/models'
import { useActiions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'

const RepoCard = ({ repo }: { repo: IRepo }) => {

    const { addFavorite, removeFavorite } = useActiions()
    
    const { favorites } = useAppSelector(state => state.github)
    const [isFav, setIsfav] = useState(favorites.includes(repo.html_url))

    const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        addFavorite(repo.html_url)
        setIsfav(true)
       
    }
        const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
           removeFavorite(repo.html_url)
              setIsfav(false)
       
   }
  return (
      <div className='border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all'>
          <a href={repo.html_url} target='_blank'>
                <h2 className='text-lg font-bold'>{repo.full_name}</h2>
          <p className='text-sm'>
              Forks: <span className='font-bold mr-2'>{repo.forks}</span>
              Watchers: <span className='font-bold'>{repo.watchers}</span>
          </p>
          <p className="text-sm font-thin">{ repo?.description}</p>
          </a>
        
          {!isFav && <button className="py-2 px-4 mr-2 bg-yellow-400 rounded hover:shadow-md transition-all" onClick={addToFavorite}>add</button>} 
          {isFav &&   <button className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all" onClick={removeFromFavorite}>remove</button>}
      
      
    </div>
  )
}

export default RepoCard
