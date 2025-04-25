import { Post, Todo } from './apiUtils';

export const TestData = {
    todos: {
        valid: {
            id: 1,
            userId: 1,
            title: 'Test Todo',
            completed: false
        } as Todo
    },
    posts: {
        new: {
            title: 'New Post',
            body: 'Post Body',
            userId: 1
        },
        valid: {
            id: 1,
            title: 'Test Post',
            body: 'Test Body',
            userId: 1
        } as Post
    },
    users: {
        standard: {
            username: 'testuser',
            email: 'test@example.com'
        }
    }
};