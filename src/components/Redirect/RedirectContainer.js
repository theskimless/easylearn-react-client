import React from "react";
import {Redirect, withRouter} from "react-router-dom";
import {resetRedirect} from "../../redux/reducers/profileReducer";
import { connect } from "react-redux";

const RedirectContainer =  props => {
    if(props.location.pathname !== props.redirect && props.redirect) {
        props.resetRedirect();
        return <Redirect push to={props.redirect} />
    }

    return <></>
}

const mapStateToProps = state => ({
    redirect: state.profile.redirect
});

const mapDispatchToProps = dispatch => ({
    resetRedirect: () => dispatch(resetRedirect())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RedirectContainer));