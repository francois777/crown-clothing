import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

// useSelector is a hook that allows us to interact
// from a component with the Redux store
import { selectCurrentUser } from '../../store/user/user.selector'
import { selectIsCartOpen } from '../../store/cart/cart.selector'

import {signOutUser} from '../../utils/firebase/firebase.utils'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import './navigation.styles'

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo />
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>

          {currentUser ? (
              <NavLink as='span' onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        { isCartOpen && <CartDropdown /> }
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation
