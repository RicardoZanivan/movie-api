import request from 'supertest';
import { app } from '@/main/config/app';
import sqlite3 from 'sqlite3';
import { populateDatabaseFromCSV } from '@/infra/services';
import { SQLiteConnection } from '@/infra/repos/sqlite3/helpers';

async function setupDatabase(): Promise<void> {
    const db = new sqlite3.Database(':memory:');
    if (!db) {
      throw new Error('Failed to create database instance');
    }
    SQLiteConnection.getInstance().setDb(db);
    await populateDatabaseFromCSV('public/movielist.csv', db);
  }

describe('Movies Routes', () => {
    beforeAll(async () => {
        await setupDatabase();
    })
    
    afterAll(async () => {
        await SQLiteConnection.getInstance().close();
    })

    describe('GET /movies', () => {
        test('Should return 200 on load movies on success', async () => {
            const response = await request(app)
                .get('/api/movies')
                .expect(200)

            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBeGreaterThan(0);
            response.body.forEach((movie) => {
                expect(movie).toHaveProperty('id');
                expect(movie).toHaveProperty('year');
                expect(movie).toHaveProperty('title');
                expect(movie).toHaveProperty('studios');
                expect(movie).toHaveProperty('producers');
                expect(movie).toHaveProperty('winner');
            });
        })
    })

    describe('GET /movies/topyears', () => {
        test('Should return 200 on load top years on success', async () => {
            const response = await request(app)
                .get('/api/movies/topyears')
                .expect(200)

            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBeGreaterThan(0);
            response.body.forEach((movie) => {
                expect(movie).toHaveProperty('year');
                expect(movie).toHaveProperty('winnerCount');
            });
        })
    })

    describe('GET /movies/topstudios', () => {
        test('Should return 200 on load studios on success', async () => {
            const response = await request(app)
                .get('/api/movies/topstudios')
                .expect(200)

            expect(response.body).toBeInstanceOf(Array)
            expect(response.body.length).toBe(3);
            response.body.forEach((movie) => {
                expect(movie).toHaveProperty('studio_name');
                expect(movie).toHaveProperty('winCount');
            });
        })
    })
})