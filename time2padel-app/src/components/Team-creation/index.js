import React from 'react'
import './index.sass'
import Feedback from '../Feedback'

export default function ({ error, username, onClose, onBack, onCreateNewTeam }) {
    return <section className="team-creation">
                <div className="team-creation__container container" >
                    <h2 className="container__title">Team Creation</h2>
                    <section className="container__players-info players-info">
                        <form className="players-info__box box" onSubmit={event => {
                                event.preventDefault()

                                const { usernamep2: { value: username }, title: { value: title } } = event.target

                                onCreateNewTeam(username,title)
                            }} >
                            <div className="box__form1">
                                <h3 className="box__title">Player1</h3>
                                <label>Username: <input type="text" className="box_name" defaultValue={username} name="username" readOnly/></label>
                            </div>
                            <div className="box__form2">
                                <h3 className="box__title">Player2</h3>
                                <label>Username: <input type="text" className="box_name" name="usernamep2" required/></label>
                            </div>
                            <span className="box__message">A request will be sent to your teammate! 👍🏻🎾</span>
                            <div className="box__teamtitle">
                                <h3 className="box__title">Team Title</h3>
                                <label>Name: <input type="text" className="box_name" name="title" required/></label>
                            </div>
                            <div className="box__buttons buttons"> 
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