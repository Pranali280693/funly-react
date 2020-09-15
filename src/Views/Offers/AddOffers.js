import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from "./../Login/Layout";
import { Link } from 'react-router-dom';
import { offerActions } from './../../Actions';

class AddOffers extends Component{
    
    constructor(props){
        super(props)        
    }

    handleChange= prop => event => {
        const { dispatch } = this.props;
        dispatch(offerActions.onChangeProps(prop, event));
    }

    handleChangeCheckbox = prop => event =>{        
        if(prop === 'redeem_frequency')
        {
            const { dispatch } = this.props;
            dispatch(offerActions.onCheckboxChangeProps('redeem_frequency', event));
            dispatch(offerActions.onCheckboxChangeProps('selectedRedeemFrequency', event));
        }
        else if(prop === 'offer_type')
        {
            const { dispatch } = this.props;
            dispatch(offerActions.onCheckboxChangeProps('offer_type', event));
            dispatch(offerActions.onCheckboxChangeProps('selectedOfferType', event));
        }
    }

    componentDidMount() {
        const UserId = localStorage.getItem('id')
        let offerId = 0
        if(this.props.location.state != undefined)
        {
            offerId = this.props.location.state.id
        }
        if(offerId != undefined && offerId != 0)
        {
            const UserValue = {
                user_id:UserId,
            }

            const { match : { params } } = this.props;
            const { dispatch } = this.props;
            dispatch(offerActions.getOffer(UserValue, offerId))
        }
        else
        {
            let currentDate = new Date();
            const startDate = currentDate.getDate() + '/' + (currentDate.getMonth()+1) + '/' + currentDate.getFullYear(); 
            const expireDate = currentDate.getDate() + '/' + (currentDate.getMonth()+1) + '/' + (currentDate.getFullYear()+1);
            
            const { dispatch } = this.props;
            dispatch(offerActions.onBindProps('start_date', startDate));
            dispatch(offerActions.onBindProps('expiry_date', expireDate));
        }
    }

    OfferAdd=(e)=>{
        e.preventDefault();

        if(this.props.offer.business_offer_id === null || this.props.offer.business_offer_id ==='')
        {
            const OfferValue = {
                user_id:localStorage.getItem('id'),
                title:this.props.offer.title,
                expiry_date:this.props.offer.expiry_date,
                redeem_frequency:this.props.offer.redeem_frequency,
                type:this.props.offer.offer_type,
                description:this.props.offer.description,
                external_link:null,
                redeem_code:null,
                start_date:this.props.offer.start_date
            };
            
            const { match : { params } } = this.props;
            const { dispatch } = this.props;
            if(OfferValue)
            {
                dispatch(offerActions.setAddOfferPost(OfferValue))
            }
        }
        else
        {
            debugger;
            const OfferValueEdit = {
                business_offer_id: this.props.offer.business_offer_id,
                business_id: this.props.offer.business_id,
                title:this.props.offer.title,
                expiry_date:this.props.offer.expiry_date,
                redeem_frequency:this.props.offer.redeem_frequency,
                type:this.props.offer.offer_type,
                description:this.props.offer.description,
                external_link:this.props.offer.external_link,
                redeem_code:this.props.offer.redeem_code,
                start_date:this.props.offer.start_date,
                status:this.props.offer.status,
            };

            const { match : { params } } = this.props;
            const { dispatch } = this.props;
            if(OfferValueEdit)
            {
                dispatch(offerActions.setEditOfferPost(OfferValueEdit))
            }
        }
    }
    
    render(){
        return (
            <div>
                <Layout />
                <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main fix_hg_vh">
                    <div className="full_width main_top_inner">
                        <div className="col-lg-12 res_padd_0">
                            <div className="panel panel-default">
                                <div className="panel-heading"><b>Add Offer</b></div>
                                <div className="panel-body">
                                    <div className="col-md-12"></div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" name="offerTitle" className="form-control  custm_input_f" id="name" placeholder="Add Offer Title" onChange={this.handleChange('title')} value={this.props.offer.title} autoFocus></input>
                                                <span className="js-error"></span>
                                            </div>

                                            <div className="form-group">
                                                <input type="text" nme="offerStartDate" className="form-control  custm_input_f startdate_picker" id="start_date" placeholder="Offer Start Date" onChange={this.handleChange('start_date')} defaultValue={this.props.offer.start_date} autoFocus readOnly></input>
                                                <span className="js-error"></span>
                                            </div>

                                            <div className="form-group">
                                                <input type="text" name="offerExpiryDate" className="form-control  custm_input_f date_picker" id="expiry_date" placeholder="Offer Expiry" onChange={this.handleChange('expiry_date')} defaultValue={this.props.offer.expiry_date} autoFocus readOnly></input>
                                                <span className="js-error"></span>
                                            </div>

                                            <div className="form-group">
                                                <label className="custom_lblf" >Redeem Frequency</label>
                                                <div className="clearfix"></div>
                                                <div className="cst_radio">
                                                    <input type="radio" id="offer1" name="offerRedeemFrequency" className="redeem_frequency" value="1" onChange={this.handleChangeCheckbox('redeem_frequency')} checked={this.props.offer.selectedRedeemFrequency === '1'}></input>
                                                    <label htmlFor="offer1">Daily</label>
                                                </div>
                                                <div className="cst_radio">
                                                    <input type="radio" id="offer2" name="offerRedeemFrequency" className="redeem_frequency" value="2" onChange={this.handleChangeCheckbox('redeem_frequency')} checked={this.props.offer.selectedRedeemFrequency === '2'}></input>
                                                    <label htmlFor="offer2">Weekly</label>
                                                </div>
                                                <div className="cst_radio">
                                                    <input type="radio" id="offer3" name="offerRedeemFrequency" className="redeem_frequency" value="3" onChange={this.handleChangeCheckbox('redeem_frequency')} checked={this.props.offer.selectedRedeemFrequency === '3'}></input>
                                                    <label htmlFor="offer3">Fortnightly</label>
                                                </div>
                                                <div className="cst_radio">
                                                    <input type="radio" id="offer4" name="offerRedeemFrequency" className="redeem_frequency" value="4" onChange={this.handleChangeCheckbox('redeem_frequency')} checked={this.props.offer.selectedRedeemFrequency === '4'}></input>
                                                    <label htmlFor="offer4">Monthly</label>
                                                </div>
                                                <div className="cst_radio">
                                                    <input type="radio" id="offer5" name="offerRedeemFrequency" className="redeem_frequency" value="5" onChange={this.handleChangeCheckbox('redeem_frequency')} checked={this.props.offer.selectedRedeemFrequency === '5'}></input>
                                                    <label htmlFor="offer5">6 months</label>
                                                </div>                                                
                                            </div>
                                            <div className="form-group">
                                                <label  className="custom_lblf" style={{"paddingTop": "10px"}}>Type of Offer</label>
                                                <div className="clearfix"></div>
                                                <div  className="cst_radio">
                                                    <input type="radio" id="type1" name="offerType" className="offertype" value="1" onChange={this.handleChangeCheckbox('offer_type')} checked={this.props.offer.selectedOfferType === '1'} ></input>
                                                    <label htmlFor="type1">In-Store</label>
                                                </div>
                                                <div  className="cst_radio">
                                                    <input type="radio" id="type2" name="offerType" className="offertype" value="2" onChange={this.handleChangeCheckbox('offer_type')} checked={this.props.offer.selectedOfferType === '2'} ></input>
                                                    <label htmlFor="type2">Online</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <textarea name="offerDescription" className="form-control custm_txtatrea_f"  placeholder="Enter Offer Details(max 255)" maxLength="255" onChange={this.handleChange('description')} value={this.props.offer.description}></textarea>
                                            </div>
                                            <div className="onlineDiv ele_hide">
                                                <div className="form-group">
                                                    <input type="text" name="offerExternalLink" className="form-control  custm_input_f externalLink" id="external_link" placeholder="Enter External Link(Use https://)" onChange={this.handleChange('external_link')} value={this.props.offer.external_link} autoFocus></input>
                                                </div>

                                                <div className="form-group">
                                                    <input type="text" name="offerRedeemCode" className="form-control  custm_input_f redeemCode" id="redeem_code" placeholder="Enter Redeem Code" onChange={this.handleChange('redeem_code')} value={this.props.offer.redeem_code} autoFocus></input>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="maT_30 full_width">
                                        <div className="col-md-12">
                                            <button className="btn btn-primary offerAddEdit custom_btn_f" type="submit" onClick={this.OfferAdd} value="submit">Submit</button>
                                            <Link to={'/ManageOffers'} className="btn btn-default custom_btn_f">Cancel</Link>
                                        </div>
                                    </div>
                                </div>  
                            </div>          
                        </div>
                    </div>
                    <div className="row">
                        <footer>
                            <div className="foot_lft">
                                <p>Copyright © 2019 Funly. All rights reserved.</p>
                            </div>
                            <div className="foot_right">
                                <ul>
                                    <li><a href="https://www.funly.com.au/privacy-policy/" target="_blank">privacy policy</a></li>
                                </ul>
                            </div>
                        </footer> 
                    </div>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        offer: state.offer
    };
}

export default connect(mapStateToProps)(AddOffers);
