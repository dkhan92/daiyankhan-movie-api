//For future Database and server configuration integration

import app from './app';

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});