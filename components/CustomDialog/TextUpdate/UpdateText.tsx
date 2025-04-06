'use client'

import { useState } from 'react'

export default function UpdateJsonComponent() {
  const [status, setStatus] = useState<string | null>(null)

  const handleUpdate = async () => {
    const fileId = 'your-file-id-here' // Replace with actual file ID
    const accessToken = 'next-auth-access-token' // Replace with your NextAuth access token
    const keyPath = ['level1', 'level2', 'key'] // Path to the key in nested JSON
    const newValue = 'new value' // Replace with the new value

    try {
      const response = await fetch('/api/update-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId, accessToken, keyPath, newValue })
      })

      if (response.ok) {
        const data = await response.json()
        setStatus(data.message)
      } else {
        const error = await response.json()
        setStatus(`Error: ${error.message}`)
      }
    } catch (err: any) {
      setStatus(`Error: ${err.message}`)
    }
  }

  return (
    <div>
      <button onClick={handleUpdate}>Update JSON File</button>
      {status && <p>{status}</p>}
    </div>
  )
}
