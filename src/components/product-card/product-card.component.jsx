import { useContext } from 'react';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { CartContext } from '../../contexts/cart.context';
import { Footer, Name, Price, ProductCartContainer } from './product-card.styles';

const ProductCard = ({product}) => {
    const {name, price,imageUrl} =product;
    const {addItemToCart} = useContext(CartContext);
    const addProductToCard = ()=> addItemToCart(product);

    return(
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button onClick={addProductToCard} buttonType={BUTTON_TYPE_CLASSES.inverted}  >Add to card</Button>
        </ProductCartContainer>
    )
}

export default ProductCard; 