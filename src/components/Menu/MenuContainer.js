import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import MenuView from "./MenuView";

const MenuContainer = props => {
    if(props.isAuthenticated) {
        return (
            <MenuView path={props.location.pathname} />
        );
    }
    else return <></>
};

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(MenuContainer));
