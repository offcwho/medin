"use client"

import Container from "@/components/container"
import { PartnersHero, PartnersList } from ".."
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getPartners } from "@/lib/backend-api"
import { PartnersData } from "../module/types"

export const partners: PartnersData[] = [
    {
        id: 1,
        name: 'MedTech Solutions',
        description: 'Поставщик медицинского оборудования',
        image: '/partners/partner1.png',
        country: 'Германия',
        location: 'Германия',
    },
];

export const PartnersPageUi = () => {
    const [partnersData, setPartnersData] = useState<PartnersData[]>(partners);

    useEffect(() => {
        void (async () => {
            try {
                const apiPartners = await getPartners();
                if (apiPartners.length === 0) {
                    return;
                }

                setPartnersData(
                    apiPartners.map((partner) => ({
                        id: partner.id,
                        name: partner.name,
                        description: partner.description,
                        image: partner.image || '/partners/partner1.png',
                        country: partner.country,
                        location: partner.country,
                    })),
                );
            } catch {
                setPartnersData(partners);
            }
        })();
    }, []);

    return (
        <div className="min-h-screen overflow-hidden bg-linear-to-b from-white via-[#FAFAFA] to-white">
            <Container className="pt-12 pb-8">
                <motion.nav
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 text-sm text-gray-600"
                >
                    <Link href="/" className="group flex items-center gap-1 transition-all duration-300 hover:text-[#B72B3A]">
                        <motion.svg
                            whileHover={{ x: -3 }}
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </motion.svg>
                        <span>Главная</span>
                    </Link>
                    <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="h-1 w-1 rounded-full bg-[#B72B3A]/50"
                    />
                    <Link href="/partners" className="group relative font-medium text-[#B72B3A]">
                        Партнеры
                        <motion.span
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            className="absolute -bottom-1 left-0 h-0.5 bg-[#B72B3A]"
                        />
                    </Link>
                </motion.nav>
            </Container>

            <PartnersHero data={partnersData} />
            <PartnersList data={partnersData} />
        </div>
    )
}
