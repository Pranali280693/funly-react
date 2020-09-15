import React, {Component} from 'react';
import { connect } from 'react-redux';
import Layout from "./../Login/Layout";
import facebookImage from '../../Components/images/fbimg.png';
import instagramImage from '../../Components/images/instagrm.png';
import websiteImage from '../../Components/images/website.png';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { businessActions } from './../../Actions';

class BusinessDetail extends Component{
    
    constructor(props){
        super(props)
    }

    componentDidMount() {
        const UserId = localStorage.getItem('id')
        
        if(UserId != undefined && UserId != 0)
        {
            const BusinessValue = {
                user_id:UserId,
            }

            const { dispatch } = this.props;
            dispatch(businessActions.getBusinessDetails(BusinessValue))
        }
    }
    
    render(){
        return (
            <div>
                <Layout />
                <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main fix_hg_vh">
                    <div className="full_width main_top_inner">
                        <div className="col-md-12 res_padd_none320">
                            <div className="panel">
                                <div className="panel-body">
                                    <div className="row mrg20B">
                                        <div className="col-md-6">
                                            <h3 className="title-hero pull-left">Business Details</h3>
                                        </div>
                                    </div>
                                    <div className="example_datatable">
                                        <div className="col-md-12 col-sm-12 col-xs-12 res_full_buisness res_padd_none">
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <div className="buisness_txt_main full_width">
                                                        <div className="left_img">
                                                            <div className="img_circle_bg">                                                            
                                                                <img src={this.props.business.userData.profile_img} alt="" className="img-responsive upload_img"></img>
                                                            </div>
                                                        </div>
                                                        <div className="buisness_txt">
                                                            <h4 className="tiile_cmng">{this.props.business.name}</h4>
                                                            <div className="clearfix"></div>
                                                            <p className="ptxt_fnly">
                                                                {this.props.business.businessSuburbsData.map(function(val, i) {
                                                                    return val.locality;
                                                                }).join(',')}
                                                            </p>                                                 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="busnss_link res_center">
                                                        <a href="tel:"><span className="icon_fonts"><i className="fa fa-phone"></i> {this.props.business.contact_number}</span></a>
                                                        <div className="clearfix"></div>
                                                        <a href="mailto:"><span className="icon_fonts"><i className="fa fa-envelope"></i> {this.props.business.email}</span></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="row">                                                    
                                                    <Carousel showArrows={true} showThumbs={false} autoPlay={true} infiniteLoop={true} >
                                                        {this.props.business.businessImagesData.map(function(value, key) { 
                                                            return <div className="item"><img src={value.image} id={key} alt=""></img></div>
                                                        })}
                                                    </Carousel>
                                                    <div className="like_rating full_width mrg20B">
                                                        <div className="left_likes">
                                                            <span className="icn_likes">
                                                                <a data-id={this.props.business.id} data-user_id={this.props.business.user_id} className="">
                                                                    <i className="fa fa-heart-o"></i>
                                                                </a>
                                                            </span>                                                            
                                                            <Popup modal trigger={
                                                                <span className="txt_like">
                                                                    <a href="#" className="viewLikes">{this.props.business.total_likes} Likes</a>
                                                                </span>}>                                                
                                                                {close => (
                                                                    <div>
                                                                        <a className="close" onClick={close}>&times;</a>
                                                                        <div className="modal-header">
                                                                            <div className="modal-title"> Likes </div>
                                                                        </div>
                                                                        <div className="modal-body padd_none">
                                                                            {this.props.business.total_likes == 0 ? 'No Likes' : this.props.business.total_likes + 'Likes'}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Popup>                                                                
                                                        </div>
                                                        <div className="right_likes">
                                                            <span className="icn_likes"><i className="fa fa-star"></i></span>
                                                            <Popup modal trigger={
                                                                <a href="#" className="viewRatings" >
                                                                    <span className="txt_like">{this.props.business.total_ratings}/5</span>
                                                                </a>}>
                                                                {close => (
                                                                    <div>
                                                                        <a className="close" onClick={close}>&times;</a>
                                                                        <div className="modal-header">
                                                                            <div className="modal-title"> Rating </div>
                                                                        </div>
                                                                        <div className="modal-body padd_none">
                                                                            {this.props.business.total_ratings == 0 ? 'No Rating Available' : this.props.business.total_ratings + 'Ratings'}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Popup>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="full_width mrg20B maT_25">
                                                    <label className="custom_lbl_bold">Details...</label>
                                                    <p className="ptxt_fnly">{this.props.business.description}</p>
                                                </div>
                                                <div className="full_width mrg20B">
                                                    <label className="custom_lbl_bold">Location</label>
                                                    <p className="ptxt_fnly">
                                                        {this.props.business.businessSuburbsData.map(function(val, i) {
                                                            return val.locality;
                                                        }).join(',')}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="full_width map_link">
                                                <a href="" target="_blank" className="pull-right"><span className="icon_fonts"><i className="fa fa-map-marker"></i></span>View on Map</a>
                                            </div>
                                            <div className="center_btn_kl marg_15 social_icon_rgt">
                                                <a href={this.props.business.facebook_url} target="_blank" className="fbimg">
                                                    <img src={facebookImage} alt="Facebook"></img>
                                                </a>
                                                <a href={this.props.business.instagram_url} target="_blank" className="fbimg">
                                                    <img src={instagramImage} alt="Instagram"></img>
                                                </a>
                                                <a href={this.props.business.website} target="_blank" className="fbimg">
                                                    <img src={websiteImage} alt="Website"></img>
                                                </a>
                                            </div>
                                            <div className="full_width">
                                                <Link to={'/BusinessDetailAdd/'+this.props.business.id} className="btn btn-default custom_btn_f min_height_70">Edit Details</Link>
                                                <div className="btn btn-default custom_btn_f min_height50 pull-right">Total Views 
                                                    <span className="view_txt">{this.props.business.total_views == null?'0': this.props.business.total_views}</span>
                                                </div>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal fade in attch_custom_main custom_fmodel" id="businessLikesViewModal"></div>

                        <div className="modal fade in attch_custom_main custom_fmodel" id="businessRatingViewModal"></div>
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
        business: state.business
    }
}

export default connect(mapStateToProps)(BusinessDetail);
