import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/gold-cc-input/gold-cc-input.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/gold-cc-cvc-input/gold-cc-cvc-input.js';
import '@polymer/gold-cc-expiration-input/gold-cc-expiration-input.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item.js';
import '../../node_modules/dom-to-image/src/dom-to-image.js';
import '../../node_modules/jspdf';
/**
* @customElement
* @polymer
*/
class PaymentOption extends PolymerElement {
    static get template() {
        return html`
<style>
    :host {
        display: block;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    #clear{
        float:right;
      }

    #form {
        border: 1px solid rgb(0, 0, 0);
        border-radius: 20px;
        margin-top: 60px;
        background-color: white;
        width: 40%;
        min-width: 310px;
        align-content: center;
        padding: 1%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #card {
        display: none;
    }

    h3 {
        text-align: center;

    }

    paper-button {
        text-align: center;
        background-color: black;
        color: white;
        position: relative;
        left: 39%;
    }
</style>
<app-location route={{route}}></app-location>
<iron-form id="form">
    <form>
        <h3> Enter Your Details For Payment </h3>
        <paper-input label="Name" id="phone" type="text" value={{name}} name="name" required error-message="Enter Name">
        </paper-input>
        <paper-input label="PAN Number" id="pan" pattern="[a-zA-Z0-9]+" type="text" value={{pan}} name="pan"
            maxlength="10" required error-message="Enter PAN Number"></paper-input>
        <paper-input label="Email" id="email" type="email" value={{email}} name="email" required
            error-message="Enter Email"></paper-input>
        <paper-input label="Phone Number" id="phone" allowed-pattern=[0-9] type="text" value={{phone}} name="phone"
            maxlength="10" required error-message="enter phone number"></paper-input>
        <paper-dropdown-menu label="Payment Options" id="payment" on-value-changed="cardSelected">
            <paper-listbox slot="dropdown-content" class="dropdown-content"  >
                <paper-item>PHONEPE</paper-item>
                <paper-item>PAYTM</paper-item>
                <paper-item>Debit Card</paper-item>
            </paper-listbox>
        </paper-dropdown-menu><br>
        <div id="card">
            <gold-cc-input auto-validate label="Card number" error-message="Enter valid visa or mastercard!"
                card-types='["visa", "mastercard"]' required>
            </gold-cc-input>
            <gold-cc-cvc-input card-type="[[cardType]]"></gold-cc-cvc-input>
            <gold-cc-expiration-input label="Expiry"></gold-cc-expiration-input>
        </div>
        <paper-button raised id="login" on-click="_handlePayment">Pay</paper-button>
    </form>
</iron-form>
      <paper-dialog id="dialog" entry-animation="scale-up-animation"  exit-animation="fade-out-animation" >
      <iron-icon id="clear" on-click="_handleClose" icon="clear"></iron-icon>
      <div id="PDF">
      <h3>Payment success, Review your details</h3>
        <p>Name : {{item.name}}</p>
        <p>PAN : {{item.panNumber}}</p>
        <p>Mobile : {{item.mobile}}</p>
        <p>Email : {{item.email}}</p>
        <p>Payment Mode  : {{item.paymentMode}}</p>
        <p>Date : {{item.date}}</p>
        <p>Scheme Name : {{item.schemeName}}</p>
        <p>Description : {{item.description}}</p>
        <p>Amount : {{item.amount}}</p>
        <p>Tax Benefit : {{item.taxBenefitAmount}}</p>
        <p> Benefit Description : {{item.taxBenefitDescription}}</p>
        </div>
<paper-button>Download PDF</paper-button>
        </paper-dialog>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
content-type="application/json" on-error="_handleError"></iron-ajax>
`;
    }
    static get properties() {
        return {
            schemeId: {
                type: Number
            },
            action: {
                type: String,
                value: 'list'
            },
            download: {
                type: Object,
                value: []
            }
        };
    }
    _handleClose() {
        this.set('route.path', './donation-option')
      }
    _handlePayment() {
        let name = this.name;
        let pan = this.pan;
        let email = this.email;
        let phone = this.phone;
        let payment = this.$.payment.value;
        let obj = {
            schemeId: parseInt(this.schemeId),
            name: name,
            panNumber: pan,
            mobile: parseInt(phone),
            email: email,
            paymentMode: payment
        }

        console.log(obj)
        this._makeAjax(`${baseUrl1}/akshayapathra/userschemes`, 'post', obj);
    }

    
    
    connectedCallback() {
        super.connectedCallback();
        console.log(this.schemeId)
    }
    cardSelected() {
        console.log(this.$.payment.value)
        if (this.$.payment.value == "Debit Card") {
            this.shadowRoot.querySelector('#card').style.display = 'block'
        } else {
            this.shadowRoot.querySelector('#card').style.display = 'none'

        }
    }
    _handleResponse(event) {
        switch (this.action) {
            case 'list':
                this.item = event.detail.response;
                this.$.dialog.open();
                break;
                // this.obj = URL.createObjectURL(this.download.taxObject);
        }
    }
    // calling main ajax call method
    _makeAjax(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }
}
window.customElements.define('payment-option', PaymentOption);