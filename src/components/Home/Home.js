import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homeLoad } from 'actions';


import PlacementTrigger from '../PlacementTrigger';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };        
    }
   
    componentDidMount() {        
        //redux store data
        this.props.onLoad({ homeLoad: true });
    }    

    render() {
        return <PlacementTrigger />
    }
}
const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch(homeLoad(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);