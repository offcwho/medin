'use client'

import Container from "@/components/container"
import { AboutList } from "@/entities/about"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Плавающие элементы - только на клиенте
    const floatingElements = isClient ? [...Array(4)].map((_, i) => ({
        width: 8 + i * 2,
        height: 8 + i * 2,
        top: 20 + i * 15,
        left: 5 + i * 10,
        opacity: 0,
        y: Math.random() * 100 - 50,
        x: Math.random() * 100 - 50,
        bgClass: i % 2 === 0 ? 'bg-[#b72b3a]/10' : 'bg-red-200/20'
    })) : []

    return (
        <div className="bg-white overflow-hidden">
            <Container className="flex flex-col lg:flex-row gap-8 lg:gap-12 py-14 lg:py-20">
                {/* Левая часть - текст */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full lg:w-1/2"
                >
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={isInView ? { opacity: 1, width: 60 } : { opacity: 0, width: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="h-1 bg-linear-to-r from-[#b72b3a] to-transparent mb-6 rounded-full"
                    />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-4xl lg:text-5xl mb-6 lg:mb-8 font-bold text-gray-900 select-none"
                    >
                        О нас
                    </motion.h2>

                    <div className="space-y-4">
                        {[`***Test***`,
                            `Мы — команда опытных разработчиков, дизайнеров и стратегов, которые превращают сложные задачи в элегантные цифровые решения. С 2013 года мы помогаем компаниям укреплять позиции на рынке через инновационные технологии, удобные интерфейсы и продуманную архитектуру.`,
                            `Наш подход основан на глубоком анализе потребностей бизнеса и пользователей. Мы не просто пишем код — мы создаем инструменты, которые увеличивают продажи, оптимизируют процессы и повышают лояльность клиентов.`]
                            .map((text, index) => (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                    transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                                    className="text-lg lg:text-xl text-gray-700 leading-relaxed"
                                >
                                    {text}
                                </motion.p>
                            ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="absolute -left-10 top-1/2 w-40 h-40 rounded-full bg-linear-to-r from-[#b72b3a]/10 to-transparent blur-2xl -z-10"
                    />
                </motion.div>

                {/* Правая часть - цифры */}
                <AboutList
                    isInView={isInView}
                />
            </Container>

            {/* Дополнительные декоративные элементы */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-linear-to-tl from-[#b72b3a] to-transparent blur-3xl -z-10"
            />

            {/* Плавающие элементы для всей секции - только на клиенте */}
            {floatingElements.map((element, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        y: element.y,
                        x: element.x
                    }}
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        y: [null, -20, 0],
                        x: [null, Math.sin(i) * 10, 0]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: i * 0.5,
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
        </div>
    )
}