'use client'

import Container from '@/components/container';
import { MapCard } from '@/entities/map';
import { ContactsType } from '@/entities/map/module/types';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Map() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const contacts: ContactsType[] = [
        {
            id: 'phone',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'Телефон',
            value: '+7 (999) 000-99-00',
            link: 'tel:+79990009900',
            description: 'Звоните в рабочее время с 9:00 до 18:00'
        },
        {
            id: 'email',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email',
            value: 'dipmed@mail.ru',
            link: 'mailto:dipmed@mail.ru',
            description: 'Отвечаем в течение 24 часов'
        },
        {
            id: 'address',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Адрес',
            value: 'г. Волгоград, ул. Циолковского, 39',
            link: 'https://yandex.ru/maps/-/CDqR7XmC',
            description: 'Пн-Пт: 9:00-18:00, Сб: 10:00-15:00'
        },
        {
            id: 'hours',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'Режим работы',
            value: 'Пн-Пт: 9:00-18:00',
            description: 'Суббота: 10:00-15:00, Воскресенье: выходной'
        }
    ];

    return (
        <div className="bg-linear-to-b from-white to-[#FAFAFA] overflow-hidden relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 0.05, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-20 left-10 w-80 h-80 rounded-full bg-linear-to-r from-[#B72B3A]/10 to-transparent blur-3xl -z-10"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 0.03, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-linear-to-l from-[#B72B3A]/5 to-transparent blur-3xl -z-10"
            />

            <Container className="py-16 lg:py-24 flex-col">
                <motion.div
                    id='map'
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
                        transition={{ delay: 0.4 }}
                        className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
                    >
                        Мы на <span className="text-[#B72B3A]">карте</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        Приезжайте к нам или свяжитесь удобным для вас способом
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Карта */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="relative rounded-3xl overflow-hidden shadow-2xl min-h-100"
                    >
                        <iframe
                            src="https://yandex.ru/map-widget/v1/?z=15&pt=48.715,44.502,pm2org&l=map"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Яндекс Карта"
                        ></iframe>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-3xl sm:p-4 md:p-8 shadow-xl border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">
                                Контактная информация
                            </h3>

                            <div className="space-y-4">
                                {contacts.map((contact, index) => (
                                    <MapCard
                                        key={index}
                                        index={index}
                                        data={contact}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </div>
    )
}