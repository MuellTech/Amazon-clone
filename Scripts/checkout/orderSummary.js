import { cart,deleteFromCart,updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { moneyReflect } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions ,getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummery.js";

export function renderOrderSummery(){
  let checkoutHTML = "";
  cart.forEach((cItem) => {

    const matchingProduct = getProduct(cItem);

    const image = matchingProduct.image;
    const pname = matchingProduct.name;
    const price = matchingProduct.priceCents;
    const pquantity = cItem.quantity;

    const deliveryOption1 = getDeliveryOption(cItem);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption1.deliveryDays,'day');
    const deliveryDateString = deliveryDate.format('dddd, MMMM D');

    const html = `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${deliveryDateString}
      </div>

      <div class="cart-item-details-grid">
          <img class="product-image"
          src="${image}">

          <div class="cart-item-details">
          <div class="product-name">
            ${pname}
          </div>
          <div class="product-price">
            $${moneyReflect(price)}
          </div>
          <div class="product-quantity">
              <span>
              Quantity: <span class="quantity-label">${pquantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
              Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${
                matchingProduct.id
              }">
              Delete
              </span>
          </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHtml(matchingProduct,cItem)}
          </div>
      </div>
      </div>`;
    checkoutHTML += html;
  });
  document.querySelector(".js-order-summary").innerHTML = checkoutHTML;

  // handling delte buttion

  document.querySelectorAll(".js-delete-quantity-link").forEach((del) => {
    del.addEventListener('click', () => {
      const productId = del.dataset.productId;
      deleteFromCart(productId);
      const deletedItem =document.querySelector(`.js-cart-item-container-${productId}`);
      deletedItem.remove();
      renderPaymentSummary();
    });
  });

  // generating delivery options by a function using deliveryoptions array
  function deliveryOptionsHtml(matchingProduct,cItem){
    let html='';
    deliveryOptions.forEach((deliveryOption) =>{
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'day');
      const dateString =deliveryDate.format('dddd, MMMM D');

      const priceString =(deliveryOption.priceCents ===0)
      ?'Free'
      :`$${moneyReflect(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cItem.deliveryOptionId;

      html += `<div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked?'checked':''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>`;
      
    });
    return html;
  }

  // changing delivery date on selecting radio button
  document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId,deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummery();
        renderPaymentSummary();
      });
    });

}
