import { createContext, useEffect, useReducer } from 'react'

import { onAuthStateChangedListener,
         createUserDocument
} from '../utils/firebase/firebase.utils'

import { createAction } from '../utils/reducer/reducer.utils'

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
})

const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const INITIAL_STATE = {
  currentUser: null
}

const userReducer = (state, action) => {
    const { type, payload } = action

    console.log('[userReducer], type: ', type,
                ' payload: ', payload);

    switch(type) {
      case USER_ACTION_TYPES.SET_CURRENT_USER:
        return { ...state, currentUser: payload }
      default:
        throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)

  const setCurrentUser = (user) =>
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))

// When the application initialises, it will mount the UserProvider,
// which will instantiate this first callback. It will call the listener,
// then whenever the auth state changes it will log the user.
//
// The listener must return an unsubscribe to cleanup!!
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) { createUserDocument(user) }
        setCurrentUser(user)
      })
    return unsubscribe
  }, [])

  console.log('[UserProvider], currentUser: ', currentUser);

  const value = { currentUser }

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}
