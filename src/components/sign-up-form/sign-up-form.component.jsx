import { useState } from 'react'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import { createAuthUserWithEmailAndPassword,
         createUserDocument
} from '../../utils/firebase/firebase.utils'

// Take note that the properties of UserContext are null values
// But see the effect when it is used inside SignUpForm below

import './sign-up-form.scss'


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formFields

  //console.log("[SignUpForm]: inside the SignUpForm")

  // No values are changed through the next statement, but the
  // statement causes the component to be re-rendered.
  // The next statement effectively hooks into UserContext
  //const ctxVal = useContext(UserContext)
  // Because the SignUpForm is hooked into the UserContext, we
  // see that this line executes again when the use signs in
  // Consider that Signing in does not concern itself with Signup.
  // However, the SignUpForm does NOT re-render! - because
  // nothing changed on the DOM.
  // It means that this component is only listening for changes.

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match")
      return;
    }
    // user is a response property
    try {
      const {user} = await createAuthUserWithEmailAndPassword(
        email, password
      )
      await createUserDocument(user, { displayName })
      setFormFields(defaultFormFields)
    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use')
      } else {
        console.log("user sign-up encountered an error", error)
      }
    }
  }

  console.log("[SignUpForm], about to render")

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
           label='Display Name'
           type='text'
           required
           onChange={handleChange}
           name='displayName'
           value={displayName}
         />

         <FormInput
           label='Email'
           type='email'
           required
           onChange={handleChange}
           name='email'
           value={email}
         />

         <FormInput
           label='Password'
           type='password'
           required
           onChange={handleChange}
           name='password'
           value={password}
         />

         <FormInput
           label='Confirm Password'
           type='password'
           required
           onChange={handleChange}
           name='confirmPassword'
           value={confirmPassword}
         />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
