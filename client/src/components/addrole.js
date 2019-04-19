import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const $ = require('jquery');

class UserRoleForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Redirect: false,
			roleName: '',
			description: '',
			id: props.match.params.id
		};
	}

	submitDataFromRoleform() {
		
	
		var _this = this;
		var roleFormData = {
			roleName: this.state.roleName.trim(),
			description: this.state.description
		};

		$.ajax({
			url: '/user_create',
			type: 'POST',
			data: roleFormData,
			success: function(resultData) {
				_this.setState({ Redirect: true });
			}
        });
      
    }
  


	getRoleDetailsApi() {
		return $.ajax({
			url: '/users' + '/' + `${this.state.id}` ,
			type: 'GET'
		});
	}

	updateRoleDetailsApi(data) {

	    var body =
	    {
	        "roleName": data.roleName.trim(),
	        "description":data.description,
	    }
	    return $.ajax({
	        url: '/role_update' + '/' + `${data.id}` ,
	        type: 'PUT',
	        headers: {
	            "Content-Type": "application/json",
	            "x-requested-with": "XMLHttpRequest"
	        },
	        data: JSON.stringify(body)
	    });
	}


	UpdateRoleDetails(data) {
		var res = this.updateRoleDetailsApi(data);
		res.done((result) => {
			this.setState({
				Redirect: true
			});
			toast.success('Role updated', {
				position: toast.POSITION.TOP_RIGHT
			});
		});
		res.fail((error) => {});
    }
    


	myFunction() {
		window.location.reload();
	}




	componentDidMount() {
		if (this.state.id !== undefined) {
			var res = this.getRoleDetailsApi();
			res.done((response) => {
				this.setState({
					roleName: response[0].roleName,
					description: response[0].description
				});
			});
			res.fail((error) => {});
		} else {
		}
	}

	render() {
		if (this.state.Redirect) {
			return <Redirect to={{ pathname: '/customers', state: {} }} />;
		}
		return (
	
			<div className="container-fluid" style={{ marginRight: '300px', paddingLeft: '600px' }}>
				<div className="clearfix d-flex align-items-center row page-title">
					<h2 className="col">
						{this.state.id !== undefined ? (
							<span style={{ paddingRight: '1200px' }}>Edit Role </span>
						) : (
							<span style={{ paddingRight: '1500px' }}>Add Role </span>
						)}
					</h2>
				</div>
				<form id="userRoleForm">
					<div className="form-group">
						<label style={{ paddingRight: '500px' }} htmlFor="roleName" className="required">
							Name
						</label>
						<div className="">
							<input
								id="roleName"
								type="text"
								className="form-control col-6"
								name="rolename"
								maxLength="50"
								value={this.state.roleName}
								onChange={(event) => {
									$('.hiderole').hide();
									this.setState({
										roleName: event.target.value
									});
								}}
								required
							/>
							{/* <p className="hiderole" style={{ display: 'none', color: 'red' }}>
								{Notification.recordExists}
							</p> */}
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label className="required" htmlFor="target">
									Description
								</label>
								<textarea
									className="form-control"
									rows="4"
									name="description"
									type="text"
									value={this.state.description}
									onChange={(event) => {
										this.setState({
											description: event.target.value
										});
									}}
								/>
							</div>
						</div>
					</div>
					<div style={{ paddingRight: '500px' }}>
						{this.state.id !== undefined ? (
							<button
								className="btn btn-success "
								type="button"
								onClick={() => {
									this.UpdateRoleDetails(this.state);
								}}
							>
								Update
							</button>
						) : (
							<button
								className="btn btn-success "
								type="button"
								onClick={() => {
									this.submitDataFromRoleform(this.state);
								}}
							>
								Save
							</button>
						)}&nbsp;
						<button
							type="button"
							className="btn btn-info"
							onClick={() => {
								this.myFunction();
							}}
						>
							Reset
						</button>&nbsp;
						<Link to="/customers" className="btn btn-danger">
							Cancel
						</Link>
						<br />
					</div>
				</form>
                <ToastContainer/>
			</div>
	
		);
	}
}
export default UserRoleForm;
