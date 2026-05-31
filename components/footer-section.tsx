'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

const X_URL = 'https://x.com/OmuonSol'
const TELEGRAM_URL = 'https://t.me/Omusol'

export default function FooterSection() {
  return (
    <footer
      className="relative mt-28 border-t-4 px-4 pb-6 pt-20 sm:mt-16 sm:px-6 sm:pb-0 sm:pt-3"
      style={{
        backgroundColor: '#FEF7E3',
        borderColor: '#611F2B',
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 sm:grid-cols-[auto_1fr_auto] sm:gap-4">
        <div className="pointer-events-none absolute left-1/2 top-0 flex w-full -translate-x-1/2 -translate-y-[64%] justify-center sm:pointer-events-auto sm:static sm:w-auto sm:translate-x-0 sm:translate-y-0 sm:self-end sm:justify-start">
          <Image
            src="/prisoner sleep.png"
            alt="Sleeping Prisoner OMU"
            width={260}
            height={160}
            className="block h-32 w-[230px] object-contain drop-shadow-[6px_8px_0px_rgba(97,31,43,0.15)] sm:hidden"
          />
          <Image
            src="/prisoner-omu.png"
            alt="Prisoner OMU"
            width={180}
            height={180}
            className="hidden object-contain sm:block sm:-mt-20 sm:h-56 sm:w-56"
          />
        </div>

        <p
          className="self-center text-center text-sm font-bold leading-snug sm:justify-self-center sm:text-base"
          style={{
            color: '#611F2B',
            fontFamily: "'Uberhand Pro Extrabold', sans-serif",
            fontWeight: 900,
            letterSpacing: '-0.01em',
          }}
        >
          &copy; 2026 $OMU. All rights reserved.
        </p>

        <div className="self-center flex items-center justify-center gap-3 sm:justify-end sm:gap-4">
          <motion.a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl border-3 transition-all sm:h-auto sm:w-auto sm:rounded-2xl sm:p-4"
            style={{
              borderColor: '#611F2B',
              backgroundColor: '#FEF7E3',
              boxShadow: '4px 4px 0px #611F2B',
            }}
            aria-label="Telegram"
          >
            <Send className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: '#611F2B' }} />
          </motion.a>

          <motion.a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-12 w-12 items-center justify-center rounded-xl border-3 transition-all sm:h-auto sm:w-auto sm:rounded-2xl sm:p-4"
            style={{
              borderColor: '#611F2B',
              backgroundColor: '#FEF7E3',
              boxShadow: '4px 4px 0px #611F2B',
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
      </div>
    </footer>
  )
}
