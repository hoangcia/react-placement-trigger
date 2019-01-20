import React, { Component } from 'react';
import './AlertBox.css';

class ALertBoxUI extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    getListMessageElement(){
        return <ul>
            {this.props.messages.map((msg)=><li key={msg}>{msg}</li>)}
        </ul>
    }
    render() {
        return (
            <div className="alert-box">
                <div className="alert-box-content">{this.getListMessageElement()}</div>
            </div>
        );
    }
}

export default ALertBoxUI;

