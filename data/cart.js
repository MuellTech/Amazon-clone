// loading cart from local storage when we open the page
export let cart =JSON.parse(localStorage.getItem('cart'));
// if cart doesn't exist will give a default value
if (!cart){
    cart = [{
        id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId:'1'
    },{
        id:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:'2'
    }];
}
// function created to upade the cart after every update in cart
function updateCart(){
    localStorage.setItem('cart',JSON.stringify(cart));
}
// add to cart array
export function addToCart(button){
    let item;
    cart.forEach((c)=>{
        if(c.id ==button.dataset.productId){
            item=c;
        }
    });
    if(item){
        item.quantity +=1;
    }
    else{
        cart.push({
            id:button.dataset.productId,
            quantity:1,
            deliveryOptionId:'1'
        });
    }
    updateCart();
}
 
export function deleteFromCart(productId){
    const newCart=[];
    cart.forEach((c) => {
      if (c.id !== productId) {
        newCart.push(c);
      }
    });
    cart=newCart;
    updateCart();
}

export function updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if(productId === cartItem.id){
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    updateCart();
}