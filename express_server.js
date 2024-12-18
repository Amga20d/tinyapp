const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8080; // default port 8080

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "aJ48lW",
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "aJ48lW",
  },
};

const users = {
  userRandomID: {
    id: "userRandomID",
    email: "[email protected]",
    password: "a",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "[email protected]",
    password: "b",
  },
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.post("/urls", (req, res) => {
  const user = users[req.cookies["user_id"]];
  if (!user) {
    return res.status(403).send("<html><body><h3>You must be logged in to shorten URLs</h3></body></html>");
  }
  const longURL = req.body.longURL; 
  const id = generateRandomString();
  urlDatabase[id] = {
    longURL: longURL,
    userID: user.id
  };
  console.log(urlDatabase);
  res.redirect(`/urls/${id}`);
});

app.post("/urls/:id", (req, res) => {
  const user = users[req.cookies["user_id"]];
  if (!user) {
    return res.status(403).send("<html><body><h3>You must be logged in to edit URLs</h3></body></html>");
  }
  const id = req.params.id;
  const newLongURL = req.body.longURL;
  urlDatabase[id].longURL = newLongURL;
  res.redirect("/urls");
});

app.post("/urls/:id/delete", (req, res) => {
  const user = users[req.cookies["user_id"]];
  if (!user) {
    return res.status(403).send("<html><body><h3>You must be logged in to delete URLs</h3></body></html>");
  }
  const id = req.params.id;
  delete urlDatabase[id];
  res.redirect("/urls");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user) {
    return res.status(403).send("Invalid email or password.");
  }
  if (user.password !== password) {
    return res.status(403).send("Invalid email or password.");
  }
  res.cookie('user_id', user.id);
  res.redirect('/urls');
});

app.post("/logout", (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/login');
});

app.get("/register", (req, res) => {
  const user = users[req.cookies["user_id"]];
  if (user) {
    return res.redirect('/urls');
  }  
  const templateVars = { user: user };
  res.render("register", templateVars); 
});

app.get("/login", (req, res) => {
  const user = users[req.cookies["user_id"]];
  if (user) {
    return res.redirect('/urls');
  }  
  const templateVars = { user: user };
  res.render("login", templateVars);
});  

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password cannot be empty.");
  }
  if (findUserByEmail(email)) {
    return res.status(400).send("Email is already registered.");
  }  
  const userID = generateRandomString();
  const newUser = {
    id: userID,
    email: email,
    password: password
  };
  users[userID] = newUser;
  res.cookie('user_id', userID);
  console.log(users);
  res.redirect('/urls');
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const user = users[req.cookies["user_id"]];
  if (!user) {
    return res.status(403).send("<html><body><h3>You must be logged in to view URLs</h3></body></html>");
  }
  const templateVars = { 
    urls: urlDatabase,
    user: user
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const user = users[req.cookies["user_id"]];
  if (!user) {
    return res.redirect('/login');
  }
  const templateVars = { user: user };
  res.render("urls_new", templateVars);
});

app.get("/urls/:id", (req, res) => {
  const templateVars = { 
    id: req.params.id, 
    longURL: urlDatabase[req.params.id].longURL,
    user: req.cookies["user_id"]
    };
  res.render("urls_show", templateVars);
});

app.get("/u/:id", (req, res) => {
  const urlEntry = urlDatabase[req.params.id];
  if (!urlEntry) {
    return res.status(404).send("<html><body><h3>URL not found</h3></body></html>");
  }
  res.redirect(urlEntry.longURL);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

function findUserByEmail(email) {
  for (let userID in users) {
    if (users[userID].email === email) {
      return users[userID];
    }
  }
  return null;
};

function urlsForUser(id) {
  let userURLs = {};
  for (let shortURL in urlDatabase) {
    if (urlDatabase[shortURL].userID === id) {
      userURLs[shortURL] = urlDatabase[shortURL];
    }
  }
  return userURLs;
}
