// ============================================================
// validation.js — Funciones de validación sin REGEX ni HTML
// TI3031 — Evaluación Sumativa 2 — Programación Front End
// ============================================================

/**
 * Retorna true si el código ASCII corresponde a una letra (a-z, A-Z)
 * NO se admiten letras con acento (á, é, ñ, etc.)
 */
function esLetra(code) {
  return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
}

/**
 * Retorna true si el código ASCII corresponde a un dígito (0-9)
 */
function esDigito(code) {
  return code >= 48 && code <= 57;
}

// ─────────────────────────────────────────────
// 1. Nombre de usuario
//    • Comienza con letra
//    • Solo letras y dígitos (sin acentos/símbolos)
//    • Dígitos solo al final
//    • Entre 5 y 10 caracteres
// ─────────────────────────────────────────────
function validarUsuario(usuario) {
  if (usuario.length === 0) {
    return "El nombre de usuario es obligatorio.";
  }
  if (usuario.length < 5 || usuario.length > 10) {
    return "Debe tener entre 5 y 10 caracteres.";
  }
  if (!esLetra(usuario.charCodeAt(0))) {
    return "Debe comenzar con una letra.";
  }

  // Solo letras y dígitos
  for (let i = 0; i < usuario.length; i++) {
    let code = usuario.charCodeAt(i);
    if (!esLetra(code) && !esDigito(code)) {
      return "No puede contener caracteres especiales ni acentos.";
    }
  }

  // Dígitos solo al final: una vez que aparece un dígito, el resto también deben serlo
  let encontroDigito = false;
  for (let i = 0; i < usuario.length; i++) {
    let code = usuario.charCodeAt(i);
    if (esDigito(code)) {
      encontroDigito = true;
    } else if (encontroDigito) {
      return "Los dígitos solo pueden ir al final del nombre.";
    }
  }

  return null; // válido
}

// ─────────────────────────────────────────────
// 2. Contraseña
//    • Entre 3 y 6 caracteres
//    • Al menos un dígito y una letra
//    • No puede contener el nombre de usuario
// ─────────────────────────────────────────────
function validarContrasena(contrasena, usuario) {
  if (contrasena.length === 0) {
    return "La contraseña es obligatoria.";
  }
  if (contrasena.length < 3 || contrasena.length > 6) {
    return "Debe tener entre 3 y 6 caracteres.";
  }

  let tieneDigito = false;
  let tieneLetra = false;
  for (let i = 0; i < contrasena.length; i++) {
    let code = contrasena.charCodeAt(i);
    if (esDigito(code)) tieneDigito = true;
    if (esLetra(code)) tieneLetra = true;
  }

  if (!tieneDigito || !tieneLetra) {
    return "Debe contener al menos un dígito y una letra.";
  }

  // No puede contener el nombre de usuario (insensible a mayúsculas)
  if (usuario.length > 0) {
    let contLower = contrasena.toLowerCase();
    let usuLower = usuario.toLowerCase();
    if (contLower.indexOf(usuLower) !== -1) {
      return "No puede contener el nombre de usuario.";
    }
  }

  return null;
}

// ─────────────────────────────────────────────
// 3. Confirmación de contraseña
// ─────────────────────────────────────────────
function validarConfirmacion(confirmacion, contrasena) {
  if (confirmacion.length === 0) {
    return "La confirmación es obligatoria.";
  }
  if (confirmacion !== contrasena) {
    return "Las contraseñas no coinciden.";
  }
  return null;
}

// ─────────────────────────────────────────────
// 4. Dirección postal (obligatorio)
// ─────────────────────────────────────────────
function validarDireccion(direccion) {
  if (direccion.trim().length === 0) {
    return "La dirección es obligatoria.";
  }
  return null;
}

// ─────────────────────────────────────────────
// 5. Comuna (debe seleccionarse, sin opción por defecto)
// ─────────────────────────────────────────────
function validarComuna(comuna) {
  if (comuna === "" || comuna === "default") {
    return "Debes seleccionar una comuna.";
  }
  return null;
}

// ─────────────────────────────────────────────
// 6. Teléfono (obligatorio, formato numérico)
//    Acepta: +56 9 1234 5678, 9 1234 5678, etc.
//    Sin REGEX: validación carácter a carácter
// ─────────────────────────────────────────────
function validarTelefono(telefono) {
  if (telefono.trim().length === 0) {
    return "El número de teléfono es obligatorio.";
  }

  // Extraer solo los caracteres relevantes (sin espacios ni guiones)
  let limpio = "";
  for (let i = 0; i < telefono.length; i++) {
    let c = telefono[i];
    if (c !== " " && c !== "-") {
      limpio += c;
    }
  }

  // El signo + solo se permite como primer carácter
  let inicio = 0;
  if (limpio.length > 0 && limpio[0] === "+") {
    inicio = 1;
  }

  // El resto deben ser únicamente dígitos
  for (let i = inicio; i < limpio.length; i++) {
    if (!esDigito(limpio.charCodeAt(i))) {
      return "Solo puede contener números, espacios y guiones.";
    }
  }

  // Verificar longitud razonable (7 a 12 dígitos)
  let soloDigitos = limpio.substring(inicio);
  if (soloDigitos.length < 7 || soloDigitos.length > 12) {
    return "Formato inválido. Ejemplo: +56 9 1234 5678";
  }

  return null;
}

// ─────────────────────────────────────────────
// 7. URL personal (opcional)
//    Sin REGEX: verificación manual de estructura
// ─────────────────────────────────────────────
function validarURL(url) {
  if (url.trim().length === 0) {
    return null; // Campo opcional
  }

  // No puede contener espacios
  for (let i = 0; i < url.length; i++) {
    if (url[i] === " ") {
      return "La URL no puede contener espacios.";
    }
  }

  // Debe comenzar con http:// o https://
  let tieneHttp = false;
  let tieneHttps = false;

  if (url.length >= 7) {
    tieneHttp = (url.substring(0, 7) === "http://");
  }
  if (url.length >= 8) {
    tieneHttps = (url.substring(0, 8) === "https://");
  }

  if (!tieneHttp && !tieneHttps) {
    return "La URL debe comenzar con http:// o https://";
  }

  // Extraer parte después del protocolo
  let despuesProtocolo = tieneHttps ? url.substring(8) : url.substring(7);

  if (despuesProtocolo.length < 3) {
    return "La URL ingresada es demasiado corta.";
  }

  // Debe contener al menos un punto
  let tienePunto = false;
  for (let i = 0; i < despuesProtocolo.length; i++) {
    if (despuesProtocolo[i] === ".") {
      tienePunto = true;
      break;
    }
  }

  if (!tienePunto) {
    return "La URL debe tener un dominio válido (ej: https://www.ejemplo.com).";
  }

  return null;
}

// ─────────────────────────────────────────────
// 8. Aficiones (mínimo 2)
// ─────────────────────────────────────────────
function validarAficiones(aficiones) {
  if (aficiones.length < 2) {
    return "Debes ingresar al menos 2 aficiones.";
  }
  return null;
}
