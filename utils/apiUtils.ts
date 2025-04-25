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
        let response;
        switch (method.toUpperCase()) {
            case 'GET':
                response = await this.request.get(url, {
                    headers: { 'Content-Type': 'application/json' }
                });
                break;
            case 'POST':
                response = await this.request.post(url, {
                    data,
                    headers: { 'Content-Type': 'application/json' }
                });
                break;
            case 'PUT':
                response = await this.request.put(url, {
                    data,
                    headers: { 'Content-Type': 'application/json' }
                });
                break;
            case 'DELETE':
                response = await this.request.delete(url, {
                    data,
                    headers: { 'Content-Type': 'application/json' }
                });
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        if (!response.ok()) {
            throw new Error(`API request failed: ${response.status()} ${response.statusText()}`);
        }

        return await response.json();
    }
}