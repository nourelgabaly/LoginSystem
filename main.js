var app = document.getElementById('app');

function showMessage(message, type) {
  type = type || 'error'; 
  return '<p class="' + type + '">' + message + '</p>';
}

function Login() {
  app.innerHTML = `
    <h2>Smart Login System</h2>
    <form id="loginForm">
      <input type="email" id="email" placeholder="Enter your email" required />
      <input type="password" id="password" placeholder="Enter your password" required />
      <button type="login">Login</button>
    </form>
    <p>Don't have an account? <a href="#" id="toRegister">Sign Up</a></p>
    <div id="message"></div>
  `;

var h2 = document.querySelector("h2");
h2.style.color = "#19A2B8";

var p = document.querySelector(".container p");
p.style.color = "white";

var a = document.querySelector(".container a");
a.style.color = "white";



  var form = document.getElementById('loginForm');
  var message = document.getElementById('message');

  form.addEventListener('submit', function(e) {
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

var users = localStorage.getItem('users');

if (users) {
  users = JSON.parse(users); 
} else {
  users = [];
}

var user = null;
for (var i = 0; i < users.length; i++) {
  if (users[i].email === email && users[i].password === password) {
    user = users[i]; 
    break; 
  }
}

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      Home();
    } else {
      message.innerHTML = ''; 
      message.appendChild(showMessage('Invalid email or password.'));
    }
  });

  document.getElementById('toRegister').addEventListener('click', function() {
    Registration();
  });
}

function Registration() {
  app.innerHTML = `
    <h2>Smart Login System</h2>
    <form id="registerForm">
      <input type="text" id="name" placeholder="Full Name" required />
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="signup">Sign Up</button>
    </form>
    <p>Already have an account? <a href="#" id="toLogin">Login</a></p>
    <div id="message"></div>
  `;

  var h2 = document.querySelector("h2");
  h2.style.color = "#19A2B8";
  
  var p = document.querySelector(".container p");
  p.style.color = "white";
  
  var a = document.querySelector(".container a");
  a.style.color = "white";


  var form = document.getElementById('registerForm');
  var message = document.getElementById('message');

  form.addEventListener('submit', function(e) {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    var users = localStorage.getItem('users'); 

    if (users) {
      users = JSON.parse(users); 
    } else {
      users = []; 
    }
    
    if (users.find(user => user.email === email)) {
      message.innerHTML = ''; 
      message.appendChild(showMessage('Email is already registered.'));
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
  });

  document.getElementById('toLogin').addEventListener('click', function() {
    Login();
  });
}

function Home() {
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    Login();
    return;
  }

  app.innerHTML = `
    <h2>Welcome, ${currentUser.name}!</h2>
  `;

  var l = document.querySelector(h2);
  l.style.color="#19A2B8";

}

if (localStorage.getItem('currentUser')) {
  Home();
} else {
  Login();
}
