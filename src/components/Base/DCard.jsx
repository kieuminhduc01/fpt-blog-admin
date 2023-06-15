import React from 'react'

export default function DCard({ children }) {
  return (
    <div
      id="DCard"
      style={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: `0px 20px 27px #f8f8f8`,
      }}
    >
      {children}
    </div>
  )
}
