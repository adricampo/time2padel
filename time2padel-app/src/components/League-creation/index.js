import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({error, onClose, onBack, onCreateNewLeague}) {
    return <section className="league-creation">
            <div className="league-creation__container container">
                <h2 className="container__title">League Creation</h2>
                <section className="container__league-info league-info">
                    <form className="league-info__form" onSubmit={event => {
                                event.preventDefault()

                                const { level: { value: level }, gender: { value: gender }, date: { value: date }, time: { value: time } } = event.target

                                onCreateNewLeague(level, gender, date, time)
                            }} >
                        <label>Level: 
                            <input type="radio" className="league-info__name" name="level" value="D"/> D
                            <input type="radio" className="league-info__name" name="level" value="C-"/> C-
                            <input type="radio" className="league-info__name" name="level" value="C+"/> C+
                            <input type="radio" className="league-info__name" name="level" value="B-"/> B-
                            <input type="radio" className="league-info__name" name="level" value="B+"/> B+
                            <input type="radio" className="league-info__name" name="level" value="A"/> A
                        </label>
                        <label>Gender: <input type="radio" className="league-info__name" name="gender" value="MALE"/> Male<input type="radio" className="sign-up__name" name="gender" value="FEMALE"/> Female</label>
                        <label>Date: 
                                <input type="radio" className="league-info__name" name="date" value="MONDAY"/>Monday
                                <input type="radio" className="league-info__name" name="date" value="TUESDAY"/>Tuesday
                                <input type="radio" className="league-info__name" name="date" value="WEDNESDAY"/>Wednesday
                                <input type="radio" className="league-info__name" name="date" value="THURSDAY"/>Thursday
                                <input type="radio" className="league-info__name" name="date" value="FRIDAY"/>Friday
                        </label>   
                        <label>Time: 
                            <input type="radio" className="league-info__name" name="time" value="18:00"/>18:00h
                            <input type="radio" className="league-info__name" name="time" value="18:30"/>18:30h
                            <input type="radio" className="league-info__name" name="time" value="19:00"/>19:00h
                            <input type="radio" className="league-info__name" name="time" value="19:30"/>19:30h
                            <input type="radio" className="league-info__name" name="time" value="20:00"/>20:00h
                            <input type="radio" className="league-info__name" name="time" value="20:30"/>20:30h
                            <input type="radio" className="league-info__name" name="time" value="21:00"/>21:00h
                            <input type="radio" className="league-info__name" name="time" value="21:30"/>21:30h
                        </label>
                        <div className="league-info__buttons buttons">
                            <button className="buttons__confirm">Confirm</button>
                            <button className="buttons__cancel" onClick={event => {
                                event.preventDefault()

                                onBack()
                            }}>Cancel</button>
                        </div>
                    </form>
                </section>
            </div>

            {error && <Feedback message={error} onClose={onClose} />}
        </section>
}