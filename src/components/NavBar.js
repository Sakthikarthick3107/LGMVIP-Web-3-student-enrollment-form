
import { Box, Typography } from '@mui/material'
import React from 'react'

const NavBar = () => {
  return (
    <>
      <Typography variant='h2' textAlign='center' fontWeight='bold'>SAMPLE</Typography>
      <Box display='flex' alignItems='center' justifyContent='center' sx={{height: 40 , backgroundColor:'#009688'}}>
        <Typography variant='h5' color='white'>Student Enrollment Form</Typography>
      </Box>
      <br/>
    </>
  )
}

export default NavBar
