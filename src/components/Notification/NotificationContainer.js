import React from "react";
import { connect } from "react-redux";
import NotificationView from "./NotificationView";

const NotificationContainer = props => {
    return <NotificationView
        notifications={props.notifications}
        width={props.width}
    />
};

const mapStateToProps = state => ({
    notifications: state.profile.notifications
});

export default connect(mapStateToProps)(NotificationContainer);