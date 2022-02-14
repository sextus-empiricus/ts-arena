// variables:
const port: number = Number(process.env.PORT) || 3000;

// server:
import {app} from './app';

app.listen(port, 'localhost', () => {
    console.log(`Listening on ${port}...`)
})