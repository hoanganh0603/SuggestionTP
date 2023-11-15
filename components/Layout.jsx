import React from 'react'
import Head from 'next/head'
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({ children }) {
  return (
    <div className='p-[10px]'>
        <Head>
            <title>Check Report</title>
        </Head>
        <header>
            <Navbar/>
        </header>
        <main>
            {children}
        </main>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}
