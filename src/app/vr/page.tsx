'use client'
import React, { useState, useEffect } from 'react'

export default function VrPage() {
  const [objects, setObjects] = useState<Array<any>>([])
  const [prompt, setPrompt] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('aframe')
    }
  }, [])

  const sendPrompt = async () => {
    const resp = await fetch('/api/vr-agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
    const data = await resp.json()
    setObjects([...objects, data.entity])
    setPrompt('')
  }

  const sceneMarkup = `
    <a-scene embedded style="height:80vh">
      <a-assets></a-assets>
      <a-entity position="0 1.6 0">
        <a-camera></a-camera>
      </a-entity>
      ${objects
        .map(o => `<a-entity geometry="primitive: ${o.shape}" material="color: ${o.color}" position="${o.position}"></a-entity>`)
        .join('')}
    </a-scene>
  `

  return (
    <div>
      <input value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Describe an object" />
      <button onClick={sendPrompt}>Create</button>
      <div dangerouslySetInnerHTML={{ __html: sceneMarkup }} />
    </div>
  )
}
