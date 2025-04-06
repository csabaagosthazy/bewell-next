'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'
import CustomDialog from '@/components/CustomDialog/CustomDialog'
import { TextUpdateDialog } from '@/components/CustomDialog/TextUpdate/TextUpdateDialog'

interface ModelContextType {
  isOpen: boolean
  content: any
  openModal: (type: ModalType, modalContent: any) => void
  closeModal: () => void
}

type ModalType = 'text' | 'image' | 'video'

const ModalContext = createContext<ModelContextType | null>(null)

export const ModalProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [type, setType] = useState<ModalType | null>(null)
  const [content, setContent] = useState<any>(null)

  const openModal = (type: ModalType, modalContent: any) => {
    setType(type)
    setContent(modalContent)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setContent(null)
    setType(null)
  }

  const handleSave = () => {
    console.log('saving...')
    setIsOpen(false)
  }

  const ModalDialog = () => {
    if (type === 'text') {
      return (
        <TextUpdateDialog
          nameSpace={content?.tName}
          textKey={content.tKey}
          open={isOpen}
          handleClose={closeModal}
        />
      )
    }
  }

  return (
    <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
      {children}
      {isOpen && <ModalDialog />}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModelContextType => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('use modal must be used within a ModalProvider')
  }

  return context
}
