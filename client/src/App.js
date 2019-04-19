import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import express from './express.svg';
import css from './css.svg';
import node from './node.svg';
import mysql from './mysql.svg';
import html from './html.svg';
import bootstrapsvg from './bootstrapsvg.svg';
import './App.css';
import Customers from './components/customers';
import UserRoleForm from './components/addrole';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
				<h1 >React Express Node MySQL Integration</h1>
					 <img className="App-logo" src={mysql} alt="mysql" />
					<img className="App-logo" src={bootstrapsvg} alt="mysql" />
					<img  className="App-logo" src={html} alt="mysql" />
					
					<img className="App-logo" src={logo} alt="logo" />
					<img className="App-logo" src={node} alt="node" />
					<img className="App-logo" src={css} alt="mysql" />
          	

					{/* <img style={{width:"2000px"}}  src={express}  alt="node" /> */}
				</header>

				<Router>
					<Switch>
						<Route exact path="/customers" component={Customers} />
						<Route exact path="/customers/add" component={UserRoleForm} />
						<Route exact path="/customers/edit/id=:id" component={UserRoleForm} />

				
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
