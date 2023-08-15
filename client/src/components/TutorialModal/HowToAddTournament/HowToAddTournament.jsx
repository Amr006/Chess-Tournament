import React from 'react'
import {Box, CardMedia, List, ListItem, Typography} from "@mui/material"
import Head from "../../Head/Head"
import howToAddTournamentVideo from "../../../static/videos/howToAddTournament.mp4"
import styles from "./HowToAddTournament.module.css"
import { useTheme } from '@emotion/react'

const HowToAddTournament = () => {
  const theme = useTheme()
  return (
    <Box className={`grid-center ${styles.howToAddTournament}`}>
      <Head line={true} h = {"h4"} align="left" title={"How To Add Your Tournament"} list={true}/>
      <List>
        <ListItem>
          <Typography variant='h5'>♟️ You should to set date of tournament early 2 minutes at least because the Joining of Tournament will be closed before the start date by 2 minutes.</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h5'>♟️ You shouldn't set Tournament Name that is already exist.</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h5'>♟️ You should to set a number powered of 2 in 'Maximum Number of Players' Input if You chosen Bracket.</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h5'>♟️ You should to set a Even Number in 'Maximum Number of Players' Input if You chosen Points.</Typography>
        </ListItem>
        <ListItem>
          <Typography variant='h5'>♟️ Make sure that your friends steady to join Tournament after you had created it</Typography>
        </ListItem>
        <ListItem>
          <Typography sx={{color:theme.palette.primary.main}} variant='h5'>♟️ Don't forgot to Enjoy. 😎</Typography>
        </ListItem>
      </List>
      <CardMedia className={`${styles.vidoe}`} loop component={"video"} controls autoPlay muted src={howToAddTournamentVideo}/>
    </Box>
  )
}

export default HowToAddTournament
