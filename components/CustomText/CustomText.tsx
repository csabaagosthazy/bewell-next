'use client'
import React, { useState } from 'react'
import './CustomText.css'
import Stack from '@mui/material/Stack'

import { useSession } from 'next-auth/react'

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import CustomDialog from '../CustomDialog/CustomDialog'
import { TextUpdateDialog } from '../CustomDialog/TextUpdateDialog'

interface CustomTextProps {
  children: React.ReactNode
  textType: string
}

export default function CustomText({ children, textType }: CustomTextProps) {
  const { data: session } = useSession()

  const [isHover, setIsHover] = useState(false)
  const [open, setOpen] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = () => {
    console.log('save')
    setOpen(false)
  }

  return (
    <>
      <TextUpdateDialog nameSpace={'home'} textKey={'title'} />
      <Stack
        direction='row'
        spacing={1}
        sx={{
          alignItems: 'center'
        }}
      >
        <p className={isHover ? 'text-hovered' : 'text'}>{children}</p>
        {session && (
          <BorderColorOutlinedIcon
            fontSize='small'
            color='success'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClickOpen}
          />
        )}
      </Stack>
      <CustomDialog
        title='title'
        content='content'
        okText='ok'
        cancelText='Cancel'
        handleOk={handleSave}
        handleCancel={handleClose}
        open={open}
        handleClose={handleClose}
      />
    </>
  )
}
