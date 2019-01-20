import React, {Component} from 'react';

import {connect} from 'react-redux';

//import {testLoad} from 'actions';

import CheckListUI from './CheckList.ui';

class CheckList extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...this.props,
            title: this.props.title || "Default title",            
            isCheckAll: this.props.data.every((item) => item.checked || item.disabled)
        };

        this.onCheckChange = this.onCheckChange.bind(this);
        this.onCheckAll = this.onCheckAll.bind(this);
    }
    
    onCheckChange(id, checked){
        //console.log(`${id}-${checked}`);
        let data = this.state.data;
        let index = data.findIndex((item)=> item.key === id);
        data[index].checked = checked;        
        this.setState({data});
        let checkListId = this.props.id;
        this.props.onCheckListChange(checkListId, [{key:id,checked}]);
    }
    onCheckAll(value){
        let data = this.state.data,
        checklist_items = [];
        data.forEach((item)=>{
            if(!item.disabled){
                item.checked = value;
                checklist_items.push({key:item.key,checked:item.checked});
        }});

        this.setState({data,isCheckAll:value});
        let checkListId = this.props.id;
        this.props.onCheckListChange(checkListId, checklist_items);

    }
    componentDidMount(){
        //this.props.onLoad({testLoad: true});
    }    
    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
    }
    render(){
        return <CheckListUI {...this.state} onCheckChange={this.onCheckChange} onCheckAll={this.onCheckAll} />
    }
}
/******** Redux ***********/
const mapStateToProps = state => ({
    ...state
  });
  
  const mapDispatchToProps = dispatch => ({
    //onLoad: data => dispatch(testLoad(data))
  });

export default connect(mapStateToProps, mapDispatchToProps)(CheckList);
/**************************/