// El código va aquí ->
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgrega = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");

btnClear.addEventListener("click", function (event) {
  event.preventDefault();
  txtName.value = "";
  txtNumber.value = "";
});

//VALIDA CAMPOS CON BORDE ROJO  O VERDE
btnAgrega.addEventListener("click", function (event) {
  event.preventDefault();
  //quita los textos si se cumple todo
  alertValidacionesTexto.innerHTML = "";
  //quita el se debe escribir.. estableciendolo en none fijo
  alertValidaciones.style.display = "none";
  //   txtName.value = txtName.value.trim(); HACE LO MISMO QUE BLUR
  let lista = "Los siguientes campos deben ser llenados correctamente:<ul>";

  //validacion de campo texto
  txtName.value.length == 0
    ? ((txtName.style.border = "solid thin red"),
      (lista += "<li>Se debe escribir elemento valido</li>"))
    : (txtName.style.border = "solid thin green");

  //validacion de campo numeros
  txtNumber.value.length == 0
    ? ((txtNumber.style.border = "solid thin red"),
      (lista += "<li> Se debe escribir una cantidad valida</li>"),
      (alertValidaciones.style.display = "block"))
    : (txtNumber.style.border = "solid thin green");
  alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
});

// CUANDO TE SALES DEL CAMPO "BLUR" en este caso quita espacios
txtNumber.addEventListener("blur", function (event) {
  event.preventDefault();
  txtNumber.value = txtNumber.value.trim();
  txtName.value = txtName.value.trim();
});
