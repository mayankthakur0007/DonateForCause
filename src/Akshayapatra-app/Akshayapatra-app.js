/**
* this is the main routing page of this application.
*/
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/polymer/lib/elements/dom-if.js'
import '@polymer/iron-icons/places-icons.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);
// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);
/**
* main class that provides the core API for Polymer and main
* features including template,routing and property change observation.
*/
class Akshayapatra extends PolymerElement {
  static get template() {
    return html`
      <style>
      :host {
        --app-primary-color: rgb(36, 36, 255);
        --app-secondary-color: black;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        display: block;
      }
    
      app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
      }
    
      app-header {
        color: #fff;
        background-color: var(--app-primary-color);
      }

      h3 {
        font-family: Comic Sans, Comic Sans MS, cursive;
      }
    
      .drawer-list {
        margin: 0 20px;
    
      }
    
      .drawer-list a {
        display: block;
        padding: 0 16px;
        text-decoration: none;
        color: var(--app-secondary-color);
        line-height: 40px;
      }
    
      .drawer-list a.iron-selected {
        color: black;
        font-weight: bold;
      }
  #guestTag1{
    display:none;
  }

      a{
        text-decoration:none;
        color:white;
      }
      </style>
      <app-location route="{{route}}">
      </app-location>
      
      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>
      
      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        
        <!-- Main content -->
        <app-header-layout has-scrolling-region="">
          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <div main-title="">
                <h3><iron-icon icon="places:spa"></iron-icon>Akshayapatra
                </h3>        
              </div>
              <template is="dom-if" if={{!login}}>
              <a name="donation-option" href="[[rootPath]]donation-option"  on-click="_handleGuest" id="guestTag1">Make Donation</a>
           <a name="login-page" href="[[rootPath]]login-page" id="adminTag" on-click="_handleAdmin">Login For Admin</a>
              </template>
              <template is="dom-if" if={{login}}>
             <a name="login-page" href="[[rootPath]]login-page" on-click="_handleLogout">Logout</a>
              </template>
            </app-toolbar>
          </app-header>
          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <login-page name="login-page"></login-page>
            <admin-page name="admin-page"></admin-page>
            <donation-option name="donation-option"></donation-option>
            <payment-option name="payment-option" scheme-id="{{schemeId}}"></payment-option>
            </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }
  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      schemeId: {
        type: Number,
        value: 0,
        observer: '_idChanged'
      },
      login: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
        observer: '_loginChanged'
      },
      routeData: Object,
      subroute: Object,
    };
  }
  // observing the page change
  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }
  _idChanged(){
    this.addEventListener('scheme-id', (event) => {
      this.schemeId = event.detail.id;
    })
  }
  _loginChanged() {
    this.addEventListener('refresh-login', (event) => {
      this.login = event.detail.login;
    })
  }
  // _handleClear() {
  //   sessionStorage.clear();
  // }
  _handleAdmin() {
    this.shadowRoot.querySelector('#guestTag1').style.display = 'block'
    this.shadowRoot.querySelector('#adminTag').style.display = 'none'
  }
  _handleLogout() {
    sessionStorage.clear();
    this.login = false;
  }
  _handleGuest() {
    this.shadowRoot.querySelector('#guestTag1').style.display = 'none'
    this.shadowRoot.querySelector('#adminTag').style.display = 'block'
  }
  /**
  * Show the corresponding page according to the route.
  * If no page was found in the route data, page will be an empty string.
  * Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
  */
  _routePageChanged(page) {
    //this.page = page || 'patient-page';

    if (!page) {
      this.page = 'donation-option';
    } else if (['donation-option', 'payment-option', 'login-page', 'admin-page'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'donation-option';
    }

  }

  /**
  * Import the page component on demand.
  * Note: `polymer build` doesn't like string concatenation in the import
  * statement, so break it up.
  */
  _pageChanged(page) {

    switch (page) {
      case 'donation-option':
        import('./donation-option.js');
        break;
      case 'payment-option':
        import('./payment-option.js');
        break;
      case 'login-page':
        import('./login-page.js');
        break;
      case 'admin-page':
        import('./admin-page.js');
        break;


    }
  }
}

window.customElements.define('akshayapatra-app', Akshayapatra);
