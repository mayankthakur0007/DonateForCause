import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import 'highcharts-chart/highcharts-chart.js';
import 'highcharts-chart/highcharts-behavior.js';
import 'highcharts-chart/highcharts-map.js';
import 'highcharts-chart/highcharts-stock.js';
import 'highcharts-chart/shared-styles.js';

import '@polymer/iron-ajax/iron-ajax.js';


import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';

/**
 * @customElement
 * @polymer
 */
class AdminPage extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #clearbtn{
          float:right;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>

      <!--<highcharts-chart type="spline" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index"></highcharts-chart>-->
      <highcharts-chart type = 'pie' data = {{data}} title="list of scheme" export = "true" on-click="_handleClick"></highcharts-chart>
      <iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
      content-type="application/json" on-error="_handleError"></iron-ajax>

      <paper-dialog id="dialog">
      <iron-icon icon="clear" id="clearbtn" on-click="_handleClose"></iron-icon>
  <h2>Dialog Title</h2>

  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</paper-dialog>


    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'admin-page'
      },
      data: {
        type: Array,
        value: []
      }
    };


  }
  // reading properties values from event
  _handleClick(event) {
    let { name, y, schemeId} = event.point.options;
    console.log(name, y, schemeId)
    this.$.dialog.open();

  }
  //closing paper dialog
  _handleClose(){
    this.$.dialog.close();
  }

  _handleError() {
    this.$.wrongCredentials.open();
}

connectedCallback(){
  super.connectedCallback()
  this._makeAjax('http://localhost:3000/schemes','get',null)
}

// getting response from server and storing user name and id in session storage
_handleResponse(event) {
  this.data=event.detail.response;
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

window.customElements.define('admin-page', AdminPage);
