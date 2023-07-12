import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from '../store'


// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector