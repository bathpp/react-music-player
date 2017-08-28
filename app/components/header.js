import React, { Component } from 'react';
import './header.less';

class Header extends React.Component {
    render() {
        return(
            <div className="components-header row">
                <img className="-col-auto" src="/static/images/logo.png" width="40" alt=""/>
                <h1 className="caption">React Music Player</h1>
            </div>
        )
    }
}

export default Header;
