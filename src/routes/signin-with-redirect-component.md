    import { useEffect } from 'react'
    import { getRedirectResult } from 'firebase/auth'
    import { auth,
             signInWithGooglePopup,
             createUserDocument
    } from '../../utils/firebase/firebase.utils'


    const SignIn = () => {

      // Note that `auth` is a singleton. It keeps track of the
      // authentication state of the entire application.
      // The next pattern can be useful, but not in this instance
      // The useEffect hook is used to interrogate the status of Firebase
      // to see what previously might have happened in Firebase. This is
      // important if more than one instance of the application is running.

      useEffect(async () => {
      const response = await getRedirectResult(auth)
        if (response) {
           const userDocRef = await createUserDocument(response.user)
        }
      }, [])

      const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocument(user)
      }

      const logGoogleRedirectUser = async () => {
        const {user} = await signInWithGoogleRedirect();
      }

      // Note the second button. Say the user is already signed in, but then clicks
      // the `Sign in with Google Redirect` button. This will open a second page
      // and the whole application is initialised on the new page. This instance of
      // the application has no knowledge that the user has been signed in on the
      // other page. This problem is solved with the use of the `auth` component,
      // which is a singleton.
      return (
        <div>
          <h1>Sign In Page</h1>
          <button type="button" onClick={logGoogleUser}>
            Sign in with Google Popup
          </button>
          <button type="button" onClick={logGoogleRedirectUser}>
            Sign in with Google Redirect
          </button>
        </div>
      )
    }

    export default SignIn
