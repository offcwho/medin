'use client'

import Container from "@/components/container"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

export default function NotFoundPage() {
    const ref = useRef(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e
            const moveX = (clientX - window.innerWidth / 2) * 0.01
            const moveY = (clientY - window.innerHeight / 2) * 0.01
            setMousePosition({ x: moveX, y: moveY })
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Плавающие элементы
    const floatingElements = isClient ? [...Array(8)].map((_, i) => ({
        width: 6 + i * 3,
        height: 6 + i * 3,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: 0.1,
        y: Math.random() * 100 - 50,
        x: Math.random() * 100 - 50,
        bgClass: i % 3 === 0 ? 'bg-[#b72b3a]/10' : i % 3 === 1 ? 'bg-red-200/20' : 'bg-red-300/15',
        delay: i * 0.2
    })) : []

    const digits404 = ['4', '0', '4']

    return (
        <div className="min-h-screen bg-white overflow-hidden relative">
            <Container className="relative z-10 items-center justify-center">
                {/* Декоративный элемент */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.03, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-[#b72b3a] pointer-events-none select-none"
                    style={{
                        transform: `translate(-50%, -50%) translateX(${mousePosition.x * 2}px) translateY(${mousePosition.y * 2}px)`
                    }}
                >
                    404
                </motion.div>

                {/* Основной контент */}
                <div className="min-h-screen flex flex-col items-center justify-center py-20">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        {/* Анимированные цифры 404 */}
                        <div className="flex justify-center items-center gap-2 lg:gap-4 mb-8">
                            {digits404.map((digit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5, y: -50 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 15
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: [0, -5, 5, 0],
                                        transition: { duration: 0.3 }
                                    }}
                                    className="relative"
                                >
                                    <motion.div
                                        animate={{
                                            rotate: 360,
                                        }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear",
                                            delay: index * 2
                                        }}
                                        className="absolute inset-0 w-full h-full rounded-full bg-linear-to-br from-[#b72b3a]/10 to-transparent blur-xl"
                                    />
                                    <div className="relative text-8xl lg:text-9xl xl:text-[10rem] font-black bg-linear-to-br from-[#b72b3a] to-[#d43f4f] bg-clip-text text-transparent">
                                        {digit}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Заголовок */}
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 100 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="h-1 bg-linear-to-r from-[#b72b3a] to-transparent mx-auto mb-8 rounded-full"
                        />

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="text-4xl lg:text-5xl mb-6 font-bold text-gray-900"
                        >
                            Страница не найдена
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-xl lg:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed"
                        >
                            Возможно, эта страница была перемещена или больше не существует.
                            Давайте вернемся на главную и найдем то, что вам нужно.
                        </motion.p>

                        {/* Кнопка возврата */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-linear-to-r from-[#b72b3a] to-[#d43f4f] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                            >
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                    className="text-xl"
                                >
                                    ←
                                </motion.span>
                                Вернуться на главную
                                <motion.div
                                    className="w-6 h-0.5 bg-white rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: 24 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>

            {/* Декоративные элементы */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-linear-to-br from-[#b72b3a] to-transparent blur-3xl -z-10"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.08, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-linear-to-tr from-red-200 to-transparent blur-3xl -z-10"
            />

            {/* Плавающие элементы */}
            {floatingElements.map((element, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        y: element.y,
                        x: element.x
                    }}
                    animate={{
                        opacity: [element.opacity, element.opacity * 1.5, element.opacity],
                        y: [null, -30, 0],
                        x: [null, Math.sin(i * 0.5) * 15, 0]
                    }}
                    transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: element.delay,
                        times: [0, 0.5, 1]
                    }}
                    className={`absolute ${element.bgClass} rounded-full -z-10`}
                    style={{
                        width: `${element.width}px`,
                        height: `${element.height}px`,
                        top: `${element.top}%`,
                        left: `${element.left}%`,
                    }}
                />
            ))}

            {/* Анимированные частицы */}
            {isClient && [...Array(12)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    initial={{
                        opacity: 0,
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight
                    }}
                    animate={{
                        opacity: [0, 0.3, 0],
                        y: [null, -50, -100],
                        x: [null, Math.sin(i) * 20, Math.sin(i) * 40]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                    className="absolute w-1 h-1 bg-[#b72b3a]/40 rounded-full -z-10"
                />
            ))}
        </div>
    )
}