import path from 'path';
import express from 'express';
import cors from 'cors';
import { getLocationInfo } from './services/location-processing.service';

const {startDb, stopDb} = require('../db')

const app = express();
const port = 8000;

app
  .use(cors())
  .use(express.text())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// Routes

const router = express.Router()
router.use("/api")
router.get("/locations", async (req, res) => {
  const locations = await getLocationInfo();
  res.json({
    data: locations
  }).status(200)
})

app.use(router)

startDb()

app.listen(port, () => {
  startDb()
  console.log(`Example app listening on port ${port}`);
});