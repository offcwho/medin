'use client';

import { useEffect, useMemo, useState } from 'react';
import { AutoForm, Badge, Button, DataTable } from '@/admin/components/ui';
import { FormBuilder } from '@/admin/utils/form-builder';
import { TableBuilder } from '@/admin/utils/table-utils';
import { useFormModal } from '@/admin/hooks/useFormModal';
import {
    ApplicationModel,
    ApplicationStatus,
    createApplication,
    deleteApplication,
    getApplications,
    updateApplication,
} from '@/lib/backend-api';

type ApplicationFormData = {
    fullName: string;
    email: string;
    phone: string;
    message: string;
    status: ApplicationStatus;
};

const emptyApplication: ApplicationFormData = {
    fullName: '',
    email: '',
    phone: '',
    message: '',
    status: 'CREATED',
};

const statusBadgeVariant: Record<ApplicationStatus, 'default' | 'warning' | 'success'> = {
    CREATED: 'default',
    INWORK: 'warning',
    CLOSED: 'success',
};

export default function AdminApplicationsPage() {
    const [applications, setApplications] = useState<ApplicationModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formModal = useFormModal<ApplicationModel>();

    const columns = useMemo(
        () =>
            new TableBuilder<ApplicationModel>()
                .text('fullName', 'Full Name')
                .text('email', 'Email')
                .text('phone', 'Phone')
                .custom('message', 'Message', (item) => (
                    <span className="line-clamp-2 max-w-[320px] text-text-secondary">{item.message}</span>
                ))
                .custom('status', 'Status', (item) => (
                    <Badge variant={statusBadgeVariant[item.status]}>{item.status}</Badge>
                ))
                .date('createdAt', 'Created')
                .build(),
        [],
    );

    const applicationFormSchema = useMemo(
        () =>
            new FormBuilder()
                .text('fullName', 'Full Name', { required: true, placeholder: 'Client full name' })
                .email('email', 'Email', { required: true, placeholder: 'client@email.com' })
                .text('phone', 'Phone', { required: true, placeholder: '+7 999 000 00 00' })
                .textarea('message', 'Message', { required: true, placeholder: 'Client message' })
                .select(
                    'status',
                    'Status',
                    [
                        { label: 'CREATED', value: 'CREATED' },
                        { label: 'INWORK', value: 'INWORK' },
                        { label: 'CLOSED', value: 'CLOSED' },
                    ],
                    { required: true },
                )
                .build(),
        [],
    );

    const loadApplications = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getApplications();
            setApplications(data);
        } catch {
            setError('Failed to load applications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadApplications();
    }, []);

    const handleAdd = () => {
        formModal.openAdd(emptyApplication);
    };

    const handleSubmit = async (values: ApplicationFormData) => {
        setSubmitting(true);
        setError(null);

        try {
            if (formModal.editingData?.id) {
                await updateApplication(formModal.editingData.id, values);
            } else {
                const { status, ...payload } = values;
                const created = await createApplication(payload);
                if (status !== 'CREATED') {
                    await updateApplication(created.id, { status });
                }
            }
            await loadApplications();
            formModal.close();
        } catch {
            setError('Failed to save application');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this application?')) {
            return;
        }

        setError(null);
        try {
            await deleteApplication(id);
            await loadApplications();
        } catch {
            setError('Failed to delete application');
        }
    };

    return (
        <div className="flex flex-col gap-xl">
            <div className="flex flex-wrap items-start justify-between gap-lg">
                <div>
                    <h1 className="text-3xl font-bold text-text-primary">Applications</h1>
                    <p className="mt-xs text-sm text-text-muted">Manage incoming applications</p>
                </div>
                <Button onClick={handleAdd}>Add Application</Button>
            </div>

            {error && (
                <div className="rounded-lg bg-danger-bg px-md py-sm text-sm text-danger">
                    {error}
                </div>
            )}

            <DataTable
                title="Applications"
                data={applications}
                columns={columns}
                searchPlaceholder="Search applications..."
                emptyMessage={loading ? 'Loading...' : 'No applications found'}
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
                schema={applicationFormSchema}
                defaultValues={(formModal.editingData as unknown as Record<string, unknown>) || emptyApplication}
                onSubmit={handleSubmit}
                submitLabel={formModal.editingData?.id ? 'Save Changes' : 'Create Application'}
                loading={submitting}
                modal={{
                    isOpen: formModal.isOpen,
                    onClose: formModal.close,
                    title: formModal.editingData?.id ? 'Edit Application' : 'Create Application',
                }}
            />
        </div>
    );
}
