import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import HeaderComp from './header.js';
import SideNavComp from './side-nav.js';

import postoffice from '../utils/postoffice.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
        this.setPid();
        this.onMessage();
    }
    onMessage() {
        this.channel.on('greeting', function(msg) {
            alert(msg);
        });
    }
    setPid() {
        this.pid = Math.random();
        this.channel = postoffice.register(this.pid);
    }
    render() {
        const pid = this.pid;
        return (
            <Fragment>
                <HeaderComp parentPid={pid}></HeaderComp>
                <SideNavComp parentPid={pid}></SideNavComp>
            </Fragment>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));