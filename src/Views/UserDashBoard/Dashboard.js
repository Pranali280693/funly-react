import React from 'react';
import axios from 'axios';
import Layout from "./../Login/Layout";

class Dashboard extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
        }  
    }

    handleChange= (e)=> {  
        this.setState({[e.target.name]:e.target.value});  
    }

    componentDidMount() {        
    }
    
    LoginUser=()=>{
        this.props.history.push('/Dashboard');
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
                                    <div className="row">
                                        <div className="col-sm-12">
                                        <h3 className="title-hero pull-left">
                                            Dashboard
                                        </h3>
                                        </div>
                                    </div>
                                    <div className="full_width maT_30">
                                        <div className="row">
                                            <div className="col-xs-12 col-md-6 col-lg-3">
                                                <div className="dash_box panel-blue panel-widget ">
                                                    <div className="row no-padding">
                                                        <div className="col-sm-3 col-lg-5 widget-left">
                                                            <svg className="glyph stroked bag"></svg>
                                                        </div>
                                                        <div className="col-sm-9 col-lg-7 widget-right right-blue">
                                                            <div className="large">0</div>
                                                            <div className="text-muted">Active Offers</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-6 col-lg-3">
                                                <div className="dash_box panel-orange panel-widget">
                                                    <div className="row no-padding">
                                                        <div className="col-sm-3 col-lg-5 widget-left">
                                                            <svg className="glyph stroked empty-message"></svg>
                                                        </div>
                                                        <div className="col-sm-9 col-lg-7 widget-right right-orange">
                                                            <div className="large">0</div>
                                                            <div className="text-muted">Views</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-6 col-lg-3">
                                                <div className="dash_box panel-teal panel-widget">
                                                    <div className="row no-padding">
                                                        <div className="col-sm-3 col-lg-5 widget-left">
                                                            <svg className="glyph stroked male-user"></svg>
                                                        </div>
                                                        <div className="col-sm-9 col-lg-7 widget-right right-teal">
                                                            <div className="large">0</div>
                                                            <div className="text-muted">Redeemed Offers Online</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-md-6 col-lg-3">
                                                <div className="dash_box panel-red panel-widget">
                                                    <div className="row no-padding">
                                                        <div className="col-sm-3 col-lg-5 widget-left">
                                                            <svg className="glyph stroked app-window-with-content"></svg>
                                                        </div>
                                                        <div className="col-sm-9 col-lg-7 widget-right right-red">
                                                            <div className="large">0</div>
                                                            <div className="text-muted">Redeemed Offers In-store</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="dash_box panel-default">
                                                    <div className="panel-heading">Site Traffic Overview</div>
                                                    <div className="panel-body">
                                                        <div className="row">
                                                            <div className="col-sm-3 float-right"></div>
                                                        </div>
                                                        <div id="container"></div>
                                                        <input type="hidden" className="seriesCategory" value=""></input>
                                                        <input type="hidden" className="seriesData" value=""></input>
                                                    </div>
                                                </div>
                                            </div>
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

export default Dashboard;
