const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const dataSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  country: String,
  topics: [String],
  sector: String,
  region: String,
  city: String,
  pest: [String],
  source: String,
  swot: [String]
});

const Data = mongoose.model('Data', dataSchema);

app.get('/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

app.get('/data/:id', async (req, res) => {
  const data = await Data.findById(req.params.id);
  res.json(data);
});

app.post('/data', async (req, res) => {
  const newData = new Data(req.body);
  await newData.save();
  res.json(newData);
});

app.put('/data/:id', async (req, res) => {
  const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedData);
});

app.delete('/data/:id', async (req, res) => {
  await Data.findByIdAndDelete(req.params.id);
  res.json({ message: 'Data deleted successfully' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));