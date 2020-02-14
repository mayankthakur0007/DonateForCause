import { PolymerElement , html} from '@polymer/polymer/polymer-element.js';
import 'highcharts-chart/highcharts-chart.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';

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
        #dialog{
            display:inline-block;
            width:1100px;
            height:500px;
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
          color: white;
      }
      
      #tab1 tr:nth-child(even)
      {
          background-color: white;
      }
      
      #tab1 tr:nth-child(odd)
      {
          background-color: rgb(204, 63, 87);
      }
      h2{
        text-align: center;
      }
      #tableDiv{
          margin:12px;
      }
      </style>
      
<div id="serverErr">
<p>Server error</p>
</div>
<app-location route={{route}}></app-location>

<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" content-type="application/json" on-error="_handleError"></iron-ajax>
    

<highcharts-chart id="myChart" colorByPoint='true' type = 'pie' data = {{data}} title="Chart For All The Donations Schemes" export = "true" on-click="_handleClick"></highcharts-chart>
      
      <paper-dialog id="dialog" entry-animation="scale-up-animation"
      exit-animation="fade-out-animation" >
         <iron-icon icon="clear" id="clearbtn" on-click="_handleClose"></iron-icon>
         <div id="tableDiv">
         <table id="tab1">
           <h2>Lists of Donors</h2>
         <tr>

             <th>Scheme Name</th>
             <th>Donor Name</th>

             <th>Date</th>
             <th>Email ID</th>
             <th>Payment Mode</th>
             
         </tr>
        <template is="dom-repeat" items={{DonorDetail}}>
         <tr>

          <td>{{item.schemeName}}</td>
          <td>{{item.userName}}</td>

          <td>{{item.date}}</td>
          <td>{{item.email}}</td>
          <td>{{item.paymentMode}}</td>
        </tr>

        <template>
    
     
     </table>
</div>
      </paper-dialog>




    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'admin-page'
      },
      action:{
        type:String,
        value:'scheme'
      },
      data: {
        type: Array,
        value: []
      },
      DonorDetail:{
        type:Array,
        value:[]
      }
    };


  }
  ready(){
      super.ready();
      if(sessionStorage.getItem('login')==null){
        this.set('route.path','./donation-option')
      }
  }
  // as soon as page load make ajax call method will run
  connectedCallback(){
    super.connectedCallback();
    this._makeAjax('http://10.117.189.37:9090/akshayapathra/schemes/analysis','get',null)
  }
  // reading properties values from event
  _handleClick(event) {
    let { name, y, schemeId} = event.point.options;
    console.log(name, y, schemeId)
    this.$.dialog.open();
    
    this._makeAjax(`http://10.117.189.37:9090/akshayapathra/schemes/${schemeId}`,'get',null);
    this.action = 'DonorDetail'
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
  switch(this.action){
    case 'scheme':
      this.data=event.detail.response;
      console.log(this.data)
      break;
    case 'DonorDetail':
      this.DonorDetail = event.detail.response;
      console.log(this.DonorDetail);

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

window.customElements.define('admin-page', AdminPage);
