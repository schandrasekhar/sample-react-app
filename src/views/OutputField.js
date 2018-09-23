import React, { Fragment } from 'react';

import channelService from '../utils/channelService.js';

class TextareaField extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state || {};
        this.setPid();
        this.bindMessageCbs();
    }
    bindMessageCbs() {
        const self = this;
        this.channel.on('inputValue', function(inputValue) {
            self.setState({
                inputValue: inputValue
            });
        });
    }
    setPid() {
        this.pid = Math.random();
        if (this.props.pid) {
            this.props.pid.value = this.pid;
        }
        this.channel = channelService.register(this.pid);
    }
    render() {
        const inputValue = this.state.inputValue || '';
        return (
            <div>
                {inputValue}
            </div>
        );
    }
};

module.exports = TextareaField;