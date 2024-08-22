import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { moneyReflect } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
// let itemPrice;


export function renderPaymentSummary(){
    // models of mvc(data)
    let productPriceCents =0;
    let shipping=0;
    cart.forEach((cartItem) => {

        // how to find the product using product Id
        const product = getProduct(cartItem);
        productPriceCents += product.priceCents*cartItem.quantity;

        // how to get the delivery option by the deliveryOptionId
        const deliveryOption = getDeliveryOption(cartItem);
        shipping += deliveryOption.priceCents;
    });
    
    const totalBeforeTax = shipping+productPriceCents;
    const estimatedTax = totalBeforeTax*(0.1);
    const totalCents = totalBeforeTax+estimatedTax;
    const cartSize = cart.length;
    // will work on view of mvc(display html)
    const paymentSummaryHtml =`
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartSize}):</div>
            <div class="payment-summary-money">
                $${moneyReflect(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                $${moneyReflect(shipping)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${moneyReflect(totalBeforeTax)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${moneyReflect(estimatedTax)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                $${moneyReflect(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}