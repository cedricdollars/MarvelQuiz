import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from '../firebase'

const Logout = () => {

    const firebase = useContext(FirebaseContext)
    const [checked, setChecked] =  useState(false)

    useEffect(() => {
        if(checked) {
           // console.log("Déconnexion");
            firebase.logoutUser();
        }
    }, [checked, firebase])

    const handleChange = event => {
        setChecked(event.target.checked)
    }
    return (
        <div className="logoutContainer">
            <label className="switch">
                <input 
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}
export default Logout