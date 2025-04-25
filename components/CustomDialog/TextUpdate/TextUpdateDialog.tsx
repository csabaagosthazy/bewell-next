'use client'
import { NameSpace } from '@/lib/translations'
import React, { useState } from 'react'
import CustomDialog from '../CustomDialog'
import { TextField, Box } from '@mui/material'
import { useTranslation } from '@/providers/TranslationProvider'
import { checkObjectChanges, getObjectDifferences } from '@/utils/common'

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
  const { getValueForAllLocales, getAllTranslations } = useTranslation()
  const [initValues, _] = useState(getValueForAllLocales(nameSpace, textKey))
  const [values, setValues] = useState(initValues)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  const handleSave = (): void => {
    console.log('saving...')
    const diff = getObjectDifferences(initValues, values)
    const allTranslations = getAllTranslations()
    fetch('/api/update-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        translations: allTranslations,
        nameSpace,
        key: textKey,
        newValues: diff
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(() => handleClose())
  }

  return (
    <CustomDialog
      title='Update translation text'
      content={
        <TextBoxes
          initValues={initValues}
          handleChange={handleChange}
          values={values}
        />
      }
      okText='Update'
      okButtonDisabled={!checkObjectChanges(initValues, values)}
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
  initValues,
  values
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  initValues: Record<string, any>
  values: Record<string, any>
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
            helperText={initValues[key as keyof typeof initValues]}
            focused
          />
        ))}
    </Box>
  )
}
