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

describe('Productors Routes', () => {
    beforeAll(async () => {
        await setupDatabase();
    })
    
    afterAll(async () => {
        await SQLiteConnection.getInstance().close();
    })

    describe('GET /productors/awardsInterval', () => {
        test('Should return 200 on load productors awards interval on success', async () => {
            const response = await request(app)
                .get('/api/productors/awardsInterval')
                .expect(200)

            const { body } = response;
            expect(body).toHaveProperty('min');
            expect(body).toHaveProperty('max');
            expect(body.min.length).toBeGreaterThan(0);
            expect(body.max.length).toBeGreaterThan(0);
            body.min.forEach(interval => {
                expect(interval).toHaveProperty('producer');
                expect(interval).toHaveProperty('interval');
                expect(interval).toHaveProperty('previousWin');
                expect(interval).toHaveProperty('followingWin');
            });
            body.max.forEach(interval => {
                expect(interval).toHaveProperty('producer');
                expect(interval).toHaveProperty('interval');
                expect(interval).toHaveProperty('previousWin');
                expect(interval).toHaveProperty('followingWin');
            });
        })
    })
})