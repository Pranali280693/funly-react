import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu isOpen={ true }>
        <ul className="nav menu">
            <li className="">
                <a className="menu-item" href='/Dashboard'><i className="fa fa-dashboard"></i> Dashboard</a>
            </li>
            <li className="">
                <a className="menu-item" href='/AddOffers'><i className="fa fa-gift"></i> Add Offer</a>
            </li>
            <li className="">
                <a className="menu-item" href='/ManageOffers'><i className="fa fa-gift"></i> Manage Offers</a>
            </li>
            <li className="">
                <a className="menu-item" href='/RedeemedOffers'><i className="fa fa-gift"></i> Reedeemed Offers</a>
            </li>
            <li className="">
                <a className="menu-item" href='/BusinessDetail'><i className="fa fa-gift"></i> My Bussiness Details</a>
            </li>
            <li className="">
                <a className="menu-item" href='/Profile'><i className="fa fa-gift"></i> My Profile</a>
            </li>
            <li className="">
                <a className="menu-item" href='/Login'><i className="fa fa-sign-out"></i> Logout</a>
            </li>
        </ul>
    </Menu>
  );
};