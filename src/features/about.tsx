'use client'

import Container from "@/components/container"
import { AboutList } from "@/entities/about"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { getAboutEntries } from "@/lib/backend-api"

const fallbackParagraphs = [
    'Мы — команда опытных специалистов, которая помогает компаниям расти за счет современных цифровых решений.',
    'Наш подход основан на глубоком анализе бизнес-задач и на практике: мы делаем продукты, которые помогают в реальной работе.',
    'С 2013 года мы развиваем долгосрочные партнерства и поддерживаем проекты на всех этапах.',
];

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [isClient, setIsClient] = useState(false)
    const [paragraphs, setParagraphs] = useState<string[]>(fallbackParagraphs);

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        void (async () => {
            try {
                const entries = await getAboutEntries();
                if (entries.length === 0) {
                    return;
                }

                const latestDescription = entries[0]?.description?.trim();
                if (!latestDescription) {
                    return;
                }

                setParagraphs([latestDescription, ...fallbackParagraphs.slice(1)]);
            } catch {
                setParagraphs(fallbackParagraphs);
            }
        })();
    }, []);

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
        <div className="overflow-hidden bg-white">
            <Container className="flex flex-col gap-8 py-14 lg:flex-row lg:gap-12 lg:py-20">
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
                        className="mb-6 h-1 rounded-full bg-linear-to-r from-[#b72b3a] to-transparent"
                    />

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="mb-6 select-none text-4xl font-bold text-gray-900 lg:mb-8 lg:text-5xl"
                    >
                        О нас
                    </motion.h2>

                    <div className="space-y-4">
                        {paragraphs.map((text, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                                className="text-lg leading-relaxed text-gray-700 lg:text-xl"
                            >
                                {text}
                            </motion.p>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="absolute -left-10 top-1/2 -z-10 h-40 w-40 rounded-full bg-linear-to-r from-[#b72b3a]/10 to-transparent blur-2xl"
                    />
                </motion.div>

                <AboutList isInView={isInView} />
            </Container>

            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-linear-to-tl from-[#b72b3a] to-transparent blur-3xl"
            />

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
                    className={`absolute -z-10 rounded-full ${element.bgClass}`}
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
