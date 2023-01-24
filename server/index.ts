import express from 'express';
import cors from 'cors';
import { getLocationInfo, syncLocationData } from './services/location-processing.service';

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
router.get("/api/locations", async (req, res) => {
  const locations = await getLocationInfo();
  res.json({
    data: locations
  }).status(200)
})

router.post("/api/locations/sync", async (req, res) => {
  await syncLocationData()
  res.sendStatus(200)
})

app.use(router)

app.listen(port, () => {
  startDb()
  console.log(`Example app listening on port ${port}`);
});