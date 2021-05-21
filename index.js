function copyTemplate(product, template) {
  //Cambiando el título
  let templateTitleEl = template.content.querySelector(".name-of-product");
  templateTitleEl.textContent = product.title;
  //Cambiando la imagen
  let templateImgEl = template.content.querySelector(".img-product");
  templateImgEl.setAttribute("src", product.thumbnail);
  //Cambiando la condición
  let templateConditionEl =
    template.content.querySelector(".product-condition");
  templateConditionEl.textContent = product.condition;
  //Cambiando la cantidad vendida
  let templateSoldQuantityEl = template.content.querySelector(
    ".product-sold-quantity"
  );
  templateSoldQuantityEl.textContent = `Vendidos: ${product["sold_quantity"]}`;
  //Cambiando el precio
  let templatePriceEl = template.content.querySelector(".product-price");
  templatePriceEl.textContent = `$${product.price}`;
  //Cambiando el precio
  let templateLinkEl = template.content.querySelector(".product-link");
  templateLinkEl.setAttribute("href", product.permalink);
  //Clonando el elemento
  let clone = document.importNode(template.content, true);
  return clone;
}

function createNewProduct(dataOfProduct) {
  console.log(dataOfProduct);
  const results = document.querySelector(".results-num");
  //cuando descomento esta línea, no me reconoce el template y la lista de productos, si esta linea está comentada, funciona, pero no puedo cambiar el resultado
  // results.textContent = dataOfProduct.results.length;
  const productList = document.querySelector(".container-of-products");
  const template = document.querySelector("#template-product");
  // console.log(productList);
  // console.log(template);
  dataOfProduct.results.forEach((product) => {
    const newProduct = copyTemplate(product, template);
    productList.appendChild(newProduct);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const value = Object.fromEntries(form.entries());
  return value["product-to-search"];
}

function searchProducts(event) {
  const productToSearch = handleSubmit(event);
  console.log(productToSearch);
  fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${productToSearch}`)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      createNewProduct(json);
    });
}

function main() {
  const formOfSearch = document.querySelector(".search-form");
  formOfSearch.addEventListener("submit", searchProducts);
}

main();

//Ejemplo
// fetch("https://api.github.com/users/Franco72")
// .then(function (res) {
//   return res.json();
// })
// .then(function (json) {});
