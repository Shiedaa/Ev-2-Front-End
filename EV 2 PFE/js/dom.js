// ============================================================
// dom.js — Funciones de manipulación del DOM
// TI3031 — Evaluación Sumativa 2 — Programación Front End
// ============================================================

/**
 * Muestra un mensaje de error junto al campo indicado.
 * @param {string} idError - ID del elemento <span> de error
 * @param {string} mensaje - Texto del error a mostrar
 */
function mostrarError(idError, mensaje) {
  let elemento = document.getElementById(idError);
  if (!elemento) return;
  elemento.textContent = mensaje;
  elemento.classList.add("visible");
}

/**
 * Oculta y limpia el mensaje de error del campo indicado.
 * @param {string} idError - ID del elemento <span> de error
 */
function limpiarError(idError) {
  let elemento = document.getElementById(idError);
  if (!elemento) return;
  elemento.textContent = "";
  elemento.classList.remove("visible");
}

/**
 * Marca visualmente un campo como válido o inválido.
 * @param {string} idCampo - ID del input/select
 * @param {boolean} esValido - true = válido, false = inválido
 */
function marcarCampo(idCampo, esValido) {
  let campo = document.getElementById(idCampo);
  if (!campo) return;
  if (esValido) {
    campo.classList.remove("campo-invalido");
    campo.classList.add("campo-valido");
  } else {
    campo.classList.remove("campo-valido");
    campo.classList.add("campo-invalido");
  }
}

/**
 * Renderiza dinámicamente la lista de aficiones en el DOM.
 * Crea elementos li con botón de eliminación para cada afición.
 * @param {string[]} aficiones - Arreglo de aficiones actuales
 */
function renderizarAficiones(aficiones) {
  let lista = document.getElementById("lista-aficiones");
  lista.innerHTML = "";

  for (let i = 0; i < aficiones.length; i++) {
    let item = document.createElement("li");
    item.className = "aficion-item";

    let icono = document.createElement("span");
    icono.className = "aficion-icono";
    icono.textContent = "◆";

    let texto = document.createElement("span");
    texto.className = "aficion-texto";
    texto.textContent = aficiones[i];

    let btnEliminar = document.createElement("button");
    btnEliminar.type = "button";
    btnEliminar.className = "btn-eliminar";
    btnEliminar.setAttribute("aria-label", "Eliminar afición");
    btnEliminar.setAttribute("data-index", String(i));
    btnEliminar.textContent = "✕";

    // Event listener para eliminar: usa data-index para identificar elemento
    btnEliminar.addEventListener("click", function () {
      let idx = parseInt(this.getAttribute("data-index"));
      eliminarAficion(idx);
    });

    item.appendChild(icono);
    item.appendChild(texto);
    item.appendChild(btnEliminar);
    lista.appendChild(item);
  }
}

/**
 * Muestra la sección de resumen al completar el registro exitosamente
 * y oculta el formulario. Rellena los datos del objeto userData.
 * @param {Object} userData - Objeto con los datos del usuario registrado
 */
function mostrarResumen(userData) {
  let formulario = document.getElementById("formulario-registro");
  let resumen = document.getElementById("resumen-registro");

  formulario.style.display = "none";
  resumen.classList.add("visible");

  document.getElementById("resumen-usuario").textContent = userData.username;
  document.getElementById("resumen-direccion").textContent =
    userData.address.direccion + ", " + userData.address.comuna;
  document.getElementById("resumen-telefono").textContent = userData.telefono;

  let urlElement = document.getElementById("resumen-url");
  if (userData.url && userData.url.trim().length > 0) {
    urlElement.textContent = userData.url;
  } else {
    urlElement.textContent = "No ingresada";
  }

  let listaAficiones = document.getElementById("resumen-aficiones");
  listaAficiones.innerHTML = "";
  for (let i = 0; i < userData.aficiones.length; i++) {
    let li = document.createElement("li");
    li.textContent = userData.aficiones[i];
    listaAficiones.appendChild(li);
  }
}

/**
 * Muestra u oculta el indicador de carga del botón de envío.
 * @param {boolean} cargando - true para mostrar spinner, false para ocultarlo
 */
function toggleBotonEnvio(cargando) {
  let btn = document.getElementById("btn-submit");
  if (cargando) {
    btn.disabled = true;
    btn.textContent = "Registrando...";
  } else {
    btn.disabled = false;
    btn.textContent = "Crear Cuenta";
  }
}
