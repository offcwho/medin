'use client'

import { motion } from "framer-motion"
import { AboutTypes } from "../module/types";

interface Props {
    isInView: boolean;
    index: number;
    data: AboutTypes;
    length: number
}

export const AboutCardUi: React.FC<Props> = ({ isInView, index, data, length }) => {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                y: -2
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={isInView ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                        delay: 0.4 + index * 0.15,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 15
                    }
                } : {
                    opacity: 0,
                    scale: 0.8,
                    y: 30
                }}
                className={`p-6 lg:p-8 rounded-2xl lg:rounded-3xl flex justify-center flex-col relative overflow-hidden cursor-pointer
                                ${index === 0 || index === length - 1
                        ? 'bg-linear-to-br from-[#b72b3a] to-[#d43f4f] text-gray-100 shadow-lg hover:shadow-xl'
                        : 'bg-linear-to-br from-red-50 to-red-100 text-gray-700 shadow-md hover:shadow-lg'
                    }`}
            >
                {/* Фоновый узор */}
                <motion.div
                    animate={{
                        rotate: 360,
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 
                                    ${index === 0 || index === length - 1 ? 'bg-white' : 'bg-[#b72b3a]'}`}
                />

                {/* Анимированная цифра */}
                <motion.h5
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? {
                        opacity: 1,
                        scale: 1
                    } : {
                        opacity: 0,
                        scale: 0.5
                    }}
                    transition={{
                        delay: 0.6 + index * 0.15,
                        duration: 0.3,
                    }}
                    className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 lg:mb-3 relative z-10"
                >
                    {data.title}
                </motion.h5>

                {/* Анимированное описание */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? {
                        opacity: 1,
                        y: 0,
                    } : {
                        opacity: 0,
                        y: 10
                    }}
                    transition={{
                        delay: 0.8 + index * 0.15,
                        duration: 0.3
                    }}
                    className="text-lg lg:text-xl font-medium relative z-10"
                >
                    {data.description}
                </motion.p>

                {/* Индикатор появления */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? {
                        width: "100%",
                    } : {
                        width: 0
                    }}
                    transition={{
                        delay: 0.5 + index * 0.15,
                        duration: 0.6
                    }}
                    className={`absolute bottom-0 left-0 h-0.5 
                                    ${index === 0 || index === length - 1
                            ? 'bg-linear-to-r from-white/50 to-transparent'
                            : 'bg-linear-to-r from-[#b72b3a]/50 to-transparent'}`}
                />

                {/* Статичное свечение */}
                <div className={`absolute inset-0 rounded-2xl lg:rounded-3xl opacity-0 transition-opacity duration-150 ease-out
                                ${index === 0 || index === length - 1
                        ? 'bg-white/20'
                        : 'bg-[#b72b3a]/10'} group-hover:opacity-100`} />
            </motion.div>
        </motion.div>
    )
}