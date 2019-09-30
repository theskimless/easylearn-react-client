import React from "react";
import NotificationView from "./NotificationView";
import style from "./Notification.module.css";

const NotificationsContainer = props => {
    let inlineStyle = {
        maxWidth: props.width + "px"
    }

    return (
        <div style={inlineStyle} className={style.wrapper}>
            {props.notifications.map((notification, key) =>
                (
                    <NotificationView key={key} {...notification} />
                )
            )}
        </div>
    );
};

export default NotificationsContainer;