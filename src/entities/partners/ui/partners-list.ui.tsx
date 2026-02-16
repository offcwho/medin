'use client'

import Container from "@/components/container"
import { motion } from "framer-motion"
import { useState } from "react"
import { PartnersData } from "../module/types"

interface Props {
    data: PartnersData[];
}

export const PartnersListUi: React.FC<Props> = ({ data }) => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <Container className="py-8 pb-24">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((partner, index) => {
                    const location = partner.country || partner.location || 'Не указано';
                    const founded = partner.founded ? `Основана в ${partner.founded}` : 'Год основания не указан';
                    const website = partner.website || '';

                    return (
                        <motion.article
                            key={partner.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            onHoverStart={() => setHoveredId(partner.id)}
                            onHoverEnd={() => setHoveredId(null)}
                            className="group rounded-3xl border border-gray-100 bg-white p-7 shadow-lg transition-all duration-300 hover:shadow-2xl"
                        >
                            <div className="mb-6 flex items-center justify-between">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#B72B3A] to-[#d43f4f] text-sm font-bold text-white">
                                    {partner.id}
                                </span>
                                <span className="text-xs font-medium uppercase tracking-[0.08em] text-gray-400">Partner</span>
                            </div>

                            <div className="mb-6 flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFF0EC] to-white">
                                <img
                                    src={partner.image || '/partners/partner1.png'}
                                    alt={partner.name}
                                    loading="lazy"
                                    className="h-full w-full object-contain px-4"
                                />
                            </div>

                            <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#B72B3A]">
                                {partner.name}
                            </h3>
                            <p className="mb-5 line-clamp-3 text-sm text-gray-600">{partner.description}</p>

                            <div className="mb-6 space-y-2 text-sm text-gray-700">
                                <p>{location}</p>
                                <p>{founded}</p>
                            </div>

                            {website ? (
                                <a
                                    href={website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#B72B3A] to-[#d43f4f] px-4 py-3 font-medium text-white transition-all duration-200 hover:brightness-110"
                                >
                                    Перейти на сайт
                                </a>
                            ) : (
                                <div className="inline-flex w-full items-center justify-center rounded-xl bg-gray-100 px-4 py-3 font-medium text-gray-500">
                                    Сайт не указан
                                </div>
                            )}

                            <motion.div
                                animate={{ scaleX: hoveredId === partner.id ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="mt-4 h-0.5 origin-left rounded-full bg-gradient-to-r from-[#B72B3A] to-[#d43f4f]"
                            />
                        </motion.article>
                    );
                })}
            </div>
        </Container>
    )
}
