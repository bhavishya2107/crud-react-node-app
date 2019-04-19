import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import '../../node_modules/bootbox/src/bootbox';
import '../../node_modules/react-toastify/dist/ReactToastify.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import bootbox from 'bootbox';


window.bootbox = bootbox;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
