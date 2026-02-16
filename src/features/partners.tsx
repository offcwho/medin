'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Container from '@/components/container';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import { getPartners } from '@/lib/backend-api';

interface PartnerPreview {
    id: number;
    name: string;
    description: string;
    image?: string;
}

const fallbackPartners: PartnerPreview[] = [
    { id: 1, name: 'MedTech Solutions', description: 'Поставщик медицинского оборудования', image: '/partners/partner2.png' },
    { id: 2, name: 'BioMed Innovations', description: 'Инновационные биомедицинские технологии', image: '/partners/partner2.png' },
    { id: 3, name: 'HealthCare Pro', description: 'Поставщик расходных материалов', image: '/partners/partner2.png' },
];

export default function Partners() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const [isClient, setIsClient] = useState(false);
    const [partners, setPartners] = useState<PartnerPreview[]>(fallbackPartners);

    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        void (async () => {
            try {
                const data = await getPartners();
                if (data.length === 0) {
                    return;
                }

                setPartners(
                    data.map((partner) => ({
                        id: partner.id,
                        name: partner.name,
                        description: partner.description,
                        image: partner.image || '/partners/partner2.png',
                    })),
                );
            } catch {
                setPartners(fallbackPartners);
            }
        })();
    }, []);

    const floatingElements = isClient ? [...Array(3)].map((_, i) => ({
        size: 20 + i * 10,
        top: 30 + i * 20,
        left: 5 + i * 15,
        y: Math.random() * 100 - 50,
        opacity: 0
    })) : [];

    return (
        <div className="bg-white overflow-hidden relative">
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 0.05, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-[#FFF0EC] to-transparent -z-10"
            />

            <Container className='flex-col py-16 lg:py-24 relative'>
                {/* Заголовок */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 lg:mb-16"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 100 } : { width: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="h-1 bg-linear-to-r from-transparent via-[#B72B3A] to-transparent mx-auto mb-6"
                    />

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.2 }}
                        className='mb-4 text-4xl lg:text-5xl font-bold text-gray-900 select-none'
                    >
                        Наши <span className="text-[#B72B3A]">партнеры</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Мы сотрудничаем с ведущими мировыми производителями медицинского оборудования
                    </motion.p>
                </motion.div>

                {/* слайдер */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative w-full"
                >
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        speed={800}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            renderBullet: function (index, className) {
                                return `<span class="${className} custom-bullet"></span>`;
                            },
                        }}
                        navigation={{
                            nextEl: '.partners-next',
                            prevEl: '.partners-prev',
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="pb-12! pt-6!"
                    >
                        {partners.map((partner) => (
                            <SwiperSlide key={partner.id}>
                                <motion.div
                                    whileHover={{
                                        y: -5,
                                        transition: { duration: 0.2 }
                                    }}
                                    className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full min-h-60 flex flex-col justify-center items-center text-center overflow-visible"
                                >
                                    {/* Номер партнера */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                        transition={{ delay: partner.id * 0.1 }}
                                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-linear-to-br from-[#B72B3A] to-[#d43f4f] flex items-center justify-center text-white font-bold text-sm shadow-lg z-10"
                                    >
                                        {partner.id}
                                    </motion.div>

                                    {/* Логотип */}
                                    <div className="w-38 h-38 rounded-full bg-linear-to-br from-[#FFF0EC] to-white mb-6 flex items-center justify-center shadow-inner group-hover:from-[#FFE5E0] transition-all duration-300 mt-2">
                                        <div className="w-32 h-32 bg-linear-to-br from-[#B72B3A]/10 to-[#FF6B6B]/10 rounded-full flex items-center justify-center text-xl font-bold text-[#B72B3A]">
                                            <img
                                                src={partner.image || '/partners/partner2.png'}
                                                loading="lazy"
                                                className="w-full object-contain px-3"
                                                alt={partner.name}
                                            />
                                        </div>
                                    </div>

                                    {/* Название и описание */}
                                    <div className="space-y-3 w-full">
                                        <motion.h3
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                            transition={{ delay: partner.id * 0.1 + 0.1 }}
                                            className="text-lg font-bold text-gray-900 group-hover:text-[#B72B3A] transition-colors duration-300 line-clamp-2"
                                        >
                                            {partner.name}
                                        </motion.h3>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                            transition={{ delay: partner.id * 0.1 + 0.2 }}
                                            className="text-gray-600 text-sm lg:text-base line-clamp-3"
                                        >
                                            {partner.description}
                                        </motion.p>
                                    </div>

                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-[#B72B3A] to-[#FF6B6B] group-hover:w-3/4 transition-all duration-300" />
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.8 }}
                        className="justify-center gap-4 mt-8 sm:hidden md:flex"
                    >
                        <button className="partners-prev w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-[#FFF0EC] transition-all duration-300 flex items-center justify-center group border border-gray-100">
                            <svg className="w-6 h-6 text-gray-700 group-hover:text-[#B72B3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button className="partners-next w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl hover:bg-[#FFF0EC] transition-all duration-300 flex items-center justify-center group border border-gray-100">
                            <svg className="w-6 h-6 text-gray-700 group-hover:text-[#B72B3A] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Дополнительная информация */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 1 }}
                    className="mt-16 lg:mt-20 text-center"
                >
                    <Button
                        onClick={() => router.push("/partners")}
                    >
                        Перейти к партнерам
                    </Button>
                </motion.div>
            </Container>
            {floatingElements.map((element, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        y: element.y,
                    }}
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                        y: [null, -10, 0],
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: i * 0.5,
                    }}
                    className={`absolute bg-[#B72B3A]/5 rounded-full -z-10`}
                    style={{
                        width: `${element.size}px`,
                        height: `${element.size}px`,
                        top: `${element.top}%`,
                        left: `${element.left}%`,
                    }}
                />
            ))}
        </div>
    )
}

