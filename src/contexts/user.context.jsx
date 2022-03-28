import { createContext, useState, useEffect } from 'react'

import { onAuthStateChangedListener,
         createUserDocument
} from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser }

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

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}
