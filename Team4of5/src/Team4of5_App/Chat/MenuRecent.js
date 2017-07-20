import React from 'react';
import ReactDOM from 'react-dom';
import './MenuRecent.css'
import ChatRoom from './ChatRoom'
import ContentSwitcher from './ContentSwitcher'
import { connect } from 'react-redux'
import * as actions from '../App_Redux/ActionCreator'
import { bindActionCreators } from 'redux';
import createStore from '../App_Redux/CreateStores'
import InfiniteScroll from 'react-infinite-scroll-component';
import * as ChatService from '../../Team4of5_Service/Chat.js';

//Reference: https://github.com/ankeetmaini/react-infinite-scroll-component

const style = {
  display: 'flex',
  alignItems: 'center',
  fontSize: 15,
  fontFamily:'sans-serif',
  justifyContent:'space-around',

};

// const divs = [
//   <div key={1} style={{ height: 50, background: '#9bc95b', ...style }}>
//     <h4 onClick={this.props.SwitchAction("GotoChatRoom")}>User 1</h4>
//   </div>,
//   <div key={2} style={{ height: 50, background: '#ffd47b', ...style }}>
//     <h4 onClick={this.props.SwitchAction("GotoChatRoom")}>User 2</h4>
//   </div>,
//   <div key={3} style={{ height: 50, background: '#95a9d6', ...style }}>
//     <h4 onClick={this.props.SwitchAction("GotoChatRoom")}>User 3</h4>
//   </div>,
//   <div key={4} style={{ height: 50, background: '#ffa8e1', ...style }}>
//     <h4 onClick={this.props.SwitchAction("GotoChatRoom")}>User 4</h4>
//   </div>,
// ];

const title = 'Recent';
const colors = ['#e8e8e8', '#ddd'];




class MenuRecent extends React.Component {
  constructor() {
    super();
    this.state = {
      divs: [
      ],
      hasMoreData: true,
    };
    //this.generateDivs = this.generateDivs.bind(this);
    this.switchToChat = this.switchToChat.bind(this);
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    let self = this
    ChatService.queryChatHistory().then(function (data) {
      console.log(data)
      self.setData(data)
    }).catch(function (err) {
      console.log(err)
    })
    ChatService.listenHistoryChange().on('child_changed', function () {
      console.log("changed!!!")
      ChatService.queryChatHistory().then(function (data) {
        console.log(data)
        self.setData(data)
      }).catch(function (err) {
        console.log(err)
      })
    })
  }

  switchToChat(contactUid, data) {
    this.props.SwitchAction({
      GotoContent: "GotoChatRoom", ContactUid: contactUid, ContactData: data,
      fromLeftHistory: true
    })
  }

  setData(data) {

    let moreDivs = [];
    for (let i = 0; i < data.length; i++) {

      //let title = data[i].type == 'Project' ? data[i].projectName : data[i].senderName
      console.log(title)
      let content = data[i].content;
      if(content.length > 10){
        content = content.substring(0, 15)+"..."
      }
      moreDivs.push(
        <div className='panel panel-body' key={data[i].chatroomUid} style={{ height: 30, margin:5, background: colors[i % 2], ...style }}>
          <p onClick={this.switchToChat.bind(this, data[i].chatroomUid, {
            chatroomUid: data[i].chatroomUid,
            name: data[i].title, type: data[i].type
        })}>{data[i].senderName}: {content}</p>
        </div>
      );
    }
    this.setState({ divs: moreDivs,//this.state.divs.concat(moreDivs),
     hasMoreData: false });
  }
  //  refresh () {
  //   this.generateDivs();
  // }

  // generateDivs() {
  //   let moreDivs = [];
  //   let count = this.state.divs.length;
  //   for (let i = 0; i < 10; i++) {
  //     moreDivs.push(
  //       <div key={'div' + count++} style={{ height: 50, background: colors[i % 4], ...style }}>
  //         <h4 onClick={this.switchToChat.bind(this, count)}>User{count} Last Msg</h4>
  //       </div>
  //     );
  //   }
  //   //remove index of 5
  //   ///moreDivs.splice(5,1)
  //   //moreDivs.unshift
  //   setTimeout(() => {
  //     this.setState({ divs: this.state.divs.concat(moreDivs) });
  //   }, 500);
  // }

  render() {
    return (
      <div>

        <h1 className="panel-title">{title}</h1>
        <div id="InfiniteScroll">
          <InfiniteScroll
            /*pullDownToRefresh
            pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
            releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
            refreshFunction={this.refresh}*/
            //next={this.generateDivs.bind(this)}
            hasMore={true}
            height={300}
            //loader={<h4>Loading...</h4>}
            >
            {this.state.divs}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return { SwitchAction: bindActionCreators(actions.switchContent, dispatch) };
};

export default connect(null, mapDispatchToProps)(MenuRecent);

//export default MenuRecent;
