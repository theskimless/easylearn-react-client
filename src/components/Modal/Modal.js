import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import style from "./Modal.module.css";

export default props => {
    let root = useState(document.createElement("div"))[0];
    
    useEffect(() => {
        document.body.appendChild(root);
        
        return () => {
            document.body.removeChild(root);
        };
    }, []);

    return ReactDOM.createPortal(
        <div className={style.wrapper}>
            <div className={[style.block, "block-shadow"].join(" ")}>
                <button className={style.closeBtn} onClick={props.onClose}></button>
                <div className={style.title}>{props.title}</div>
                <div>
                    {
                        props.messages && props.messages.map((item, key) => <div className={style.errorMessage} key={key}>{item.message}</div>)
                    }
                </div>
                <div>
                    {props.children}
                </div>
            </div>
        </div>,
        root
    );
};