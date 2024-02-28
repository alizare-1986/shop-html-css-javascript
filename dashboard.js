import { getData } from "./utils/api.js";
import authHandler from "./utils/authorization.js";

const usersContent = document.getElementById("container");
const logoutButton = document.querySelector("button");
const renderUsers = (users) => {
  usersContent.innerHTML = "";
  users.forEach((user) => {
    const jsx = `
    <div id="card">
    <h3>${user.id}</h3>
    <div>
    <p><i class="fa-solid fa-user"></i>Name:</p>
    <span>${user.name.firstname} ${user.name.lastname}</span>
    </div>
    <div>
    <p><i class="fa-solid fa-paperclip"></i>UserName:</p>
    <span>${user.username}</span>
    </div>
    <div>
    <p><i class="fa-solid fa-envelope"></i>Email:</p>
    <span>${user.email}</span>
    </div>
    <div>
    <p><i class="fa-solid fa-phone"></i>Phone:</p>
    <span>${user.phone}</span>
    </div>
    <div>
    <p><i class="fa-solid fa-location-dot"></i>Address:</p>
    <span>${user.address.city}-${user.address.street}-${user.address.zipcode}</span>
    </div>
    </div>
    `;
    usersContent.innerHTML += jsx;
  });
};
const init = async () => {
  const user = await getData("users");
  renderUsers(user);
};
const handleLogout = () => {
  document.cookie = "token=;max-age=0";
  location.assign("index.html")
};

document.addEventListener("DOMContentLoaded", authHandler);
document.addEventListener("DOMContentLoaded", init);
logoutButton.addEventListener("click", handleLogout);
