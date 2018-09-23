import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import HeaderComp from './Header.js';
import SideNavComp from './Side-Nav.js';
import InputFieldComp from './InputField.js';
import OutputFieldComp from './OutputField.js';

import channelService from '../utils/channelService.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
        //create and set the pid of this component
        this.setPid();
        //child component pids
        this.inputFieldPid = {};
        this.outputFieldPid = {};
        this.onMessage();
    }
    onMessage() {
        this.channelProxy('inputValue', this.outputFieldPid);
    }
    channelProxy(msgName, targetPid) {
        const self = this;
        this.channel.on(msgName, function(msg) {
            const msgObj = {};
            msgObj[msgName] = msg;
           self.channel.send(msgObj, targetPid.value); 
        });
    }
    setPid() {
        this.pid = Math.random();
        this.channel = channelService.register(this.pid);
    }
    render() {
        const pid = this.pid;
        const inputFieldPid = this.inputFieldPid;
        const outputFieldPid = this.outputFieldPid;
        return (
            <Fragment>
                <InputFieldComp parentPid={pid} pid={inputFieldPid} />
                <OutputFieldComp parentPid={pid} pid={outputFieldPid} />
            </Fragment>
        );
    }
};

ReactDOM.render(<App />, document.getElementById('root'));