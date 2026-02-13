'use client'

import Image from "next/image";
import Container from "./container";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

//Image
import logo from "@/../public/logos/logo.svg"

export default function Footer() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const contacts = [
        {
            type: 'phone',
            value: '+7-(999)-000-99-00',
            href: 'tel:+79999999999'
        },
        {
            type: 'email',
            value: 'dipmed@mail.ru',
            href: 'mailto:dipmed@mail.ru'
        },
        {
            type: 'address',
            value: 'г. Волгоград, ул. Циолковского, 39',
            href: null
        }
    ];

    const links = [
        { name: 'О нас', href: '/about' },
        { name: 'Партнеры', href: '/partners' },
        { name: 'Новости', href: '/news' },
        { name: 'Контакты', href: '/contacts' }
    ];

    const socials = [
        { name: 'GitHub', href: 'https://github.com/offcwho', icon: '🚀' },
        { name: 'Telegram', href: 'https://t.me', icon: '✈️' },
        { name: 'VK', href: 'https://vk.com', icon: '👥' }
    ];

    return (
        <footer className="bg-neutral-900 overflow-hidden relative">
            {/* Фоновые элементы */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 0.05, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-linear-to-r from-[#B72B3A]/20 to-transparent blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 0.03, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-linear-to-l from-[#B72B3A]/10 to-transparent blur-3xl"
            />

            <Container className="py-12 lg:py-16">
                <motion.div
                    ref={ref}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
                >
                    {/* Логотип и описание */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col gap-6"
                    >
                        <motion.div
                            className="relative"
                        >
                            <Image
                                src={logo}
                                alt="Логотип ООО Медин"
                                height={60}
                                className="filter brightness-0 invert"
                            />
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : { scale: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="absolute -bottom-2 left-0 w-32 h-0.5 bg-linear-to-r from-[#B72B3A] to-transparent"
                            />
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            className="text-gray-400 text-lg leading-relaxed max-w-md"
                        >
                            Ведущий поставщик медицинских комплектующих и оборудования с 2013 года.
                        </motion.p>

                        {/* Социальные сети */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: 0.5, duration: 0.4 }}
                            className="flex gap-3 mt-2"
                        >
                            {socials.map((social, index) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                    transition={{
                                        delay: 0.6 + index * 0.1,
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 20
                                    }}
                                    whileHover={{
                                        scale: 1.15,
                                        y: -2,
                                        transition: {
                                            duration: 0.1,
                                            ease: "easeOut"
                                        }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-xl p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-all duration-150"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Контакты */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col gap-6"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: '100%' } : { width: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="pb-2 border-b border-gray-700"
                        >
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-gray-50 text-2xl font-bold"
                            >
                                Контакты
                            </motion.h3>
                        </motion.div>

                        <address className="flex flex-col non-italic gap-3" style={{ fontStyle: "normal" }}>
                            {contacts.map((contact, index) => (
                                <motion.div
                                    key={contact.type}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{
                                        delay: 0.5 + index * 0.1,
                                        duration: 0.3
                                    }}
                                    className="group"
                                >
                                    {contact.href ? (
                                        <a
                                            href={contact.href}
                                            className="text-[#B72B3A] hover:text-[#ff6b6b] transition-colors duration-150 flex items-center gap-2 group"
                                        >
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={isInView ? { scale: 1 } : { scale: 0 }}
                                                transition={{
                                                    delay: 0.6 + index * 0.1,
                                                    type: "spring",
                                                    stiffness: 500
                                                }}
                                                className="text-lg"
                                            >
                                                {contact.type === 'phone' ? '📞' : contact.type === 'email' ? '📧' : '📍'}
                                            </motion.span>
                                            <span className="relative">
                                                {contact.value}
                                                <span className="absolute left-0 -bottom-0.5 h-px bg-[#B72B3A] w-0 group-hover:w-full transition-all duration-150 ease-out" />
                                            </span>
                                        </a>
                                    ) : (
                                        <div className="text-gray-200 flex items-center gap-2">
                                            <span className="text-lg">📍</span>
                                            <span>{contact.value}</span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </address>
                    </motion.div>

                    {/* Ссылки */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col gap-6"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: '100%' } : { width: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="pb-2 border-b border-gray-700"
                        >
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-gray-50 text-2xl font-bold"
                            >
                                Навигация
                            </motion.h3>
                        </motion.div>

                        <ul className="flex flex-col gap-3">
                            {links.map((link, index) => (
                                <motion.li
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{
                                        delay: 0.6 + index * 0.1,
                                        duration: 0.3
                                    }}
                                    className="group"
                                >
                                    <a
                                        href={link.href}
                                        className="text-[#B72B3A] hover:text-[#ff6b6b] transition-colors duration-150 flex items-center gap-2 group"
                                    >
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                                            transition={{
                                                delay: 0.7 + index * 0.1,
                                                type: "spring",
                                                stiffness: 500
                                            }}
                                            className="text-lg"
                                        >
                                            →
                                        </motion.span>
                                        <span className="relative">
                                            {link.name}
                                            <span className="absolute left-0 -bottom-0.5 h-px bg-[#B72B3A] w-0 group-hover:w-full transition-all duration-150 ease-out" />
                                        </span>
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </Container>

            {/* Нижняя часть футера */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="border-t border-neutral-800 pt-6"
            >
                <Container className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-400 text-center md:text-left"
                    >
                        © 2026. ООО «Медин». Все права защищены.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{
                            delay: 0.9,
                            type: "spring",
                            stiffness: 400,
                            damping: 20
                        }}
                        className="flex items-center gap-2 group"
                    >
                        <motion.p
                            className="text-gray-300"
                        >
                            Created by
                        </motion.p>
                        <a
                            href="https://github.com/offcwho"
                            className="text-[#B72B3A] font-semibold relative group-hover:text-[#ff6b6b] transition-colors duration-150"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            offcwho
                            <span className="absolute left-0 -bottom-0.5 h-px bg-[#B72B3A] w-0 group-hover:w-full transition-all duration-150 ease-out" />
                        </a>
                    </motion.div>
                </Container>

                {/* Анимированные точки */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-10 left-10 w-4 h-4 rounded-full bg-[#B72B3A]/30"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
                    transition={{ delay: 1.1 }}
                    className="absolute bottom-20 right-20 w-3 h-3 rounded-full bg-[#B72B3A]/20"
                />
            </motion.div>
        </footer>
    )
}