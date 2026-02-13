'use client'

import { AboutCard } from "..";

interface Props {
    isInView: boolean;
}

export const AboutListUi: React.FC<Props> = ({ isInView }) => {
    const card = [
        {
            title: '10+',
            description: 'лет на рынке',
        },
        {
            title: '1000+',
            description: 'успешных сделок',
        },
        {
            title: '101010',
            description: 'текст',
        },
        {
            title: '95%',
            description: 'довольных клиентов',
        },
    ]

    return (
        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 lg:gap-6 select-none">
            {card.map((item, index) => (
                <AboutCard
                    key={index}
                    index={index}
                    data={item}
                    length={card.length}
                    isInView={isInView}
                />
            ))}
        </div>
    )
}