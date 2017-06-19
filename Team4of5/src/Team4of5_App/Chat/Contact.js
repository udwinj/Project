import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

class Contact extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("CCCCCHHHAATTT!!!")
        return (
          <div>
-            <h1>Contact</h1>

-          </div>

        )
    }
}

export default Contact;

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