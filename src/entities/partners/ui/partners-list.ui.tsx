'use client'

import Container from "@/components/container"
import { motion } from "framer-motion"
import Image from "next/image";
import { useRef, useState } from "react";
import { PartnersData } from "../module/types";

interface Props {
    data: PartnersData[];
}

export const PartnersListUi: React.FC<Props> = ({ data }) => {
    const [hover, setHover] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            scale: 0.8,
            rotateX: -15
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100
            }
        } as const,
        hover: {
            y: -15,
            scale: 1.05,
            rotateX: 5,
            rotateY: 5,
            boxShadow: "0 25px 50px -12px rgba(183, 43, 58, 0.25)",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        } as const,
    };
    return (
        <Container className="py-8 pb-32" ref={containerRef}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10"
            >
                {data.map((partner) => (
                    <motion.div
                        key={partner.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap={{ scale: .95 }}
                        onHoverStart={() => setHover(partner.id)}
                        onHoverEnd={() => setHover(null)}
                        className="relative group rounded-3xl cursor-pointer"
                    >
                        <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden h-full min-h-80 flex flex-col"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px"
                            }}
                        >
                            <motion.div
                                animate={{
                                    scale: hover === partner.id ? 1.2 : 1
                                }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-linear-to-br from-[#B72B3A] to-[#d43f4f] flex items-center justify-center text-lg font-bold text-white shadow-lg z-10"
                            >
                                {partner.id}
                            </motion.div>

                            {/* Логотип */}
                            <motion.div
                                animate={{
                                    scale: hover === partner.id ? 1.15 : 1,
                                    rotateY: hover === partner.id ? 10 : 0
                                }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="relative w-58 h-38 rounded-2xl bg-linear-to-br from-[#FFF0EC] to-white mb-8 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 mx-auto mt-2"
                            >
                                <div className="w-50 h-30 bg-linear-to-br from-[#B72B3A]/10 to-[#FF6B6B]/10 rounded-xl flex items-center justify-center text-3xl font-bold text-[#B72B3A] select-none">
                                    <Image
                                        src={partner.image || '/partners/partner1.png'}
                                        width={1000}
                                        height={1000}
                                        className='w-full object-contain px-4'
                                        alt={partner.name}
                                        priority={partner.id <= 4}
                                    />
                                </div>
                            </motion.div>

                            {/* Название */}
                            <motion.h3
                                animate={{
                                    y: hover === partner.id ? -5 : 0,
                                    color: hover === partner.id ? "#B72B3A" : "#1f2937"
                                }}
                                transition={{ duration: 0.3 }}
                                className="text-2xl font-bold mb-4 text-center line-clamp-2"
                            >
                                {partner.name}
                            </motion.h3>

                            {/* Описание */}
                            <motion.p
                                animate={{
                                    opacity: hover === partner.id ? 1 : 0.9
                                }}
                                className="text-gray-600 text-base mb-6 text-center line-clamp-3 grow"
                            >
                                {partner.description}
                            </motion.p>

                            {/* Детали */}
                            <div className="space-y-3 mb-8 select-none">
                                <motion.div
                                    initial={{ x: -20 }}
                                    animate={{ x: 0 }}
                                    transition={{ delay: partner.id * 0.05 + 0.2 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#FFF0EC] flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#B72B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">{partner.location}</span>
                                </motion.div>

                                <motion.div
                                    initial={{ x: -20 }}
                                    animate={{ x: 0 }}
                                    transition={{ delay: partner.id * 0.05 + 0.3 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#FFF0EC] flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#B72B3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700">Основана в {partner.founded}</span>
                                </motion.div>
                            </div>

                            {/* Кнопка сайта */}
                            <motion.a
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative overflow-hidden rounded-xl bg-linear-to-r from-[#B72B3A] to-[#d43f4f] text-white py-4 px-6 font-medium flex items-center justify-center gap-3 shadow-lg group/btn"
                            >
                                <motion.span
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 5 }}
                                    className="relative z-10"
                                >
                                    Посетить сайт
                                </motion.span>
                                <motion.svg
                                    animate={{
                                        x: hover === partner.id ? 5 : 0
                                    }}
                                    className="w-5 h-5 relative z-10"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </motion.svg>

                                {/* Шиммер эффект */}
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 0.6 }}
                                    className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                                />
                            </motion.a>

                            {/* Анимированное подчеркивание */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{
                                    scaleX: hover === partner.id ? 1 : 0
                                }}
                                transition={{ duration: 0.4 }}
                                className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#B72B3A] via-[#FF6B6B] to-[#B72B3A] origin-left"
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </Container>
    )
}