import React, { Component } from 'react';

import './Auth.css';

class AuthPage extends Component {
    state = {
        isLogin: true
    };

    constructor(props) {
        super(props);
        this.firstNameEl = React.createRef();
        this.lastNameEl = React.createRef();
        this.dateBirthEl = React.createRef();
        this.ageEl = React.createRef();
        this.originallyFromEl = React.createRef();
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isLogin: !prevState.isLogin};
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        let email = this.emailEl.current.value;
        let password = this.passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}") {
                        userId
                        token
                        tokenExpiration
                    }
                }`
        }

        if(!this.state.isLogin) {
            const firstName = this.firstNameEl.current.value;
            const lastName = this.lastNameEl.current.value;
            const dateBirth = this.dateBirthEl.current.value;
            const age = this.ageEl.current.value;
            const originallyFrom = this.originallyFromEl.current.value;
            let email = this.emailEl.current.value;
            let password = this.passwordEl.current.value;

            if(firstName.trim().length === 0 || lastName.trim().length === 0 || dateBirth.trim().length === 0 || age.trim().length === 0 || originallyFrom.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
                return;
            }

            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {firstName:"${firstName}", lastName:"${lastName}", dateBirth:"${dateBirth}", age:"${age}", originallyFrom:"${originallyFrom}", email:"${email}", password: "${password}"}) {
                            _id
                            email
                            firstName
                            lastName
                        }
                    }
                `
            };
        }
      
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            console.log(resData);
        }).catch(err => {
            console.log(err);
        })
    };

    render() {
        if(!this.state.isLogin) {
            return (
            <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="form-control">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" ref={this.firstNameEl}/>
            </div>
            <div className="form-control">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" ref={this.lastNameEl}/>
            </div>
            <div className="form-control">
                <label htmlFor="dateBirth">Date of Birth</label>
                <input type="text" id="dateBirth" placeholder="MM/DD/YYYY" ref={this.dateBirthEl}/>
            </div>
            <div className="form-control">
                <label htmlFor="age">Age</label>
                <input type="text" id="age" ref={this.ageEl}/>
            </div>
            <div className="form-control">
                <label htmlFor="originallyFrom">Originally From</label>
                <input type="text" id="originallyFrom" ref={this.originallyFromEl}/>
            </div>
            <div className="form-control">
                <label htmlFor="email">E-Mail</label>
                <input type="email" id="email" ref={this.emailEl}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordEl}/>
            </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
            </div>
        </form>
        );
        } else {
            return(
                <form className="auth-form" onSubmit={this.submitHandler}>
                    <div className="form-control">
                        <label htmlFor="email">E-Mail</label>
                        <input type="email" id="email" ref={this.emailEl}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" ref={this.passwordEl}/>
                    </div>
                    <div className="form-actions">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
                    </div>
                </form>
            );
        }
        
    }
}

export default AuthPage;