import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };


    constructor (props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            Evalid : true,
            Pvalid: true
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlepasswordChange = this.handlepasswordChange.bind(this);
    }
    validateEmail (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    }

    validatepassword (password) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/
        return re.test(password)
    }

    componentWillMount(){
        this.setState({
            username: '',
            password: '',
            Evalid : false,
            Pvalid: false
        });
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

    render() {


        let spanclass='disp'
        let spanclass2='pwd'
        const { username,password, Evalid,Pvalid } = this.state

        if (!Evalid) {
            spanclass+=' error'
        }
        if (!Pvalid) {
            spanclass2+=' error'
        }

        let btnenb2=Evalid&&Pvalid;
        return (
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <br/><br/><br/>
                            <p className="leftsignin">Sign in</p>  <a onClick={this.props.check} className="rightsignup">create an account</a>

                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                label="Email"
                                id="Email"
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
                                id="password"
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
                                disabled={!btnenb2}
                                onClick={() => this.props.handleSubmit(this.state)}>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;