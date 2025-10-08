import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';

test.describe('Customers API Tests', () => {
    // Do wyłączenia przy unit testach
    test.afterAll(async ({ request }) => {
        if (createdCustomerId) {
            console.log(`Deleting customer ${createdCustomerId} after tests...`);
            const response = await request.delete(`/api/customers/${createdCustomerId}`);
            console.log('Teardown response status:', response.status());
        } else {
            console.log('No createdCustomerId found — nothing to clean up.');
        }
    });

    const randomFullName = `${faker.person.firstName()} ${faker.person.lastName()}`;
    let createdCustomerId: number | null = null;

    test('GET /api/customers', async ({ request }) => {
        const response = await request.get('/api/customers');
        expect(response.status()).toBe(200);
        const customers = await response.json();
        console.log(customers);
        const numberOfCustomers = customers.length;
        console.log('There are ' + numberOfCustomers + ' customers');
    });

    test('GET /api/customers/:id', async ({ request }) => {
        const response = await request.get('/api/customers/2');
        expect(response.status()).toBe(200);
        const customer = await response.json();
        console.log(customer);
    });

    test('POST /api/customers', async ({ request }) => {
        const newCustomer = { name: randomFullName };
        const response = await request.post('/api/customers', { data: newCustomer });
        expect(response.status()).toBe(200);
        const responseText = await response.text();
        expect(responseText).toBe('Dodano klienta');

        const getResponse = await request.get('/api/customers');
        const customers = await getResponse.json();
        const created = customers.find((c: { name: string }) => c.name === randomFullName);
        if (created) createdCustomerId = created.id;

        console.log('Created customer ID:', createdCustomerId);
    });

    test('PUT /api/customers/:id', async ({ request }) => {
        const updatedData = { name: 'Updated Customer - ' + randomFullName };
        const response = await request.put('/api/customers/3', { data: updatedData });
        expect(response.status()).toBe(200);
        const responseText = await response.text();
        expect(responseText).toBe('Zaktualizowano klienta');
        const getResponse = await request.get('/api/customers/3');
        const customer = await getResponse.json();
        expect(customer.name).toBe('Updated Customer - ' + randomFullName );
    });

    test('DELETE /api/customers/:id', async ({ request }) => {
        const response = await request.delete('/api/customers/1');
        expect(response.status()).toBe(200);
        const responseText = await response.text();
        expect(responseText).toBe('Usunięto klienta');
        const getResponse = await request.get('/api/customers');
        const customers = await getResponse.json();
        const deletedCustomer = customers.find((c: { id: number; }) => c.id === 1);
        expect(deletedCustomer).toBeUndefined();
    });

});