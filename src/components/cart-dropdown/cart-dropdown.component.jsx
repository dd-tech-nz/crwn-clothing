import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router-dom'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { CartDropDown, CartItemsContainer, EmptyMessage, DropdownButton} from './cart-dropdown.styles'

// import './cart-dropdown.styles.scss'




const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropDown>
    <CartItemsContainer>
      {
        cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
            <EmptyMessage>Your cart is empty</EmptyMessage>
          )}
    </CartItemsContainer>
    <DropdownButton onClick={() => {
      history.push('/checkout')
      dispatch(toggleCartHidden())
    }}>
      GO TO CHECKOUT
    </DropdownButton>
    </CartDropDown>
  
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown))