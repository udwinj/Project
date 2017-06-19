import React from 'react';
import ReactDOM from 'react-dom';
import {
    Grid, Row, Col, Thumbnail, Button, MenuItem,
    DropdownButton, ButtonToolbar, Media, Image
} from 'react-bootstrap';
import './MenuFuncs.css'
//Reference: https://gorangajic.github.io/react-icons/fa.html
import TiContactsIcon from 'react-icons/lib/ti/contacts'
import TiUserIcon from 'react-icons/lib/ti/user'
import TiUserAddIcon from 'react-icons/lib/ti/user-add'
import AddProjectIcon from 'react-icons/lib/fa/file-code-o'
import FaHistoryIcon from 'react-icons/lib/fa/history'

import * as actionCreators from '../App_Redux/ActionCreator'
import ContentSwitcher from './ContentSwitcher'

import { connect } from 'react-redux'
import * as actions from '../App_Redux/ActionCreator'
import { bindActionCreators } from 'redux';
import createStore from '../App_Redux/CreateStores'

const store = createStore();

const BUTTONS = ['Active'];


let status = "Active"
function itemOnSelect(evt){
    status  = evt;
    console.log(evt);
    renderDropdownButton(evt);
}

function ContentListener(evt) {
    console.log("ContentListener", {evt});
    return <ContentSwitcher eventTypes="click"/>
  }

function renderDropdownButton(title, i) {
    return (
        <DropdownButton bsStyle={title.toLowerCase()} onSelect={itemOnSelect} itemOnSelect title={"Choose"} key={i} id={`dropdown-basic-${i}`}>
            <MenuItem eventKey="Active"> Active</MenuItem>
            <MenuItem eventKey="Hide">Hide</MenuItem>
        </DropdownButton>
    );
}

class MenuFuncs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("CCCCCHHHAATTT!!!")
        return (
                <Grid>
        <Row id='funcsRow'>
            <Col xs={1} md={1}> <Media.Left>
                <TiUserIcon size={48} />
            </Media.Left></Col>
            <Col xs={1} md={1}>
                <div>
                    <p>UserName</p>
                    <ButtonToolbar title="Choose">{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
                </div>

            </Col>
        </Row>
        <Row id='funcsRow'>
            <Col xs={1} md={1}> <Media.Left>
                {/*<Image width={64} height={64} src="https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png" alt="Image" />*/}
                <TiContactsIcon size={48} />
            </Media.Left></Col>
            <Col xs={1} md={1}><Button bsStyle="default" 
            //!!! Name tag cannot be removed name={["GotoContact"]}
           
            onClick={()=>{return this.props.SwitchAction({GotoContent:"GotoContact"})} }>Contact</Button></Col>
            
        </Row>
        <Row id='funcsRow'>
            <Col xs={1} md={1}> <Media.Left>
                <TiUserAddIcon size={48} />
            </Media.Left></Col>
            <Col xs={1} md={1}><Button 
                //I found the trick, use the name to pass the data to the component
                bsStyle="default" 
                //name={["GotoAdd", "123"]}
                onClick={()=>{return this.props.SwitchAction({GotoContent:"GotoAdd"})}}>Add</Button></Col>
        </Row>
        <Row id='funcsRow'>
            <Col xs={1} md={1}> <Media.Left>
                <AddProjectIcon size={48} />    
            </Media.Left></Col>
            <Col xs={1} md={1}><Button 
            bsStyle="default" 
            //name={["GotoProject"]}
            onClick={()=>{return this.props.SwitchAction({GotoContent:"GotoProject"})} }>Create Project</Button></Col>
        </Row>
        <Row id='funcsRow'>
            <Col xs={1} md={1}> <Media.Left>
                <FaHistoryIcon size={48} />    
            </Media.Left></Col>
            <Col xs={1} md={1}><Button 
            bsStyle="default" 
            //name={["GotoHistory"]}
            onClick={()=>{return this.props.SwitchAction({GotoContent:"GotoHistory"})} }>History</Button></Col>
        </Row>
    </Grid>

        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {SwitchAction:bindActionCreators(actions.switchContent, dispatch)};
};

export default connect(null, mapDispatchToProps)(MenuFuncs);

