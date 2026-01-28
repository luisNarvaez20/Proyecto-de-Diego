import React from 'react'
import  auth  from '@/auth'

export default async function Page() {

  const session = await auth()
  if (!session) {
    return <p>Access Denied</p>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
    </div>
  )
}