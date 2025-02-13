import request from 'supertest';
import { server } from './app';

afterAll((done) => {

    server.close(done);
});

test('POST /tasks', async () => {
    const response = await request(server)  
        .post('/tasks')
        .send({ title: 'Task 1', completed: false });

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 1, title: 'Task 1', completed: false });
});

test('GET /tasks', async () => {
    const response = await request(server)  
        .get('/tasks');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 1, title: 'Task 1', completed: false }]);
});

test('PUT /tasks/:id', async () => {
    const response = await request(server) 
        .put('/tasks/1')
        .send({ title: 'Task 1 updated', completed: true });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 1, title: 'Task 1 updated', completed: true });
});

test('DELETE /tasks/:id', async () => {
    const response = await request(server)  
        .delete('/tasks/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Task deleted successfully" }); 
});
