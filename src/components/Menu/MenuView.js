import React from "react";
import {NavLink} from "react-router-dom";

export default class extends React.Component {
    constructor(props) {
        super(props);

        console.log("***************** MENU VIEW *****************");
        this.state = {
            tabs: [
                {href: "/", text: "My Words"},
                {href: "/myLists", text: "My Lists"}
            ],
            tabWidth: 0,
            tabIndexSelected: 0
        }
        this.tabsElem = React.createRef();
        this.indicator = React.createRef();

        this.selectTab.bind(this);
    }

    componentDidMount() {
        let newTabWidth = this.indicator.current.clientWidth / this.state.tabs.length;
        this.setState({
            tabWidth: newTabWidth
        })
        this.indicator.current.style.width = newTabWidth + "px";
        
        
        // SELECT TAB BY URL
        this.state.tabs.forEach((tab, key) => {
            if(tab.href === this.props.path) {
                this.setState({
                    tabIndexSelected: key
                });
                this.indicator.current.style.left = newTabWidth * key + "px";
            }
        });
    }

    selectTab(key) {
        let forward = key - this.state.tabIndexSelected < 0 ? false : true;
        let paint = (e) => {
            if(this.indicator.current) {
                this.indicator.current.removeEventListener("transitionend", paint);
                if(forward) this.indicator.current.style.left = this.state.tabWidth * this.state.tabIndexSelected + "px";
                this.indicator.current.style.width = this.state.tabWidth + "px";
            }
        }
        this.indicator.current.addEventListener("transitionend", paint);
        
        if(!forward) this.indicator.current.style.left = this.state.tabWidth * key + "px";
        this.indicator.current.style.width = this.state.tabWidth * (Math.abs(key - this.state.tabIndexSelected) + 1) + "px";
  
        this.setState({
            tabIndexSelected: key
        })
    }

    render() {
        return (
            <div className="navbar block-shadow tabs" ref={this.tabsElem}>
                {this.state.tabs.map((tab, key) => <NavLink className="tab" key={key} onClick={() => this.selectTab(key)} exact to={tab.href}>{tab.text}</NavLink>)}
                <div className="indicator" ref={this.indicator}></div>
            </div> 
        );
    }
};