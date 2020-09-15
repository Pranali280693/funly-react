import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class ManageOffersList extends Component {     
    render() {  
        return (  
            <tr>
                <td>
                    <div className="offr_title">
                        <h5>{this.props.obj.title}</h5>
                        <p>{this.props.obj.description}</p>
                    </div>
                </td>  
                <td>  
                    {this.props.obj.type == 1 ? "In-Store" : "Online"}  
                </td> 
                <td> 
                    <div className="offr_title">
                        {this.props.obj.status == 0 ? <p className="ptxt_fnly bold_cmn">Pending Admin Approval</p> : <p className="ptxt_fnly bold_cmn avtive">Active</p>}
                        <p className="ptxt_fnly">{this.props.obj.activation_date == null ? this.props.obj.start_date : this.props.obj.activation_date} - {this.props.obj.expiry_date}</p>
                    </div> 
                </td>  
                <td>
                    <Link to={{pathname:"/AddOffers/", state: { id: this.props.obj.id} }} className="offerAddEdit btn btn-info btn-xs"><i className="glyphicon glyphicon-pencil"></i></Link>
                </td> 
            </tr>  
        );  
    }  
}  
export default connect()(ManageOffersList);