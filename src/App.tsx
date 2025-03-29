import React from 'react'
import './App.css'
import ConfigurationForm from './components/ConfigurationForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-purple-300">Configuration Setup</h1>
        <ConfigurationForm />
      </div>
    </div>
  )
}

export default App
