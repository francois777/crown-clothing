import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { CheckoutContainer, HeaderContainer, HeaderBlockContainer } from './checkout.styles'

const Checkout = () => {
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)

  return (
    <CheckoutContainer>
      <HeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </HeaderContainer>
      { cartItems.map((item) => (
          <CheckoutItem key={item.id} cartItem={item} />
        ))
      }
      <span className="total">Total: ${cartTotal}</span>
    </CheckoutContainer>
  )
}

export default Checkout
