import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div>
            <header>
                <div className="banner-container">
                    <Link to='/'><h1>Marvel quiz</h1></Link>
                </div>
            </header>
        </div>
    )
}
export default Header