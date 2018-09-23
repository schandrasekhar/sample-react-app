import React, { Fragment } from 'react';

import channelService from '../utils/channelService.js';

class InputField extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
        this.setPid();
        this.handleChange = this.handleChange.bind(this);
    }
    setPid() {
        this.pid = Math.random();
        this.channel = channelService.register(this.pid);
    }
    handleChange(event) {
        const value = event.target.value || '';
        this.channel.send({inputValue: value}, this.props.parentPid);
    }
    render() {
        return (
            <input type="text" onChange={this.handleChange} />
        );
    }
};

module.exports = InputField;