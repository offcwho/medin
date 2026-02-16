'use client';

import { useEffect, useMemo, useState } from 'react';
import { AutoForm, Button, DataTable } from '@/admin/components/ui';
import { FormBuilder } from '@/admin/utils/form-builder';
import { TableBuilder } from '@/admin/utils/table-utils';
import { useFormModal } from '@/admin/hooks/useFormModal';
import {
    PartnerModel,
    createPartner,
    deletePartner,
    getPartners,
    updatePartner,
} from '@/lib/backend-api';

type PartnerFormData = {
    name: string;
    country: string;
    image: string;
    description: string;
};

const emptyPartner: PartnerFormData = {
    name: '',
    country: '',
    image: '',
    description: '',
};

export default function AdminPartnersPage() {
    const [partners, setPartners] = useState<PartnerModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formModal = useFormModal<PartnerModel>();

    const columns = useMemo(
        () =>
            new TableBuilder<PartnerModel>()
                .custom('name', 'Partner', (partner) => (
                    <div className="flex items-center gap-sm">
                        <div className="h-10 w-10 overflow-hidden rounded-md bg-bg-tertiary">
                            <img
                                src={partner.image || '/partners/partner1.png'}
                                alt={partner.name}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <span className="font-medium text-text-primary">{partner.name}</span>
                    </div>
                ))
                .text('country', 'Country')
                .custom('description', 'Description', (partner) => (
                    <span className="line-clamp-2 max-w-[360px] text-text-secondary">
                        {partner.description}
                    </span>
                ))
                .date('createdAt', 'Created')
                .build(),
        [],
    );

    const partnerFormSchema = useMemo(
        () =>
            new FormBuilder()
                .text('name', 'Name', { required: true, placeholder: 'Partner name' })
                .text('country', 'Country', { required: true, placeholder: 'Country' })
                .text('image', 'Image URL', { required: true, placeholder: '/partners/partner1.png' })
                .textarea('description', 'Description', { required: true, placeholder: 'Partner description' })
                .build(),
        [],
    );

    const loadPartners = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getPartners();
            setPartners(data);
        } catch {
            setError('Failed to load partners');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadPartners();
    }, []);

    const handleAdd = () => {
        formModal.openAdd(emptyPartner);
    };

    const handleSubmit = async (values: PartnerFormData) => {
        setSubmitting(true);
        setError(null);

        try {
            if (formModal.editingData?.id) {
                await updatePartner(formModal.editingData.id, values);
            } else {
                await createPartner(values);
            }
            await loadPartners();
            formModal.close();
        } catch {
            setError('Failed to save partner');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this partner?')) {
            return;
        }

        setError(null);
        try {
            await deletePartner(id);
            await loadPartners();
        } catch {
            setError('Failed to delete partner');
        }
    };

    return (
        <div className="flex flex-col gap-xl">
            <div className="flex flex-wrap items-start justify-between gap-lg">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Partners</h1>
                    <p className="mt-xs text-sm text-text-muted">Manage partners from backend model</p>
                </div>
                <Button onClick={handleAdd}>Add Partner</Button>
            </div>

            {error && (
                <div className="rounded-lg bg-danger-bg px-md py-sm text-sm text-danger">
                    {error}
                </div>
            )}

            <DataTable
                title="Partners"
                data={partners}
                columns={columns}
                searchPlaceholder="Search partner..."
                emptyMessage={loading ? 'Loading...' : 'No partners found'}
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
                schema={partnerFormSchema}
                defaultValues={(formModal.editingData as unknown as Record<string, unknown>) || emptyPartner}
                onSubmit={handleSubmit}
                submitLabel={formModal.editingData?.id ? 'Save Changes' : 'Create Partner'}
                loading={submitting}
                modal={{
                    isOpen: formModal.isOpen,
                    onClose: formModal.close,
                    title: formModal.editingData?.id ? 'Edit Partner' : 'Create Partner',
                }}
            />
        </div>
    );
}
