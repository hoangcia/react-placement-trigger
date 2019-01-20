import React, { Component } from 'react';
import './CheckList.css';

class CheckListUI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.id,
            data: this.props.data,
            isCheckAll: this.props.data.every((item) => item.checked || item.disabled)
        };

        this.onChange = this.onChange.bind(this);
        this.onCheckAll = this.onCheckAll.bind(this);

        //this.checkboxAll = React.createRef();
    }

    onChange(evt) {
        let checkBoxEl = evt.target;
        
        let data = this.state.data;
        let index = this.state.data.findIndex((item) => item.key === checkBoxEl.id);
        data[index].checked = checkBoxEl.checked;

        let isCheckAll = this.state.data.every((item) => item.checked || item.disabled);
        this.setState({ isCheckAll, data });
        //lift-up to parent component

        this.props.onCheckChange(checkBoxEl.id, checkBoxEl.checked);                            
    }

    onCheckAll(evt) {
        let data = this.state.data;

        data.forEach((item) => {
            if (!item.disabled) {
                item.checked = evt.target.checked;
            }
        });        
        this.setState({ data, isCheckAll: evt.target.checked });
        this.props.onCheckAll(evt.target.checked);        
    }

    shouldComponentUpdate(nextProps) {
        return true;
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });
    }
    render() {
        let thisComponent = this;

        let checkListItems = this.state.data.map((item) => {
            return <li key={item.key} className="check-list-item">
                <div className="check-list-item-left">{item.text}</div>
                <div className="check-list-item-right">
                    {!item.disabled ?
                        <input type="checkbox" id={item.key} value={item.value} className="check-list-checkbox"
                            name={item.key}
                            onChange={thisComponent.onChange}
                            checked={item.checked}
                            disabled={item.disabled}
                            key={`${thisComponent.state._id}-${item.key}`} />
                    : ""}
                </div>
            </li>
        });
        return (
            <div className="check-list">
                <div className="check-list-header">
                    <div className="check-list-title">
                        {this.props.title}
                    </div>
                    <div className="check-list-checkAll">
                        <input type="checkbox" className="check-list-checkbox" value={this.state.isCheckAll} id="check-all" onChange={this.onCheckAll} checked={this.state.isCheckAll} />
                    </div>
                </div>
                <div className="check-list-body">
                    <ul className="check-list-container">
                        {checkListItems}
                    </ul></div>
            </div>);
    }
}

export default CheckListUI;

