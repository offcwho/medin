'use client'

import { ModalProvider } from "rdy-comp";

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    )
}