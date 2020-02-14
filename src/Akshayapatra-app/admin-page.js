import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import 'highcharts-chart/highcharts-chart.js';
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
        #serverErr{
          display:none;
          color:white;
        }
        table, th, td{
          border: 1px solid black;
          border-collapse: collapse;
          }
      th, td{
          text-align: left;
          padding: 15px;
      }
      
      #tab1{
          width: 100%;
          
      }
      
      #tab1 th{
          background-color: lightblue;
          color: white;
      }
      
      #tab1 tr:nth-child(even)
      {
          background-color: lightgreen;
      }
      
      #tab1 tr:nth-child(odd)
      {
          background-color: pink;
      }
      </style>
      
<div id="serverErr">
<p>Server error</p>
</div>
     

      <!--<highcharts-chart type="spline" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index"></highcharts-chart>-->
      <highcharts-chart id="myChart" type = 'pie' data = {{data}} title="list of scheme" export = "true" on-click="_handleClick"></highcharts-chart>
      <iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
      content-type="application/json" on-error="_handleError"></iron-ajax>

      <paper-dialog id="dialog">
         <iron-icon icon="clear" id="clearbtn" on-click="_handleClose"></iron-icon>
         <table id="tab1">
         <tr>
             <th>Scheme Id</th>
             <th>Scheme Name</th>
             <th>Donar Name</th>
             <th>Payment Mode</th>
             <th>Date</th>
             <th>Email ID</th>
             
         </tr>

         <tr></tr>
    
     
     </table>

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
  // as soon as page load make ajax call method will run
  connectedCallback(){
    super.connectedCallback()
    this._makeAjax('http://localhost:3000/schemes','get',null)
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
      // if server is not working it will show error
  _handleError() {
    this.shadowRoot.querySelector('#myChart').style.display='none';
    this.shadowRoot.querySelector('#serverErr').style.display='block';

  
  
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
