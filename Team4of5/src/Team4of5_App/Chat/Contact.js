import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import {
    Grid, Row, Col, Thumbnail, Button, MenuItem,
    DropdownButton, ButtonToolbar, Media, Image
} from 'react-bootstrap';
import TiGroup from 'react-icons/lib/ti/group'
import * as actions from '../App_Redux/ActionCreator'
import { bindActionCreators } from 'redux';
import createStore from '../App_Redux/CreateStores'

import InfiniteScroll from 'react-infinite-scroll-component';
import FaChild from 'react-icons/lib/fa/child';

//Reference: https://github.com/ankeetmaini/react-infinite-scroll-component

const style = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20
};

const title = 'Recent';
const colors = ['#ffffff'];

const ScrollStyle = {
    height: 530,
    overflowY: true
};


// .HistoryScroll {
//   width: 700px;
//   height: 615px;
//   overflow-y: scroll;
//   position: relative;
// }

class Contact extends React.Component {
    constructor() {
        super();

        this.generateDivs = this.generateProject.bind(this);
        this.switchToChat = this.switchToChat.bind(this);
        this.generateContact = this.generateContact.bind(this);

        let projectData = [];
        let contactData = [];
        let countProject = 0;
        let countContact = 0;

        for (let i = 0; i < 5; i++) {
            projectData.push(
                <div key={'div' + countProject++} style={{ height: 50, marginBottom: 20, background: '#00ffffff', ...style }}>
                    <Row onClick={this.switchToChat.bind(this, countProject, "Project"+countProject)} style={{ marginLeft: 0 }}>
                        <Media.Left>
                            <TiGroup size={48} />
                        </Media.Left>
                        <Media.Body>
                            <h4>Project{countProject}</h4>
                        </Media.Body>
                    </Row>
                </div>
            );
        }

        for (let i = 0; i < 20; i++) {
            contactData.push(
                <div key={'div' + countContact++} style={{ height: 50, marginBottom: 20, background: '#00ffffff', ...style }}>
                    <Row onClick={this.switchToChat.bind(this, countContact, "Name"+countContact)} style={{ marginLeft: 0 }}>
                        <Media.Left>
                            <FaChild size={48} />
                        </Media.Left>
                        <Media.Body>
                            <h4>Name{countContact}</h4>
                        </Media.Body>
                    </Row>
                </div>
            );
        }

        this.state = {
            projectData: projectData,
            contactData: contactData
        };
        //this.refresh = this.refresh.bind(this);
    }

    switchToChat(userId, title) {
        this.props.SwitchAction({ GotoContent: "GotoChatRoom", UserId: userId  , Title:title})
    }

    //  refresh () {
    //   this.generateDivs();
    // }

    generateProject() {
        let moreDivs = [];
        let count = this.state.projectData.length;
        for (let i = 0; i < 30; i++) {
            moreDivs.push(
                <div key={'div' + count++} style={{ height: 50, marginTop: 10, background: '#00ffffff', ...style }}>
                    <h4 onClick={this.switchToChat.bind(this, count, "Project"+count)}>User{count} Last Msg

          </h4>
                    <span id="hisDateSpan">  June 17 2017</span>
                </div>
            );
        }
        setTimeout(() => {
            this.setState({ projectData: this.state.projectData.concat(moreDivs) });
        }, 500);
    }

    generateContact() {
        let moreDivs = [];
        let count = this.state.contactData.length;
        for (let i = 0; i < 10; i++) {
            moreDivs.push(
                //         <div key={'div' + count++} style={{ height: 50, marginTop: 10, background: '#00ffffff', ...style }}>
                //             <h4 onClick={this.switchToChat.bind(this, count)}>User{count} Last Msg

                //   </h4>
                //             <span id="hisDateSpan">  June 17 2017</span>
                //         </div>
                <div key={'div' + count++} style={{ height: 50, marginBottom: 20, background: '#00ffffff', ...style }}>
                    <Row onClick={this.switchToChat.bind(this, count, "Name"+count)} style={{ marginLeft: 0 }}>
                        <Media.Left>
                            <FaChild size={48} />
                        </Media.Left>
                        <Media.Body>
                            <h4>Name{count}</h4>
                        </Media.Body>
                    </Row>
                </div>
            );
        }
        setTimeout(() => {
            this.setState({ contactData: this.state.contactData.concat(moreDivs) });
        }, 500);
    }

    render() {
        return (
            <div>
                <h1>Contact</h1>
                <Grid>
                    <Row id='funcsRow'>
                        <Col sm={8} md={4}>
                            <h3>Project</h3>
                            <div type={ScrollStyle}>
                                <InfiniteScroll
                                    /*pullDownToRefresh
                                    pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
                                    releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
                                    refreshFunction={this.refresh}*/
                                    next={this.generateProject.bind(this)}
                                    hasMore={true}
                                    height={530}
                                    loader={<h4>Loading...</h4>}>
                                    {this.state.projectData}
                                </InfiniteScroll>
                            </div>
                        </Col>
                        <Col sm={8} md={4}>
                            <h3>Individual</h3>
                            <div type={ScrollStyle}>
                                <InfiniteScroll
                                    /*pullDownToRefresh
                                    pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
                                    releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
                                    refreshFunction={this.refresh}*/
                                    next={this.generateContact.bind(this)}
                                    hasMore={true}
                                    height={530}
                                    loader={<h4>Loading...</h4>}>
                                    {this.state.contactData}
                                </InfiniteScroll>
                            </div>

                        </Col>
                    </Row>
                </Grid>


            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return { SwitchAction: bindActionCreators(actions.switchContent, dispatch) };
};

export default connect(null, mapDispatchToProps)(Contact);


// class Contact extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         console.log("CCCCCHHHAATTT!!!")
//         return (
//             <div>
//                 <h1>Contact</h1>
//                 <Row id='funcsRow'>
//                     <Col xs={1} md={1}>
//                         <Media.Left>
//                             <TiGroup size={48} />
//                         </Media.Left>
//                         <Media.Body>
//                             <h4>Project1</h4>
//                         </Media.Body>
//                     </Col>

//                     <Col xs={1} md={1}>
//                         <Media.Left>
//                             <TiGroup size={48} />
//                         </Media.Left>
//                         <Media.Body>
//                             <h4>Project2</h4>
//                         </Media.Body>
//                     </Col>
//                 </Row>

//             </div>

//         )
//     }
// }

// export default Contact;

// {/*<ul>
//     {this.props.contacts.map((contact) => <li>{contact.name}</li>)}
//     </ul>*/}
// // const mapStateToProps = (state) => ({
// //   contacts: state.contact
// // });

// // export default connect(mapStateToProps)(Contact);

// const mapStateToProps = (state) => {
//     console.log("mapStateToProps", state.default[0])
//     return {
//         switchName: state.default[0]
//     }
// };

// export default connect(mapStateToProps, null)(Contact);