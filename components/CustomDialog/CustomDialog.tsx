import React, { ReactNode } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function CustomDialog({
  title,
  content,
  okText,
  cancelText,
  open,
  handleOk,
  handleCancel,
  handleClose
}: {
  title: string
  content: ReactNode
  okText: string
  cancelText: string
  open: boolean
  handleOk: () => void
  handleCancel: () => void
  handleClose: () => void
}) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{cancelText}</Button>
          <Button onClick={handleOk} autoFocus>
            {okText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
