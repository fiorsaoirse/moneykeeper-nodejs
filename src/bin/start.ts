#!/usr/bin/nodejs
import app from '../app';
import config from '../environment/config';

const port = config.port || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});