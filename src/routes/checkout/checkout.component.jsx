import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import { CheckoutContainer, HeaderContainer, HeaderBlockContainer } from './checkout.styles'

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext)

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
