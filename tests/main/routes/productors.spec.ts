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

describe('Productors Routes', () => {
    beforeAll(async () => {
        db = connectToDatabase
    })
    
    afterAll(async () => {
        db.close();
    })

    beforeEach(async () => {
        await deleteAllMovies();
    })

    describe('GET /productors/awardsInterval', () => {
        test('Should return 200 on load productors awards interval on success', async () => {
            await request(app)
                .get('/api/productors/awardsInterval')
                .expect(200)
        })
    })
})