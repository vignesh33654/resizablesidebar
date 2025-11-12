import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <h1 className="text-primary">Primary</h1>
      <h1 className="text-secondary">Secondary</h1>
    </>
  )
}
