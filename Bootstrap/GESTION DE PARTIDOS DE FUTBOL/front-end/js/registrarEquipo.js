document
  .getElementById("form-registrar-equipos")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const nombreEquipo = document.querySelector("#nombre-equipo").value;
    const sedeEquipo = document.querySelector("#id-sede");
    const ciudadEquipo = document.querySelector("#id-ciudad");
    const categoriaEquipo = document.querySelector("#id-categoria");
    const imagenEquipoInput = document.querySelector("#id-escudo-equipo");
    const imagenEquipoFile = imagenEquipoInput.files[0];

    if (imagenEquipoFile) {
      alert("imagen seleccionada");
      return;
    }
    const nuevoEquipo = {
      nombre: nombreEquipo,
      sede: sedeEquipo,
      ciudad: ciudadEquipo,
      categoria: categoriaEquipo,
      imagen: URL.createObjectURL(imagenEquipoFile),
    };

    const equiposRegistrados =
      JSON.parse(localStorage.getItem("equipos")) || [];

    equiposRegistrados.push(nuevoEquipo);

    localStorage.setItem("equipos", JSON.stringify(equiposRegistrados));

    actualizarListaEquipos();

    imagenEquipoInput.value = "";

    alert(`Equipo "${nombreEquipo}" registrado con éxito.`);
    document.getElementById("form-registrar-equipos").reset();
  });

function actualizarListaEquipos() {
  const listaEquiposRegistrados = document.getElementById(
    "tabla-equipos-registrados"
  );
  listaEquiposRegistrados.innerHTML = "";

  const equiposRegistrados = JSON.parse(localStorage.getItem("equipos")) || [];
  equiposRegistrados.forEach(function (equipo) {
    const nuevoEquipo = document.createElement("li");
    nuevoEquipo.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const equipoInfo = document.createElement("span");
    equipoInfo.textContent = equipo.nombre;

    const imagenEquipo = document.createElement("img");
    imagenEquipo.src = equipo.imagen;
    imagenEquipo.alt = "Escudo del Equipo";
    imagenEquipo.style.maxHeight = "50px";
    imagenEquipo.style.borderRadius = "50%";

    nuevoEquipo.appendChild(equipoInfo);
    nuevoEquipo.appendChild(imagenEquipo);

    listaEquiposRegistrados.appendChild(nuevoEquipo);
  });
}

window.onload = actualizarListaEquipos;
