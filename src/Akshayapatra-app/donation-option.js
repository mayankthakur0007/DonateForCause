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
          #actions{
            height:800px;
            width:1200px;
          }
      </style>

      <template is="dom-repeat" items={{doctors}}>
      <paper-card heading="" id="doctors" image={{item.imageUrl}} alt="Go Nature">
        <h2>Dr. {{item.doctorName}}<span>Ratings:{{item.rating}} <iron-icon icon="star"></iron-icon></span></h2>
        <h4>Fees: Rs{{item.consultationFee}}</h4>
        <h4> Specialization: {{item.specialization}}</h4>
        <div class="card-actions">
          <paper-button raised on-click="_handleModel">Check Slot</paper-button>
        </div>
      </paper-card >
    </template>
    <paper-dialog id="actions" class="colored">

    </paper-dialog>
    `;
  }
  static get properties() {
    return {
     
    };
  }
}

window.customElements.define('donation-option', DonationOption);
