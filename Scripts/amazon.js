import { addToCart,cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { moneyReflect } from "./utils/money.js";

// html generation

let productCardHTML='';
for(let i=0;i<products.length;i++){
    const img=products[i].image;
    const pname = products[i].name;
    const star = products[i].rating.stars*10;
    const rating = products[i].rating.count;
    const price = products[i].priceCents;
    const productID = products[i].id;
    const html=`
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image" src=${img}>
        </div>
        <div class="product-name limit-text-to-2-lines">
            ${pname}
        </div>
        <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${star}.png">
            <div class="product-rating-count link-primary">
                ${rating}
            </div>
        </div>
        <div class="product-price">
            $${moneyReflect(price)}
        </div>
        <div class="product-quantity-container">
            <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </div>
        <div class="product-spacer"></div>

        <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${productID}">
            Add to Cart
        </button>
    </div>`;
    productCardHTML += html;
}
document.querySelector('.js-products-grid').innerHTML=productCardHTML;

// add to cart handling

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
        addToCart(button);
        // showing cart quantity on cart
        showCartQuantity();
    });
});
// showing cart quantity on cart
function showCartQuantity(){
    let cartQuantity =0;
    cart.forEach((citem)=>{
        cartQuantity += citem.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
}