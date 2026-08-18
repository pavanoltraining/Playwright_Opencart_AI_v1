import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe.serial('Cart CRUD Workflow', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);
    let createdCartId: number;

    // ---------------------------------------------------------
    // CREATE → UPDATE → DELETE Workflow
    // ---------------------------------------------------------

    test('Cart CRUD Workflow @master @regression @api', async ({ request }) => {

        // 1. Create a cart
        const createPayload = RandomDataUtil.generateCartPayload(USER_ID);

        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: createPayload });

        expect(createResponse.status()).toBe(201);

        const createdCart = await createResponse.json();

        expect(createdCart).toHaveProperty('id');
        expect(createdCart.userId).toBe(createPayload.userId);
        expect(createdCart.products).toBeDefined();
        expect(Array.isArray(createdCart.products)).toBeTruthy();

        createdCartId = createdCart.id;

        // 2. Update the same cart
        const updatePayload = RandomDataUtil.generateUpdatedCartPayload(USER_ID);

        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_CART.replace('{id}', String(createdCartId))}`, { data: updatePayload });

        expect(updateResponse.status()).toBe(200);

        const updatedCart = await updateResponse.json();

        expect(updatedCart.id).toBe(createdCartId);
        expect(updatedCart.products).toBeDefined();
        expect(Array.isArray(updatedCart.products)).toBeTruthy();

        // 3. Delete the same cart
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_CART.replace('{id}', String(createdCartId))}`);

        expect(deleteResponse.status()).toBe(200);
    });
});