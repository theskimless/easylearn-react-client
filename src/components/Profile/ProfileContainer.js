import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logOut } from "../../redux/reducers/profileReducer";
import ProfileView from "./ProfileView";

let ProfileContainer = props => {
    if(props.isAuthenticated) {
        return <ProfileView
            logOutHandler={props.logOut}
            name={props.name}
            email={props.email}
            picture_url={props.picture_url}
        />
    }
    else return <></>;
};

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    picture_url: state.profile.picture_url,
    email: state.profile.email,
    name: state.profile.name
});

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfileContainer));