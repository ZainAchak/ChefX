import React from 'react'
import styles from './HeaderComp.module.css'
import logo from '../../assets/chefx-logo.png'

export default function HeaderComp(){
    return(
        <header>
            <img src={logo} className={styles.logo} alt="" />
            <h1 className={styles.title}>Chef X</h1>
        </header>
    )
}