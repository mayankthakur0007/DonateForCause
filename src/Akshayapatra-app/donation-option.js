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
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';
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
              border-radius:10px;
              padding:5px;
              margin:20px;
            height: 300px;
            width: 400px;
        
            --paper-card-header-image: {
              height: 300px;
              object-fit: cover;
            }
        
            ;
          }
          #flex{
              display:flex;
              flex-direction:row;
          }
          #clear{
            float:right;
          }
          #actions{
           display:inline-block;
          }
      </style>
      <div id="flex">
</div>
      <template is="dom-repeat" items={{donations}}>
     <paper-card heading="" id="donations" image={{item.imageUrl}} alt="Go Nature">
        <h2>{{item.schemeName}}</h2>
          <paper-button raised on-click="_handleModel">See Details</paper-button>
      </paper-card >
    </template>
    </div>
    </div>



    <paper-dialog id="actions" class="colored" entry-animation="scale-up-animation"
    exit-animation="fade-out-animation">
    <iron-icon id="clear" on-click="_handleClose" icon="clear"></iron-icon>
    {{data.schemeName}}
    {{data.description}}
    {{data.amount}}
    {{data.taxBenefitAmount}}
    {{data.taxBenefitDescription}}
    <paper-button raised on-click="_handleModel">Make Payment</paper-button>
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
      } ,data: {
        type: Object,
        value: {}
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this._makeAjax(`${baseUrl1}/akshayapathra/schemes`, 'get', null);
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
    this._makeAjax(`${baseUrl1}/akshayapathra/schemes`, 'get', null);
  }
  _handleModel(event) {
    var id = event.model.item.schemeId;
  
    for(let i= 0;i<this.donations.length;i++){
        if(this.donations[i].schemeId==id){
            // this.data=this.donations[i]
         this.data = this.donations[i];
        }
    }
    this.$.actions.open();
  }
  // getting response from server and storing user name and id in session storage
  _handleResponse(event) {
    switch (this.action) {
      case 'List':
        this.donations = event.detail.response;

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
