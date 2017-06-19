import React from 'react';
import ReactDOM from 'react-dom';
import ChatRoom from './ChatRoom'
import ContentSwitcher from './ContentSwitcher'
import './History.css'
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

const title = 'Recent';
const colors = ['#ffffff'];




class History extends React.Component {
  constructor() {
    super();

    this.generateDivs = this.generateDivs.bind(this);
    this.switchToChat = this.switchToChat.bind(this);

    let moreDivs = [];
    let count = 0;
    for (let i = 0; i < 30; i++) {
      moreDivs.push(
        <div key={'div' + count++} style={{ height: 50, background:'#00ffffff', ...style }}>
          <h4 onClick={this.switchToChat.bind(this, count)}>User{count} Last Msg
              
          </h4>
          <span id="hisDateSpan">  June 17 2017</span>
        </div>
      );
    }

    this.state = {
      divs: moreDivs
    };
    //this.refresh = this.refresh.bind(this);
  }

  switchToChat(userId) {
    this.props.SwitchAction({GotoContent:"GotoChatRoom", UserId:{userId}})
  }

  //  refresh () {
  //   this.generateDivs();
  // }

  generateDivs() {
    let moreDivs = [];
    let count = this.state.divs.length;
    for (let i = 0; i < 30; i++) {
      moreDivs.push(
        <div key={'div' + count++} style={{ height: 50, background: '#00ffffff', ...style }}>
          <h4 onClick={this.switchToChat.bind(this, count)}>User{count} Last Msg
              
          </h4>
          <span id="hisDateSpan">  June 17 2017</span>
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
        <div id="HistoryScroll">
          <InfiniteScroll
            /*pullDownToRefresh
            pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
            releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
            refreshFunction={this.refresh}*/
            next={this.generateDivs.bind(this)}
            hasMore={true}
            height={615}
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

export default connect(null, mapDispatchToProps)(History);

// var currentIndex = 0;
// var generateItem = function () {
//     currentIndex++;
//     return currentIndex;
// }

// var InfiniteScrollExample = React.createClass({
//     _loadMoreItems: function () {
//         var itemsToAdd = 3;
//         var secondsToWait = 2;
//         this.setState({ isLoading: true });
//         // fake an async. ajax call with setTimeout
//         window.setTimeout(function () {
//             // add data
//             var currentItems = this.state.items;
//             for (var i = 0; i < itemsToAdd; i++) {
//                 currentItems.push(generateItem());
//             }
//             this.setState({
//                 items: currentItems,
//                 isLoading: false,
//             });
//         }.bind(this), secondsToWait * 1000);
//     },

//     /**
//      * @return {Object}
//      */
//     getInitialState: function () {
//         var initialItems = [
//             // 'http://lorempixel.com/output/cats-q-c-640-480-9.jpg',
//             // 'http://lorempixel.com/output/cats-q-c-640-480-10.jpg',
//             // 'http://lorempixel.com/output/technics-q-c-640-480-10.jpg',
//             0
//         ];
//         return {
//             items: initialItems,
//             isLoading: false,
//         };
//     },

//     // /**
//     //  * @return {Object}
//     //  */
//     // _renderItems: function () {
//     //   return this.state.items.map(function (imageUrl, index) {
//     //     return (
//     //       <img
//     //         src={imageUrl}
//     //         alt="CATS AND ROBOTS... "
//     //         style={{ height: 100 }}
//     //         key={index}
//     //         className="infinite-scroll-example__list-item" />
//     //     );
//     //   });
//     // },

//     _HisMsg: function (event, index) {
//         alert(index);
//     },


//     /**
//    * @return {Object}
//    */
//     _renderItems: function () {
//         return this.state.items.map(function (index) {
//             return (
//                 <div>
//                     <label>
//                         <h3>User{index}
//                             <span>  LastMsg{index}</span>
                            
//                         </h3>
//                     </label>
//                     <label id="chatBtn">
//                         <span id="hisDate">  June 17 2017</span>
//                     <button name={["GotoChatRoom", index]} onClick={() => { return <ContentSwitcher eventTypes="click" />; }}>chat</button>
//                     </label>
//                 </div>
//             );
//         });
//     },

//     //
//     _renderWaypoint: function () {
//         if (!this.state.isLoading) {
//             return (
//                 <Waypoint
//                     onEnter={this._loadMoreItems}
//                     threshold={2.0}
//                 />
//             );
//         }
//     },

//     /**
//      * @return {Object}
//      */
//     render: function () {
//         return (
//             <div className="infinite-scroll-example">
//                 {/*<p className="infinite-scroll-example__count">
//           Items Loaded: {this.state.items.length}
//         </p>*/}
//                 <div className="scrollable-parent">
//                     {this._renderItems()}

//                     <div className="infinite-scroll-example__waypoint">
//                         {this._renderWaypoint()}
//                         Loading more items…
//           </div>
//                 </div>
//                 <p className="infinite-scroll-example__arrow" />
//             </div>
//         );
//     }
// });

// class History extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div>
//                 <h3>History</h3>
//                 <div id="parent">
//                     <div id='MenuRecent'>
//                         <InfiniteScrollExample />
//                     </div>
//                 </div>
//             </div>

//         )
//     }
// }

// // const mapStateToProps = (state) => {
// //     console.log("mapStateToProps", state.default[0])
// //     return {
// //         switchName: state.default[0]
// //     }
// // };

// // export default connect(mapStateToProps, null)(History);
// export default History;