import React, {Component} from 'react';

import {connect} from 'react-redux';

import {testLoad} from 'actions';

import TestUI from './Test.ui';

class Test extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    componentDidMount(){
        this.props.onLoad({testLoad: true});
    }
    render(){
        return <TestUI {...this.props}/>
    }
}
const mapStateToProps = state => ({
    ...state
  });
  
  const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch(testLoad(data))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Test);