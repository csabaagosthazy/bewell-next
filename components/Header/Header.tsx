'use client'
import Link from 'next/link'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

import AccountCircle from '@mui/icons-material/AccountCircle'

import './Header.css'
import { hiddenNavItems, adminItems } from '@/app_config'
import { Locale } from '@/i18n.config'
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher'
import { useTranslation } from '@/providers/TranslationProvider'
import CustomText from '@/components/CustomText/CustomText'
import { NameSpace } from '@/lib/translations'

import { signOut, useSession } from 'next-auth/react'

const NAMESPACE: NameSpace = 'navigation'

function NavBar({ lang }: { lang: Locale }) {
  const { getLocaleNameSpace } = useTranslation()
  const navigationItems = getLocaleNameSpace(NAMESPACE)
  const { data: session } = useSession()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position='static' sx={{ backgroundColor: '#5e503f' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <IconButton sx={{ p: 0 }}>
              <Link href={`/${lang}`}>
                <Avatar alt='Home' src='/favicon.ico' />
              </Link>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navigationItems &&
                Object.entries(navigationItems).map(
                  ([pageKey, value]) =>
                    pageKey !== 'home' &&
                    !hiddenNavItems.includes(pageKey) && (
                      <MenuItem key={pageKey} onClick={handleCloseNavMenu}>
                        <Link href={`/${lang}/${pageKey}`}>{value}</Link>
                      </MenuItem>
                    )
                )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navigationItems &&
              Object.keys(navigationItems).map(
                pageKey =>
                  pageKey !== 'home' &&
                  !hiddenNavItems.includes(pageKey) && (
                    <MenuItem key={pageKey} onClick={handleCloseNavMenu}>
                      <Link href={`/${lang}/${pageKey}`}>
                        {' '}
                        <CustomText
                          tName={NAMESPACE}
                          tKey={pageKey}
                          textType='nav-button'
                        />
                      </Link>
                    </MenuItem>
                  )
              )}
          </Box>
          <Box sx={{ display: 'flex', mr: 1 }}>
            <LocaleSwitcher currentLocale={lang} />
          </Box>
          {session && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  color='inherit'
                >
                  <AccountCircle fontSize='large' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {adminItems.map(item => (
                  <MenuItem key={item} onClick={handleCloseUserMenu}>
                    <Link href={`/${lang}/${item.toLowerCase()}`}>
                      <Typography sx={{ textAlign: 'center' }}>
                        {item}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
                <MenuItem onClick={() => signOut()}>
                  <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
