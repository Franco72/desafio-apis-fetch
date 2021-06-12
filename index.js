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
  //Cambiando el href del "a", para redirigir al producto de Mercadolibre
  let templateLinkEl = template.content.querySelector(".product-link");
  templateLinkEl.setAttribute("href", product.permalink);
  //Clonando el elemento
  let clone = document.importNode(template.content, true);
  return clone;
}
function createNewProduct(dataOfProduct) {
  const results = document.querySelector(".results-num");
  results.textContent = dataOfProduct.results.length;
  const productList = document.querySelector(".container-of-products");
  const template = document.querySelector("#template-product");
  dataOfProduct.results.forEach((product) => {
    const newProduct = copyTemplate(product, template);
    productList.appendChild(newProduct);
  });
}
function handleSubmit(event) {
  event.preventDefault();
  return event.target["product-to-search"].value;
}
function searchProducts(event) {
  //elimino los elementos que se buscaron antes(si es que hay), este proceso se hace antes de añadir los próximos elementos, apenas el user haga click en el botón se van a eliminar los elementos anteriores y después se añadirán los nuevos
  const productList = document.querySelector(".container-of-products");
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild);
  }
  const productToSearch = handleSubmit(event);
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
