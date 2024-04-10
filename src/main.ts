import { app } from './main/config/app';
import { env } from './main/config/env';

 app.listen(env.port, () => {
    console.log(`=== Movies server running at http://localhost:${env.port} ===`)
})