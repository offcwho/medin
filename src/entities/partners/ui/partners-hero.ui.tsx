import Container from "@/components/container"
import { motion } from "framer-motion"
import { PartnersData } from "../module/types";

interface Props {
    data: PartnersData[];
}

export const PartnersHeroUi: React.FC<Props> = ({ data }) => {
    return (
        <div className="relative overflow-hidden">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-linear-to-r from-[#B72B3A]/20 via-[#FF6B6B]/10 to-transparent blur-3xl"
            />

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.08 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-linear-to-l from-[#B72B3A]/15 via-[#FF8E8E]/10 to-transparent blur-3xl"
            />

            <Container className="py-16 lg:py-28 relative">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                    className="text-center max-w-5xl mx-auto"
                >
                    <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            delay: 0.3,
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                        }}
                        className="inline-block px-6 py-3 bg-linear-to-r from-[#FFF0EC] to-[#FFE5E0] text-[#B72B3A] rounded-full text-sm font-medium mb-8 shadow-lg select-none"
                    >
                        Наши партнеры
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 select-none"
                    >
                        Наши <motion.span
                            className="text-[#B72B3A] inline-block relative"
                            animate={{
                                textShadow: [
                                    "0 0 0px rgba(183, 43, 58, 0)",
                                    "0 0 20px rgba(183, 43, 58, 0.3)",
                                    "0 0 0px rgba(183, 43, 58, 0)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                        >
                            партнеры
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
                    >
                        Сотрудничаем с ведущими мировыми компаниями в сфере медицины и здравоохранения
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                        className="flex flex-wrap justify-center gap-8 lg:gap-16"
                    >
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex flex-col items-center cursor-pointer select-none"
                        >
                            <div className="text-5xl lg:text-6xl font-bold text-[#B72B3A] mb-2 relative">
                                {data.length}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "loop"
                                    }}
                                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#B72B3A]"
                                />
                            </div>
                            <span className="text-gray-600">компаний</span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </Container>
        </div>
    )
}