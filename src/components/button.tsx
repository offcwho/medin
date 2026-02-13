'use client'

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Props {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    whileHover?: { scale: number; boxShadow: string; };
    whileTap?: {};
    initial?: {};
    animate?: {};
    transition?: {};
}

export default function Button({
    children,
    className,
    onClick,
    animate = { opacity: 1, x: 0 },
    initial = { opacity: 0, x: 20 }
}: Props) {
    return (
        <AnimatePresence>
            <motion.div
                whileHover={{
                    scale: 1.05,
                    y: -2
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
            >
                <motion.button
                    initial={initial}
                    animate={animate}
                    onClick={onClick}
                    className={`
                        relative 
                        rounded-4xl 
                        text-white 
                        bg-gradient-to-r 
                        from-[#B72B3A] 
                        via-[#C93A4A] 
                        to-[#B72B3A] 
                        bg-size-200 
                        bg-pos-0 
                        hover:bg-pos-100
                        py-3.5 px-7 
                        text-lg 
                        font-medium
                        select-none
                        shadow-lg 
                        shadow-[#B72B3A]/25
                        transition-all 
                        duration-500
                        overflow-hidden 
                        group
                        ${className}
                    `}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 30px rgba(183, 43, 58, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        backgroundSize: "200% 100%"
                    }}
                >
                    {/* Световой эффект сверху */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent"
                        initial={{ opacity: 0.5 }}
                        whileHover={{ opacity: 0.8 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Блестящая полоска */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-20 h-12 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                        initial={{ left: "-100%" }}
                        whileHover={{ left: "100%" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    {/* Текст с эффектом свечения */}
                    <span className="relative flex items-center justify-center gap-3">
                        <motion.span
                            className="drop-shadow-lg"
                            whileHover={{ textShadow: "0 0 8px rgba(255,255,255,0.5)" }}
                        >
                            {children}
                        </motion.span>

                        {/* Иконка состава */}
                        <motion.div
                            className="w-6 h-6 relative"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
                            <div className="absolute inset-1 border-2 border-white/50 rounded-full"></div>
                        </motion.div>
                    </span>

                    {/* Эффект волны при клике */}
                    <motion.div
                        className="absolute inset-0 rounded-4xl border-2 border-white/0"
                        initial={{ scale: 1, borderWidth: 2 }}
                        whileTap={{
                            scale: 1.1,
                            borderColor: "rgba(255,255,255,0.3)"
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
            </motion.div>
        </AnimatePresence>
    )
}