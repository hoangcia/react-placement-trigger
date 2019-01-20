import React, { Component } from 'react';
import { connect } from 'react-redux';
import { placementDataLoad, placementSave } from 'actions';
import axios from 'axios';
import {parseObjToArray} from 'utilities';

import PlacementTriggerUI from './PlacementTrigger.ui';

class PlacementTrigger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validation: {},
            placementData: {},
            validationMsgs: []
        };
        this.saveData = this.saveData.bind(this);
        this.validate = this.validate.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    initData() {
        let placementTriggerComponent = this,
            placementReducer = this.props.placementReducer;

        //check local storage, otherwise load json data
        if (placementReducer.placementData) {
            placementTriggerComponent.setState({ placementData: placementReducer.placementData });
        }
        else {
            axios.get("/sample-data.json", {})
                .then((response) => {                                        
                    placementTriggerComponent.setState({ placementData: response.data.data });
                    placementTriggerComponent.props.onDataLoad({ placementData: response.data.data });
                });
        }
        if (placementReducer.validation) {
            placementTriggerComponent.setState({ validation: placementReducer.validation });
        }
        else {
            axios.get("/validation.json", {})
                .then((response) => {
                    placementTriggerComponent.setState({ validation: response.data.validation });
                    placementTriggerComponent.props.onDataLoad({ validation: response.data.validation });
                });
        }
    }
    reset() {

    }

    componentDidMount() {
        this.initData();
    }

    saveData(data) {
        console.log(data);
    }

    validate(checkListData) {
        let validationMsgs = [];
        let validation_rules = this.state.validation[checkListData.selectedObjective];                
        let required_rules = validation_rules.required;        
        let placementData = this.state.placementData;
        
        /* validation - require rules*/
        let requiredPositions = parseObjToArray(required_rules);
        let publisher_platforms = parseObjToArray(placementData.publisher_platforms.result);

        requiredPositions.forEach(requiredPosition=>{
            publisher_platforms.forEach(p => {
                if(requiredPosition.value.findIndex(i => i.indexOf(p.key) >-1) > -1){
                    
                    parseObjToArray(placementData[p.key].result).forEach(i => {
                        if(requiredPosition.value.findIndex(j => j.indexOf(i.key) > -1) > -1){
                            let default_selection = placementData[p.key].default_selection;
                            let user_selection = placementData[p.key].user_selection;

                            if(user_selection.length > 0){
                                if(user_selection.indexOf(i.key) === -1){
                                    validationMsgs.push(`Warning! To use ${requiredPosition.key} you need ${i.key}`);
                                }
                            }
                            else if(default_selection.length > 0){
                                if(default_selection.indexOf(i.key) === -1){
                                    validationMsgs.push(`Warning! To use ${requiredPosition.key} you need ${i.key}`);
                                }
                            }
                        }
                    });
                }
            });
        });
        return validationMsgs;
    }
    
    onChange(checkListData) {                
        //save user_selection
        let placementData = this.state.placementData;

        let user_selection = placementData[checkListData.position.key].user_selection;
        
        if(user_selection.length === 0) user_selection = placementData[checkListData.position.key].default_selection;
        
        checkListData.position.items.forEach((pItem)=>{
            if(pItem.checked){
                user_selection.push(pItem.key);
            }
            else{
                let foundIndex = user_selection.indexOf(pItem.key);
                if(foundIndex>-1)
                    user_selection.splice(foundIndex,1);
            }
        });
        user_selection = [...new Set(user_selection)];
        placementData[checkListData.position.key].user_selection = user_selection;
        //validate
        let validationMsgs = this.validate(checkListData);

        this.setState({validationMsgs,placementData});
    }
    render() {
        
        return <PlacementTriggerUI {...this.props} {...this.state}
            validationMsgs={this.state.validationMsgs}
            saveData={this.saveData}
            validate={this.validate}
            onChange={this.onChange} />
    }
}
const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    onSavePlacement: data => dispatch(placementSave(data)),
    onDataLoad: data => dispatch(placementDataLoad(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlacementTrigger);