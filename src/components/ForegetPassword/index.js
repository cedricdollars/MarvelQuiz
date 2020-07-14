import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../firebase'

 const ForgetPassword = props => {

    const[email,setEmail] = useState("")
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const firebase = useContext(FirebaseContext)
      
     const handleSubmit = e => {
        e.preventDefault()
        Promise.resolve(firebase.passwordReset(email))
        .then(() => {
            setError(null);
            setSuccess(`Un email a été envoyé à ${email}, vous pouvez renouveller votre mot de passe`);
            setEmail("")
            setTimeout(() => {
                props.history.push('/login')
            }, 5000)
        })
        .catch(error => {
            console.log(error)
            setError(error)
            setEmail("");
        })
     }
     const disabled = email === ""

    return (
        <div className="signUpLoginBox">
           <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent"> 
                        {
                            success && 
                            <span style={{
                                border: "1px solid green",
                                background: "green",
                                color: "#fff"
                            }}>
                                {success}
                            </span>
                        }
                        
                        { error && <span>{error.message} </span>}
                        
                        <h2>Mot de passe oublié</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input 
                                    type="email" 
                                    value={email} 
                                    autoComplete="off" 
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <button disabled={disabled}> Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <Link className='simpleLink' to="/login">Déja inscrit? Connectez-vous!</Link>
                        </div>
                    </div>
                </div> 
           </div> 
        </div>
    )
}
export default ForgetPassword;