import React, { useState, useEffect } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom'
import './index.sass'
//COMPONENTS
import Header from '../Header'
import Footer from '../Footer'
import Landing from '../Landing'
import RegistrationPage from '../Registration-page'
import Main from '../Main'
import UserPage from '../Userpage'
import MyTeams from '../Myteams'
import MyPendingteams from '../Mypendingteams'
import TeamCreation from '../Team-creation'
import Leagues from '../Leagues'
import LeagueDetail from '../League-detail'
import LeagueCreation from '../League-creation'
import TeamRegistration from '../Team-registration'

//LOGIC
import { authenticateUser, registerUser, retrieveUser, modifyUser, createTeam, retrieveUserTeams,
    updateTeam, retrieveLeagues, createLeague, retrieveLeague, addTeamToLeague } from '../../logic'

export default withRouter(function ({ history }) { 
    const [name, setName] = useState()
    const [surname, setSurname] = useState()
    const [username, setUsername] = useState()
    const [gender, setGender] = useState()
    const [email, setEmail] = useState()
	const [error, setError] = useState()
    const [id, setId] = useState()
    const [teams, setTeams] = useState([])
    const [leagues, setLeagues] = useState([])
    const [league, setLeague] = useState()
    

    useEffect(() => {   
        const { token } = sessionStorage;   

        (async () => { 
            if (token) {                
                const { name } = await retrieveUser(token)
                const { surname } = await retrieveUser(token)         
                const { username } = await retrieveUser(token)         
                const { gender } = await retrieveUser(token)
                const { email } = await retrieveUser(token)
                const { id } = await retrieveUser(token)

                setName(name)
                setSurname(surname)
                setUsername(username)
                setGender(gender)
                setEmail(email)
                setId(id)
            }
        })()
    }, [sessionStorage.token])


    //LANDING
    function handleGoToRegistrationPage() { history.push('/registration-page') }


    //REGISTRATION-PAGE
    async function handleSignIn(username, password) {
        try {
            const token = await authenticateUser(username, password)

            sessionStorage.token = token

            history.push('/main')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    async function handleSignUp(name, surname, username, gender, email, password) {
        try {
            await registerUser(name, surname, username, gender, email, password)

            history.push('/main')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    //MAIN -HEADER MENU-

    //  1) USERPAGE
    function handleGoToUserPage() { history.push('/userpage') } 
   
    // 1.1) USERINFO - MODIFY INFO
    async function handleModifyUser(username, password) {
        try {
            const token = sessionStorage.token
            
            await modifyUser(token, username, password)

            history.push('/main')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    //  2) MYTEAMS
    async function handleGoToMyTeams() { 
        try { 
            const token = sessionStorage.token
          
            const teams = await retrieveUserTeams(token)
       
            setTeams(teams)
            history.push('/myteams') 

        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    // 2.1) MYTEAMS - CREATE TEAM
    function handleCreateTeam() { history.push('/team-creation') } 

    // 2.1.2) CREATE TEAM - TEAM CREATION
    async function handleCreateNewTeam(username, title) {
        try {
            const token = sessionStorage.token
            
            await createTeam(token, username, title)
            
            const teams = await retrieveUserTeams(token)

            setTeams(teams)
            history.push('/myteams')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    // GO BACK -TO MYTEAMS FROM TEAMCREATION
    function handleGoBackMyTeams() { history.push('/myteams') }

    //  3) REQUESTS (MY PENDING TEAMS)
    async function handleGoToMyPendingTeams() { 
        try { 
        const token = sessionStorage.token
        
        const teams = await retrieveUserTeams(token)
            
        setTeams(teams)
        history.push('/mypendingteams') 

        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    // 3.1) REQUESTS - CONFIRM THE TEAM
    async function handleConfirmTeam(teamId) { 
        try { 
            const token = sessionStorage.token

            let answer = 'true'

            await updateTeam(token, teamId, answer)

            const teams = await retrieveUserTeams(token)
                
            setTeams(teams)
            history.push('/main') 

        } catch (error) {
            const { message } = error
            setError(message)
        }
    } 
    // 3.2) REQUESTS - CANCEL THE TEAM
    async function handleCancelTeam(teamId) { 
        try { 
            const token = sessionStorage.token

            let answer = 'false'

            await updateTeam(token, teamId, answer)

            const teams = await retrieveUserTeams(token)
                
            setTeams(teams)
            history.push('/main') 

        } catch (error) {
            const { message } = error
            setError(message)
        }
    } 


    //  4) LEAGUES 
    async function handleGoToLeagues() {
        try { 
            const leagues = await retrieveLeagues()
       
            setLeagues(leagues)
            history.push('/leagues')

        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    // 4.1) LEAGUES - GO TO CREATE TEAM
    function handleCreateLeague() { history.push('/league-creation') } 

    // 4.1.1) LEAGUES - CREATE LEAGUE
    async function handleCreateNewLeague(level, gender, date, time) { 
        try { 
            await createLeague(level, gender, date, time)
            
            const leagues = await retrieveLeagues()

            setLeagues(leagues)
            history.push('/leagues')
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    // 4.1.2) LEAGUES - ADD TEAM TO LEAGUE
    async function handleGoToAddTeamToLeague(leagueId) { 
        try { 
            const token = sessionStorage.token

            const teams = await retrieveUserTeams(token)
            const league = await retrieveLeague(leagueId)
            if (league.startDate){
                league.startDate = league.startDate.split("T",12)[0]
            }
            setLeague(league)
            setTeams(teams)
            history.push('/team-registration')
        } catch (error) {
            const { message } = error
            setError(message)
        }

    }  

    async function handleAddTeamToLeague(leagueId, teamId) {
        try {     
            const league = await retrieveLeague(leagueId)  
            await addTeamToLeague(leagueId, teamId)

            setLeague(league)
            history.push('/main') 
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }

    // 4.1.3) LEAGUES - GO TO LEAGUE DETAIL
    async function handleGoLeagueDetail(leagueId) { 
        try {
            let league = await retrieveLeague(leagueId)
            
            if (league.startDate){
                league.startDate = league.startDate.split("T",12)[0]
            }

            setLeague(league)
            history.push('/league-detail') 
        } catch (error) {
            const { message } = error
            setError(message)
        }
    }



    // GO BACK -TO LEAGUES FROM LEAGUE CREATION
    function handleGoBackLeagues() { history.push('/leagues') }


    // GO BACK -TO MAIN PAGE-
    function handleGoBack() { history.push('/main') }
   

    // CLOSE ERROR
    function handleOnClose() { 
         setError(undefined)
    }

    // LOGOUT
    function handleLogout() {
        sessionStorage.clear()

        history.push('/')
    }

    const { token } = sessionStorage

    return (
            <>
                <Route exact path="/" render={() => token ? <Redirect to="/main" /> : <Landing onRegistrationPage={handleGoToRegistrationPage} />} />
                <Route path="/registration-page" render={() => token ? <Redirect to="/main" /> : <RegistrationPage onSignIn={handleSignIn} onSignUp={handleSignUp} error={error} onClose={handleOnClose} />} />  
                <Route path="/main" render={() => token ? <Main /> : <Redirect to="/" /> } /> 
                <Route path="/userpage" render={() => token ? <UserPage name={name} surname={surname} gender={gender} email={email} onModifyUser={handleModifyUser} onBack={handleGoBack} error={error} onClose={handleOnClose} /> : <Redirect to="/" />} />
                <Route path="/myteams" render={() => token ? <MyTeams onBack={handleGoBack} onCreateTeam={handleCreateTeam} teams={teams} /> : <Redirect to="/" />} />
                <Route path="/mypendingteams" render={() => token ? <MyPendingteams onBack={handleGoBack} teams={teams} id={id} onConfirmTeam={handleConfirmTeam} onCancelTeam={handleCancelTeam} /> : <Redirect to="/" />} />
                <Route path="/team-creation" render={() => token ? <TeamCreation username={username} onCreateNewTeam={handleCreateNewTeam} onBack={handleGoBackMyTeams} error={error} onClose={handleOnClose} /> : <Redirect to="/" />} />
                <Route path="/leagues" render={() => token ? <Leagues onBack={handleGoBack} onCreateLeague={handleCreateLeague} leagues={leagues} onLeagueDetail={handleGoLeagueDetail} onGoToAddTeamToLeague={handleGoToAddTeamToLeague} /> : <Redirect to="/" />} />
                <Route path="/league-creation" render={() => token ? <LeagueCreation onBack={handleGoBackLeagues} onCreateNewLeague={handleCreateNewLeague} error={error} onClose={handleOnClose} /> : <Redirect to="/" />} />
                <Route path="/league-detail" render={() => token ? <LeagueDetail onBack={handleGoBackLeagues} error={error} onClose={handleOnClose} teams={teams} league={league} /> : <Redirect to="/" />} />
                <Route path="/team-registration" render={() => token ? <TeamRegistration onBack={handleGoBackLeagues} error={error} onClose={handleOnClose} teams={teams} onAddTeamToLeague={handleAddTeamToLeague} league={league} /> : <Redirect to="/" />} />

                { token && <> <Header onLogout={handleLogout} name={name} onUserInfo={handleGoToUserPage} onMyTeams={handleGoToMyTeams} onLeagues={handleGoToLeagues} onMyPendingTeams={handleGoToMyPendingTeams} error={error} /> <Footer /> </>}
            </>
    )
})


