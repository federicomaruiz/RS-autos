const api = "https://rs-autos.herokuapp.com";
const form = document.getElementById("form");
const busqueda = document.getElementById("search");

const selectAno = document.getElementById("ano");
const selectModelo = document.getElementById("modelo");
const selectVersion = document.getElementById("version");
const selectKm = document.getElementById("km");
const selectMarca = document.getElementById("marca");

const btClear = document.getElementById("limpiar");
const btMostrarFiltros = document.getElementById("mostrarFiltros");
const iconMostrar = document.getElementById("iconMostrar");
const btOcultarFiltros = document.getElementById("ocultarFiltros");
const iconOcultar = document.getElementById("iconOcultar");

const divFiltros = document.getElementById("divFiltros");

let anoSeleccionado;
let marcaSeleccionada;
let modeloSeleccionado;

var autosFiltrados;
let autos;
let marca;
let ano;
let modelo;
let km;

const loader = document.getElementById("loader");
loader.style.display = "block";

const inputHandler = function (e) {
  let result = e.target.value;

  autosFiltrados = autos.data.filter((auto) => {
    return (
      auto.attributes.marca.toLowerCase().includes(result.toLowerCase()) ||
      auto.attributes.modelo.toLowerCase().includes(result.toLowerCase()) ||
      auto.attributes.ano == result ||
      auto.attributes.version.toLowerCase().includes(result.toLowerCase())
    );
  });

  printData(autosFiltrados);
};

busqueda.addEventListener("input", inputHandler);
busqueda.addEventListener("propertychange", inputHandler);

function iconOcultarFiltros() {
  selectModelo.style.display = "none";
  selectMarca.style.display = "none";
  selectAno.style.display = "none";
  selectVersion.style.display = "none";
  selectKm.style.display = "none";
  btOcultarFiltros.style.display = "none";
  btMostrarFiltros.style.display = "inline-block";
  divFiltros.style.display = "none";
  iconOcultar.style.display = "none";
  iconMostrar.style.display = "inline-block";
}

btOcultarFiltros.addEventListener("click", () => {
  selectModelo.style.display = "none";
  selectMarca.style.display = "none";
  selectAno.style.display = "none";
  selectVersion.style.display = "none";
  selectKm.style.display = "none";
  btOcultarFiltros.style.display = "none";
  btMostrarFiltros.style.display = "inline-block";
  divFiltros.style.display = "none";
  iconOcultar.style.display = "none";
  iconMostrar.style.display = "inline-block";
});

function iconMostrarFiltros() {
  selectModelo.style.display = "inline-block";
  selectMarca.style.display = "inline-block";
  selectAno.style.display = "inline-block";
  selectVersion.style.display = "inline-block";
  selectKm.style.display = "inline-block";
  btMostrarFiltros.style.display = "none";
  btOcultarFiltros.style.display = "inline-block";
  divFiltros.style.display = "block";
  iconMostrar.style.display = "none";
  iconOcultar.style.display = "inline-block";

  limpiar();
}

btMostrarFiltros.addEventListener("click", () => {
  selectModelo.style.display = "inline-block";
  selectMarca.style.display = "inline-block";
  selectAno.style.display = "inline-block";
  selectVersion.style.display = "inline-block";
  selectKm.style.display = "inline-block";
  btMostrarFiltros.style.display = "none";
  btOcultarFiltros.style.display = "inline-block";
  divFiltros.style.display = "block";
  iconMostrar.style.display = "none";
  iconOcultar.style.display = "inline-block";

  limpiar();
});

btClear.addEventListener("click", limpiar);

function limpiar() {
  selectAno.value = "";
  selectMarca.value = "";
  selectVersion.value = "";
  selectKm.value = "";
  busqueda.value = "";

  resetearModelo();
  resetearVersion();

  selectModelo.disabled = true;
  selectVersion.disabled = true;

  search(false);
}

selectAno.addEventListener("change", () => {
  selectMarca.value = "";
  selectKm.value = "";

  selectModelo.disabled = true;
  selectVersion.disabled = true;

  resetearModelo();
  resetearVersion();

  ano = selectAno.value;
  autosFiltrados = autos.data.filter((auto) => auto.attributes.ano == ano);
  printData(autosFiltrados);
});

selectMarca.addEventListener("change", () => {
  selectKm.value = "";
  selectAno.value = "";

  resetearModelo();
  resetearVersion();

  marca = selectMarca.value;
  autosFiltrados = autos.data.filter((auto) => auto.attributes.marca == marca);
  printData(autosFiltrados);

  marcaSeleccionada = marca;

  mostrarModelo();
  rellenarModelo();
});

selectModelo.addEventListener("change", () => {
  resetearVersion();

  modelo = selectModelo.value;
  autosFiltrados = autos.data.filter(
    (auto) => auto.attributes.modelo == modelo
  );
  printData(autosFiltrados);

  modeloSeleccionado = modelo;

  mostrarVersion();
  rellenarVersion();
});

selectVersion.addEventListener("change", () => {
  version = selectVersion.value;
  autosFiltrados = autos.data.filter(
    (auto) => auto.attributes.version == version
  );
  printData(autosFiltrados);
});

selectKm.addEventListener("change", () => {
  selectMarca.value = "";
  selectAno.value = "";

  selectModelo.disabled = true;
  selectVersion.disabled = true;

  resetearModelo();
  resetearVersion();

  km = parseInt(selectKm.value.replace(" km", ""));
  autosFiltrados = autos.data.filter(
    (auto) => parseInt(auto.attributes.kilometros.replace(" km", "")) <= km
  );
  console.log(autosFiltrados);
  printData(autosFiltrados);
});

function mostrarModelo() {
  if (marca) {
    selectModelo.disabled = false;
  }
}

function mostrarVersion() {
  if (marca && modelo) {
    selectVersion.disabled = false;
  }
}

async function search(rellenar) {
  try {
    let response = await fetch(api + "/api/autos");

    autos = await response.json();

    autosFiltrados = autos.data;

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }

    loader.style.display = "none";
    printData(autos.data);
    console.log(autos);

    if (rellenar) {
      rellenarMarca();
      rellenarAno();
      rellenarModelo();
      rellenarVersion();
    }
  } catch (error) {
    console.log(error);
  }
}

function printData(autos) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (const auto of autos) {
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const div4 = document.createElement("div");
    const div5 = document.createElement("div");
    const div6 = document.createElement("div");

    const a = document.createElement("a");
    const pMarca = document.createElement("p");
    const pModelo = document.createElement("p");
    const pAno = document.createElement("p");
    const pKm = document.createElement("p");
    const pPrecio = document.createElement("p");
    const pMotor = document.createElement("p");
    const pVersion = document.createElement("p");
    const img = document.createElement("img");

    pMarca.textContent = auto.attributes.marca;
    pModelo.textContent = auto.attributes.modelo;
    pAno.textContent = auto.attributes.ano;
    pKm.textContent = auto.attributes.kilometros;
    pPrecio.textContent = auto.attributes.precio;
    pMotor.textContent = auto.attributes.motor;
    pVersion.textContent = auto.attributes.version;
    img.src = auto.attributes.imagen;

    a.href = `detail.html?id=${auto.id}`;

    lista.appendChild(div1);
    lista.appendChild(div2);
    lista.appendChild(div3);
    lista.appendChild(div4);
    lista.appendChild(div5);
    lista.appendChild(div6);

    div1.classList.add("overflow-hidden");
    div1.classList.add("div1");
    div2.classList.add("div2");
    div3.classList.add("div3");
    div4.classList.add("div4");
    div5.classList.add("div5");
    div6.classList.add("div6");

    lista.appendChild(a);
    lista.appendChild(pMarca);
    lista.appendChild(pModelo);
    lista.appendChild(pAno);
    lista.appendChild(pKm);
    lista.appendChild(pPrecio);
    lista.appendChild(pMotor);
    lista.appendChild(pVersion);
    lista.appendChild(img);

    div1.appendChild(pMarca);
    div1.appendChild(pModelo);
    div1.appendChild(pAno);
    div1.appendChild(pKm);
    div1.appendChild(pPrecio);
    div1.appendChild(pMotor);
    div1.appendChild(pVersion);
    div1.appendChild(img);
    div1.appendChild(a);

    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.appendChild(div4);
    div1.appendChild(div5);
    div1.appendChild(div6);

    a.appendChild(div2);
    div2.appendChild(img);

    a.appendChild(div3);
    div3.appendChild(pMarca);
    div3.appendChild(pModelo);
    div3.appendChild(pAno);
    div3.appendChild(pKm);
    div3.appendChild(pPrecio);
    div3.appendChild(pMotor);
    div3.appendChild(pVersion);

    div3.appendChild(div4);
    div3.appendChild(div5);
    div3.appendChild(div6);

    div4.appendChild(pPrecio);

    div5.appendChild(pAno);
    div5.appendChild(pKm);

    div6.appendChild(pMarca);
    div6.appendChild(pModelo);
    div6.appendChild(pMotor);
    div6.appendChild(pVersion);
  }
}
search(true);

function rellenarMarca() {
  let allMarcas = [];
  for (const auto of autos.data) {
    allMarcas.push(auto.attributes.marca);
  }
  let uniqueMarcas = remove_duplicates(allMarcas);
  uniqueMarcas.forEach((marca) => {
    var opt = document.createElement("option");
    opt.value = marca;
    opt.innerHTML = marca;
    selectMarca.appendChild(opt);
  });
}

function rellenarAno() {
  let allYears = [];
  for (const auto of autos.data) {
    allYears.push(auto.attributes.ano);
  }
  let uniqueYears = remove_duplicates(allYears);
  uniqueYears.forEach((year) => {
    var opt = document.createElement("option");
    opt.value = year;
    opt.innerHTML = year;
    selectAno.appendChild(opt);
  });
}

function rellenarModelo() {
  let allModelo = [];
  for (const auto of autos.data) {
    if (auto.attributes.marca == marcaSeleccionada) {
      allModelo.push(auto.attributes.modelo);
    }
  }

  let uniqueModelo = remove_duplicates(allModelo);
  uniqueModelo.forEach((modelo) => {
    var opt = document.createElement("option");
    opt.value = modelo;
    opt.innerHTML = modelo;
    selectModelo.appendChild(opt);
  });
}

function rellenarVersion() {
  let allVersion = [];
  for (const auto of autos.data) {
    if (auto.attributes.modelo == modeloSeleccionado) {
      allVersion.push(auto.attributes.version);
    }
  }
  let uniqueVersion = remove_duplicates(allVersion);
  uniqueVersion.forEach((version) => {
    var opt = document.createElement("option");
    opt.value = version;
    opt.innerHTML = version;
    selectVersion.appendChild(opt);
  });
}

function remove_duplicates(arr) {
  var obj = {};
  var ret_arr = [];
  for (var i = 0; i < arr.length; i++) {
    obj[arr[i]] = true;
  }
  for (var key in obj) {
    ret_arr.push(key);
  }
  return ret_arr;
}

function resetearModelo() {
  for (var i = 1; i < selectModelo.length; i) {
    if (selectModelo.options[i].value !== "Modelo") {
      selectModelo.remove(i);
    }
  }
}
function resetearVersion() {
  for (var i = 1; i < selectVersion.length; i) {
    if (selectVersion.options[i].value !== "Version") {
      selectVersion.remove(i);
    }
  }
}
