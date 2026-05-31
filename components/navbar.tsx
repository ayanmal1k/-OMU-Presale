'use client'

import { Send } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const X_URL = 'https://x.com/OmuonSol'
const TELEGRAM_URL = 'https://t.me/Omusol'

export default function Navbar() {
  const [showLogoSmoke, setShowLogoSmoke] = useState(false)
  const smokeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (smokeTimeoutRef.current) {
        clearTimeout(smokeTimeoutRef.current)
      }
    }
  }, [])

  const handleLogoClick = () => {
    if (smokeTimeoutRef.current) {
      clearTimeout(smokeTimeoutRef.current)
    }

    setShowLogoSmoke(true)
    smokeTimeoutRef.current = setTimeout(() => {
      setShowLogoSmoke(false)
      smokeTimeoutRef.current = null
    }, 1200)
  }

  return (
    <div className="sticky top-0 z-50 flex w-full justify-center px-3 py-4 sm:px-6 sm:py-6">
      <nav
        className="flex w-full max-w-[1600px] items-center justify-between gap-3 rounded-2xl border-4 px-4 py-3 sm:gap-4 sm:rounded-3xl sm:px-8 sm:py-6"
        style={{
          backgroundColor: '#FEF7E3',
          borderColor: '#611F2B',
          boxShadow: '6px 6px 0px rgba(97, 31, 43, 0.2)',
        }}
      >
        {/* Logo and Text */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <motion.div
            onClick={handleLogoClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            className="relative shrink-0 cursor-pointer"
          >
            {/* Smoke GIF behind logo */}
            <motion.div
              initial={false}
              animate={{ opacity: showLogoSmoke ? 0.75 : 0 }}
              whileHover={{ opacity: 0.75 }}
              transition={{ duration: 0.3 }}
              className="block"
              style={{
                position: 'absolute',
                inset: -24,
                zIndex: 5,
              }}
            >
              <Image
                src="/smoke.gif"
                alt="Smoke"
                width={160}
                height={160}
                className="h-full w-full"
                unoptimized
              />
            </motion.div>
            
            <Image
              src="/logo.png"
              alt="OMU Logo"
              width={80}
              height={80}
              className="relative z-10 h-12 w-12 rounded sm:h-20 sm:w-20"
            />
          </motion.div>
          <span
            className="whitespace-nowrap text-[2.05rem] sm:text-[3rem]"
            style={{
              color: '#611F2B',
              fontFamily: "'Uberhand Pro Extrabold', sans-serif",
              fontWeight: 900,
              letterSpacing: '-0.02em',
              fontStyle: 'normal',
              WebkitTextStroke: '0.8px #611F2B',
              textShadow: '-0.8px -0.8px 0 #611F2B, 0.8px -0.8px 0 #611F2B, -0.8px 0.8px 0 #611F2B, 0.8px 0.8px 0 #611F2B',
            }}
          >
            $OMU
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {/* Telegram Button */}
          <motion.a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border-3 transition-all sm:h-auto sm:w-auto sm:rounded-2xl sm:p-4"
            style={{
              borderColor: '#611F2B',
              backgroundColor: '#FEF7E3',
              boxShadow: '3px 3px 0px #611F2B',
            }}
            aria-label="Telegram"
          >
            <Send
              className="h-5 w-5 sm:h-6 sm:w-6"
              style={{ color: '#611F2B' }}
            />
          </motion.a>

          {/* X Button */}
          <motion.a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border-3 transition-all sm:h-auto sm:w-auto sm:rounded-2xl sm:p-4"
            style={{
              borderColor: '#611F2B',
              backgroundColor: '#FEF7E3',
              boxShadow: '3px 3px 0px #611F2B',
            }}
            aria-label="X"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="currentColor"
              style={{ color: '#611F2B' }}
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l8.248-9.427L1.746 2.25h6.828l4.713 6.231 4.957-6.231Zm-1.161 17.52h1.833L7.58 4.126H5.613L17.083 19.77Z" />
            </svg>
          </motion.a>
        </div>
      </nav>
    </div>
  )
}
