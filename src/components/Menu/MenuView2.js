import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";

export default props => {
    console.log("***************** MENU VIEW *****************");
    let tabsElem = React.createRef();
    let indicator = React.createRef();

    let [tabs, setTabs] = useState([
        {href: "/", text: "My Words"},
        {href: "/profile", text: "My Profile"}
    ]);
    let [tabWidth, setTabWidth] = useState(0);
    let [tabIndexSelected, setTabIndexSelected] = useState(0);

    useEffect(() => {
        setTabWidth(indicator.current.clientWidth / tabs.length);
        indicator.current.style.width = tabWidth + "px";
    }, [tabWidth]);

    function selectTab(key, current) {
        let forward = key - tabIndexSelected < 0 ? false : true;
        
        let paint = (e) => {
            if(current) {
                current.removeEventListener("transitionend", paint);

                if(forward) current.style.left = tabWidth * key + "px";
                current.style.width = tabWidth + "px";
            }
        }
        current.addEventListener("transitionend", paint);
        
        if(!forward) current.style.left = tabWidth * key + "px";
        current.style.width = tabWidth * (Math.abs(key - tabIndexSelected) + 1) + "px";
  
        setTabIndexSelected(key);
    }

    return (
        <div className="navbar block-shadow tabs" ref={tabsElem}>
            {tabs.map((tab, key) => <div className="tab" key={key} onClick={() => selectTab(key, indicator.current)}><NavLink to={tab.href}>{tab.text}</NavLink></div>)}
            <div className="indicator" ref={indicator}></div>
        </div> 
    );
};