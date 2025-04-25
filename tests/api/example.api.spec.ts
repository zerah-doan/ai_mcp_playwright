import { test, expect } from '@playwright/test';
import { config } from '../../config/env';

test.describe('Example API Test Suite', () => {
    test('should get todos', async ({ request }) => {
        const response = await request.get(`${config.apiBaseUrl}/todos/1`);
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.userId).toBe(1);
        expect(body).toHaveProperty('title');
    });

    test('should create a post', async ({ request }) => {
        const response = await request.post(`${config.apiBaseUrl}/posts`, {
            data: {
                title: 'foo',
                body: 'bar',
                userId: 1,
            }
        });
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body).toHaveProperty('id');
        expect(body.title).toBe('foo');
    });
});