const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const { jwtSecret, dbUri } = require('./config');

// Initialize app
const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000', // Update with your frontend URL
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization'
// }));
// Mongoose models



const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  tokens: [String]
});

const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  dealership: { type: String, required: true },
  owner: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);
const Car = mongoose.model('Car', CarSchema);

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/car-dealership', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware for token verification
const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Received Token:', token);
    if (!token) {
      return res.status(401).send({ error: 'Authentication required' });
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      console.log('Decoded Token:', decoded);
      const user = await User.findOne({ _id: decoded.id, tokens: token });
      console.log('Found User:', user);
      if (!user || (roles.length && !roles.includes(user.role))) {
        throw new Error('User not found or role mismatch');
      }
      req.user = user;
      req.token = token;
      next();
    } catch (e) {
      console.error('Authentication Error:', e.message);
      res.status(401).send({ error: 'Please authenticate' });
    }
  };
};

// User registration
app.post('/api/auth/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.status(201).send({ message: 'User registered successfully' });
});

// User login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ error: 'Invalid login credentials' });
  }
  const token = jwt.sign({ id: user._id }, jwtSecret);
  user.tokens.push(token);
  await user.save();
  res.send({ token });
});

// User logout
app.post('/api/auth/logout', authMiddleware(), async (req, res) => {
  req.user.tokens = req.user.tokens.filter(t => t !== req.token);
  await req.user.save();
  res.send({ message: 'Logged out successfully' });
});

// Fetch user profile
// app.get('/api/user/profile', authMiddleware(), async (req, res) => {
//   const ownedCars = await Car.find({ owner: req.user.username });
//   res.send({ user: req.user, ownedCars });
// });

// Assuming you're using Express and Mongoose
app.get('/api/user/profile', authMiddleware(), async (req, res) => {
  try {
    const ownedCars = await Car.find({ owner: req.user.username });
    res.send({ user: req.user, ownedCars });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch profile data' });
  }
});


// Fetch dealership inventory
app.get('/api/dealership', authMiddleware(['dealership']), async (req, res) => {
  const inventory = await Car.find({ dealership: req.user.username });
  res.send({ dealership: req.user, inventory });
});




// Fetch all cars
app.get('/api/cars', async (req, res) => {
  const cars = await Car.find();
  res.send(cars);
});

// Add a new car (Dealership and User)
app.post('/api/cars', authMiddleware(['dealership', 'user']), async (req, res) => {
  const { make, model, year } = req.body;
  const car = new Car({ make, model, year, dealership: req.user.username, owner: req.user.username });
  await car.save();
  res.status(201).send(car);
});

// Update password
app.post('/api/user/update-password', authMiddleware(), async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!(await bcrypt.compare(oldPassword, req.user.password))) {
    return res.status(400).send({ error: 'Old password is incorrect' });
  }
  req.user.password = await bcrypt.hash(newPassword, 8);
  req.user.tokens = [];
  await req.user.save();
  res.send({ message: 'Password updated successfully' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
