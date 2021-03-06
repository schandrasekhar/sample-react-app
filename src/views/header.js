import React, { Fragment } from 'react';

import channelService from '../utils/channelService.js';

class HeaderComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
        this.setPid();
    }
    setPid() {
        this.pid = Math.random();
        this.channel = channelService.register(this.pid);
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