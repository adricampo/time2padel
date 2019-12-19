import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({name, surname, gender, email, onModifyUser, onBack, error, onClose }) { 
    return <section className="userpage">
            <div className="userpage__container container">
                <h3 className="container__title">Personal Info</h3>
                <form className="container__form form" onSubmit={ event => {
                            event.preventDefault()
                            

                            const { username: { value: username }, password: { value: password } } = event.target
                          
                            onModifyUser(username, password)
                        }}>
                    <label>Name: <input type="text" className="sign-up__name" defaultValue={name} name="name" readOnly/></label>
                    <label>Surname: <input type="text" className="sign-up__name" defaultValue={surname} name="surname" readOnly/></label>
                    <label>Username: <input type="text" className="sign-up__name" name="username" /></label>
                    <label>Gender: <input type="text" className="sign-up__name" defaultValue={gender} name="gender" readOnly/></label>
                    <label>Email: <input type="email" className="sign-up__name" defaultValue={email} name="email" readOnly/></label>
                    <label>Password: <input type="password" className="sign-up__name" name="password" /></label> 
                    <div className="form__buttons buttons">
                        <div className="buttons__modify-info modify-info">
                            <button className="modify-info__button">Modify Info</button>
                        </div>
                        <div className="buttons__back-button back-button">
                            <button className="back-button__button" onClick={event => {
                            event.preventDefault()

                            onBack()
                        }}>Go Back</button>
                        </div>
                    </div>
                </form>
                
                   
            </div>

            {error && <Feedback message={error} onClose={onClose} />}
        </section>
}