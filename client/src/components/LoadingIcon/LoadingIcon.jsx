import React from 'react'
import {AutorenewRounded} from "@mui/icons-material"
import styles from "./LoadingIcon.module.css"

const LoadingIcon = () => {
  return (
    <AutorenewRounded className={`${styles.icon}`}/>
  )
}

export default LoadingIcon
