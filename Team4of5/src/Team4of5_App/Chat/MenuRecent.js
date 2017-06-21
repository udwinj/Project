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

//Reference: https://github.com/ankeetmaini/react-infinite-scroll-component

const style = {
  display: 'flex',
  alignItems: 'center',
  fontSize: 20
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
const colors = ['#9bc95b', '#ffd47b', '#95a9d6', '#ffa8e1'];




class MenuRecent extends React.Component {
  constructor() {
    super();
    this.state = {
      divs: [
        //dummy data
        <div key={1} style={{ height: 50, background: '#9bc95b', ...style }}>
          <h4 onClick={this.switchToChat.bind(this,1)}>User{1} Last Msg</h4>
        </div>,
        <div key={2} style={{ height: 50, background: '#ffd47b', ...style }}>
          <h4 onClick={this.switchToChat.bind(this,2)}>User{2} Last Msg</h4>
        </div>,
        <div key={3} style={{ height: 50, background: '#95a9d6', ...style }}>
          <h4 onClick={this.switchToChat.bind(this,3)}>User{3} Last Msg</h4>
        </div>,
        <div key={4} style={{ height: 50, background: '#ffa8e1', ...style }}>
          <h4 onClick={this.switchToChat.bind(this,4)}>User{4} Last Msg</h4>
        </div>,
        <div key={5} style={{ height: 50, background: '#9bc95b', ...style }}>
          <h4 onClick={this.switchToChat.bind(this,5)}>User{5} Last Msg</h4>
        </div>,
        <div key={6} style={{ height: 50, background: '#ffd47b', ...style }}>
          <h4 onClick={this.switchToChat.bind(this,6)}>User{6} Last Msg</h4>
        </div>,
        <div key={7} style={{ height: 50, background: '#95a9d6', ...style }}>
          <h4 onClick={this.switchToChat.bind(this,7)}>User{7} Last Msg</h4>
        </div>,
        <div key={8} style={{ height: 50, background: '#ffa8e1', ...style }}>
          <h4 onClick={this.switchToChat.bind(this,8)}>User{8} Last Msg</h4>
        </div>,
      ]
    };
    this.generateDivs = this.generateDivs.bind(this);
    this.switchToChat = this.switchToChat.bind(this);
    //this.refresh = this.refresh.bind(this);
  }

  switchToChat(userId) {
    this.props.SwitchAction({GotoContent:"GotoChatRoom", UserId:userId, Title:"User"+userId})
  }

  //  refresh () {
  //   this.generateDivs();
  // }

  generateDivs() {
    let moreDivs = [];
    let count = this.state.divs.length;
    for (let i = 0; i < 30; i++) {
      moreDivs.push(
        <div key={'div' + count++} style={{ height: 50, background: colors[i % 4], ...style }}>
          <h4 onClick={this.switchToChat.bind(this, count)}>User{count} Last Msg</h4>
        </div>
      );
    }
    setTimeout(() => {
      this.setState({ divs: this.state.divs.concat(moreDivs) });
    }, 500);
  }

  render() {
    return (
      <div>
        <h3>{title}</h3>
        <div id="InfiniteScroll">
          <InfiniteScroll
            /*pullDownToRefresh
            pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
            releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
            refreshFunction={this.refresh}*/
            next={this.generateDivs.bind(this)}
            hasMore={true}
            height={300}
            loader={<h4>Loading...</h4>}>
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











// /**
//  * Reference : https://react.rocks/example/Waypoint_Infinite_Scroll
//  * https://brigade.engineering/to-infinity-and-beyond-with-react-waypoint-cb5ba46a9150
//  */

// /**
//  * Randomly return either a cat or machine image url
//  * @return {string}
//  */
// var currentIndex = 0;
// var generateItem = function () {
//   var chooseCat = Math.floor(Math.random() * 2);
//   var ind = (currentIndex % 10) + 1;
//   var newImage = (chooseCat) ?
//     'http://lorempixel.com/output/cats-q-c-640-480-' + ind + '.jpg' :
//     'http://lorempixel.com/output/technics-q-c-640-480-' + ind + '.jpg';
//   currentIndex++;
//   return newImage;
// }

// var currentIndex = 0;
// var generateItem = function () {
//   currentIndex++;
//   return currentIndex;
// }

// var InfiniteScrollExample = React.createClass({
//   _loadMoreItems: function () {
//     var itemsToAdd = 3;
//     var secondsToWait = 2;
//     this.setState({ isLoading: true });
//     // fake an async. ajax call with setTimeout
//     window.setTimeout(function () {
//       // add data
//       var currentItems = this.state.items;
//       for (var i = 0; i < itemsToAdd; i++) {
//         currentItems.push(generateItem());
//       }
//       this.setState({
//         items: currentItems,
//         isLoading: false,
//       });
//     }.bind(this), secondsToWait * 1000);
//   },

//   /**
//    * @return {Object}
//    */
//   getInitialState: function () {
//     var initialItems = [
//       // 'http://lorempixel.com/output/cats-q-c-640-480-9.jpg',
//       // 'http://lorempixel.com/output/cats-q-c-640-480-10.jpg',
//       // 'http://lorempixel.com/output/technics-q-c-640-480-10.jpg',
//       0
//     ];
//     return {
//       items: initialItems,
//       isLoading: false,
//     };
//   },

//   // /**
//   //  * @return {Object}
//   //  */
//   // _renderItems: function () {
//   //   return this.state.items.map(function (imageUrl, index) {
//   //     return (
//   //       <img
//   //         src={imageUrl}
//   //         alt="CATS AND ROBOTS... "
//   //         style={{ height: 100 }}
//   //         key={index}
//   //         className="infinite-scroll-example__list-item" />
//   //     );
//   //   });
//   // },

//   // _HisMsg: function () {
//   //   alert(index);
//   // }.bind(this),


//   /**
//  * @return {Object}
//  */
//   _renderItems: function () {
//     return this.state.items.map(function (index) {
//       return (
//         console.log("MenuRecent: ", this.props),
//         <div>
//           <label>
//             <h3 onClick={function(){return this.props.SwitchAction("GotoChatRoom") }.bind(this)}>User{index}
//               <span>  LastMsg{index}</span>
//             </h3>
//           </label>
//         </div>
//       );
//     }.bind(this));
//   },

//   //
//   _renderWaypoint: function () {
//     if (!this.state.isLoading) {
//       return (
//         <Waypoint
//           onEnter={this._loadMoreItems}
//           threshold={2.0}
//         />
//       );
//     }
//   },

//   /**
//    * @return {Object}
//    */
//   render: function () {
//     return (
//       <div className="infinite-scroll-example">
//         {/*<p className="infinite-scroll-example__count">
//           Items Loaded: {this.state.items.length}
//         </p>*/}
//         <div className="infinite-scroll-example__scrollable-parent">
//           {this._renderItems()}

//           <div className="infinite-scroll-example__waypoint">
//             {this._renderWaypoint()}
//             Loading more items…
//           </div>
//         </div>
//         <p className="infinite-scroll-example__arrow" />
//       </div>
//     );
//   }
// });