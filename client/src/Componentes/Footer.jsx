import React from 'react'
import { useNavigate } from 'react-router-dom'
import './css/Footer.css'

const Footer = () => {
    const navigate = useNavigate();

    const handleSoporteClick = () =>{
        navigate("/contacto");
    }

  return (
    <div>
        
        <div className="footer">
            <p>¿Necesitas ayuda?</p>
            <h6 onClick={handleSoporteClick} className='btn-contacto' >Contacta a soporte</h6>
        </div>

    </div>
  )
}

export default Footer