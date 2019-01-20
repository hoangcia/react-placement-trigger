/*Not used - Only for testing*/

import React, { Component } from 'react';

import CheckList from '../CheckList';

class HomeUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { key: "instant_video", value: "instant_video", text: "Instant video", disabled:true, checked:false },
                { key: "feed", value: "feed", text: "Feed", disabled: false, checked: true },
                { key: "news", value: "news", text: "News", disabled: false, checked: false }
            ]

        };
        this.handleClick = this.handleClick.bind(this);        
    }

    handleClick(evt) {
        this.props.savePlacement({ data: [123, "some text"] });
    }

    render() {
        return <div>
            <h1>Home page</h1>
            <CheckList id = "check-list-1" title="Facebook" 
            data={this.state.data}            
            />
            <div>
                <button onClick={this.handleClick}>Save</button>
            </div>

        </div>
    }
}

export default HomeUI;

