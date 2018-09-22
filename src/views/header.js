import React, { Fragment } from 'react';

import postoffice from '../utils/postoffice.js';

class HeaderComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
        this.setPid();
        this.send();
    }
    send() {
        this.channel.send({greeting: 'hi'}, this.props.parentPid);
    }
    setPid() {
        this.pid = Math.random();
        this.channel = postoffice.register(this.pid);
    }
    render() {
        return (
            <header>
                this is a header
            </header>
        );
    }
};

module.exports = HeaderComp;