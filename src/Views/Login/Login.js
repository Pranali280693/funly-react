import React, { Component } from 'react';
import { connect } from 'react-redux';
import loaderImage from '../../Components/images/ajax_loader.gif';
import logoImage from '../../Components/images/Flogo.png';
import facebookImage from '../../Components/images/fbimg.png';
import '../../Components/images/Icon.png'
import '../../Components/css/bootstrap.min.css'
import '../../Components/css/bootstrap-tagsinput.css'
import '../../Components/css/jquery-ui.css'
import '../../Components/css/font-awesome.css'
import '../../Components/css/datepicker3.css'
import '../../Components/css/styles.css'
import '../../Components/css/custom-style.css'
import '../../Components/css/responsive.css'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { loginActions } from './../../Actions';
import {auth} from "../../firebase";

class Login extends Component{
    
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email:'',
            password:'',
        };
    }
    
    componentDidMount() {
    }

    handleChange= (e)=> {  
        this.setState({[e.target.name]:e.target.value});  
    }

    LoginUser=(e)=>{
        e.preventDefault();

        const LoginValue = {
            email:this.state.email,
            password:this.state.password,
            device_type: 'android',
            device_token:35235,
            role_id:'2',
        };

        const { dispatch } = this.props;
        if (LoginValue) {
            dispatch(loginActions.getLoginPost(LoginValue));
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
                                    <div className="logib_body full_width">
                                        <form id="login-validation" >
                                            <fieldset>
                                                <div className="form-group">
                                                    <label className="custom_lblf">Email</label>
                                                    <input className="form-control custm_input_f" placeholder="E-mail" name="email" type="text" onChange={this.handleChange} value={this.state.email}></input>
                                                </div>
                                                <div className="form-group">
                                                    <label className="custom_lblf">Password</label>
                                                    <input className="form-control custm_input_f" placeholder="Password" name="password" type="password" onChange={this.handleChange} value={this.state.password}></input>
                                                </div>
                                                <div className="full_width remember_cmn">
                                                    <div className="row">
                                                        <div className="col-sm-6 res_480">
                                                        <label className="custom_check">Remember me
                                                            <input type="checkbox" className="custom-control-input" name="remember" value="1" onChange={this.handleChange} ></input>
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-6 res_480">
                                                        <a className="lg_btn_coolsx mr5sx float-right forget_txt" data-toggle="modal" data-target="#forgotmodal" href="#">Forgot Password?</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="center_btn_kl">
                                                <button className="btn btn-primary custom_btn_f btn_upprcse" type="submit" onClick={this.LoginUser} value="submit" disabled={this.state.isLoading}>Login</button>
                                            </div>
                                            <div className="center_btn_kl marg_15">
                                                <p className="or_ptxt">or</p>
                                            </div>
                                            <div className="center_btn_kl marg_15">
                                                <a href="" className="fbimg">
                                                    <img src={facebookImage} alt="Facebook"></img>
                                                </a>
                                            </div>
                                            <div className="center_btn_kl marg_15">
                                                <a href="" className="fbimg">
                                                    <img src={facebookImage} alt="Facebook"></img>
                                                </a>
                                            </div>
                                        <div className="center_btn_kl new_user_cmn">
                                            <p>New User ? <Link to={'/SignUp'} className="lg_btn_coolsx new_usr_link">click here</Link> to REGISTER</p>
                                        </div>
                                    </fieldset>
                                </form>
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

export default connect()(Login);
