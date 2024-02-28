import { postData } from "./utils/api.js";
import authHandler from "./utils/authorization.js";
import {  setCookie } from "./utils/cookie.js";
import validateForm from "./utils/validation.js";

const inputs = document.querySelectorAll("input");
const button = document.querySelector("button");

const handleSubmit = async (event) => {
  event.preventDefault();
  const username = inputs[0].value;
  const password = inputs[1].value;
  const validation=validateForm(username,password)
  if(!validation)return

  const res = await postData("auth/login", { username, password });
 setCookie(res.token)
  location.assign("index.html");
};

button.addEventListener("click", handleSubmit);
document.addEventListener("DOMContentLoaded",authHandler)
