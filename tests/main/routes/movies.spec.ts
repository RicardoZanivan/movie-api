import request from 'supertest';
import { app } from '@/main/config/app';
const connectToDatabase = require("../../../src/infra/repos/sqlite3/db")

let db;

const deleteAllMovies = async (): Promise<void> => {
    db.run('DELETE FROM migration', function(error) {
        if (error) {
          return console.error('Erro ao limpar a tabela:', error.message);
        }
        console.log('Tabela limpa com sucesso passou.');
    });
}

describe('Movies Routes', () => {
    beforeAll(async () => {
        db = connectToDatabase
    })
    
    afterAll(async () => {
        db.close();
    })

    beforeEach(async () => {
        await deleteAllMovies();
    })

    describe('GET /movies', () => {
        test('Should return 200 on load studios on success', async () => {
            await request(app)
                .get('/api/movies')
                .expect(200)
        })
    })

    describe('GET /movies/topyears', () => {
        test('Should return 200 on load top years on success', async () => {
            await request(app)
                .get('/api/movies/topyears')
                .expect(200)
        })
    })

    describe('GET /movies/topstudios', () => {
        test('Should return 200 on load studios on success', async () => {
            await request(app)
                .get('/api/movies/topstudios')
                .expect(200)
        })
    })
})