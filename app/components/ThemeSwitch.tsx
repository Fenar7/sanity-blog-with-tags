"use client";

import React from 'react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from './icons';

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
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='border border-purple-500 rounded-2xl p-1 hover:bg-purple-500 hover:bg-opacity-10
    dark:hover:bg-opacity-10 dark:hover:bg-amber-50'>
      {theme == 'dark' ? <SunIcon/> : <MoonIcon/>}
    </button>
  )
}

export default ThemeSwitch