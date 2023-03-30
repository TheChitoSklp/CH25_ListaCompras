// El código va aquí ->
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid = true;
let idTimeout;
let precio = 0;
let contador = 0;
let totalEnProductos = 0;
let costoTotal = 0;
//limpiar productos
btnClear.addEventListener("click", function (event) {
  event.preventDefault();
  txtName.value = "";
  txtNumber.value = "";
  cuerpoTabla[0].innerHTML = "";

  contador = 0;
  totalEnProductos = 0;
  costoTotal = 0;

  contadorProductos.innerText = "0";
  productosTotal.innerText = "0";
  precioTotal.innerText = "$0";

  localStorage.setItem("contadorProductos", contador);
  localStorage.setItem("totalEnProductos", totalEnProductos);
  localStorage.setItem("costoTotal", costoTotal.toFixed(2));
});

function validarCantidad() {
  if (txtNumber.value.length == 0) {
    return false;
  }
  if (isNaN(txtNumber.value)) {
    return false;
  }
  if (parseFloat(txtNumber.value) <= 0) {
    return false;
  }
  return true;
}
function getPrecio() {
  return Math.floor(Math.random() * 50 * 100) / 100;
}

//VALIDA CAMPOS CON BORDE ROJO  O VERDE
btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  isValid = true;
  clearTimeout(idTimeout);
  //quita los textos si se cumple todo
  alertValidacionesTexto.innerHTML = "";
  //quita el se debe escribir.. estableciendolo en none fijo
  alertValidaciones.style.display = "none";
  //   txtName.value = txtName.value.trim(); HACE LO MISMO QUE BLUR
  let lista = "Los siguientes campos deben ser llenados correctamente:<ul>";
  //validacion de campo texto
  txtName.value.length < 2
    ? ((txtName.style.border = "solid thin red"),
      (lista += "<li>Se debe escribir elemento valido</li>"),
      (alertValidaciones.style.display = "block"),
      (isValid = false))
    : (txtName.style.border = "");

  //validacion de campo numeros
  if (!validarCantidad()) {
    txtNumber.style.border = "solid thin red";
    lista += "<li> Se debe escribir una cantidad valida</li>";
    alertValidaciones.style.display = "block";
    isValid = false;
  } else {
    txtNumber.style.border = "";
  }
  lista += "</ul>";
  alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);

  idTimeout = setTimeout(() => {
    alertValidaciones.style.display = "none";
  }, 3000);

  precio = getPrecio();
  contador++;
  //genera tabla y luego usa esos valores para hacer la sumas
  if (isValid) {
    let row = `<tr>
                  <td>${contador}</td>
                  <td>${txtName.value}</td>
                  <td>${txtNumber.value}</td>
                  <th>${precio}</th>
              </tr>`;
    cuerpoTabla[0].insertAdjacentHTML("beforeend", row);

    totalEnProductos += parseFloat(txtNumber.value);
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    costoTotal += precio * parseFloat(txtNumber.value);
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;

    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));

    //limpia campos y pone el focus en el name
    txtNumber.value = "";
    txtName.value = "";
    txtName.focus();
  }
});

// CUANDO TE SALES DEL CAMPO "BLUR" en este caso quita espacios
txtNumber.addEventListener("blur", function (event) {
  event.preventDefault();
  txtNumber.value = txtNumber.value.trim();
  txtName.value = txtName.value.trim();
});

// carga items al abrir
window.addEventListener("load", function () {
  if (localStorage.getItem("contadorProductos") == null) {
    localStorage.setItem("contadorProductos", "0");
  }
  if (localStorage.getItem("totalEnProductos") == null) {
    localStorage.setItem("totalEnProductos", "0");
  }
  if (localStorage.getItem("costoTotal") == null) {
    localStorage.setItem("costoTotal", "0.0");
  }
  contador = parseInt(localStorage.getItem("contadorProductos"));
  totalEnProductos = parseInt(localStorage.getItem("totalEnProductos"));
  costoTotal = parseFloat(localStorage.getItem("costoTotal"));

  contadorProductos.innerText = contador;
  productosTotal.innerText = totalEnProductos;
  precioTotal.innerText = `$${costoTotal}`;
});
