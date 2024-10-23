"use client";

import React from 'react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(()=>{
      setMounted(true)
    },[])

  if(!mounted){
    return null
  }
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>Theme Switch</button>
  )
}

export default ThemeSwitch