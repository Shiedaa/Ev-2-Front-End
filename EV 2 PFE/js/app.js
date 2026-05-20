
let userData = {
  username: "",
  password: "",
  address: {
    direccion: "",
    comuna: ""
  },
  telefono: "",
  url: "",
  aficiones: []   
};


function agregarAficion() {
  let input = document.getElementById("input-aficion");
  let valor = input.value.trim();

  if (valor.length === 0) {
    mostrarError("error-aficion", "Escribe una afición antes de agregar.");
    return;
  }

 
  let esDuplicado = false;
  for (let i = 0; i < userData.aficiones.length; i++) {
    if (userData.aficiones[i].toLowerCase() === valor.toLowerCase()) {
      esDuplicado = true;
      break;
    }
  }

  if (esDuplicado) {
    mostrarError("error-aficion", "Esa afición ya fue agregada.");
    return;
  }

 
  userData.aficiones.push(valor);
  input.value = "";
  limpiarError("error-aficion");
  renderizarAficiones(userData.aficiones);
  validarCampoAficiones(); // Revalidar contador en tiempo real
  input.focus();
}

function eliminarAficion(index) {
  userData.aficiones.splice(index, 1);
  renderizarAficiones(userData.aficiones);
  validarCampoAficiones();
}



function validarCampoUsuario() {
  let valor = document.getElementById("username").value;
  let error = validarUsuario(valor);
  if (error) {
    mostrarError("error-username", error);
    marcarCampo("username", false);
    return false;
  }
  limpiarError("error-username");
  marcarCampo("username", true);
  return true;
}

function validarCampoContrasena() {
  let usuario = document.getElementById("username").value;
  let valor = document.getElementById("password").value;
  let error = validarContrasena(valor, usuario);
  if (error) {
    mostrarError("error-password", error);
    marcarCampo("password", false);
    return false;
  }
  limpiarError("error-password");
  marcarCampo("password", true);
  return true;
}

function validarCampoConfirmacion() {
  let contrasena = document.getElementById("password").value;
  let valor = document.getElementById("confirm-password").value;
  let error = validarConfirmacion(valor, contrasena);
  if (error) {
    mostrarError("error-confirm", error);
    marcarCampo("confirm-password", false);
    return false;
  }
  limpiarError("error-confirm");
  marcarCampo("confirm-password", true);
  return true;
}

function validarCampoDireccion() {
  let valor = document.getElementById("direccion").value;
  let error = validarDireccion(valor);
  if (error) {
    mostrarError("error-direccion", error);
    marcarCampo("direccion", false);
    return false;
  }
  limpiarError("error-direccion");
  marcarCampo("direccion", true);
  return true;
}

function validarCampoComuna() {
  let valor = document.getElementById("comuna").value;
  let error = validarComuna(valor);
  if (error) {
    mostrarError("error-comuna", error);
    marcarCampo("comuna", false);
    return false;
  }
  limpiarError("error-comuna");
  marcarCampo("comuna", true);
  return true;
}

function validarCampoTelefono() {
  let valor = document.getElementById("telefono").value;
  let error = validarTelefono(valor);
  if (error) {
    mostrarError("error-telefono", error);
    marcarCampo("telefono", false);
    return false;
  }
  limpiarError("error-telefono");
  marcarCampo("telefono", true);
  return true;
}

function validarCampoURL() {
  let valor = document.getElementById("url-web").value;
  let error = validarURL(valor);
  if (error) {
    mostrarError("error-url", error);
    marcarCampo("url-web", false);
    return false;
  }
  limpiarError("error-url");
  if (valor.trim().length > 0) {
    marcarCampo("url-web", true);
  }
  return true;
}

function validarCampoAficiones() {
  let error = validarAficiones(userData.aficiones);
  if (error) {
    mostrarError("error-lista-aficiones", error);
    return false;
  }
  limpiarError("error-lista-aficiones");
  return true;
}


function procesarFormulario(event) {
  event.preventDefault();

  
  let resultados = [
    validarCampoUsuario(),
    validarCampoContrasena(),
    validarCampoConfirmacion(),
    validarCampoDireccion(),
    validarCampoComuna(),
    validarCampoTelefono(),
    validarCampoURL(),
    validarCampoAficiones()
  ];

  
  let formEsValido = true;
  for (let i = 0; i < resultados.length; i++) {
    if (!resultados[i]) {
      formEsValido = false;
    }
  }

  if (!formEsValido) {
  
    let primerError = document.querySelector(".error-msg.visible");
    if (primerError) {
      primerError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  
  userData.username = document.getElementById("username").value;
  userData.password = document.getElementById("password").value;
  userData.address.direccion = document.getElementById("direccion").value.trim();
  userData.address.comuna = document.getElementById("comuna").value;
  userData.telefono = document.getElementById("telefono").value.trim();
  userData.url = document.getElementById("url-web").value.trim();
  

  mostrarResumen(userData);
}


function reiniciarFormulario() {
  // Limpiar objeto
  userData.username = "";
  userData.password = "";
  userData.address.direccion = "";
  userData.address.comuna = "";
  userData.telefono = "";
  userData.url = "";
  userData.aficiones = [];

  
  document.getElementById("formulario-registro").reset();
  document.getElementById("formulario-registro").style.display = "";

  let resumen = document.getElementById("resumen-registro");
  resumen.classList.remove("visible");

  
  let campos = document.querySelectorAll(".campo-valido, .campo-invalido");
  for (let i = 0; i < campos.length; i++) {
    campos[i].classList.remove("campo-valido", "campo-invalido");
  }

  renderizarAficiones([]);
  window.scrollTo({ top: 0, behavior: "smooth" });
}


document.addEventListener("DOMContentLoaded", function () {

  
  document.getElementById("formulario-registro")
    .addEventListener("submit", procesarFormulario);

  
  document.getElementById("username")
    .addEventListener("blur", validarCampoUsuario);

  document.getElementById("password")
    .addEventListener("blur", validarCampoContrasena);

  document.getElementById("confirm-password")
    .addEventListener("blur", validarCampoConfirmacion);

  document.getElementById("direccion")
    .addEventListener("blur", validarCampoDireccion);

  document.getElementById("comuna")
    .addEventListener("change", validarCampoComuna);

  document.getElementById("telefono")
    .addEventListener("blur", validarCampoTelefono);

  document.getElementById("url-web")
    .addEventListener("blur", validarCampoURL);

  
  document.getElementById("password")
    .addEventListener("input", function () {
      let confirm = document.getElementById("confirm-password").value;
      if (confirm.length > 0) validarCampoConfirmacion();
    });

  
  document.getElementById("btn-agregar-aficion")
    .addEventListener("click", agregarAficion);

  
  document.getElementById("input-aficion")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        agregarAficion();
      }
    });

  
  document.getElementById("btn-nuevo-registro")
    .addEventListener("click", reiniciarFormulario);

  
  renderizarAficiones(userData.aficiones);
});
