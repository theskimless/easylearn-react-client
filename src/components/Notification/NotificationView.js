import React from "react";
import style from "./Notification.module.css";

export default props => {
    let inlineStyle = {
        maxWidth: props.width + "px"
    }

    return <div style={inlineStyle} className={style.wrapper}>
        {props.notifications.map(notif => (
            <div className={style.block}>
                <div className={[style.blockTitle].join(" ")}>{notif.title}</div>
                <div className={style.blockContent}>{notif.message}</div>
            </div>
        ))};
        
    </div>;
};