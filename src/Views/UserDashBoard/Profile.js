import React from 'react';
import { connect } from 'react-redux';
import Layout from "./../Login/Layout";
import { Link } from 'react-router-dom';
import { profileActions } from './../../Actions';

class Profile extends React.Component{
    
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange= prop => event => {
        const { dispatch } = this.props;
        dispatch(profileActions.onChangeProps(prop, event));
    }

    onFileChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(profileActions.onChangeFileChange(prop, event));
    };

    componentDidMount() {
        const UserId = localStorage.getItem('id')
        if(UserId != undefined && UserId != 0)
        {
            const UserValue = {
                user_id:UserId,
            }
            
            const { match : { params } } = this.props;
            const { dispatch } = this.props;
            dispatch(profileActions.getProfile(UserValue))
        }
    }
    
    UserProfile=(e)=>{
        e.preventDefault();
        
        const ProfileValue = {
            user_id:this.props.profile.user_id,
            email:this.props.profile.email,
            name:this.props.profile.name,
            password:'',
            phone:this.props.profile.phone,
            job_title:this.props.profile.job_title,
            location:this.props.profile.location,
            profile_img:this.props.profile.profile_img,
            address:this.props.profile.address,
            latitude:this.props.profile.latitude,
            longitude:this.props.profile.longitude,
        };

        const { match : { params } } = this.props;
        const { dispatch } = this.props;
        if(ProfileValue)
        {
            dispatch(profileActions.setProfilePost(ProfileValue))
        }
    }
    
    render(){
        const { profile } = this.props.profile;
        const { match : { params } } = this.props;
        return (
            <div>
                <Layout />
                <div className="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main fix_hg_vh">
                    <div className="full_width main_top_inner">
                        <div className="col-lg-12 res_padd_0">
                            <div className="panel panel-default">
                                <div className="panel-heading"><b>Edit Profile</b></div>
                                <div className="panel-body" id="modalpoup">
                                    <div className="col-md-12"></div>
                                    <div className="full_width mrg20B">
                                        <div className="center_file_design">
                                            <div className="upload_dkl design_newl">
                                                <div className="file_new btn btn-lg plus_icn">
                                                    <input type="file" name="profileImage" id="profile_img" onChange={this.onFileChange('profile_img')}></input>
                                                    <img src={this.props.profile.profile_img} alt="" className="img-responsive upload_img" accept="image/*"></img>
                                                    <input type="hidden" className="profile_exist_pic" value={this.props.profile.profile_img}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="custom_lblf">Email<sup>*</sup></label>
                                            <input type="text" className="form-control custm_input_f" autoComplete="off" name="userEmail" id="userEmail" placeholder="Email" onChange={this.handleChange('email')} value={this.props.profile.email}></input>
                                            <span className="js-error"></span>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom_lblf">Contact Name<sup>*</sup></label>
                                            <input type="text" className="form-control custm_input_f" name="userName" id="userName" placeholder="Contact Name" onChange={this.handleChange('name')} value={this.props.profile.name}></input>
                                            <span className="js-error"></span>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom_lblf">Change Your Password</label>
                                            <input type="password" className="form-control custm_input_f" name="password" id="password" placeholder="Password" onChange={this.handleChange('password')} ></input>
                                            <span className="js-error"></span>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom_lblf">Contact Number<sup>*</sup></label>
                                            <input type="text" className="form-control custm_input_f" name="userPhone" id="userPhone" placeholder="Contact Number" onChange={this.handleChange('phone')} value={this.props.profile.phone}></input>
                                            <span className="js-error"></span>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label className="custom_lblf">Job Title<sup>*</sup></label>
                                            <input type="text" className="form-control custm_input_f" name="userJobTitle" id="userJobTitle" placeholder="Job Title" onChange={this.handleChange('job_title')} value={this.props.profile.job_title}></input>
                                            <span className="js-error"></span>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom_lblf">ABN<sup>*</sup></label>
                                            <input type="text" className="form-control custm_input_f" name="userLocation" id="userLocation" placeholder="ABN" onChange={this.handleChange('location')} value={this.props.profile.location}></input>
                                            <span className="js-error"></span>
                                        </div>
                                        <div className="form-group">
                                            <label className="custom_lblf">Address</label>
                                            <input type="text" id="searchTextField" className="form-control custm_input_f" name="userAddress" placeholder="Address" onChange={this.handleChange('address')} value={this.props.profile.address}></input>
                                            <input type="hidden" name="userLatitude" id="userLatitude" value={this.props.userLatitude}></input>
                                            <input type="hidden" name="userLongitude" id="userLongitude" value={this.props.userLongitude}></input>
                                            <span className="js-error"></span>
                                        </div>
                                    </div>
                                    <div className="maT_30 full_width">
                                        <div className="col-md-12">
                                            <button className="btn btn-primary custom_btn_f" type="submit" onClick={this.UserProfile} value="submit">Submit</button>
                                            <Link to={'/Profile'} className="btn btn-default custom_btn_f">Cancel</Link>                                            
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
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        profile: state.profile
    };
}

export default connect(mapStateToProps)(Profile);
