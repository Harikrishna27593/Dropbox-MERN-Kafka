import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as API from '../api/API';
import Userprofile from "./Userprofile";
class AccountDetails extends Component {

    static propTypes = {
        message: PropTypes.string.isRequired
    };

    constructor (props) {
        super(props)

        this.state = {
            name:'',
            email:'',
            work: '',
            edu: '',
            contact:'',
            interests:'',
            lang_pref:'',
            details:[],
            show:false
        };

    }

    handleSubmit = (userdata) => {

        API.doprofile(userdata)
            .then((status) => {
                if (status === 201) {
                    API.getDetails()
                        .then((data) => {
                            this.setState({
                                details: data,
                                show:true
                            });
                        });

                } else if (status === 401) {
                    this.setState({

                    });
                }
            });
    };

    componentDidMount() {
        API.doprofile(this.state)
            .then((status) => {
                if (status === 201) {
                    API.getDetails()
                        .then((data) => {
                            this.setState({
                                details: data,
                                show:true
                            });
                        });

                } else if (status === 401) {
                    this.setState({

                    });
                }
            });
    };


    render() {
        return (
            <div>
                <br/>
                <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_2016-vflzSDxC1.svg" height="40"/>
                <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_2016-vflQnXBUU.svg" height="40" />
                <hr/>
                <p className={'basic_info'}><h2>User Profile</h2></p>
                <div className="row justify-content-md-center">
                    <div className="col-md-3">
                        <form>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Name"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={(event) => {
                                        this.setState({
                                            name: event.target.value
                                        });
                                    }}
                                />

                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={(event) => {
                                        this.setState({
                                            email: event.target.value
                                        });
                                    }}
                                />

                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Work"
                                    placeholder="Work"
                                    value={this.state.work}
                                    onChange={(event) => {
                                        this.setState({
                                            work: event.target.value
                                        });
                                    }}
                                />

                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Education"
                                    placeholder="Education"
                                    value={this.state.edu}
                                    onChange={(event) => {
                                        this.setState({
                                            edu: event.target.value
                                        });
                                    }}
                                />

                            </div>


                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Contact"
                                    placeholder="Contact"
                                    value={this.state.contact}
                                    onChange={(event) => {
                                        this.setState({
                                            contact: event.target.value
                                        });
                                    }}
                                />

                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Interests"
                                    placeholder="Interests"
                                    value={this.state.interests}
                                    onChange={(event) => {
                                        this.setState({
                                            interests: event.target.value
                                        });
                                    }}
                                />

                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Language Preference"
                                    placeholder="Language Preference"
                                    value={this.state.lang_pref}
                                    onChange={(event) => {
                                        this.setState({
                                            lang_pref: event.target.value
                                        });
                                    }}
                                />

                            </div>

                            <div className="form-group">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => this.handleSubmit(this.state)}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-9">
                        <table className = "table table-hover">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Work</th>
                                <th>Education</th>
                                <th>Contact</th>
                                <th>Interests</th>
                                <th>Language_pref</th>

                            </tr>
                            </thead>
                            <tbody>


                            <tr>
                                <td>{this.state.name}</td>
                                <td>{this.state.email}</td>
                                <td>{this.state.work}</td>
                                <td>{this.state.edu}</td>
                                <td>{this.state.contact}</td>
                                <td>{this.state.interests}</td>
                                <td>{this.state.lang_pref}</td>

                            </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                {this.state.show? <Userprofile details={this.state.details}  />:''}

            </div>
        );
    }
}

export default AccountDetails;