import React from 'react';

import '../../Components/images/Icon.png'
import '../../Components/css/bootstrap.min.css'
//import '../../Components/css/jquery.mCustomScrollbar.min.css'
import '../../Components/css/tagmanager.min.css'
import '../../Components/css/jquery-ui.css'
import '../../Components/css/font-awesome.css'
import '../../Components/css/datepicker3.css'
import '../../Components/css/styles.css'
import '../../Components/css/custom-style.css'
import '../../Components/css/iziToast.css'
//import '../../Components/css/owl.carousel.min.css'
import '../../Components/css/owl.theme.default.min.css'
import '../../Components/css/select2.css'
import '../../Components/js/datatable/datatable.css'
import '../../Components/css/responsive.css'
import '../../Components/css/daterangepicker.css'

import FlogoImage from '../../Components/images/Flogo.png';
import IconImage from '../../Components/images/Icon.png';

import { BrowserRouter as Router, Link } from 'react-router-dom'; 
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

class Layout extends React.Component {

    componentDidMount() {        
    }

    render() {
        return (
        <Router>
            <nav className="navbar navbar-inverse navbar-fixed-top custom_navbar" role="navigation">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#sidebar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="nav_logo" href="">
                            <img src={FlogoImage} alt="Logo"></img>
                        </a>
                        <ul className="user-menu">
                            <li className="dropdown pull-right">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <UncontrolledDropdown>
                                        <DropdownToggle tag="span">
                                        <span className="circle_img">
                                            <img src={IconImage} alt="Logo" className="wlcm_logo"></img>
                                        </span>
                                        Welcome <span className="caret"></span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem href="/Profile" className="dropdown-item"><p>Edit Profile</p></DropdownItem>
                                            <DropdownItem href="/Login" className="dropdown-item"><p>Logout</p></DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div id="sidebar-collapse" className="col-sm-3 col-lg-2 sidebar">
                {/* <SideBar /> */}
                <form role="search"></form>                
                <ul className="nav menu">
                    <li className="active">
                        <a href='/Dashboard'><i className="fa fa-dashboard"></i> Dashboard</a>
                    </li>
                    <li>
                        <a href='/AddOffers'><i className="fa fa-gift"></i> Add Offer</a>
                    </li>
                    <li>
                        <a href='/ManageOffers'><i className="fa fa-gift"></i> Manage Offers</a>
                    </li>
                    <li>
                        <a href='/RedeemedOffers'><i className="fa fa-gift"></i> Reedeemed Offers</a>
                    </li>
                    <li>
                        <a href='/BusinessDetail'><i className="fa fa-gift"></i> My Bussiness Details</a>
                    </li>
                    <li>
                        <a href='/Profile'><i className="fa fa-gift"></i> My Profile</a>
                    </li>
                    <li>
                        <a href='/Login'><i className="fa fa-sign-out"></i> Logout</a>
                    </li>
                </ul>
            </div>
            <ToastContainer />
        </Router>
        );
    }
}

export default Layout;
