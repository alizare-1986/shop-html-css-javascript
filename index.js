import { getData } from "./utils/api.js";
import { getCookie } from "./utils/cookie.js";
import { shorten } from "./utils/stringFunc.js";

let allProducts = null;
let search = "";
let category = "all";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const searchButton = document.querySelector("button");
const input = document.querySelector("input");
const listItems = document.querySelectorAll("li");

const showProducts = (products) => {
  mainContent.innerHTML = "";
  products.forEach((product) => {
    const jsx = `
    <div>
    <img alt="product" src=${product.image} />
    <h4>${shorten(product.title)}</h4>
    <div id="price">
    <p>$ ${product.price}</p>
    <button>
    Buy
    <i class="fa-solid fa-cart-shopping"></i>
    </button>
    </div>
    <div id="rate">
    <i class="fa-solid fa-star"></i>
    <span>${product.rating.rate}</span>
    </div>
    <div id="count">
    <i class="fa-solid fa-user"></i>
    <span>${product.rating.count}</span>
    </div>
    </div>
    `;
    mainContent.innerHTML += jsx;
  });
};
const init = async () => {
  const cookie = getCookie();
  if (cookie) {
    loginButton.style.display = "none";
  } else {
    dashboardButton.style.display = "none";
  }
  allProducts = await getData("products");
  showProducts(allProducts);
};

const filterProducts = () => {
  const filtredProducts = allProducts.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(search);
    } else {
      return (
        product.title.toLowerCase().includes(search) &&
        product.category.toLowerCase() === category
      );
    }
  });
  showProducts(filtredProducts);
  //   if (search) {
  //     if (category === "all") {
  //       filtredProducts = allProducts.filter((product) => {
  //         product.title.toLowerCase().includes(search);
  //       });
  //     } else {
  //       filtredProducts = allProducts.filtre((product) => {
  //         product.title.toLowerCase().includes(search) &&
  //           product.category.toLowerCase() === category;
  //       });
  //     }
  //   } else {
  //     if (category === "all") {
  //       filtredProducts = allProducts;
  //     } else {
  //       filtredProducts = allProducts.filter((product) => {
  //         product.category.toLowerCase() === category;
  //       });
  //     }
  //   }
};
const handleSearch = () => {
  search = input.value.trim().toLowerCase();
  filterProducts();
};
const handleFilter = (event) => {
  event.preventDefault();
  category = event.target.innerText.toLowerCase();
  listItems.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.className = "selected";
    } else {
      li.className = "";
    }
  });
  filterProducts();
};
document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", handleSearch);
listItems.forEach((li) => li.addEventListener("click", handleFilter));
