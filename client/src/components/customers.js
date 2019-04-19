import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './customers.css';
import { ToastContainer, toast } from 'react-toastify';
import bootbox from 'bootbox';
const $ = require('jquery');
$.DataTable = require('datatables.net-bs4');


class Customers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.match.params.id,
		};
    }
    
    DeleteRoleApi(roleId) {
        return $.ajax({
            url: '/users' + '/' + `${roleId}`,
            type: 'DELETE',
            headers: {
                "content-type": "application/json",
                "x-requested-with": "XMLHttpRequest",
            }
        });
    }

   

	// componentDidMount() {
	//   fetch('/users')
	//     .then(res => res.json())
	//     .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
	// }
	componentDidMount() {
		this.$el = $(this.el);
		this.$el.DataTable({
			searching: false,
			info: false,
			autoWidth: false,
			paging: false,
		
			aaSorting: [ [ 0, 'asc' ] ],
			ajax: {
				url: '/users',
				type: 'GET',
				dataSrc: '',
				error: function(xhr, status, error) {}
			},

			columnDefs: [ { width: '40%', targets: 0 }, { width: '40%', targets: 1 }, { width: '20%', targets: 2 } ],

			columns: [
				{
					data: 'roleName',
					targets: 0
				},
				{
					data: 'description',
					orderable: false,
					targets: 1
				},

				{
					data: 'action',
					targets: 2,
					className: 'text-center',
					render: function(data, type, row) {
						return (
							'<a href="/customers/edit/id=' +
							row.roleId +
							'"class="btn mr-2 btn-edit btn-info btn-sm">' +
							'<i class="fas fa-pen-nib" aria-hidden="true"></i>' +
							'<a href="#" id="' +
							row.roleId +
							'"class="btn mr-2 delete btn-danger btn-sm btnDelete">' +
							'<i class="fas fa-ban" aria-hidden="true"></i>' +
							'</a>'
						);
					},
					orderable: false
				}
            ],
            initComplete: (settings, json) => {
            },
            drawCallback: (settings) => {
                $(".btnDelete").on("click", e => {
                    this.DeleteRoleApi(e.currentTarget.id);
                    // setTimeout(1000,()=>{
                
                    // })
                    window.location.reload();
                    toast.success("Role Deleted", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                });
            }
		});
	}

	render() {
		return (
			<div style={{ paddingLeft: '300px', paddingTop: '50px',backgroundColor:'lightblue' }}>
				<div className="col text-right">
					<Link to={{ pathname: '/customers/add', state: {} }} style={{ marginRight: '230px',marginBottom:'30px'}}  className="btn btn-primary">
						<i className="fa fa-plus"  aria-hidden="true" /> 
					</Link>
				</div>

				<table
					className="table table-striped table-bordered table-hover customDataTable "
					style={{ width: '80%', textAlign: 'center' }}
					id="roleDataList"
					ref={(el) => (this.el = el)}
				>
					<thead>
						<tr style={{ backgroundColor:'black' }}>
							<th><font color="white">Role/Name</font></th>
							<th><font color="white">Description</font></th>
							<th><font color="white">Action</font></th>
						</tr>
					</thead>
					<tbody />
				</table>
                <ToastContainer/>
			</div>
		);
	}
}

export default Customers;
