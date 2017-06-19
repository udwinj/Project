import React from 'react';
import ReactDOM from 'react-dom';
//reference: https://github.com/JedWatson/react-select
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux'

var options = [
    { value: 'User1', label: 'User1' ,clearableValue: false},
    { value: 'User2', label: 'User2' ,clearableValue: false},
    { value: 'User3', label: 'User3' ,clearableValue: false},
    { value: 'User4', label: 'User4' ,clearableValue: false},
    { value: 'User5', label: 'User5' ,clearableValue: false},
    { value: 'User6', label: 'User6' ,clearableValue: false},
    { value: 'User7', label: 'User7' ,clearableValue: false}
];


class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:[]
        }
        this.logChange = this.logChange.bind(this);
    }

    logChange(event, value) {
        console.log("Selected: " + value);
        this.setState({value})
    }

    render() {
        return (
            <div>
                <h1>CreateProject</h1>
                <Select
                    name="form-field-name"
                    value="one"
                    multi={true}
                    options={options}
                    onChange={this.logChange.bind(this)}
                />
            </div>

        )
    }
}

export default CreateProject;