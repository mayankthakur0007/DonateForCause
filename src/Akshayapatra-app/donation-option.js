import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-dialog/paper-dialog.js';
/**
 * @customElement
 * @polymer
 */
class DonationOption extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
         .colored {
            border: 2px solid;
            border-color: #000000;
            background-color: #f1f8e9;
            color: #000000;
          }
          paper-card {
            height: 500px;
            width: 500px;
        
            --paper-card-header-image: {
              height: 300px;
              object-fit: cover;
            }
        
            ;
          }
          #clear{
            float:right;
          }
          #actions{
            height:800px;
            width:1200px;
          }
      </style>
hello
      <template is="dom-repeat" items={{donations}}>
      <paper-card heading="" id="donations" image={{item.imageUrl}} alt="Go Nature">
        <h2>Dr. {{item.doctorName}}<span>Ratings:{{item.rating}} <iron-icon icon="star"></iron-icon></span></h2>
        <h4>Fees: Rs{{item.consultationFee}}</h4>
        <h4> Specialization: {{item.specialization}}</h4>
        <div class="card-actions">
          <paper-button raised on-click="_handleModel">Check Slot</paper-button>
        </div>
      </paper-card >
    </template>
    <paper-dialog id="actions" class="colored">
    <iron-icon id="clear" on-click="_handleClose" icon="clear"></iron-icon>
    dfa
    </paper-dialog>
    <iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" content-type="application/json"
  on-error="_handleError"></iron-ajax>
    `;
  }
  static get properties() {
    return {
      donations: {
        type: Array,
        value: []
      }, action: {
        type: String,
        value: 'List'
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this._makeAjax(`${baseUrl1}/housepital/locations`, 'get', null);
  }

  _handleBook() {
 
  }
  // handling error if encounter error from backend server
  _handleError() {


  }

  _handleClose() {
    this.$.actions.close();
  }

  connectedCallback() {
    super.connectedCallback();
    this._makeAjax(`${baseUrl1}/housepital/locations`, 'get', null);
  }
  _handleModel(event) {
    let id = event.model.item.doctorId;
    this._makeAjax(`${baseUrl1}/housepital/doctors/${id}/availabilities`, 'get', null);
    this.action = 'Slots'
  }
  // getting response from server and storing user name and id in session storage
  _handleResponse(event) {
    switch (this.action) {
  
      case 'List':
        this.locations = event.detail.response;
        this._makeAjax(`${baseUrl1}/housepital/locations/1/doctors?name=${this.name1}`, 'get', null);
        this.action = 'Data1'
        break;
    
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

window.customElements.define('donation-option', DonationOption);
