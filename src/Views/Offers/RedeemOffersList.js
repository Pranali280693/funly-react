import React, { Component } from 'react';  

class RedeemOffersList extends Component {  
    constructor(props) {  
        super(props);  
    }
        
    render() {  
        return (  
            <tr>
                <td>
                    {this.props.obj.details}
                </td>  
                <td>  
                    {this.props.obj.type}  
                </td>  
                <td>  
                    {this.props.obj.name}  
                </td>  
                <td>  
                    {this.props.obj.redeemed_on}  
                </td>
            </tr>  
        );  
    }  
}  
export default RedeemOffersList;