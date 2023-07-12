import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch  } from 'react-redux'
import { githubActions } from '../store/github/github.slice'


const actions = {
    ...githubActions,
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useActiions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}
