"use strict";

var express = require('express');

var mongoose = require('mongoose');

var cors = require('cors');

var app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var dataSchema = new mongoose.Schema({
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
var Data = mongoose.model('Data', dataSchema);
app.get('/data', function _callee(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Data.find());

        case 2:
          data = _context.sent;
          res.json(data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get('/data/:id', function _callee2(req, res) {
  var data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Data.findById(req.params.id));

        case 2:
          data = _context2.sent;
          res.json(data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post('/data', function _callee3(req, res) {
  var newData;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          newData = new Data(req.body);
          _context3.next = 3;
          return regeneratorRuntime.awrap(newData.save());

        case 3:
          res.json(newData);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.put('/data/:id', function _callee4(req, res) {
  var updatedData;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Data.findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 2:
          updatedData = _context4.sent;
          res.json(updatedData);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app["delete"]('/data/:id', function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Data.findByIdAndDelete(req.params.id));

        case 2:
          res.json({
            message: 'Data deleted successfully'
          });

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});