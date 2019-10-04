import React from "react";
import {connect} from "react-redux";
import MenuView from "./MenuView";

const MenuContainer = props => {

    if(props.isAuthenticated) {
        return (
            <MenuView />
        );
    }
    else return <></>
};

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated
});

export default connect(mapStateToProps)(MenuContainer);
