import { motion } from "framer-motion";
import { useState } from "react";
import { ContactsType } from "../module/types";
import { useRouter } from "next/navigation";

interface Props {
    index: number;
    data: ContactsType;
}

export const MapCardUi: React.FC<Props> = ({ index, data }) => {

    const [activeContact, setActiveContact] = useState<string | null>(null);

    const router = useRouter();

    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                y: -2
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
            onClick={() => window.open(data.link, '_blank', 'noopener,noreferrer')}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                onMouseEnter={() => setActiveContact(data.id)}
                onMouseLeave={() => setActiveContact(null)}
                className={`group relative sm:p-2 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 ${activeContact === data.id
                    ? 'bg-linear-to-r from-[#FFF0EC] to-[#FFE5E0] shadow-lg scale-101'
                    : 'bg-gray-50 hover:bg-gray-100'
                    }`}
            >
                <div className="flex items-start gap-4">
                    <motion.div
                        animate={{
                            scale: activeContact === data.id ? 1.1 : 1,
                            rotate: activeContact === data.id ? 5 : 0
                        }}
                        className={`sm:p-1.5 md:p-3 rounded-xl ${activeContact === data.id
                            ? 'bg-white text-[#B72B3A]'
                            : 'bg-[#FFF0EC] text-[#B72B3A]'
                            }`}
                    >
                        {data.icon}
                    </motion.div>

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">
                                {data.title}
                            </h4>
                            {data.link && (
                                <motion.div
                                    animate={{ x: activeContact === data.id ? 5 : 0 }}
                                    className="text-[#B72B3A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </motion.div>
                            )}
                        </div>

                        {data.link ? (
                            <p
                                className={`block text-lg font-medium mb-2 transition-colors duration-300 ${activeContact === data.id
                                    ? 'text-[#B72B3A]'
                                    : 'text-gray-900 hover:text-[#B72B3A]'
                                    }`}
                            >
                                {data.value}
                            </p>
                        ) : (
                            <p className="text-lg font-medium text-gray-900 mb-2">
                                {data.value}
                            </p>
                        )}

                        <p className="text-sm text-gray-600">
                            {data.description}
                        </p>
                    </div>
                </div>

                {/* Индикатор активности */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeContact === data.id ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-[#B72B3A] to-[#FF6B6B] origin-left"
                />
            </motion.div>
        </motion.div>
    )
}