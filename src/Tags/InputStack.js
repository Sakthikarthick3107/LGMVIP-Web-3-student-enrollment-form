import { Stack } from '@mui/material'
import React from 'react'

const InputStack = ({children}) => {
  return (
    <>
      <Stack direction='row' spacing={1} display='flex' alignItems='center' justifyContent='space-between'>
            {children}
        </Stack>
    </>
  )
}

export default InputStack
