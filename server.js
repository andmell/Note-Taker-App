const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();


// The following code block tells our application what routes to take, what middleware to use and how to use it.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes); //html routes need to be last to act as a catch-all

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
