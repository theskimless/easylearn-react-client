import React from "react";
import style from "./Notification.module.css";

export default props => {
    return (
        <div className={["block-shadow", style.block].join(" ")}>
            <div className={[style.blockTitle, props.type === "error" ? style.blockError : ""].join(" ")}>{props.title}</div>
            <div className={style.blockContent}>{props.message}</div>
        </div>
    );
};