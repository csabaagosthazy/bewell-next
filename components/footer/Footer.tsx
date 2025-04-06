'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import RestoreIcon from '@mui/icons-material/Restore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import './Footer.css'
import CustomText from '../CustomText/CustomText'

export default function Footer() {
  const [value, setValue] = React.useState(0)

  return (
    <Box>
      <BottomNavigation
        className='footer'
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        <CustomText tName='navigation' tKey='home' textType='nav-button' />
        <BottomNavigationAction label='Recents' icon={<RestoreIcon />} />
        <BottomNavigationAction label='Favorites' icon={<FavoriteIcon />} />
        <BottomNavigationAction label='Nearby' icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  )
}

// <Box className='footer' sx={{ width: 500 }}>
