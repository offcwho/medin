import { partners } from "@/entities/partners/ui/partners-page.ui";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useMemo, useEffect, useRef } from "react";

export const SearchUi = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchFocus, setSearchFocus] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [mounted, setMounted] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Плавное появление при монтировании
    useEffect(() => {
        setMounted(true);

    }, []);

    // Фильтрация партнеров
    const filteredPartners = useMemo(() => {
        if (!searchValue.trim()) return [];

        const searchLower = searchValue.toLowerCase();
        return partners.filter(partner =>
            partner.name.toLowerCase().includes(searchLower) ||
            partner.description.toLowerCase().includes(searchLower)
        );
    }, [searchValue]);

    // Клик вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchFocus(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectPartner = (partner: typeof partners[0]) => {
        setSearchValue(partner.name);
        setSearchFocus(false);
        setSelectedIndex(-1);
    };

    const handleClearSearch = () => {
        setSearchValue("");
        inputRef.current?.focus();
    };

    return (
        <div
            ref={searchRef}
            className="relative max-w-3xl mx-auto px-4"
        >
            {/* Главный контейнер инпута */}
            <motion.div
                initial={{
                    y: 40,
                    opacity: 0,
                }}

                animate={{
                    width: searchFocus ? "100%" : "100%",
                    opacity: mounted ? 1 : 0,
                    scale: mounted ? 1 : 0.9,
                    y: 0,
                }}
                transition={{
                    opacity: { duration: 0.6, delay: .5, ease: "easeOut" },
                    scale: {
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        duration: 0.5
                    },
                    type: "spring",
                    delay: 0.6,
                    duration: 0.7,
                    bounce: 0.4,
                    stiffness: 100
                }}
                className="relative w-full"
            >
                {/* Инпут с фоном */}
                <motion.div
                    className="relative"
                    animate={{
                        y: searchFocus ? -8 : 0,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                    }}
                >
                    {/* Фон инпута */}
                    <motion.div
                        className="absolute inset-0 rounded-3xl bg-white/80 backdrop-blur-sm"
                        animate={{
                            boxShadow: searchFocus
                                ? "0 10px 40px -10px rgba(183, 43, 58, 0.2)"
                                : "0 4px 20px -4px rgba(0, 0, 0, 0.05)",
                            borderWidth: searchFocus ? "2px" : "1px",
                            borderColor: searchFocus ? "#B72B3A/30" : "transparent",
                        }}
                        transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Сам инпут */}
                    <input
                        ref={inputRef}
                        className="relative w-full outline-none py-4 px-6 pr-28 text-gray-800 bg-transparent rounded-3xl placeholder:text-gray-400"
                        type="text"
                        id="partner-search"
                        autoComplete="off"
                        placeholder="Поиск партнеров..."
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            setSelectedIndex(-1);
                            if (!searchFocus) setSearchFocus(true);
                        }}
                        onFocus={() => setSearchFocus(true)}
                        onBlur={(e) => {
                            if (!searchRef.current?.contains(e.relatedTarget as Node)) {
                                setSearchFocus(false);
                            }
                        }}
                    />

                    {/* Иконки справа */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        {/* Кнопка очистки */}
                        <AnimatePresence>
                            {searchValue && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={handleClearSearch}
                                    className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-400 hover:text-gray-600"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={18} />
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Кнопка поиска */}
                        <motion.button
                            onClick={() => searchValue && console.log('Search:', searchValue)}
                            className="p-3 rounded-full bg-[#B72B3A] cursor-pointer text-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                scale: searchFocus ? 1.05 : 1,
                                backgroundColor: searchFocus ? "#9a2431" : "#B72B3A",
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut"
                            }}
                        >
                            <Search size={20} />
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Результаты поиска */}
            <AnimatePresence>
                {searchFocus && searchValue && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -20,
                            scale: 0.98
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                        exit={{
                            opacity: 0,
                            y: -10,
                            scale: 0.98
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut"
                        }}
                        className="absolute w-full mt-3 z-40"
                    >
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden border border-gray-200/50">
                            {/* Заголовок результатов */}
                            <div className="px-4 py-3 border-b border-gray-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">
                                        Найдено: {filteredPartners.length}
                                    </span>
                                    <button
                                        onClick={() => setSearchFocus(false)}
                                        className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
                                    >
                                        Закрыть
                                    </button>
                                </div>
                            </div>

                            {/* Список результатов */}
                            <ul
                                ref={listRef}
                                className="max-h-80 overflow-y-auto"
                            >
                                {filteredPartners.length > 0 ? (
                                    filteredPartners.map((partner, index) => (
                                        <motion.li
                                            key={partner.id || index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.02 }}
                                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${selectedIndex === index ? 'bg-gray-100' : ''
                                                }`}
                                            onClick={() => handleSelectPartner(partner)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                    {partner.image ? (
                                                        <Image
                                                            src={partner.image}
                                                            alt={partner.name}
                                                            width={600}
                                                            height={600}
                                                            className="w-full h-full object-cover rounded-lg"
                                                        />
                                                    ) : (
                                                        <span className="text-[#B72B3A] font-bold">
                                                            {partner.name.charAt(0)}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="font-medium text-gray-900 truncate">
                                                            {partner.name}
                                                        </h4>
                                                        <ChevronRight size={16} className="text-gray-400" />
                                                    </div>

                                                    {partner.description && (
                                                        <p className="text-sm text-gray-600 truncate mt-1">
                                                            {partner.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.li>
                                    ))
                                ) : (
                                    <div className="px-6 py-8 text-center">
                                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                                            <Search className="text-gray-400" />
                                        </div>
                                        <p className="text-gray-600">Ничего не найдено</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Попробуйте другой запрос
                                        </p>
                                    </div>
                                )}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Простая подсказка при фокусе */}
            <AnimatePresence>
                {searchFocus && filteredPartners.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-6 left-4 text-xs text-gray-500"
                    >
                        Используйте стрелки для навигации
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};