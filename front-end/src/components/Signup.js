import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Signup extends Component {


    static propTypes = {
        handleSubmit2: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props)

        this.state = {
            firstname:'',
            lastname:'',
            username: '',
            password: '',
            Evalid : true,
            Pvalid: true,
            lvalid: true,
            fvalid: true
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlepasswordChange = this.handlepasswordChange.bind(this);
        this.handlefirstnameChange = this.handlefirstnameChange.bind(this);
        this.handlelastnameChange = this.handlelastnameChange.bind(this);
    }

    validateEmail (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    }

    validatepassword (password) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return re.test(password)
    }

    validatefirstname (firstname) {
        const re = /^[a-zA-Z ]{3,30}$/
        return re.test(firstname)
    }
    validatelastname (lastname) {
        const re = /^[a-zA-Z ]{3,30}$/
        return re.test(lastname)
    }

    handleEmailChange(e) {
        const username = e.target.value
        const emailValid = this.validateEmail(username)

        this.setState({
            username: e.target.value,
            Evalid: emailValid
        })
    }
    handlepasswordChange(e) {
        const password = e.target.value
        const passwordValid = this.validatepassword(password)

        this.setState({
            password: e.target.value,
            Pvalid: passwordValid
        })
    }

    handlefirstnameChange(e) {
        const firstname = e.target.value
        const firstnameValid = this.validatefirstname(firstname)

        this.setState({
            firstname: e.target.value,
            fvalid: firstnameValid
        })
    }

    handlelastnameChange(e) {
        const lastname = e.target.value
        const lastnameValid = this.validatelastname(lastname)

        this.setState({
            lastname: e.target.value,
            lvalid: lastnameValid
        })
    }


    componentWillMount(){
        this.setState({
            firstname:'',
            lastname:'',
            username: '',
            password: '',
            Evalid : false,
            Pvalid: false,
            lvalid: false,
            fvalid: false
        });
    }

    render() {

        let spanclass='disp'
        let spanclass2='pwd'
        let spanclass3='fname'
        let spanclass4='lname'
        const { username,password, Evalid,Pvalid,lvalid,fvalid } = this.state

        if (!Evalid) {
            spanclass+=' error'
        }
        if (!Pvalid) {
            spanclass2+=' error'
        }
        if (!fvalid) {
            spanclass3+=' error'
        }
        if (!lvalid) {
            spanclass4+=' error'
        }

        let btnenb=Evalid&&Pvalid&&fvalid&&lvalid

        return (
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <br/><br/><br/>
                            <p className="leftsignin">Create an account</p>  <a onClick={this.props.check} className="rightsignup">log in</a>

                        </div>



                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="firstname"
                                placeholder="Firstname"
                                value={this.state.firstname}
                                onChange={this.handlefirstnameChange}
                            />
                            <span className={spanclass3}>Invalid First name</span>
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="lastname"
                                placeholder="Lastname"
                                value={this.state.lastname}
                                onChange={this.handlelastnameChange}
                            />
                            <span className={spanclass4}>Invalid Last name</span>
                        </div>


                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="Email"
                                placeholder="Email"
                                value={this.state.username}
                                onChange={this.handleEmailChange}
                            />
                            <span className={spanclass}>Invalid e-mail address</span>
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handlepasswordChange}
                            />
                            <span className={spanclass2}>Minimum 8 characters, at least 1 letter and 1 number</span>
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary"
                                type="button"
                                disabled={!btnenb}
                                onClick={() => this.props.handleSubmit2(this.state)}>
                                Create an account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;