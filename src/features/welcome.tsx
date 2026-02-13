'use client'

import Button from "@/components/button";
import Container from "@/components/container";
import { Search } from "@/entities/search";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Welcome() {
    const router = useRouter();

    return (
        <div className="bg-[#FFF0EC] relative z-10000">
            {/* Фоновые декоративные элементы */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute top-10 left-5 w-80 h-80 rounded-full bg-linear-to-r from-[#B72B3A]/90 to-[#FF6B6B]/90 blur-3xl"
            />
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.08 }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                className="absolute top-40 right-10 w-60 h-60 rounded-full bg-linear-to-l from-[#B72B3A]/90 to-[#FF6B6B]/90 blur-3xl"
            />
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.12 }}
                transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                className="absolute bottom-20 left-1/4 w-96 h-96 rounded-full bg-linear-to-b from-[#B72B3A]/90 to-transparent blur-3xl"
            />

            <Container>
                <div className="flex flex-col w-full py-8 md:py-16 relative z-10">
                    {/* Анимированная обводка заголовка */}
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                        className="h-px bg-linear-to-r from-transparent via-[#B72B3A] to-transparent mb-6"
                    />

                    <div className="relative">
                        <motion.h1
                            initial={{
                                y: 40,
                                opacity: 0,
                                filter: "blur(10px)"
                            }}
                            animate={{
                                y: 0,
                                opacity: 1,
                                filter: "blur(0px)"
                            }}
                            transition={{
                                type: "spring",
                                delay: 0.4,
                                duration: 1,
                                bounce: 0.3,
                                stiffness: 100
                            }}
                            className="capitalize text-4xl md:text-6xl mx-auto text-[#B72B3A] font-bold mb-6 select-none text-center tracking-tight"
                        >
                            медицинское оборудование
                        </motion.h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
                            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-64 h-0.5 bg-linear-to-r from-transparent via-[#B72B3A] to-transparent"
                        />
                    </div>

                    <div
                        className="relative w-full mx-auto"
                    >
                        <Search />
                    </div>

                    <motion.div
                        initial={{
                            y: 40,
                            opacity: 0
                        }}
                        animate={{
                            y: 0,
                            opacity: 1
                        }}
                        transition={{
                            type: "spring",
                            delay: 0.8,
                            duration: 0.7,
                            bounce: 0.4,
                            stiffness: 100
                        }}
                        className="flex flex-col sm:flex-col md:flex-row gap-5 mt-8 md:mt-12 mx-auto text-lg justify-center items-center"
                    >
                        <Button
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="md:rounded-tr-none shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group min-w-50"
                        >
                            Перейти в каталог
                        </Button>

                        <Button
                            className="bg-white! md:rounded-tl-none text-gray-700! shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group min-w-50"
                            onClick={() => router.push('/partners')}
                        >
                            Перейти к партнерам
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 1.2, ease: "easeInOut" }}
                        className="flex gap-5 justify-center mt-4"
                    >
                        <div className="w-32 h-px bg-linear-to-r from-transparent via-[#B72B3A]/50 to-transparent" />
                        <div className="w-32 h-px bg-linear-to-r from-transparent via-gray-400/50 to-transparent" />
                    </motion.div>
                </div>
            </Container>

            {/* Улучшенные плавающие точки с плавной циклической анимацией */}
            {[...Array(12)].map((_, i) => {
                const sizes = ['w-2 h-2', 'w-3 h-3', 'w-1.5 h-1.5', 'w-2.5 h-2.5'];
                const colors = ['bg-[#B72B3A]/20', 'bg-[#FF6B6B]/30', 'bg-[#FF8E8E]/15', 'bg-[#FF5252]/25'];
                const positions = [
                    { top: '15%', left: '15%' }, { top: '25%', right: '20%' },
                    { top: '35%', left: '25%' }, { top: '45%', right: '30%' },
                    { top: '55%', left: '15%' }, { top: '65%', right: '25%' },
                    { top: '75%', left: '30%' }, { top: '20%', right: '35%' },
                    { top: '40%', left: '10%' }, { top: '60%', right: '15%' },
                    { top: '30%', left: '45%' }, { top: '70%', right: '40%' }
                ];

                const pos = positions[i];
                const size = sizes[i % sizes.length];
                const color = colors[i % colors.length];

                return (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            y: 0,
                            x: 0
                        }}
                        animate={{
                            opacity: [0.2, 0.4, 0.2],
                            y: [0, -15, 0, -10, 0],
                            x: [0, Math.sin(i) * 5, 0, Math.cos(i) * 3, 0]
                        }}
                        transition={{
                            duration: 4 + (i % 3),
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            times: [0, 0.25, 0.5, 0.75, 1],
                            delay: i * 0.2
                        }}
                        className={`absolute ${size} ${color} rounded-full`}
                        style={{
                            top: pos.top,
                            left: pos.left,
                            right: pos.right
                        }}
                    />
                );
            })}

            {/* Плавные плавающие крестики */}
            {[...Array(6)].map((_, i) => {
                const positions = [
                    { top: '20%', left: '20%' }, { top: '30%', right: '25%' },
                    { top: '50%', left: '15%' }, { top: '60%', right: '20%' },
                    { top: '40%', right: '10%' }, { top: '70%', left: '25%' }
                ];

                const pos = positions[i % positions.length];

                return (
                    <motion.div
                        key={`cross-${i}`}
                        initial={{
                            opacity: 0,
                            rotate: 0,
                            scale: 0.8
                        }}
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            rotate: [0, 180, 360],
                            scale: [0.8, 1, 0.8],
                            y: [0, -10, 0]
                        }}
                        transition={{
                            duration: 6 + (i % 2),
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            times: [0, 0.5, 1],
                            delay: i * 0.3
                        }}
                        className="absolute text-[#B72B3A]/80"
                        style={{
                            top: pos.top,
                            left: pos.left,
                            right: pos.right
                        }}
                    >
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" />
                        </svg>
                    </motion.div>
                );
            })}

            {/* Плавные круги для дополнительного фона */}
            {[...Array(3)].map((_, i) => {
                const sizes = ['w-16 h-16', 'w-24 h-24', 'w-20 h-20'];
                const positions = [
                    { top: '10%', right: '10%' },
                    { top: '80%', left: '5%' },
                    { top: '50%', right: '5%' }
                ];

                return (
                    <motion.div
                        key={`circle-${i}`}
                        initial={{
                            opacity: 0,
                            scale: 0
                        }}
                        animate={{
                            opacity: [0.05, 0.08, 0.05],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            times: [0, 0.5, 1],
                            delay: i
                        }}
                        className={`absolute ${sizes[i]} rounded-full border border-[#B72B3A]/50`}
                        style={positions[i]}
                    />
                );
            })}
        </div>
    )
}