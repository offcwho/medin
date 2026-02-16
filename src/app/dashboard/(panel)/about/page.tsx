'use client';

import { useEffect, useMemo, useState } from 'react';
import { AutoForm, Button, DataTable } from '@/admin/components/ui';
import { FormBuilder } from '@/admin/utils/form-builder';
import { TableBuilder } from '@/admin/utils/table-utils';
import { useFormModal } from '@/admin/hooks/useFormModal';
import {
    AboutModel,
    createAbout,
    deleteAbout,
    getAboutEntries,
    updateAbout,
} from '@/lib/backend-api';

type AboutFormData = {
    description: string;
};

const emptyAbout: AboutFormData = {
    description: '',
};

export default function AdminAboutPage() {
    const [aboutEntries, setAboutEntries] = useState<AboutModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formModal = useFormModal<AboutModel>();

    const columns = useMemo(
        () =>
            new TableBuilder<AboutModel>()
                .text('id', 'ID', '80px')
                .custom('description', 'Description', (item) => (
                    <span className="line-clamp-3 max-w-[520px] text-text-secondary">{item.description}</span>
                ))
                .date('createdAt', 'Created')
                .build(),
        [],
    );

    const aboutFormSchema = useMemo(
        () =>
            new FormBuilder()
                .textarea('description', 'Description', { required: true, placeholder: 'About section text' })
                .build(),
        [],
    );

    const loadAbout = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getAboutEntries();
            setAboutEntries(data);
        } catch {
            setError('Failed to load about entries');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadAbout();
    }, []);

    const handleAdd = () => {
        formModal.openAdd(emptyAbout);
    };

    const handleSubmit = async (values: AboutFormData) => {
        setSubmitting(true);
        setError(null);

        try {
            if (formModal.editingData?.id) {
                await updateAbout(formModal.editingData.id, values);
            } else {
                await createAbout(values);
            }

            await loadAbout();
            formModal.close();
        } catch {
            setError('Failed to save about entry');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this about entry?')) {
            return;
        }

        setError(null);
        try {
            await deleteAbout(id);
            await loadAbout();
        } catch {
            setError('Failed to delete about entry');
        }
    };

    return (
        <div className="flex flex-col gap-xl">
            <div className="flex flex-wrap items-start justify-between gap-lg">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">About</h1>
                    <p className="mt-xs text-sm text-text-muted">Manage about texts displayed on the main page</p>
                </div>
                <Button onClick={handleAdd}>Add About Entry</Button>
            </div>

            {error && (
                <div className="rounded-lg bg-danger-bg px-md py-sm text-sm text-danger">
                    {error}
                </div>
            )}

            <DataTable
                title="About Entries"
                data={aboutEntries}
                columns={columns}
                searchPlaceholder="Search about text..."
                emptyMessage={loading ? 'Loading...' : 'No about entries found'}
                actions={(row) => (
                    <div className="flex gap-xs">
                        <Button size="sm" variant="ghost" onClick={() => formModal.openEdit(row)}>
                            Edit
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(row.id)}>
                            Delete
                        </Button>
                    </div>
                )}
            />

            <AutoForm
                schema={aboutFormSchema}
                defaultValues={(formModal.editingData as unknown as Record<string, unknown>) || emptyAbout}
                onSubmit={handleSubmit}
                submitLabel={formModal.editingData?.id ? 'Save Changes' : 'Create About Entry'}
                loading={submitting}
                modal={{
                    isOpen: formModal.isOpen,
                    onClose: formModal.close,
                    title: formModal.editingData?.id ? 'Edit About Entry' : 'Create About Entry',
                    size: 'lg',
                }}
            />
        </div>
    );
}
