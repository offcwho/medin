'use client'

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"

//Images
import logo from "@/../public/logos/logo.svg"
import Container from "./container"
import Link from "next/link"
import Button from "./button"
import { useModal } from "rdy-comp"

export default function Header() {
    const { openModal } = useModal();
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [headerHeight, setHeaderHeight] = useState(88)
    const [isMounted, setIsMounted] = useState(false)
    const headerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsMounted(true)

        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll)

        const updateHeaderHeight = () => {
            if (headerRef.current) {
                setHeaderHeight(headerRef.current.offsetHeight)
            }
        }

        setTimeout(updateHeaderHeight, 100)
        window.addEventListener('resize', updateHeaderHeight)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', updateHeaderHeight)
        }
    }, [])

    useEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.offsetHeight)
        }
    }, [scrolled, mobileMenuOpen])

    const links = [
        {
            link: '',
            name: 'О компании',
            active: true,
        },
        {
            link: '/partners',
            name: 'Партнеры',
        },
        {
            link: '/#map',
            name: 'Мы на карте',
        },
    ]

    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 bg-white z-50 h-20"
                style={{ opacity: isMounted ? 0 : 1 }}
            />

            <motion.header
                ref={headerRef}
                initial={{ y: isMounted ? -100 : 0, opacity: isMounted ? 0 : 1 }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    delay: isMounted ? 0 : 0.1
                }}
                className={`fixed top-0 left-0 right-0 z-50 font-medium transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
                    : 'bg-white py-4'
                    }`}
                style={{
                    boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
                }}
            >
                <Container className="items-center justify-between">
                    <Link href={'/'} className="select-none">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <Image
                                src={logo}
                                alt="Логотип ООО Медин"
                                height={scrolled ? 50 : 60}
                                className="transition-all duration-300"
                                loading="lazy"
                            />
                        </motion.div>
                    </Link>
                    <nav className="hidden md:flex gap-2 list-none items-center">
                        {links.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: isMounted ? index * 0.1 : 0 }}
                                whileHover={{ scale: 1.05 }}
                                className={`relative py-2 px-4 text-black rounded-full text-lg select-none transition-all duration-300 ${item.active === true
                                    ? 'text-[#B72B3A]! bg-[#FFF0EC]'
                                    : 'hover:text-[#B72B3A] hover:bg-[#FFF0EC]/50'
                                    }`}
                            >
                                <Link href={item.link} className="relative z-10">
                                    {item.name}
                                </Link>
                                {item.active && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute inset-0 bg-[#FFF0EC] rounded-full -z-10"
                                    />
                                )}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    className="absolute inset-0 bg-linear-to-r from-[#FFF0EC] to-[#FFE5E0] rounded-full -z-10"
                                />
                            </motion.li>
                        ))}
                    </nav>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        aria-label="Меню"
                    >
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-0.5 bg-[#B72B3A]"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block w-6 h-0.5 bg-[#B72B3A]"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-0.5 bg-[#B72B3A]"
                        />
                    </motion.button>


                    <div className="hidden md:block">
                        <Button
                            transition={{ delay: isMounted ? 0.6 : 0 }}
                            onClick={() => openModal('send-application')}
                            whileHover={{
                                scale: 1,
                                boxShadow: "0 10px 25px -5px rgba(183, 43, 58, 0.3)"
                            }}
                            whileTap={{ scale: 0.50 }}
                            className="relative overflow-hidden group"
                        >
                            Оставить заявку
                        </Button>
                    </div>
                </Container>
            </motion.header>

            {/* Меню */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 right-0 bg-white shadow-2xl z-100000 md:hidden overflow-hidden"
                        style={{ top: `${headerHeight}px` }}
                    >
                        <Container className="py-6">
                            <nav className="flex flex-col gap-2 w-full">
                                {links.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            href={item.link}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`block py-4 px-6 text-lg rounded-xl transition-all ${item.active === true
                                                ? 'text-[#B72B3A] bg-[#FFF0EC] font-semibold'
                                                : 'text-gray-700 hover:text-[#B72B3A] hover:bg-[#FFF0EC]/50'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: links.length * 0.1 }}
                                    className="pt-4 mt-4 border-t border-gray-100"
                                >
                                    <Button
                                        onClick={() => {
                                            openModal('send-application')
                                            setMobileMenuOpen(false)
                                        }}
                                        className="w-full py-4 text-lg"
                                    >
                                        Оставить заявку
                                    </Button>
                                </motion.div>
                            </nav>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                style={{ height: `${headerHeight}px` }}
                className="transition-all duration-300"
            />
        </>
    )
}