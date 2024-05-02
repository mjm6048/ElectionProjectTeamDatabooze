const request = require('supertest');
const express = require('express');
const app = express();
describe('POST /users/login', () => {
    it('should respond with status 200 and token', async () => {
        const res = await request(app).post('/users/login');
        expect(res.statusCode).toEqual(200);

    });
});

// Describe block for GET /ballots
describe('GET /ballots', () => {
    it('should respond with status 200 and array of ballots', async () => {
        const res = await request(app).get('/ballots');
        expect(res.statusCode).toEqual(200);
    });
});

// Describe block for GET /ballotitems
describe('GET /ballotitems', () => {
    it('should respond with status 200 and array of ballot items', async () => {
        const res = await request(app).get('/ballotitems');
        expect(res.statusCode).toEqual(200);
    });
});

// Describe block for GET /candidates
describe('GET /candidates', () => {
    it('should respond with status 200 and array of candidates', async () => {
        const res = await request(app).get('/candidates');
        expect(res.statusCode).toEqual(200);

    });
});

// Describe block for GET /results
describe('GET /results', () => {
    it('should respond with status 200 and array of results', async () => {
        const res = await request(app).get('/results');
        expect(res.statusCode).toEqual(200);

    });
});

// Describe block for GET /status
describe('GET /status', () => {
    it('should respond with status 200 and status message', async () => {
        const res = await request(app).get('/status');
        expect(res.statusCode).toEqual(200);

    });
});

// Describe block for POST /votes
describe('POST /votes', () => {
    it('should respond with status 200 and success message', async () => {
        const res = await request(app).post('/votes');
        expect(res.statusCode).toEqual(200);
    });
});

// Describe block for GET /users
describe('GET /users', () => {
    it('should respond with status 200 and array of users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('mockUsers');
    });
});

// Describe block for GET /societies
describe('GET /societies', () => {
    it('should respond with status 200 and array of societies', async () => {
        const res = await request(app).get('/societies');
        expect(res.statusCode).toEqual(200);


    });
});

// Describe block for POST /ballots
describe('POST /ballots', () => {
    it('should respond with status 200 and success message', async () => {
        const res = await request(app).post('/ballots');
        expect(res.statusCode).toEqual(200);

    });
});

// Describe block for POST /users/:username
describe('POST /users/:username', () => {
    it('should respond with status 200 and success message', async () => {
        const res = await request(app).post('/users/mockUsername');
        expect(res.statusCode).toEqual(200);
    });
});

// Describe block for POST /societies
describe('POST /societies', () => {
    it('should respond with status 200 and success message', async () => {
        const res = await request(app).post('/societies');
        expect(res.statusCode).toEqual(200);
    });
});

// Describe block for GET /users/society-statistics
describe('GET /users/society-statistics', () => {
    it('should respond with status 200 and statistics object', async () => {
        const res = await request(app).get('/users/society-statistics');
        expect(res.statusCode).toEqual(200);

    });
});

// Describe block for GET /users/system-statistics
describe('GET /users/system-statistics', () => {
    it('should respond with status 200 and statistics object', async () => {
        const res = await request(app).get('/users/system-statistics');
        expect(res.statusCode).toEqual(200);
    });
});

// Describe block for POST /ballotitems
describe('POST /ballotitems', () => {
    it('should respond with status 200 and success message', async () => {
        const res = await request(app).post('/ballotitems');
        expect(res.statusCode).toEqual(200);

    });
});

// Describe block for POST /candidate
describe('POST /candidate', () => {
    it('should respond with status 200 and success message', async () => {
        const res = await request(app).post('/candidate');
        expect(res.statusCode).toEqual(200);

    });
});

// Describe block for POST /candidates
describe('POST /candidates', () => {
    it('should respond with status 200 and success message', async () => {
        const res = await request(app).post('/candidates');
        expect(res.statusCode).toEqual(200);
    });
});