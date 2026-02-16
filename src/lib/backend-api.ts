export type ApplicationStatus = 'CREATED' | 'INWORK' | 'CLOSED';

export interface PartnerModel {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    country: string;
    image: string;
    description: string;
}

export interface ApplicationModel {
    id: number;
    createdAt: string;
    updatedAt: string;
    fullName: string;
    email: string;
    phone: string;
    message: string;
    status: ApplicationStatus;
}

export interface AboutModel {
    id: number;
    createdAt: string;
    updatedAt: string;
    description: string;
}

export interface CreatePartnerPayload {
    name: string;
    country: string;
    image: string;
    description: string;
}

export interface CreateApplicationPayload {
    fullName: string;
    email: string;
    phone: string;
    message: string;
}

export interface UpdateApplicationPayload {
    fullName?: string;
    email?: string;
    phone?: string;
    message?: string;
    status?: ApplicationStatus;
}

export interface CreateAboutPayload {
    description: string;
}

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'https://medin-backend.onrender.com').replace(/\/+$/, '');

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        cache: 'no-store',
        credentials: 'include',
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(init.headers ?? {}),
        },
    });

    if (!response.ok) {
        const details = await response.text();
        throw new Error(details || `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
        return null as T;
    }

    return response.json() as Promise<T>;
}

export function getPartners() {
    return apiRequest<PartnerModel[]>('/partners');
}

export function createPartner(payload: CreatePartnerPayload) {
    return apiRequest<PartnerModel>('/partners', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function updatePartner(id: number, payload: Partial<CreatePartnerPayload>) {
    return apiRequest<PartnerModel>(`/partners/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });
}

export function deletePartner(id: number) {
    return apiRequest<PartnerModel>(`/partners/${id}`, {
        method: 'DELETE',
    });
}

export function getApplications() {
    return apiRequest<ApplicationModel[]>('/applications');
}

export function createApplication(payload: CreateApplicationPayload) {
    return apiRequest<ApplicationModel>('/applications', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function updateApplication(id: number, payload: UpdateApplicationPayload) {
    return apiRequest<ApplicationModel>(`/applications/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });
}

export function deleteApplication(id: number) {
    return apiRequest<ApplicationModel>(`/applications/${id}`, {
        method: 'DELETE',
    });
}

export function getAboutEntries() {
    return apiRequest<AboutModel[]>('/about');
}

export function createAbout(payload: CreateAboutPayload) {
    return apiRequest<AboutModel>('/about', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function updateAbout(id: number, payload: Partial<CreateAboutPayload>) {
    return apiRequest<AboutModel>(`/about/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
    });
}

export function deleteAbout(id: number) {
    return apiRequest<AboutModel>(`/about/${id}`, {
        method: 'DELETE',
    });
}
