import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import { DB, PORT, SECRET_KEY } from '../config';
import graphqlRoute from './gql';
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from './models/user';

const app = express();
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: SECRET_KEY
};

mongoose.connect(`mongodb://localhost:27017/${DB}`)

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

passport.serializeUser((user, done) => {
  done(null, user._id);
})
passport.deserializeUser(() => {});
passport.use(new JwtStrategy(jwtOpts, async (decoded, done) => {
  try {
    const user = await User.findById(decoded.id);

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(err, false);
  }
}))

app.use("/graphql", graphqlRoute);
app.post("/login", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).send({
    status: true,
    data: req.user
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
})
