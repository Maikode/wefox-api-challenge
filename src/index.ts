import { expressApp } from './server';

const PORT = process.env.SERVER_PORT || 4000;

expressApp.listen(PORT, () => {
    console.log(`[*] Express Server listening on PORT ${PORT} `);
});
