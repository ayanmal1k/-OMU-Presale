'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HowToBuySection() {
  return (
    <div className="mt-32 px-2 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl"
      >
        <h3
          className="text-center text-4xl sm:text-5xl mb-4"
          style={{
            color: '#611F2B',
            fontFamily: "'Uberhand Pro Extrabold', sans-serif",
            fontWeight: 900,
            fontSize: '3rem',
            letterSpacing: '-0.02em',
            fontStyle: 'normal',
            WebkitTextStroke: '0.8px #611F2B',
            textShadow: '-0.8px -0.8px 0 #611F2B, 0.8px -0.8px 0 #611F2B, -0.8px 0.8px 0 #611F2B, 0.8px 0.8px 0 #611F2B',
          }}
        >
          How to Buy $OMU
        </h3>
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {[
            {
              step: '01',
              title: 'Choose Your Investment',
              text: 'Pick the SOL amount you want to invest and see your expected $OMU amount instantly.',
              image: '/htb/step1.png',
            },
            {
              step: '02',
              title: 'Send SOL',
              text: 'Connect your wallet, send SOL, and confirm the transaction to lock in your buy.',
              image: '/htb/step2.png',
            },
            {
              step: '03',
              title: 'Verify and Receive',
              text: 'Verify the transfer and receive your $OMU when the presale allocation is ready.',
              image: '/htb/step3.png',
            },
          ].map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.12, type: 'spring', stiffness: 120, damping: 16 }}
              whileHover={{ y: -10, scale: 1.04 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-5 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={280}
                  height={280}
                  className="h-52 w-52 object-contain sm:h-64 sm:w-64"
                />
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span
                  className="text-4xl sm:text-5xl leading-none"
                  style={{
                    color: '#611F2B',
                    fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                    fontWeight: 900,
                  }}
                >
                  {item.step}
                </span>
                <h4
                  className="text-2xl sm:text-3xl leading-tight"
                  style={{
                    color: '#611F2B',
                    fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                    fontWeight: 900,
                    fontSize: '2rem',
                    letterSpacing: '-0.02em',
                    fontStyle: 'normal',
                    WebkitTextStroke: '0.8px #611F2B',
                    textShadow: '-0.8px -0.8px 0 #611F2B, 0.8px -0.8px 0 #611F2B, -0.8px 0.8px 0 #611F2B, 0.8px 0.8px 0 #611F2B',
                  }}
                >
                  {item.title}
                </h4>
              </div>

              <p
                className="max-w-sm text-sm sm:text-base leading-6"
                style={{
                  color: '#611F2B',
                  fontFamily: 'sans-serif',
                  fontWeight: 400,
                  fontStyle: 'normal',
                }}
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}