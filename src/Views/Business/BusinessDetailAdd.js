import React from 'react';
import { connect } from 'react-redux';
import Layout from "./../Login/Layout";
import Select from 'react-select'
import { Link } from 'react-router-dom';
import { businessActions } from './../../Actions';

class BusinessDetailAdd extends React.Component{
    
    constructor(props){
        super(props)
    }

    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(businessActions.onChangeProps(prop, event));
    };

    handleChangeSuburbs= prop => event => {
        const { dispatch } = this.props;
        var selectedValues = event.map(function (option) {
            return option.value;
        });
        dispatch(businessActions.onDropdownChangeProps('selectedSuburbsValue', selectedValues));
        dispatch(businessActions.onDropdownChangeProps('selectedSuburbs', event));
    }

    handleChangeCategories= prop => event => {
        const { dispatch } = this.props;
        var selectedValues = event.map(function (option) {
            return option.value;
        });
        dispatch(businessActions.onDropdownChangeProps('selectedCategoriesValue', selectedValues));
        dispatch(businessActions.onDropdownChangeProps('selectedCategories', event));
    }

    onFileChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(businessActions.onChangeBusinessFile(prop, event));
    };

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

        const { dispatch } = this.props;
        dispatch(businessActions.getBusinessCategory())
        dispatch(businessActions.getBusinessSuburbs())
    }

    AddBusinessDetails=(e)=>{
        e.preventDefault();
        if(this.props.business.id == null || this.props.business.id =='')
        {
            const BusinessValue = {
                user_id:this.props.business.user_id,
                email:this.props.business.email,
                name:this.props.business.name,
                contact_number:this.props.business.contact_number,
                description:this.props.business.description,
                facebook_url:this.props.business.facebook_url,
                instagram_url:this.props.business.instagram_url,
                website_url:this.props.business.website,
                selectedSuburbs:this.props.business.selectedSuburbs,
                selectedSuburbsValue:this.props.business.selectedSuburbsValue,
                selectedCategories:this.props.business.selectedCategories,
                selectedCategoriesValue:this.props.business.selectedCategoriesValue,
                businessImagesData:this.props.business.businessImagesData
            };

            const { dispatch } = this.props;
            dispatch(businessActions.setBusinessAddPost(BusinessValue))
        }
        else
        {
            const BusinessValue = {
                business_id:this.props.business.id,
                email:this.props.business.email,
                name:this.props.business.name,
                contact_number:this.props.business.contact_number,
                description:this.props.business.description,
                facebook_url:this.props.business.facebook_url,
                instagram_url:this.props.business.instagram_url,
                website_url:this.props.business.website,
                user_id:this.props.business.user_id,
                selectedSuburbs:this.props.business.selectedSuburbs,
                selectedSuburbsValue:this.props.business.selectedSuburbsValue,
                selectedCategories:this.props.business.selectedCategories,
                selectedCategoriesValue:this.props.business.selectedCategoriesValue,
                businessImagesData:this.props.business.businessImagesData
            };

            const { dispatch } = this.props;
            dispatch(businessActions.setBusinessEditPost(BusinessValue))
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
                                <div className="panel-heading"><b>Add Business</b></div>
                                <input type="hidden" name="mode" id="businessMode" value=""></input>
                                <div className="panel-body">
                                    <div className="col-md-12"></div>
                                    <div className="col-sm-6">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group mrgBM15">
                                                    <input type="text" id="email" className="form-control custm_input_f" name="email" onChange={this.handleChange('email')} value={this.props.business.email} placeholder="Business Email Address"></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group mrgBM15">
                                                    <input type="text" id="name" className="form-control custm_input_f" name="name" onChange={this.handleChange('name')} value={this.props.business.name} placeholder="Business Name"></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group mrgBM15">
                                                    <label className="custom_lblf">Areas Your Business Covers <span className="text-danger"><i className="fa fa-asterisk" aria-hidden="true"></i> Users will find you based on suburbs</span></label>
                                                    <input type="text" id="businessphone" className="form-control custm_input_f" name="contact_number" onChange={this.handleChange('contact_number')} value={this.props.business.contact_number} placeholder="Business Contact Number"></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group mrgBM15">
                                                    <label className="custom_lblf">Enter your suburbs</label>                                                    
                                                    <Select name="businessSuburbsData" options={this.props.business.businessSuburbsData} onChange={this.handleChangeSuburbs()} value={this.props.business.selectedSuburbs} placeholder="Enter All Suburbs Here.." isMulti />
                                                    <input type="hidden" name="tags" placeholder="Tags" className=" form-control tm-input-info"></input>
                                                    <div className="tm-input_suburbs"></div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group mrgBM15">
                                                    <div className="upload_dkl">
                                                        <div className="file btn btn-lg">Upload Images
                                                            <input type="file" id="business_image" className="form-control businesslogo" name="businessImagesData" onChange={this.onFileChange('businessImagesData')} multiple></input>                                                            
                                                        </div>                                                        
                                                    </div>
                                                </div>
                                                <span className="text-danger"><i className="fa fa-asterisk" aria-hidden="true"></i> Recommended Size : 1024 * 576</span>
                                                <br />
                                                <span className="text-danger"><i className="fa fa-asterisk" aria-hidden="true"></i> File Format:  .jpg, .png</span>
                                                <div className="form-group">
                                                    <div className="showSelectedImage img-wrap"></div>
                                                    {this.props.business.businessImagesData.map((value, key) =>
                                                        <div className="img-wrap">
                                                            <img src={value.image} id={key} height="80px" width="80px"></img>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="form-group mrgBM15">
                                                    <textarea name="description" row="8" placeholder="Enter business description" className="form-control businessDesc custm_txtatrea_f" onChange={this.handleChange('description')} value={this.props.business.description}></textarea>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group mrgBM15">
                                                    <Select name="businessCategoriesData" options={this.props.business.businessCategoriesData} onChange={this.handleChangeCategories()} value={this.props.business.selectedCategories} placeholder="Select Business Categories" isMulti />
                                                    <input type="hidden" className="categories_prefilled" value=''></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group mrgBM15">
                                                    <label>https://www.facebook.com/</label>
                                                    <input type="text" id="facebook_url" className="form-control custm_input_f" name="facebook_url" onChange={this.handleChange('facebook_url')} value={this.props.business.facebook_url} placeholder="Facebook Page Url"></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group mrgBM15">
                                                    <label>https://www.instagram.com/</label>
                                                    <input type="text" id="instagram_url" className="form-control custm_input_f" name="instagram_url" onChange={this.handleChange('instagram_url')} value={this.props.business.instagram_url} placeholder="Instagram Page Url"></input>
                                                </div>
                                            </div>
                                            <div className="col-sm-12">
                                                <div className="form-group mrgBM15">
                                                    <input type="text" id="website" className="form-control custm_input_f" name="website" onChange={this.handleChange('website')} value={this.props.business.website} placeholder="Business Website Url(Start with https://)"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="maT_30 full_width">
                                    <div className="col-md-12">
                                        <button className="btn btn-primary submitBusiness custom_btn_f" type="submit" onClick={this.AddBusinessDetails} value="submit">Submit</button>
                                        <Link to={'/BusinessDetail'} className="btn btn-default custom_btn_f">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps)(BusinessDetailAdd);
