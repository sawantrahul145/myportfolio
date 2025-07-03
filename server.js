const express = require("express");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const ensureAuthenticated = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));
app.set('view engine', 'ejs');

// Auth Routes
app.use(authRoutes);

// Protect all public routes
app.get("/", ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const pages = [
  "about",
  "academic-details",
  "technical-skills",
  "academic-projects",
  "achievements",
  "interests",
  "personal-details",
  "contact"
];

pages.forEach(page => {
  app.get(`/${page}`, ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "public", `${page}.html`));
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
