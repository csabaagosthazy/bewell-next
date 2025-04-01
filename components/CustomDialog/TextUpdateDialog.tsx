'use client'
import { NameSpace } from '@/lib/translations'
import React, { useState, useEffect } from 'react'
import CustomDialog from './CustomDialog'
import { TextField, Box } from '@mui/material'
import { useTranslation } from '@/providers/TranslationProvider'

export const TextUpdateDialog = ({
  nameSpace,
  textKey,
  open,
  handleClose
}: {
  nameSpace: NameSpace
  textKey: string
  open: boolean
  handleClose: () => void
}) => {
  const { getValueForAllLocales } = useTranslation()
  const [values, setValues] = useState({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  useEffect(() => {
    const texts = getValueForAllLocales(nameSpace, textKey)
    setValues(texts)

    return () => {
      setValues({})
    }
  }, [nameSpace, textKey])

  const handleSave = (): void => {
    console.log('saving...')

    console.log(values)
    handleClose()
  }

  // get texts from translations by key

  // open dialog
  // save text
  // close dialog

  return (
    <CustomDialog
      title='Update translation text'
      content={<TextBoxes handleChange={handleChange} values={values} />}
      okText='Update'
      cancelText='Cancel'
      handleOk={handleSave}
      handleCancel={handleClose}
      open={open}
      handleClose={handleClose}
    />
  )
}

const TextBoxes = ({
  handleChange,
  values
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  values: Object
}) => {
  const hasValues = values && Object.keys(values).length
  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      sx={{
        borderRadius: 2,
        p: 2,
        minWidth: 300
      }}
    >
      {hasValues &&
        Object.keys(values).map((key: string) => (
          <TextField
            key={key}
            label={key}
            name={key}
            value={values[key as keyof typeof values]}
            onChange={handleChange}
            variant='outlined'
          />
        ))}
    </Box>
  )
}
