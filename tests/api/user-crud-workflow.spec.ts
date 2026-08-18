import { test, expect } from '@playwright/test';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Routes } from '../../api/endpoints/routes';
import dotenv from 'dotenv';

dotenv.config();

test.describe.serial('User CRUD Workflow', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    let createdUserId: number;

    // ---------------------------------------------------------
    // CREATE → UPDATE → DELETE Workflow
    // ---------------------------------------------------------

    test('User CRUD Workflow @master @regression @api', async ({ request }) => {

        // 1. Create a user
        const createPayload = RandomDataUtil.generateUserPayload();

        const createResponse = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: createPayload });

        expect(createResponse.status()).toBe(201);

        const createdUser = await createResponse.json();

        expect(createdUser).toHaveProperty('id');

        createdUserId = createdUser.id;

        // 2. Update the same user
        const updatePayload = RandomDataUtil.generateUserUpdatePayload();

        const updateResponse = await request.put(`${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(createdUserId))}`, { data: updatePayload });

        expect(updateResponse.status()).toBe(200);

        const updatedUser = await updateResponse.json();

        expect(updatedUser.username).toBe(updatePayload.username);

        // 3. Delete the same user
        const deleteResponse = await request.delete(`${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(createdUserId))}`);

        expect(deleteResponse.status()).toBe(200);
    });
});