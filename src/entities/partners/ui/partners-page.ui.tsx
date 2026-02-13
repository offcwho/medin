"use client"

import Container from "@/components/container"
import { motion } from "framer-motion"
import Link from "next/link"
import { PartnersHero, PartnersList } from ".."

export const partners = [
    {
        id: 1,
        name: 'MedTech Solutions',
        description: 'Ведущий производитель медицинского оборудования с 20-летним опытом на рынке',
        founded: 2003,
        image: "/partners/partner1.png",
        location: 'Германия',
        website: 'https://medtech.example.com'
    },
    {
        id: 2,
        name: 'BioMed Innovations',
        description: 'Инновационные биомедицинские технологии и исследовательские решения',
        founded: 2010,
        location: 'США',
        website: 'https://biomed.example.com'
    },
    {
        id: 3,
        name: 'HealthCare Pro',
        description: 'Крупнейший поставщик расходных материалов для медицинских учреждений',
        founded: 1998,
        location: 'Россия',
        website: 'https://healthcarepro.example.com'
    },
    {
        id: 4,
        name: 'Surgical Instruments Co.',
        description: 'Производитель высококачественных хирургических инструментов',
        founded: 1985,
        location: 'Швейцария',
        website: 'https://surgical.example.com'
    },
    {
        id: 5,
        name: 'LabTech Systems',
        description: 'Современное лабораторное оборудование и диагностические системы',
        founded: 2008,
        location: 'Япония',
        website: 'https://labtech.example.com'
    },
    {
        id: 6,
        name: 'MediSupplies Global',
        description: 'Международный поставщик медицинских товаров и оборудования',
        founded: 2012,
        location: 'Сингапур',
        website: 'https://medisupplies.example.com'
    },
    {
        id: 7,
        name: 'PharmaTech',
        description: 'Фармацевтическое оборудование для производства лекарств',
        founded: 2005,
        location: 'Франция',
        website: 'https://pharmatech.example.com'
    },
    {
        id: 8,
        name: 'MediSoft',
        description: 'Медицинское программное обеспечение и системы управления',
        founded: 2015,
        location: 'США',
        website: 'https://medisoft.example.com'
    },
    {
        id: 9,
        name: 'DentalCare Pro',
        description: 'Стоматологическое оборудование и материалы',
        founded: 2000,
        location: 'Италия',
        website: 'https://dentalcare.example.com'
    },
    {
        id: 10,
        name: 'RehabTech',
        description: 'Оборудование для физиотерапии и реабилитации',
        founded: 2011,
        location: 'Швеция',
        website: 'https://rehabtech.example.com'
    },
    {
        id: 11,
        name: 'Imaging Systems',
        description: 'Медицинские системы визуализации и диагностики',
        founded: 2007,
        location: 'Нидерланды',
        website: 'https://imaging.example.com'
    },
    {
        id: 12,
        name: 'VetMed Supplies',
        description: 'Ветеринарное оборудование и расходные материалы',
        founded: 2013,
        location: 'Канада',
        website: 'https://vetmed.example.com'
    },
];


export const PartnersPageUi = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-white via-[#FAFAFA] to-white overflow-hidden">
            <Container className="pt-12 pb-8">
                <motion.nav
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 text-sm text-gray-600"
                >
                    <Link href="/" className="hover:text-[#B72B3A] transition-all duration-300 group flex items-center gap-1">
                        <motion.svg
                            whileHover={{ x: -3 }}
                            className="w-4 h-4"
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
                        className="w-1 h-1 rounded-full bg-[#B72B3A]/50"
                    />
                    <Link href="/partners" className="text-[#B72B3A] font-medium relative group">
                        Партнеры
                        <motion.span
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            className="absolute left-0 -bottom-1 h-0.5 bg-[#B72B3A]"
                        />
                    </Link>
                </motion.nav>
            </Container>

            {/* Hero */}
            <PartnersHero data={partners} />

            {/* List */}
            <PartnersList data={partners} />
        </div>
    )
}