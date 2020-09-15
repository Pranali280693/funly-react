import React from 'react';
import { connect } from 'react-redux';
import loaderImage from '../../Components/images/ajax_loader.gif';
import logoImage from '../../Components/images/Flogo.png';
import profileImage from '../../Components/images/profile.png';
import '../../Components/images/Icon.png'
import '../../Components/css/bootstrap.min.css';
import '../../Components/css/font-awesome.css'
import '../../Components/css/datepicker3.css'
import '../../Components/css/styles.css'
import '../../Components/css/custom-style.css'
import '../../Components/css/responsive.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { signupActions } from './../../Actions';

class SignUp extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            signupEmail:'',  
            signupName:'',
            signupBusinessName:'',
            signupPassword:'',
            signupPhone:'',
            signupAddress:'',
            signupJobTitle:'',
            signupLocation:'',
            profileImage:'',
            signupLatitude:'',
            signupLongitude:'',
        }  
    }

    handleChange= (e)=> {  
        this.setState({[e.target.name]:e.target.value});  
    }

    onFileChange = event => {
        this.setState({ [event.target.name]: event.target.files[0] });
    };

    componentDidMount() {        
    }

    SignUpUser=()=>{

        const SignUpValue = {
            email:this.state.signupEmail,
            password:this.state.signupPassword,
            role_id:'2',
            device_type: 'android',
            device_token:'78e646dc-283f-4803-87d4-d2b2c04e6b91',
            name:this.state.signupName,
            phone:this.state.signupPhone,
            job_title:this.state.signupJobTitle,
            profile_img:this.state.profileImage,
            ABN:this.state.signupLocation,
            business_name:this.state.signupBusinessName,
            apple_id:'2123312313123'
        };

        const { dispatch } = this.props;
        if (SignUpValue) {
            dispatch(signupActions.setSignupPost(SignUpValue));
        }
    }
    
    render(){
    return (
        <div>
            <ToastContainer />
            {/* <div className="loader">
                <img src={loaderImage}></img>
            </div> */}
            <div className="lg_main">
                <div className="full_width login_cmn_flex">
                    <div className="main_box_login_centr">
                        <div className="login-panel panel panel-default login_main_bx">
                            <div className="panel-body">
                                <div className="logo_top full_width">
                                    <img src={logoImage} alt="logoimg"></img>
                                </div>
                                <div className="full_width mrg20B">
                                    <div className="center_file_design">
                                        <div className="upload_dkl design_newl">
                                            <div className="file_new btn btn-lg plus_icn">
                                                <input type="file" name="company_logo" id="profileImage" onChange={this.onFileChange}></input>
                                                <img src={profileImage} alt="" className="img-responsive upload_img"></img>
                                            </div>
                                            <span style={{float:"left", width:"100%"}}>Set Business Logo</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="full_width">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" id="email" className="form-control custm_input_f" name="signupEmail" value={this.state.signupEmail} placeholder="Email Address" onChange={this.handleChange}></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" id="name" className="form-control custm_input_f" name="signupName" value={this.state.signupName} placeholder="Contact Name" onChange={this.handleChange}></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" id="name" className="form-control custm_input_f" name="signupBusinessName" value={this.state.signupBusinessName} placeholder="Business Name" onChange={this.handleChange}></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="password" id="password" className="form-control custm_input_f" name="signupPassword" value={this.state.signupPassword} placeholder="Enter Your Password" onChange={this.handleChange}></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" id="phone" className="form-control custm_input_f" name="signupPhone" value={this.state.signupPhone} placeholder="Contact Number" onChange={this.handleChange}></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" id="searchTextField" className="form-control custm_input_f" name="signupAddress" value={this.state.signupAddress} placeholder="Enter Business Address" onChange={this.handleChange}></input>
                                                <input type="hidden" name="signupLatitude" id="latitude" onChange={this.handleChange}></input>
                                                <input type="hidden" name="signupLongitude" id="longitude" onChange={this.handleChange}></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" id="title" className="form-control custm_input_f" name="signupJobTitle" value={this.state.signupJobTitle} placeholder="Job Title" onChange={this.handleChange}></input>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <input type="text" id="location" className="form-control custm_input_f" name="signupLocation" value={this.state.signupLocation} placeholder="ABN" onChange={this.handleChange}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="center_btn_kl padd_t_20">
                                        <button type="submit" className="btn btn-primary custom_btn_f" onClick={this.SignUpUser} disabled={this.state.isLoading}>Sign Up</button>
                                        <Link to={'/Login'} className="lg_btn_coolsx new_usr_link">Back to Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
    
            <footer className="login_foot">
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
        );
    }
}

export default connect()(SignUp);
