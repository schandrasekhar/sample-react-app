import React, { Fragment } from 'react';

class SideNavCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
    }
    render() {
        return (
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        );
    }
};

module.exports = SideNavCom;