'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'

import { NameSpace } from '@/lib/translations'

import './Footer.css'
import CustomText from '../CustomText/CustomText'
import { useTranslation } from '@/providers/TranslationProvider'
import Link from 'next/link'
import { Stack } from '@mui/material'
const NAMESPACE: NameSpace = 'footer'
export default function Footer() {
  const { t } = useTranslation()
  return (
    <Box>
      <BottomNavigation className='footer'>
        <Box className='footer-icons'>
          <Stack
            className='footer-stack'
            spacing={{ xs: 1, sm: 1 }}
            direction='row'
          >
            <PhoneIcon className='footer-icon' />
            <CustomText
              tName={NAMESPACE}
              tKey={'phone'}
              textType='footer-label'
            />
          </Stack>
          <Stack
            className='footer-stack'
            spacing={{ xs: 1, sm: 1 }}
            direction='row'
          >
            <EmailIcon className='footer-icon' />
            <CustomText
              tName={NAMESPACE}
              tKey={'email'}
              textType='footer-label'
            />
          </Stack>
          <Stack
            className='footer-stack'
            spacing={{ xs: 1, sm: 1 }}
            direction='row'
          >
            <TextSnippetIcon className='footer-icon' />
            <Link href={'/imprint'}>
              <CustomText
                tName={NAMESPACE}
                tKey={'imprint'}
                textType='footer-label'
              />
            </Link>
          </Stack>
        </Box>
        <Box className='footer-copyright'>
          <CustomText
            tName={NAMESPACE}
            tKey={'copyright'}
            textType='footer-text'
          />
        </Box>
      </BottomNavigation>
    </Box>
  )
}

// <Box className='footer' sx={{ width: 500 }}>

{
  /* <BottomNavigationAction
showLabel
label={
  <CustomText
    tName={NAMESPACE}
    tKey={'phone'}
    textType='footer-label'
  />
}
icon={<PhoneIcon className='footer-icon' />}
/>
<BottomNavigationAction
showLabel
label={
  <CustomText
    tName={NAMESPACE}
    tKey={'email'}
    textType='footer-label'
  />
}
icon={<EmailIcon className='footer-icon' />}
/>
<BottomNavigationAction
showLabel
label={
  <Link href={'/imprint'}>
    <CustomText
      tName={NAMESPACE}
      tKey={'imprint'}
      textType='footer-label'
    />
  </Link>
}
icon={<TextSnippetIcon className='footer-icon' />}
/> */
}
