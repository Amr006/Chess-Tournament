import { Box, List, ListItem, Typography, useTheme } from '@mui/material'
import React from 'react'
import Head from '../../../Head/Head'
import BracketsTournamentImg1 from "../../../../static/images/brackets1.png"
import BracketsTournamentImg2 from "../../../../static/images/brackets2.png"
import BracketsTournamentImg3 from "../../../../static/images/brackets3.png"
import styles from "../HowToTournaments.module.css"

const HowToBracketsTournament = () => {
  const theme = useTheme()
  return (
    <Box className={`grid-stretch ${styles.howToPointsTournament}`}>
      <Head line={true} h = {"h4"} align="left" title={"Brackets Tournament"}/>
      <List>
        <ListItem className={`grid-start`}>
          <Typography variant='h5'>♟️ There are three Buttons : </Typography>
          <List>
            <ListItem>
              <Typography variant='h6'>⏺️ Match Button : Go to Match of The Round</Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6'>🆚 Abort Button : You can abort Match if your challenger will be lated more than 10 minutes and you already joined The Match</Typography>
            </ListItem>
            <ListItem>
              <Typography variant='h6'>🆑 Finish Button : You can clicked on it when The Match will be Finished.</Typography>
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Typography variant='h5'>♟️ To Win Bracket Tournament , You should win all The Matches 🤬</Typography>
        </ListItem>
      </List>
      <Box className={`flex-center  ${styles.images}`}>
        <Box className={"grid-center"}>
          <Typography variant='h6' className={`tac`}>Round 1</Typography>
          <Box component={"img"} alt="view of points tournament" src={BracketsTournamentImg1} />
        </Box>
        <Box className={"grid-center"}>
          <Typography variant='h6' className={`tac`}>Round 2</Typography>
          <Box component={"img"} alt="player view of points tournament" src={BracketsTournamentImg2} />
        </Box>
        <Box className={"grid-center"}>
          <Typography variant='h6' className={`tac`}>Winner</Typography>
          <Box component={"img"} alt="player view of points tournament" src={BracketsTournamentImg3} />
        </Box>
      </Box>
    </Box>
  )
}

export default HowToBracketsTournament
