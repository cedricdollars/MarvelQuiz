import React, { useState, useContext, useEffect } from 'react'
import { FirebaseContext } from '../firebase'
import Logout from '../Logout'
import Quiz from '../Quiz'

 const Welcome = props => {
    
    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState('')
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
           user ? setUserSession(user) : props.history.push('/')
        })
        if(!!userSession) {
            firebase.user(userSession.uid)
            .get()
            .then(doc => {
                if(doc && doc.exists) {
                    const myData = doc.data()
                    setUserData(myData)
                    console.log(myData)
                }
                
            })
            .catch(() => {
                console.log("Error")
            })
        }
       
        return () => {
            console.log("clean up")
            listener();
        };
    }, [firebase, props.history, userSession])

    return userSession === null ? (
        <>
            <div className="loader"></div>
        </>
        ) : (
            <div className="quiz-bg">
                <div className="container">
                    <Logout/>
                    <Quiz userData={userData} />
                </div>
            </div>
        )
  
}
export default Welcome