import request from 'umi-request';
import { API_URL, USER_TOKEN } from '../config/config';

export async function getAllTenants() {
    return request(`${API_URL}/tenants/`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            Authorization: USER_TOKEN,
        },
    });
}

export async function getLandlordTenant(landordId) {
    return request(`${API_URL}/tenants/landlord-properties/${landordId}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: USER_TOKEN,
        },
    });
}

export async function getTenantTransactions(tenantId) {
    return request(`${API_URL}/tenants/transactions/${tenantId}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: USER_TOKEN,
        },
    });
}

export async function getTenantFiles(tenantId) {
    return request(`${API_URL}/tenants/files/${tenantId}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: USER_TOKEN,
        },
    });
}

export async function getPropertyTenant(propertyId) {
    return request(`${API_URL}/tenants/property/${propertyId}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            Authorization: USER_TOKEN,
        },
    });
}

export async function createTenant(body) {
    return request(`${API_URL}/tenants/create`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            Authorization: USER_TOKEN,
        },
        body: JSON.stringify(body),
    });
}

export async function updateTenantRating(body, tenantId) {
    return request(`${API_URL}/tenants/update-rating/${tenantId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Authorization: USER_TOKEN,
        },
        body: JSON.stringify(body),
    });
}

export async function completeTask(tenantId) {
    return request(`${API_URL}/tenants/completed/${tenantId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Authorization: USER_TOKEN,
        },
        // body: JSON.stringify(body),
    });
}

export async function pendingTask(body, tenantId) {
    return request(`${API_URL}/tenants/pending/${tenantId}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            Authorization: USER_TOKEN,
        },
        body: JSON.stringify(body),
    });
}

export async function deleteTask(tenantId, body) {
    return request(`${API_URL}/tenants/delete/${tenantId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            Authorization: USER_TOKEN,
        },
        body: JSON.stringify(body),
    });
}

export async function inviteTenant(body) {
    return request(`${API_URL}/tenants/invite`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            Authorization: USER_TOKEN,
        },
        body: JSON.stringify(body),
    });
}
