import React from 'react';
import ReactDOM from 'react-dom';
import Add from './Add'
import Contact from './Contact'
import History from './History'
import CreateProject from './CreateProject'

import * as actions from '../App_Redux/ActionCreator'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import createReactClass from 'create-react-class';
import ChatRoom from './ChatRoom'


class ContentSwitcher extends React.Component {



    constructor(props) {
        super(props);
    }


    render() {
        console.log("This is ContentSwitcher!!!!!", this.props.value)
        //var { id } = this.props
        //console.log("Render:", {id});
        //const KeyList = ["GotoContact", "GotoAdd", "GotoProject", "GotoHistory", "GotoChatRoom"];
        let switchValue = this.props.value == undefined ? '' : this.props.value.GotoContent
        switch (switchValue) {//this.item.functionName
            case "GotoContact":
                return (<Contact />);
            case "GotoAdd":
                return (<Add />);
            case "GotoProject":
                return (<CreateProject />);
            case "GotoHistory":
                return (<History />);
            case "GotoChatRoom":
                return (<ChatRoom extraData={this.props.value.UserId}/>);
            default:
                return (<Contact />);
        }
    }
}

const mapStateToProps = (state) => {
    let value = state.default[state.default.length - 1];
    console.log("mapStateToProps", value)
    return {
        value: value
    }
};

export default connect(mapStateToProps, null)(ContentSwitcher);


//export default onClickOutside(ContentSwitcher);

// export default{
//     components:{
//         'Contact': ContactSwitch,
//         'Add':AddSwitch
//     }
// }