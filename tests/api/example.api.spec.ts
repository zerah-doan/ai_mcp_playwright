import { expect } from '@playwright/test';
import { test } from '@tests/fixtures/testFixtures';
import { Todo, Post } from '@utils/apiUtils';
import { TestData } from '@utils/testData';

// API Response schemas
const todoSchema = {
    type: 'object',
    required: ['id', 'userId', 'title', 'completed'],
    properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
        title: { type: 'string' },
        completed: { type: 'boolean' }
    }
};

const postSchema = {
    type: 'object',
    required: ['id', 'title', 'body', 'userId'],
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        body: { type: 'string' },
        userId: { type: 'number' }
    }
};

test.describe('Example API Test Suite', () => {
    test('should get todos with schema validation', async ({ apiUtils, logger }) => {
        logger.info('Fetching todo item', { id: TestData.todos.valid.id });
        const response = await apiUtils.sendRequest<Todo>('GET', `${process.env.API_BASE_URL}/todos/${TestData.todos.valid.id}`);

        logger.debug('Validating todo response schema');
        expect(await apiUtils.validateResponseSchema(response, todoSchema)).toBeTruthy();

        logger.info('Validating todo response data');
        expect(response.userId).toBe(TestData.todos.valid.userId);
    });

    test('should create a post with schema validation', async ({ apiUtils, logger }) => {
        logger.info('Creating new post', TestData.posts.new);
        const response = await apiUtils.sendRequest<Post>('POST', `${process.env.API_BASE_URL}/posts`, TestData.posts.new);

        logger.debug('Validating post response schema');
        expect(await apiUtils.validateResponseSchema(response, postSchema)).toBeTruthy();

        logger.info('Validating post response data');
        expect(response.title).toBe(TestData.posts.new.title);
    });
});