'use client'
import React, { useState } from 'react'
import './CustomText.css'
import Stack from '@mui/material/Stack'

import { useSession } from 'next-auth/react'

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import { useModal } from '@/providers/ModalProvider'
import { useTranslation } from '@/providers/TranslationProvider'
import { NameSpace } from '@/lib/translations'

interface CustomTextProps {
  tName: NameSpace
  tKey: string
  textType: string
}

export default function CustomText({ tName, tKey, textType }: CustomTextProps) {
  const { data: session } = useSession()
  const { t } = useTranslation()

  const { openModal } = useModal()

  const [isHover, setIsHover] = useState(false)

  const handleMouseEnter = () => {
    setIsHover(true)
  }
  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <>
      <Stack
        direction='row'
        spacing={1}
        sx={{
          alignItems: 'center'
        }}
      >
        <p className={isHover ? 'text-hovered' : 'text'}>{t(tName, tKey)}</p>
        {session && (
          <BorderColorOutlinedIcon
            fontSize='small'
            color='success'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => openModal('text', { tName, tKey })}
          />
        )}
      </Stack>
    </>
  )
}
