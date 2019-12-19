import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({ onSignIn, onSignUp, error, onClose }) {
    return <section className="registration-page">
                <div className="registration-page__container container">
                    <section className="container__sign-in sign-in">
                        <h2 className="container__title">Sign In</h2>
                        <form className="sign-in__form" onSubmit={ event => {
                            event.preventDefault()

                            const { username: { value: username }, password: { value: password } } = event.target

                            onSignIn(username, password)   
                        }}>
                            <label name="username">Username: <input type="text" className="sign-in__name" name="username"/></label>
                            <label name="password">Password: <input type="password" className="sign-in__name" name="password"/></label>
                            <div className="sign-in__button button">
                                <button className="button__registerbuttons">Sign In</button>
                            </div>
                        </form>
                    </section>
                    <section className="container__sign-up sign-up">
                        <h2 className="container__title">Create a new account</h2>
                        <p className="sign-up__text">Register and create an account to be part of our Padel Fam!</p>
                        <form className="sign-up__form" onSubmit={ event => {
                            event.preventDefault()

                            const { name: { value: name }, surname: { value: surname }, username: { value: username }, gender: { value: gender }, email: { value: email }, password: { value: password } } = event.target

                            onSignUp(name, surname, username, gender, email, password )
                        }}>
                            <label name="name">Name: <input type="text" className="sign-up__name" name="name"/></label>
                            <label name="surname">Surname: <input type="text" className="sign-up__name" name="surname"/></label>
                            <label name="username">Username: <input type="text" className="sign-up__name" name="username"/></label>
                            <label name="gender">Gender: <input type="radio" className="sign-up__name" name="gender" value="MALE"/> Male<input type="radio" className="sign-up__name" name="gender" value="FEMALE"/> Female</label>
                            <label name="email">Email: <input type="email" className="sign-up__name" name="email"/></label>
                            <label name="password">Password: <input type="password" className="sign-up__name" name="password"/></label>
                            <div className="sign-up__button button">
                                <button className="button__registerbuttons">Sign Up</button>
                            </div>
                        </form>
                    </section>
                </div>

                {error && <Feedback message={error} onClose={onClose} />}
            </section>  
}