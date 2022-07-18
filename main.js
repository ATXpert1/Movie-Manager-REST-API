const express = require('express');
const cors = require('cors')
const moviesBl = require('./models/moviesBL');
const membersBL = require('./models/membersBL');
const moviesRouter = require('./routers/moviesRouter');
const membersRouter = require('./routers/memebersRouter');
const subscriptionsRouter = require('./routers/subscriptionsRouter')
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/movies', moviesRouter);
app.use('/api/members', membersRouter);
app.use('/api/subscriptions', subscriptionsRouter);

moviesBl.LoadMoviesToMongoDb();
membersBL.loadMembersToMongoDb();

require('./configs/database');

app.listen(8000);
