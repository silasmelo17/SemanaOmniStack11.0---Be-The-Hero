import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './style.css'

import logoImg from '../../assets/logo.svg'

function Profile () {
    const [ incidents, setIncidents ] = useState( [] )

    const ongId = localStorage.getItem( 'ongId' )
    const ongName = localStorage.getItem( 'ongName' )

    const history = useHistory()

    useEffect( () => {
        api
            .get( 'profile', {
                headers: {
                    Authorization: ongId
                }
            })
            .then( response => {
                setIncidents( response.data )
            })
    }, [ ongId ] ) 

    function handleLogout () {
        localStorage.clear()
        history.push( '/' )
    }

    async function handleDeleteIncident ( id ) {
        try {
            await api.delete( `incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents( incidents.filter( incident => incident.id !== id ) )
        } catch ( err ) {
            console.log( err )
            alert( 'Erro ao deletar o caso.' )
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span> Bem vinda, { ongName } </span>

                <Link className='button' to='/incidents/new' >
                    Cadastrar novo caso
                </Link>
                <button type='button' onClick={ handleLogout }>
                    <FiPower color='#e02041' size={18} />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            
            <ul>
                { incidents.map( incident =>(
                    <li key={ incident.id } >
                        <strong>CASOS:</strong>
                        <p>{ incident.title }</p>

                        <strong>DESCRIÇÂO:</strong>
                        <p>{ incident.description }</p>

                        <strong>VALOR:</strong>
                        <p>{ 
                            Intl
                            .NumberFormat( 'pt-br', { 
                                style: 'currency',
                                currency: 'BRL' 
                            })
                            .format( incident.value )}
                        </p>

                        <button onClick={ () => handleDeleteIncident( incident.id ) }>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                )) }
                
            </ul>

        </div>
    )
}

export default Profile
