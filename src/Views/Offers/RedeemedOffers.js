import React from 'react';
import { connect } from 'react-redux';
import Table from './RedeemedOffers';
import Layout from "./../Login/Layout";
import { offerActions } from './../../Actions';

class RedeemedOffers extends React.Component{
    
    constructor(props){
        super(props)
    }

    componentDidMount() {
        const UserId = localStorage.getItem('id')
        if(UserId != undefined && UserId != 0)
        {
            const UserValue = {
                user_id:UserId,
            }

            const { dispatch } = this.props;
            dispatch(offerActions.getOfferRedeemed(UserValue))
        }
    }

    tabRow(){  
        return this.props.offer.offersDetails.map(function(object, i){  
            return <Table obj={object} key={i} />;  
        });  
    }
    
    render(){
        return (
            <div>
                <Layout />
                <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main fix_hg_vh">
                    <div className="full_width main_top_inner">
                        <div className="col-md-12 res_padd_0">
                            <div className="panel">
                                <div className="panel-body">
                                    <div className="row mrg20B">
                                        <div className="col-md-6">
                                            <h3 className="title-hero pull-left">
                                                Redeemed Offers
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="row mrg20B">
                                        <div className="col-md-12">
                                            <div className="col-cool bx pull-right res_fullx">
                                            <input type="search" name="search" className="form-control textFilter" placeholder="Search Using Offer Title"></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="example_datatable">
                                        <table id="redeemed_offers_datatable" className="table table-striped table-bordered dt-responsive nowrap" cellSpacing="0" width="100%">
                                            <thead>
                                                <tr>
                                                    <th className="no-sort">Details</th>
                                                    <th className="no-sort">Type</th>
                                                    <th className="no-sort">User</th>
                                                    <th className="no-sort">Redeemed On</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { this.tabRow() }
                                            </tbody>
                                        </table>
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

const mapStateToProps = (state) => {
    return {
        offer: state.offer
    }
}

export default connect(mapStateToProps)(RedeemedOffers);
