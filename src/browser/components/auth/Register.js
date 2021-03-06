import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth-actions';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // fires when a component receives new props
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };
        this.props.registerUser(user, this.props.history);
    }

    render() {
        return (
            <div className='register'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Sign Up</h1>
                            <p className='lead text-center'>Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <div className='form-group'>
                                    <input
                                        type='text'
                                        className='form-control form-control-lg'
                                        placeholder='Name' name='name'
                                        value={this.state.name}
                                        onChange={this.onChange}
                                        required />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='email'
                                        className='form-control form-control-lg'
                                        placeholder='Email Address'
                                        name='email'
                                        onChange={this.onChange}
                                        value={this.state.email} />
                                    <small className='form-text text-muted'>This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='password'
                                        className='form-control form-control-lg'
                                        placeholder='Password'
                                        name='password'
                                        onChange={this.onChange}
                                        value={this.state.password} />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='password'
                                        className='form-control form-control-lg'
                                        placeholder='Confirm Password'
                                        name='password2'
                                        onChange={this.onChange}
                                        value={this.state.password2} />
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

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
