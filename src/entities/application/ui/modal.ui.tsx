'use client'

import { FormEvent, useMemo, useState } from "react"
import { RdyModal } from "rdy-comp"
import { createApplication } from "@/lib/backend-api"

interface ApplicationForm {
    fullName: string;
    email: string;
    phone: string;
    message: string;
}

const initialForm: ApplicationForm = {
    fullName: '',
    email: '',
    phone: '',
    message: '',
};

export const ApplicationModalUi = () => {
    const [form, setForm] = useState<ApplicationForm>(initialForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const canSubmit = useMemo(() => {
        return (
            form.fullName.trim().length > 1 &&
            form.email.trim().length > 3 &&
            form.phone.trim().length > 5 &&
            form.message.trim().length > 3
        );
    }, [form]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!canSubmit || loading) {
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await createApplication(form);
            setSuccess('Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            setForm(initialForm);
        } catch {
            setError('Не удалось отправить заявку. Попробуйте еще раз.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <RdyModal
            id="send-application"
            title="Отправить заявку на покупку"
            close
            className=""
            width="1000px"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="flex w-full flex-col gap-4">
                        <label className="flex flex-col gap-2 text-sm text-gray-700">
                            ФИО
                            <input
                                value={form.fullName}
                                onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
                                className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#b72b3a]"
                                placeholder="Введите ФИО"
                                required
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm text-gray-700">
                            E-mail
                            <input
                                type="email"
                                value={form.email}
                                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                                className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#b72b3a]"
                                placeholder="Введите email"
                                required
                            />
                        </label>

                        <label className="flex flex-col gap-2 text-sm text-gray-700">
                            Номер телефона
                            <input
                                value={form.phone}
                                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                                className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#b72b3a]"
                                placeholder="+7 (___) ___-__-__"
                                required
                            />
                        </label>
                    </div>

                    <label className="flex w-full flex-col gap-2 text-sm text-gray-700">
                        Сообщение
                        <textarea
                            value={form.message}
                            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
                            className="min-h-[220px] rounded-xl border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-[#b72b3a]"
                            placeholder="Отправьте нам сообщение, и мы с вами свяжемся."
                            required
                        />
                    </label>
                </div>

                {error && (
                    <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                        {success}
                    </div>
                )}

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!canSubmit || loading}
                        className="rounded-xl bg-[#b72b3a] px-6 py-3 font-medium text-white transition-colors hover:bg-[#9f2432] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Отправка...' : 'Отправить'}
                    </button>
                </div>
            </form>
        </RdyModal>
    )
}
