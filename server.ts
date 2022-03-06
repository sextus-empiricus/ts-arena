// variables:
const port: number = Number(process.env.PORT) || 3000;

// server:
import {app} from './app';

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on ${port}...`)
})