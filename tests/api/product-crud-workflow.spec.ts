import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe.serial('Product CRUD Workflow', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    let createdProductId: number;

    // ---------------------------------------------------------
    // CREATE → UPDATE → DELETE Workflow
    // ---------------------------------------------------------

    test('Product CRUD Workflow @master @regression @api', async ({ request }) => {

        // 1. Create a product
        const createPayload = RandomDataUtil.generateProductPayload();

        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: createPayload });

        expect(createResponse.status()).toBe(201);

        const createdProduct = await createResponse.json();

        expect(createdProduct).toHaveProperty('id');
        expect(createdProduct.title).toBe(createPayload.title);

        createdProductId = createdProduct.id;

        // 2. Update the same product
        const updatePayload = RandomDataUtil.generateUpdatedProductPayload();

        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(createdProductId))}`, { data: updatePayload });

        expect(updateResponse.status()).toBe(200);

        const updatedProduct = await updateResponse.json();

        expect(updatedProduct.id).toBe(createdProductId);
        expect(updatedProduct.title).toBe(updatePayload.title);

        // 3. Delete the same product
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(createdProductId))}`);

        expect(deleteResponse.status()).toBe(200);
    });
});