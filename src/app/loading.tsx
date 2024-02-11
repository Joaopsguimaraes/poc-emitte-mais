'use client'

import { type ReactNode } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const RootStyle = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div
        className={cn(
          'bg-accent/80 fixed inset-0 z-50 flex size-full items-center justify-center'
        )}
      >
        {children}
      </div>
    </>
  )
}

export default function Loading() {
  return (
    <RootStyle>
      <motion.div
        animate={{
          opacity: [1, 0.48, 0.48, 1, 1],
          scale: [1, 0.9, 0.9, 1, 1],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Image
          alt="Emitte icon"
          height={49}
          src="/emitte-mais-collapse.svg"
          width={49}
        ></Image>
      </motion.div>
      <motion.div
        animate={{
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          opacity: [0.25, 1, 1, 1, 0.25],
          rotate: [270, 0, 0, 270, 270],
          scale: [1.2, 1, 1, 1.2, 1.2],
        }}
        className="border-primary dark:border-secondary absolute size-[100px] rounded-[25%] border-[3px]"
        transition={{ duration: 3.2, ease: 'linear', repeat: Infinity }}
      />
      <motion.div
        animate={{
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          rotate: [0, 270, 270, 0, 0],
          scale: [1, 1.2, 1.2, 1, 1],
        }}
        className="border-primary dark:border-secondary absolute size-[120px] rounded-[25%] border-8"
        transition={{
          duration: 3.2,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </RootStyle>
  )
}
