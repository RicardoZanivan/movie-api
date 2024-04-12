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
        test('Should return 200 on load pipelines with accessToken', async () => {
            await request(app)
                .get('/api/movies')
                .expect(200)
        })
    })
})