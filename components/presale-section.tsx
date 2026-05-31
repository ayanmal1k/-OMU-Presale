'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Copy, X } from 'lucide-react'
import HowToBuySection from './how-to-buy-section'
import FooterSection from './footer-section'
import { useToast } from '@/hooks/use-toast'

const RATE = 1333333
const RECEIVER_WALLET = process.env.NEXT_PUBLIC_OMU_WALLET_ADDRESS ?? ''
const PRESALE_RAISED_SOL = 30
const SOFT_CAP_SOL = 50
const HARD_CAP_SOL = 150

function CapProgress({
  label,
  current,
  target,
  delay,
}: {
  label: string
  current: number
  target: number
  delay: number
}) {
  const progress = Math.min((current / target) * 100, 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className="rounded-xl border-2 px-3 py-2.5 sm:px-4 sm:py-3"
      style={{ borderColor: '#611F2B', backgroundColor: '#FEF7E3' }}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <p
          className="text-sm font-black sm:text-base"
          style={{
            color: '#611F2B',
            fontFamily: "'Uberhand Pro Extrabold', sans-serif",
            fontWeight: 900,
            fontStyle: 'normal',
            WebkitTextStroke: '0.4px #611F2B',
            textShadow: '-0.4px -0.4px 0 #611F2B, 0.4px -0.4px 0 #611F2B, -0.4px 0.4px 0 #611F2B, 0.4px 0.4px 0 #611F2B',
          }}
        >
          {label}
        </p>
        <p className="shrink-0 text-sm font-black sm:text-base" style={{ color: '#611F2B' }}>
          {current}/{target} SOL
        </p>
      </div>
      <div className="h-3 overflow-hidden rounded-full border-2 border-[#611F2B] bg-[#f8e9c9]">
        <motion.div
          className="h-full rounded-full bg-[#611F2B]"
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 0.7, delay: delay + 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
}

export default function PresaleSection() {
  const [solAmount, setSolAmount] = useState<number>(1)
  const [showWalletAddress, setShowWalletAddress] = useState(false)
  const [buyAmount, setBuyAmount] = useState<number>(1)
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [verifyStatus, setVerifyStatus] = useState<'verifying' | 'success'>('verifying')
  const walletSectionRef = useRef<HTMLDivElement>(null)
  const verifyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const omuAmount = solAmount * RATE
  const purchasedOmuAmount = buyAmount * RATE
  const { toast } = useToast()

  const handleSolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0
    if (value >= 1 && value <= 5) {
      setSolAmount(value)
    }
  }

  const handleSolFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (solAmount === 0) {
      setSolAmount(0)
      e.target.select()
    }
  }

  const handleCopyWallet = async () => {
    if (!RECEIVER_WALLET) {
      toast({
        title: 'Wallet address missing',
        description: 'Set NEXT_PUBLIC_OMU_WALLET_ADDRESS to enable copy and send.',
      })
      return
    }

    try {
      await navigator.clipboard.writeText(RECEIVER_WALLET)
      toast({
        title: 'Copied',
        description: 'Wallet address copied to clipboard.',
      })
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Please copy the wallet address manually.',
      })
    }
  }

  const handleBuyClick = () => {
    setBuyAmount(solAmount)
    setShowWalletAddress(true)
    toast({
      title: 'Wallet Address',
      description: RECEIVER_WALLET || 'Set NEXT_PUBLIC_OMU_WALLET_ADDRESS',
    })
  }

  useEffect(() => {
    if (showWalletAddress) {
      walletSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [showWalletAddress])

  useEffect(() => {
    return () => {
      if (verifyTimeoutRef.current) {
        clearTimeout(verifyTimeoutRef.current)
      }
    }
  }, [])

  const handleVerifyClick = () => {
    if (verifyTimeoutRef.current) {
      clearTimeout(verifyTimeoutRef.current)
    }

    setVerifyStatus('verifying')
    setShowVerifyModal(true)
    verifyTimeoutRef.current = setTimeout(() => {
      setVerifyStatus('success')
      setShowWalletAddress(false)
      verifyTimeoutRef.current = null
    }, 3000)
  }

  const handleBackClick = () => {
    setShowWalletAddress(false)
  }

  const handleCloseVerifyModal = () => {
    if (verifyTimeoutRef.current) {
      clearTimeout(verifyTimeoutRef.current)
      verifyTimeoutRef.current = null
    }

    setShowVerifyModal(false)
  }

  return (
    <>
    <section style={{ backgroundColor: '#FEF7E3' }} className="px-4 pb-14 pt-8 sm:px-6 sm:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-2 flex justify-center px-1 lg:hidden">
          <Image
            src="/title.png"
            alt="$OMU Presale is Live"
            width={3170}
            height={1344}
            priority
            sizes="(max-width: 640px) 96vw, 620px"
            className="h-auto w-[min(96vw,620px)] object-contain"
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Side - Image and Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 flex flex-col items-center gap-8 lg:order-1 lg:items-start"
          >
            <div className="hidden w-full lg:block">
              <Image
                src="/title.png"
                alt="$OMU Presale is Live"
                width={3170}
                height={1344}
                priority
                sizes="(min-width: 1024px) 560px, 96vw"
                className="h-auto w-full max-w-[600px] object-contain lg:-ml-4 xl:max-w-[680px]"
              />
            </div>

            <Image
              src="/hero-omu.png"
              alt="OMU Hero"
              width={700}
              height={900}
              className="w-full max-w-xl rounded-2xl lg:max-w-2xl"
            />
          </motion.div>

          {/* Right Side - Presale Card */}
          <div className="group relative order-1 mt-9 overflow-visible sm:mt-14 lg:order-2 lg:mt-0">
            <Image
              src="/right-peak.png"
              alt="Decorative peak"
              width={240}
              height={240}
              className="pointer-events-none absolute right-[-160px] top-[calc(50%-10px)] z-20 hidden w-[150px] -translate-y-1/2 transition-transform duration-300 ease-out group-hover:-translate-y-[calc(50%+12px)] group-hover:translate-x-3 group-hover:scale-105 drop-shadow-[10px_10px_0px_rgba(97,31,43,0.18)] lg:block lg:w-[190px]"
            />
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
              whileHover={{ boxShadow: '16px 16px 0px rgba(97, 31, 43, 0.3)', y: -5 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-3xl border-4 p-4 pt-8 sm:p-10"
              style={{
                borderColor: '#611F2B',
                backgroundColor: '#FEF7E3',
                boxShadow: '12px 12px 0px rgba(97, 31, 43, 0.2)',
              }}
            >
            <Image
              src="/top-peak.png"
              alt="Decorative peak"
              width={220}
              height={220}
              className="pointer-events-none absolute left-1/2 top-[-70px] z-20 w-[170px] origin-bottom -translate-x-1/2 drop-shadow-[8px_8px_0px_rgba(97,31,43,0.18)] transition-transform duration-300 ease-out group-hover:-translate-x-1/2 group-hover:scale-105 lg:hidden"
            />
            {!showWalletAddress ? (
              <>
                <h3
                  style={{
                    color: '#611F2B',
                    fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    fontStyle: 'normal',
                    WebkitTextStroke: '0.8px #611F2B',
                    textShadow: '-0.8px -0.8px 0 #611F2B, 0.8px -0.8px 0 #611F2B, -0.8px 0.8px 0 #611F2B, 0.8px 0.8px 0 #611F2B',
                  }}
                  className="mb-4 text-[2rem] leading-none sm:mb-8 sm:text-[2.6rem]"
                >
                  Buy $OMU
                </h3>

                <div className="mb-5 grid gap-3 sm:mb-8">
                  <CapProgress label="Soft Cap" current={PRESALE_RAISED_SOL} target={SOFT_CAP_SOL} delay={0.1} />
                  <CapProgress label="Hard Cap" current={PRESALE_RAISED_SOL} target={HARD_CAP_SOL} delay={0.2} />
                </div>

                {/* SOL Input */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="mb-5 sm:mb-8"
                >
                  <label
                    className="mb-2 block text-sm font-bold sm:mb-3"
                    style={{
                      color: '#611F2B',
                      fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                      fontWeight: 900,
                      fontStyle: 'normal',
                      WebkitTextStroke: '0.5px #611F2B',
                      textShadow: '-0.5px -0.5px 0 #611F2B, 0.5px -0.5px 0 #611F2B, -0.5px 0.5px 0 #611F2B, 0.5px 0.5px 0 #611F2B',
                    }}
                  >
                    Amount in SOL
                  </label>
                  <motion.input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={solAmount}
                    onChange={handleSolChange}
                    onFocus={handleSolFocus}
                    className="w-full rounded-xl border-3 p-3 text-lg font-bold sm:p-4"
                    whileFocus={{
                      scale: 1.02,
                      boxShadow: '0px 0px 20px rgba(97, 31, 43, 0.2)',
                      borderColor: '#611F2B',
                    }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    style={{
                      borderColor: '#611F2B',
                      color: '#611F2B',
                      backgroundColor: '#FEF7E3',
                      fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                      fontWeight: 900,
                    }}
                    placeholder="Enter SOL amount"
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-sm font-bold sm:text-base" style={{ color: '#611F2B' }}>
                      Min: 1 SOL
                    </p>
                    <p className="text-sm font-bold sm:text-base" style={{ color: '#611F2B' }}>
                      Max: 5 SOL
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-7 sm:mb-10"
                >
                  <label
                    className="mb-2 block text-sm font-bold sm:mb-3"
                    style={{
                      color: '#611F2B',
                      fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                      fontWeight: 900,
                      fontStyle: 'normal',
                      WebkitTextStroke: '0.5px #611F2B',
                      textShadow: '-0.5px -0.5px 0 #611F2B, 0.5px -0.5px 0 #611F2B, -0.5px 0.5px 0 #611F2B, 0.5px 0.5px 0 #611F2B',
                    }}
                  >
                    You will receive
                  </label>
                  <motion.div
                    className="w-full rounded-xl border-3 p-3 text-lg font-black sm:p-5 sm:text-xl"
                    animate={{
                      scale: solAmount > 0 ? 1 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{
                      borderColor: '#611F2B',
                      backgroundColor: '#FEF7E3',
                      color: '#611F2B',
                    }}
                  >
                    {omuAmount.toLocaleString()} $OMU
                  </motion.div>
                </motion.div>

                <motion.button
                  type="button"
                  onClick={handleBuyClick}
                  whileHover={{
                    scale: 1.12,
                    boxShadow: '12px 12px 0px rgba(97, 31, 43, 0.5)',
                    backgroundColor: '#7a1a2e',
                  }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="relative w-full cursor-pointer overflow-visible rounded-2xl border-4 py-3 pt-5 text-xl font-black sm:py-4 sm:pt-6"
                  style={{
                    borderColor: '#611F2B',
                    backgroundColor: '#611F2B',
                    color: '#FEF7E3',
                    boxShadow: '6px 6px 0px rgba(97, 31, 43, 0.3)',
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="OMU logo"
                    width={78}
                    height={78}
                    className="absolute -top-6 right-2 h-14 w-14 rotate-[14deg] rounded-full border-2 border-[#611F2B] shadow-[8px_8px_0px_rgba(97,31,43,0.28)] sm:-top-8 sm:right-3 sm:h-[78px] sm:w-[78px] sm:shadow-[10px_10px_0px_rgba(97,31,43,0.35)]"
                  />
                  <span
                    className="text-[1.55rem] sm:text-[1.8rem]"
                    style={{
                      fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      fontStyle: 'normal',
                      WebkitTextStroke: '0.8px #FEF7E3',
                      textShadow: '-0.8px -0.8px 0 #FEF7E3, 0.8px -0.8px 0 #FEF7E3, -0.8px 0.8px 0 #FEF7E3, 0.8px 0.8px 0 #FEF7E3',
                      lineHeight: 1,
                      display: 'block',
                      transform: 'translateY(-2px)',
                    }}
                  >
                    Buy $OMU Now
                  </span>
                </motion.button>
              </>
            ) : (
              <motion.div
                ref={walletSectionRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <h3
                  className="text-3xl"
                  style={{
                    color: '#611F2B',
                    fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                    fontWeight: 900,
                    fontSize: '2.6rem',
                    letterSpacing: '-0.02em',
                    fontStyle: 'normal',
                    WebkitTextStroke: '0.8px #611F2B',
                    textShadow: '-0.8px -0.8px 0 #611F2B, 0.8px -0.8px 0 #611F2B, -0.8px 0.8px 0 #611F2B, 0.8px 0.8px 0 #611F2B',
                  }}
                >
                  Send {buyAmount} SOL to the following wallet
                </h3>

                <div className="flex items-center gap-3 rounded-xl border-3 px-4 py-8" style={{ borderColor: '#611F2B', backgroundColor: '#FEF7E3' }}>
                  <span className="min-w-0 flex-1 break-all text-sm sm:text-base" style={{ color: '#611F2B', fontFamily: 'sans-serif', fontWeight: 400 }}>
                    {RECEIVER_WALLET || 'Set NEXT_PUBLIC_OMU_WALLET_ADDRESS'}
                  </span>
                  <motion.button
                    type="button"
                    onClick={handleCopyWallet}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border-3"
                    style={{ borderColor: '#611F2B', backgroundColor: '#FEF7E3', boxShadow: '3px 3px 0px #611F2B' }}
                    aria-label="Copy wallet address"
                  >
                    <Copy size={18} style={{ color: '#611F2B' }} />
                  </motion.button>
                </div>

                <motion.button
                  type="button"
                  onClick={handleVerifyClick}
                  whileHover={{
                    scale: 1.12,
                    boxShadow: '12px 12px 0px rgba(97, 31, 43, 0.5)',
                    backgroundColor: '#7a1a2e',
                  }}
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="relative w-full overflow-visible rounded-2xl border-4 px-6 py-4 pt-6 text-xl font-black"
                  style={{
                    borderColor: '#611F2B',
                    backgroundColor: '#611F2B',
                    color: '#FEF7E3',
                    boxShadow: '6px 6px 0px rgba(97, 31, 43, 0.3)',
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="OMU logo"
                    width={78}
                    height={78}
                    className="absolute -top-6 right-2 h-14 w-14 rotate-[14deg] rounded-full border-2 border-[#611F2B] shadow-[8px_8px_0px_rgba(97,31,43,0.28)] sm:-top-8 sm:right-3 sm:h-[78px] sm:w-[78px] sm:shadow-[10px_10px_0px_rgba(97,31,43,0.35)]"
                  />
                  <span
                    className="text-[1.55rem] sm:text-[1.8rem]"
                    style={{
                      fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      fontStyle: 'normal',
                      WebkitTextStroke: '0.8px #FEF7E3',
                      textShadow: '-0.8px -0.8px 0 #FEF7E3, 0.8px -0.8px 0 #FEF7E3, -0.8px 0.8px 0 #FEF7E3, 0.8px 0.8px 0 #FEF7E3',
                      lineHeight: 1,
                      display: 'block',
                      transform: 'translateY(-2px)',
                    }}
                  >
                    Verify
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleBackClick}
                  whileHover={{ scale: 1.04, backgroundColor: '#f8e9c9' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl border-4 px-6 py-4 text-xl font-black"
                  style={{
                    borderColor: '#611F2B',
                    backgroundColor: '#FEF7E3',
                    color: '#611F2B',
                    boxShadow: '4px 4px 0px rgba(97, 31, 43, 0.2)',
                    fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <ArrowLeft size={24} strokeWidth={3.5} />
                  <span>Back</span>
                </motion.button>
              </motion.div>
            )}
            </motion.div>
          </div>
        </div>

        <HowToBuySection />
      </div>
    </section>
    <AnimatePresence>
      {showVerifyModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#611F2B]/45 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="verify-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border-4 p-8 text-center"
            style={{
              borderColor: '#611F2B',
              backgroundColor: '#FEF7E3',
              boxShadow: '12px 12px 0px rgba(97, 31, 43, 0.3)',
            }}
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 18 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <motion.button
              type="button"
              onClick={handleCloseVerifyModal}
              whileHover={{ scale: 1.08, backgroundColor: '#f8e9c9' }}
              whileTap={{ scale: 0.94 }}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border-3"
              style={{
                borderColor: '#611F2B',
                backgroundColor: '#FEF7E3',
                boxShadow: '3px 3px 0px rgba(97, 31, 43, 0.25)',
              }}
              aria-label="Close verification modal"
            >
              <X size={18} style={{ color: '#611F2B' }} strokeWidth={3.2} />
            </motion.button>

            <AnimatePresence mode="wait">
              {verifyStatus === 'verifying' ? (
                <motion.div
                  key="verifying"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center gap-6 pt-6"
                >
                  <motion.div
                    className="h-20 w-20 rounded-full border-4 border-[#611F2B] border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
                  />
                  <h3
                    id="verify-modal-title"
                    style={{
                      color: '#611F2B',
                      fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                      fontWeight: 900,
                      fontSize: '2rem',
                      letterSpacing: '-0.02em',
                      WebkitTextStroke: '0.6px #611F2B',
                      textShadow: '-0.6px -0.6px 0 #611F2B, 0.6px -0.6px 0 #611F2B, -0.6px 0.6px 0 #611F2B, 0.6px 0.6px 0 #611F2B',
                      lineHeight: 1.05,
                    }}
                  >
                    Verifying your transaction
                  </h3>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -16 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                  className="flex flex-col items-center gap-5 pt-5"
                >
                  <motion.div
                    className="relative mx-auto flex h-36 w-36 items-center justify-center"
                    aria-label="Transaction success"
                    role="img"
                  >
                    {[0, 1, 2, 3, 4, 5].map((spark) => (
                      <motion.span
                        key={spark}
                        className="absolute h-3 w-3 rounded-full bg-[#611F2B]"
                        style={{
                          left: '50%',
                          top: '50%',
                          transformOrigin: '0 0',
                        }}
                        initial={{
                          opacity: 0,
                          x: 0,
                          y: 0,
                          scale: 0.4,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          x: Math.cos((spark / 6) * Math.PI * 2) * 58,
                          y: Math.sin((spark / 6) * Math.PI * 2) * 58,
                          scale: [0.4, 1, 0.2],
                        }}
                        transition={{
                          duration: 0.9,
                          delay: 0.12 + spark * 0.04,
                          ease: 'easeOut',
                        }}
                      />
                    ))}
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-[#611F2B]"
                      initial={{ scale: 0.72, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                    />
                    <motion.div
                      className="absolute inset-3 rounded-full bg-[#611F2B]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.08 }}
                    />
                    <motion.svg
                      viewBox="0 0 96 96"
                      className="relative z-10 h-24 w-24"
                      fill="none"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: [0.8, 1.08, 1] }}
                      transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
                    >
                      <motion.path
                        d="M28 49.5L42 63L69 34"
                        stroke="#FEF7E3"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.55, delay: 0.28, ease: 'easeInOut' }}
                      />
                    </motion.svg>
                  </motion.div>
                  <h3
                    id="verify-modal-title"
                    style={{
                      color: '#611F2B',
                      fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                      fontWeight: 900,
                      fontSize: '1.8rem',
                      letterSpacing: '-0.02em',
                      WebkitTextStroke: '0.6px #611F2B',
                      textShadow: '-0.6px -0.6px 0 #611F2B, 0.6px -0.6px 0 #611F2B, -0.6px 0.6px 0 #611F2B, 0.6px 0.6px 0 #611F2B',
                      lineHeight: 1.1,
                    }}
                  >
                    Check your wallet for {purchasedOmuAmount.toLocaleString()} $OMU received
                  </h3>
                  <motion.button
                    type="button"
                    onClick={handleCloseVerifyModal}
                    whileHover={{
                      scale: 1.06,
                      boxShadow: '8px 8px 0px rgba(97, 31, 43, 0.4)',
                      backgroundColor: '#7a1a2e',
                    }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    className="mt-2 rounded-2xl border-4 px-8 py-3 text-xl font-black"
                    style={{
                      borderColor: '#611F2B',
                      backgroundColor: '#611F2B',
                      color: '#FEF7E3',
                      boxShadow: '5px 5px 0px rgba(97, 31, 43, 0.3)',
                      fontFamily: "'Uberhand Pro Extrabold', sans-serif",
                      fontWeight: 900,
                    }}
                  >
                    Done
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    <FooterSection />
    </>
  )
}
