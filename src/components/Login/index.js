import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../firebase'

 function Login(props) {

    const firebase = useContext(FirebaseContext)
    
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState('')

    localStorage.getItem("user");

    useEffect(() => {
        if(password.length > 5 && email !== ''){
            setBtn(true)
        }else if(btn) {
            setBtn(false)
        }
    }, [email, password, btn])

    const handleSubmit = e => {
        e.preventDefault()
        Promise.resolve(firebase.loginUser(email, password))
        .then(user => {
            console.log(user)
            setEmail('')
            setPassword('')
            props.history.push('/welcome')
            localStorage.setItem("user", user);
        })
        .catch(error => {
            setError(error);
            setEmail('');
            setPassword('');
        })
    }
    return (
        <div className="signUpLoginBox">
           <div className="slContainer">
                <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent"> 

                        {error !== '' && <span>{error.message}</span>}
                        <h2>Connexion</h2>
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
                            <div className="inputBox">
                                <input 
                                    type="password" 
                                    value={password} 
                                    autoComplete="off" 
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                        </form>
                        <div className="linkContainer">
                            <Link className='simpleLink' to="/signup">Inscrivez-vous maintenant!</Link>
                            <br />
                            <Link className='simpleLink' to="/forgetpassword">Mot de passe oublié? Réinitialiser-le</Link>
                        </div>
                    </div>
                </div> 
           </div> 
        </div>
    )
}
export default Login