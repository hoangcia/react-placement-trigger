import React, { Component } from 'react';
import { parseObjToArray } from 'utilities';

import CheckList from '../CheckList';
import AlertBox from '../AlertBox';

import './PlacementTrigger.css'

class PlacementTriggerUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            selectedObjective: "",
            selectedTraffic: "",
            selectedDevicePlatform: "",
            selectedCreative: ""            
        };
        this.handleClick = this.handleClick.bind(this);
        this.onObjectiveChange = this.onObjectiveChange.bind(this);
        this.onDevicePlatformsChange = this.onDevicePlatformsChange.bind(this);
        this.onTrafficChange = this.onTrafficChange.bind(this);
        this.onChangeCreative = this.onChangeCreative.bind(this);
        this.onCheckListChange = this.onCheckListChange.bind(this);
    }

    handleClick(evt) {
        console.log("Save placement data!");
    }

    onCheckListChange(position_key, position_items){
        let checkListData = {
            position:{
                key: position_key,
                items: position_items
            },
            selectedObjective: this.state.selectedObjective,
            selectedCreative: this.state.selectedCreative,
            selectedDevicePlatform: this.state.selectedDevicePlatform,
            selectedTraffic: this.state.selectedTraffic
        };
        this.props.onChange(checkListData);
    }
    onObjectiveChange(evt) {
        let selectedObjective = evt.target.value;
        let traffic_types = this.props.validation[selectedObjective].device_platforms;
        let selectedTraffic = "";
        let selectedDevicePlatform = "all_platforms";

        //set default selectedTraffic
        if (!Array.isArray(traffic_types) && typeof (traffic_types) === 'object') {
            selectedTraffic = Object.keys(traffic_types)[0];
            //set default devicePlatform
            let arrDevicePlatforms = parseObjToArray(traffic_types);
            let availableDevicePlatforms = [];
            for (let dIndex = 0; dIndex < arrDevicePlatforms.length; dIndex++) {
                let devicePlatform = arrDevicePlatforms[dIndex].value;
                availableDevicePlatforms.push(...devicePlatform);
            }
            //remove duplicate
            availableDevicePlatforms = [...new Set(availableDevicePlatforms)];
            
            if(availableDevicePlatforms.length < this.state.placementData.device_platforms.result.length) selectedDevicePlatform = availableDevicePlatforms[0]; 
        }

        else{
            selectedDevicePlatform = traffic_types.length < this.state.placementData.device_platforms.result.length? traffic_types[0] : selectedDevicePlatform;
        }


        this.setState({ selectedObjective, selectedTraffic, selectedDevicePlatform, validationMsgs: [] });
    }
    onDevicePlatformsChange(evt) {
        let selectedDevicePlatform = evt.target.value;

        this.setState({ selectedDevicePlatform,validationMsgs: [] });
    }
    onTrafficChange(evt) {
        this.setState({ selectedTraffic: evt.target.value,validationMsgs: [] });
    }
    onChangeCreative(evt) {
        let selectedCreative = evt.target.value;
        this.setState({selectedCreative,validationMsgs: []});
    }
    componentDidMount() {

    }
    componentDidUpdate(){
        console.log("placement trigger updated");
        console.log(this.state);
    }
    componentWillReceiveProps(nextProps) {
        //set default values for select elements
        if(!nextProps.validation || Object.keys(nextProps.validation).length === 0) return null;

        let validation = nextProps.validation;
        let selectedObjective = nextProps.selectedObjective || Object.keys(nextProps.validation)[2],
            selectedTraffic = validation[selectedObjective].device_platforms,
            selectedDevicePlatform = "all_platforms";
        if (!Array.isArray(selectedTraffic) && typeof (selectedTraffic) === 'object') {
            let arr = parseObjToArray(selectedTraffic);
            selectedTraffic = arr[0].key;
            selectedDevicePlatform = arr.length > 1 ? selectedDevicePlatform : arr[0].value[0];
        }
        else if (Array.isArray(selectedTraffic)) {
            selectedDevicePlatform = selectedTraffic.length > 1 ? selectedDevicePlatform : selectedTraffic[0];
        }
        
        this.setState({
            ...nextProps,
            selectedObjective,
            selectedTraffic,
            selectedDevicePlatform
        });
    }

    getDevicePlatformsSelect() {

        if (!this.state.selectedObjective) return "";

        let selectedObjective = this.state.selectedObjective;
        let available_device_platforms = this.state.validation[selectedObjective].device_platforms;
        let device_platforms = parseObjToArray(this.state.placementData.device_platforms.result);
        let allDevicePlatforms = device_platforms.length;

        if (!Array.isArray(available_device_platforms) && typeof (available_device_platforms) === 'object') {

            let arrAvailable_device_platforms = [];
            for (let traffic in available_device_platforms) {

                let arrDevicePlatforms = available_device_platforms[traffic];
                for (let i = 0; i < arrDevicePlatforms.length; i++) {
                    let platformName = arrDevicePlatforms[i];
                    if (arrAvailable_device_platforms.findIndex((d) => d === platformName) === -1) {
                        arrAvailable_device_platforms.push(platformName);
                    }
                }
            }

            device_platforms = device_platforms.filter(d => arrAvailable_device_platforms.findIndex(p => d.key === p) > -1);
        }

        if (Array.isArray(available_device_platforms)) {
            device_platforms = device_platforms.filter(d => available_device_platforms.findIndex(p => d.key === p) > -1);
        }

        if (this.state.selectedTraffic) {
            let traffic_type = available_device_platforms[this.state.selectedTraffic];
            device_platforms = device_platforms.filter(d => traffic_type.findIndex((t) => d.key === t) > -1);
        }

        let device_platforms_options = device_platforms.map((item) => <option key={item.key} value={item.key}>{item.value}</option>);
        //let selectValue = device_platforms.length === allDevicePlatforms ? "all_platforms" : device_platforms[0];
        return (<select id="devicePlatforms" value={this.state.selectedDevicePlatform} onChange={this.onDevicePlatformsChange}>
            {device_platforms.length === allDevicePlatforms ? <option value={"all_platforms"}>All devices (Recommended)</option> : ""}
            {device_platforms_options}
        </select>);
    }

    getPublisherPlatformCheckLists() {
        if (!this.state.selectedObjective) return "";
        let placementData = this.props.placementData,
            validation = this.props.validation;

        let publisher_platforms = placementData.publisher_platforms || {};
        let platform_data = publisher_platforms.result || {};
        let arrPlatforms = parseObjToArray(platform_data);


        let checkLists = arrPlatforms.map((p) => {
            let pdata = parseObjToArray(placementData[p.key].result),
                data = pdata.map((position_item) => {
                    let isChecked = false,
                        isDisabled = false,
                        user_selection = placementData[p.key].user_selection,
                        default_selection = placementData[p.key].default_selection;

                    //set isChecked
                    if (user_selection.length > 0) {
                        isChecked = user_selection.findIndex((selection) => selection === position_item.key) > -1;
                    }
                    else if (default_selection.length > 0) {
                        isChecked = default_selection.findIndex((selection) => selection === position_item.key) > -1;
                    }
                    //set isDisabled

                    let device_types = placementData[p.key].result[position_item.key].device;
                    let traffic_types = placementData[p.key].result[position_item.key].traffic;
                    let selectedDevicePlatform = this.state.selectedDevicePlatform;
                    let selectedTraffic = this.state.selectedTraffic;
                    
                    isDisabled = (selectedTraffic !== "" && (traffic_types.findIndex(t => t === selectedTraffic) === -1));
                    isDisabled = isDisabled || (selectedDevicePlatform !== "all_platforms" && device_types.findIndex(d => d === selectedDevicePlatform) === -1);

                    let creatives = parseObjToArray(validation[this.state.selectedObjective].creative[p.key]);
                    isDisabled = this.state.selectedCreative !== "all_creatives" && creatives.findIndex((c) => c.key === position_item.key && c.value.indexOf(this.state.selectedCreative) === -1) === -1;
                    return {
                        key: position_item.key,
                        text: position_item.value.label,
                        value: position_item.key,
                        disabled: isDisabled,
                        checked: isChecked
                    };
                });
            return <CheckList id={p.key} title={p.value} data={data} key={p.key} onCheckListChange={this.onCheckListChange}/>
        });

        return checkLists;
    }
    getCreativesSelect() {

        let placementData = this.props.placementData;

        let creatives = placementData.creatives || [];
        let creatives_options = creatives.map((item) => <option value={item.key} key={item.key}>{item.label}</option>);

        let creatives_select = <select id="creatives" value={this.state.selectedCreative || "all_creatives"} onChange={this.onChangeCreative}>
            <option value="all_creatives" >All creatives</option>
            {creatives_options}
        </select>

        return creatives_select;
    }
    getObjectivesSelect() {
        let placementData = this.props.placementData;

        let objectives = placementData.objectives || [];
        let objectives_options = objectives.map((item) => <option value={item.key} key={item.key}>{item.label}</option>);
        let objectives_select = <select id="objectives"
            value={this.state.selectedObjective}
            onChange={this.onObjectiveChange}>
            {objectives_options}
        </select>

        return objectives_select;
    }
    getTrafficTypeSelect() {
        if (!this.state.selectedObjective) return "";

        let selectedObjective = this.state.selectedObjective;
        let device_platforms = this.state.validation[selectedObjective].device_platforms;
        let traffic_types = this.state.placementData.traffic_types;

        if (!Array.isArray(device_platforms) && typeof (device_platforms) === 'object') {
            let arrTrafficType = parseObjToArray(device_platforms);
            let trafficOptions = arrTrafficType.map((item) => <option key={item.key} value={item.key}>{traffic_types[item.key]}</option>);
            return <select id="trafficTypes" onChange={this.onTrafficChange}>{trafficOptions}</select>
        }

    }
    render() {

        if (!this.state.selectedObjective) return "";

        let objectives_select = this.getObjectivesSelect();
        let creatives_select = this.getCreativesSelect();
        let traffic_select = this.getTrafficTypeSelect();
        let device_platforms_select = this.getDevicePlatformsSelect();
        let publisherCheckLists = this.getPublisherPlatformCheckLists();

        return <div className="placement-trigger">
            <div className="creatives-container float-left">{creatives_select}</div>
            <div className="objectives-container float-left">{objectives_select}</div>
            <div className="traffic-types-container float-left">{traffic_select}</div>
            <div style={{ clear: "both" }}></div>
            <div className="publisher-container">
                {this.state.validationMsgs.length > 0 ? <AlertBox messages={this.state.validationMsgs} /> : ""}
                <div className="device-platforms-select">{device_platforms_select}</div>
                {publisherCheckLists}
            </div>
            <button onClick={this.handleClick}>Save</button>
        </div>
    }
}

export default PlacementTriggerUI;

