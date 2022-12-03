import React from 'react'
import { NavLink } from "react-router-dom"


function Landing(props) {
  return (
    <div>
        <h1> Bienvenido al Landing Page - Presiona en Ingresar para continuar</h1>
        <NavLink to="home">
            <div>Ingresar</div>
        </NavLink>
    </div>
  )
}

export default Landing