// ───────────────────────────────────────────────────────────
//  api.js — Capa de comunicación con el backend NestJS (:3000)
//  Adaptado a las rutas REALES definidas en los controllers de
//  Nest (sin prefijo /api, recursos en plural, PATCH + :id en
//  la URL). No cambia nada de app.js ni de entities.js: el
//  contrato público de `Api` (listar/crear/actualizar/eliminar/
//  consultas/ping) se mantiene igual.
// ───────────────────────────────────────────────────────────

// El backend Nest corre en http://localhost:3000 (ver src/main.ts).
let API_BASE = "http://localhost:3000";

function getApiBase() {
  return API_BASE;
}

function setApiBase(url) {
  API_BASE = url.replace(/\/+$/, ""); // sin barra final
}

// entities.js usa nombres en singular ("paciente", "doctor", "cita",
// "receta") como `recurso`, pero los @Controller() de Nest son en
// plural para esos cuatro (especialidad/especialista ya coinciden).
// Este mapa traduce uno a otro sin tocar entities.js ni app.js.
const RUTA_RECURSO = {
  paciente: "pacientes",
  doctor: "doctores",
  cita: "citas",
  especialidad: "especialidad",
  especialista: "especialista",
  receta: "recetas",
};

function rutaDe(recurso) {
  return RUTA_RECURSO[recurso] || recurso;
}

// Petición genérica.
async function request(method, path, body) {
  const opciones = { method, headers: {} };

  if (body !== undefined) {
    opciones.headers["Content-Type"] = "application/json";
    opciones.body = JSON.stringify(body);
  }

  let respuesta;
  try {
    respuesta = await fetch(getApiBase() + path, opciones);
  } catch (e) {
    // Falla de red: típicamente el backend no está corriendo o CORS/origen.
    throw new Error(
      "No se pudo conectar con el servidor en " +
        getApiBase() +
        ". Verifica que el backend esté corriendo (npm run start:dev)."
    );
  }

  // Algunas respuestas (p. ej. DELETE) pueden venir vacías.
  const texto = await respuesta.text();
  let datos = null;
  if (texto) {
    try {
      datos = JSON.parse(texto);
    } catch {
      datos = texto;
    }
  }

  if (!respuesta.ok) {
    // Nest devuelve errores como { statusCode, message, error }.
    // `message` puede ser string o array (errores de ValidationPipe).
    let mensaje = "Error " + respuesta.status + " en " + method + " " + path;
    if (datos && datos.message) {
      mensaje = Array.isArray(datos.message)
        ? datos.message.join(", ")
        : datos.message;
    }
    throw new Error(mensaje);
  }

  return datos;
}

// ─── CRUD genérico por entidad ───
// `recurso` llega en singular desde entities.js; aquí se traduce
// a la ruta real de Nest (plural cuando corresponde).
const Api = {
  listar(recurso) {
    return request("GET", "/" + rutaDe(recurso));
  },
  crear(recurso, datos) {
    return request("POST", "/" + rutaDe(recurso), datos);
  },
  actualizar(recurso, datos) {
    // Nest toma el id de la URL (PATCH /:id), no del body, y el
    // DTO no acepta la propiedad `id` (forbidNonWhitelisted).
    const { id, ...body } = datos;
    return request("PATCH", "/" + rutaDe(recurso) + "/" + id, body);
  },
  eliminar(recurso, id) {
    // Nest toma el id de la URL (DELETE /:id), no del body.
    return request("DELETE", "/" + rutaDe(recurso) + "/" + id);
  },

  // ─── Consultas especiales (solo lectura, salvo la última) ───
  // Mapean 1:1 con las rutas reales de cada controller de Nest.
  consultas: {
    pacientesTop5: () => request("GET", "/pacientes/top-5"),
    pacientesSinCita: () => request("GET", "/pacientes/sin-cita"),
    citasMarzoControl: () => request("GET", "/citas/marzo/control"),
    citasPendientes: () => request("GET", "/citas/pendiente"),
    doctorCitas: () => request("GET", "/doctores/citas"),
    doctorEspecialidad: () => request("GET", "/doctores/especialidad"),
    doctorEstadisticas: () => request("GET", "/doctores/estadisticas"),
    doctorCitasSobrePromedio: () =>
      request("GET", "/doctores/citas-sobre-promedio"),
    especialidadMultiplesDoctores: () =>
      request("GET", "/especialidad/con-multiples-doctores"),
    // Acción destructiva del backend:
    eliminarRecetasCitasCanceladas: () =>
      request("DELETE", "/recetas/citas-canceladas"),
  },

  // Comprobación de conexión: usamos un GET liviano existente.
  ping() {
    return request("GET", "/pacientes");
  },
};