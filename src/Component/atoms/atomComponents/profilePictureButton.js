import React from 'react'
import styles from "../atomStyles/profileButton.module.css"
function ProfilePictureButton({name}){
    return(
        <button className ={styles.button} >
            {name}
        </button>
    )
}
export default ProfilePictureButton
