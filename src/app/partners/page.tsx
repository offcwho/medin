import { PartnersPage } from "@/entities/partners"

export const metadata = {
    title: 'О нас',
    description: 'Страница о нашей компании',
    openGraph: {
        title: 'О нашей компании',
        description: 'Подробнее о нашей миссии',
    },
}

export default function AllPartnersPage() { return <PartnersPage /> }