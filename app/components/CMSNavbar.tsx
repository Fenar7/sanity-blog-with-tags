import React from 'react'
import { Lilita_One } from '@next/font/google'
import Link from 'next/link';
import { BackArrowIcon } from './icons';

const font = Lilita_One({
    weight: "400", // Ensure the weight is a string
    subsets: ["latin"],
});

const CMSNavbar = () => {
  return (
    <div className='flex justify-between items-center py-1 px-5'>
        <Link href='/'>
        <BackArrowIcon/>
        </Link>
        <div className={`${font.className} text-3xl dark:text-amber-50`}>
                  Dev
                  <span className='text-purple-500'>Blog</span>
        </div>
    </div>
  )
}

export default CMSNavbar