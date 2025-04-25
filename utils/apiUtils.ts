import { APIRequestContext } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv();

interface Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export type { Todo, Post };

export class ApiUtils {
    constructor(private request: APIRequestContext) { }

    async validateResponseSchema(response: unknown, schema: object): Promise<boolean> {
        const validate = ajv.compile(schema);
        return validate(response);
    }

    async sendRequest<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        data?: object
    ): Promise<T> {
        const response = await this.request[method.toLowerCase()](url, {
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok()) {
            throw new Error(`API request failed: ${response.status()} ${response.statusText()}`);
        }

        return await response.json();
    }
}