const request = require('supertest');
const app = require('../be/server'); // Adjust path if needed

describe('Posts API', () => {
  let token;
  let postId;

  beforeAll(async () => {
    // Register and login to get token
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'postuser',
        email: 'postuser@example.com',
        password: 'password123'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'postuser@example.com',
        password: 'password123'
      });

    token = res.body.token;
  });

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post.'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test Post');
    postId = res.body._id;
  });

  it('should get all posts', async () => {
    const res = await request(app)
      .get('/api/posts');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a post by id', async () => {
    const res = await request(app)
      .get(`/api/posts/${postId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toBe(postId);
  });

  it('should update a post', async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Post',
        content: 'Updated content.'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Updated Post');
  });

  it('should delete a post', async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Post deleted successfully');
  });
});
