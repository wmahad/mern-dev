import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth-actions';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) this.props.history.push('/dashboard');
        if (nextProps.errors) this.setState({ errors: nextProps.errors });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;
        this.props.loginUser({ email, password })
    }

    render() {
        return (
            <div className='login'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Log In</h1>
                            <p className='lead text-center'>Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='email'
                                        className='form-control form-control-lg'
                                        placeholder='Email Address'
                                        value={this.state.email}
                                        onChange={this.onChange}
                                        name='email' />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='password'
                                        className='form-control form-control-lg'
                                        placeholder='Password'
                                        value={this.state.password}
                                        onChange={this.onChange}
                                        name='password' />
                                </div>
                                <input type='submit' className='btn btn-info btn-block mt-4' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
})

export default connect(mapStateToProps, { loginUser })(Login);
