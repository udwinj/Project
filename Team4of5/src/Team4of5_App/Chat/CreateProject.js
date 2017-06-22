import React from 'react';
import ReactDOM from 'react-dom';
//reference: https://github.com/JedWatson/react-select
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

//Dummy data
let Users = [
    { value: 'User1', label: 'User1' },
    { value: 'User2', label: 'User2' },
    { value: 'User3', label: 'User3' },
    { value: 'User4', label: 'User4' },
    { value: 'User5', label: 'User5' },
    { value: 'User6', label: 'User6' },
    { value: 'User7', label: 'User7' },
    { value: 'User8', label: 'User8' },
    { value: 'User9', label: 'User9' },
    { value: 'User10', label: 'User10' },
    { value: 'User11', label: 'User11' },
    { value: 'User12', label: 'User12' },
    { value: 'User13', label: 'User13' },
    { value: 'User14', label: 'User14' }
];


const style = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: 470,
    height: 40,
};

const buttonStyle = {
    marginBottom: 20,
    marginTop: 20
};


class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: Users,
            value: []
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }



    handleSelectChange(value) {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    }

    handleConfirm() {
        if (this.refs.message.value == "") {
            alert("Please input your project name!");
        } else if (this.state.value == "") {
            alert("Please choose your members!");
        } else {
            
            let users=""
            for(let i=0; i<this.state.value.length; i++){
                console.log(this.state.value[i].value);
                users = users.concat(this.state.value[i].value+" ")
            }

            alert("Project name: "+this.refs.message.value+"\n Project Members: "+users);
            this.refs.message.value = "";
            this.setState({value:[]})
        }
    }

    render() {
        return (
            <div>
                <h1>CreateProject</h1>

                <input style={style} ref="message" placeholder="Project Name" className="message-input" />

                <Select multi={true}
                    disabled={false}
                    value={this.state.value}
                    placeholder="Select your members"
                    options={this.state.options}
                    onChange={this.handleSelectChange} />

                <Button bsStyle="default"
                    style={buttonStyle}
                    onClick={this.handleConfirm}>Confirm</Button>

            </div>

        )
    }
}

export default CreateProject;