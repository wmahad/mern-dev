import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from '../../actions/auth';

class Navbar extends Component {
    onLogOut(e) {
        e.preventDefault();
        this.props.logOutUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/dasboard'>Dasboard</Link>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' onClick={this.onLogOut.bind(this)}>Logout </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/register'>Sign Up</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>Login</Link>
                </li>
            </ul>
        );
        return (
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
                <div className='container'>
                    <Link className='navbar-brand' to='/'>DevConnector</Link>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='mobile-nav'>
                        <ul className='navbar-nav mr-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/profiles'> Developers</Link>
                            </li>
                        </ul>

                        { isAuthenticated ? authLinks : guestLinks }
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logOutUser })(Navbar);
