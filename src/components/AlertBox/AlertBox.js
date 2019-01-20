import React, { Component } from 'react';

import AlertBoxUI from './AlertBox.ui';

class AlertBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props
        };
    }
    componentDidMount() {
        
    }
    render() {
        return <AlertBoxUI {...this.props} />
    }
}

export default AlertBox;