'use client'
import React from 'react'

type Props = {
  textKey: string
}
export const TextUpdateDialog = ({ textKey }: Props) => {
  // get texts from dictionary by key
  fetch('/api/hello')
    .then(res => res.json())
    .then(data => console.log(data))

  // open dialog
  // save text
  // close dialog

  return <div></div>
}
