const form = document.getElementById("form");
const busqueda = document.getElementById("search");


const selectAno = document.getElementById("ano");
const selectModelo = document.getElementById("modelo");
const selectVersion = document.getElementById("version");
const selectKm = document.getElementById("km");
const selectMarca = document.getElementById("marca");

const btClear = document.getElementById("limpiar");
const btMostrarFiltros = document.getElementById("mostrarFiltros");
const btOcultarFiltros = document.getElementById("ocultarFiltros");
const btBuscar = document.getElementById("btBuscar")

var autosFiltrados;
let autos;
let marca;
let ano;


/* filtro de marca por peticion 
async function searchList() {
  try {
    const search = document.getElementById("search");

    const response = await fetch(
      `http://localhost:1337/api/autos?filters[marca][$containsi]=${search.value}`
    );
    const busquedaAuto = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    console.log(search.value)
    printData(busquedaAuto);
  } catch (error) {
    console.log(error);
  }
}


btBuscar.addEventListener("click", () => {
  searchList();
  
});

*/

btOcultarFiltros.addEventListener("click", () => {
  selectModelo.style.display = "none";
  selectMarca.style.display = "none";
  selectAno.style.display = "none";
  selectVersion.style.display = "none";
  selectKm.style.display = "none";
});

btMostrarFiltros.addEventListener("click", () => {
  selectModelo.style.display = "inline-block";
  selectMarca.style.display = "inline-block";
  selectAno.style.display = "inline-block";
  selectVersion.style.display = "inline-block";
  selectKm.style.display = "inline-block";

  limpiar();
});

btClear.addEventListener("click", limpiar);

function limpiar() {
  selectAno.value = "";
  selectMarca.value = "";
  selectModelo.value = "";
  selectVersion.value = "";
  selectKm.value = "";
  busqueda.value = "";

  search()
  
}

selectMarca.addEventListener("change", () => {
  
  marca = selectMarca.value;

  // numbers.filter(number => number > 10 )
  // mirar mayusculas minusculas de value == para que coincidan marca modelo etc
  // usar if else para concatenar mas de un filtro al mismo tiempo

  autosFiltrados = autos.data.filter( auto => auto.attributes.marca == marca); 

  console.log(autosFiltrados);

  mostrarModelo();


});

selectAno.addEventListener("change", () => {
  ano = selectAno.value;

  // seguir aca mirar como mostrar despues del filtro //
  autosFiltrados = autos.data.filter( auto => auto.attributes.ano == ano); 

  lista.value = autosFiltrados;

  mostrarModelo();


});

function mostrarModelo() {
  if (marca && ano) {
    selectModelo.disabled = false;
  }
}

async function search() {
  try {
    let response = await fetch(`http://localhost:1337/api/autos`);
    autos = await response.json();

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
      console.log(autosFiltrados)
   /*
          IDEA
   
    if (autosFiltrados != null ){

      printData(autosFiltrados)
    }
   */

    printData(autos);
    console.log(autos);
    

  } catch (error) {
    console.log(error);
  }

  
}


function printData(autos) {
  rellenarModelo();
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (const auto of autos.data) {

    const a = document.createElement("a");
    const pMarca = document.createElement("p");
    const pModelo = document.createElement("p");
    const pAno = document.createElement("p");
    const pKm = document.createElement("p");
    const pPrecio = document.createElement("p");
    const img = document.createElement("img");

    pMarca.textContent = auto.attributes.marca;
    pModelo.textContent = auto.attributes.modelo;
    pAno.textContent = auto.attributes.ano;
    pKm.textContent = auto.attributes.kilometros;
    pPrecio.textContent = auto.attributes.precio;
    img.src = auto.attributes.imagen;

    a.href = `detail.html?id=${auto.id}`;

    lista.appendChild(pMarca);
    lista.appendChild(pModelo);
    lista.appendChild(pAno);
    lista.appendChild(pKm);
    lista.appendChild(pPrecio);
    lista.appendChild(img);

    a.appendChild(pMarca);
    a.appendChild(pModelo);

    lista.appendChild(a);
  }
}
search();

function rellenarModelo() {
  for (const x of autos.data) {
    var opt = document.createElement("option");
    opt.value = x.attributes.modelo;
    opt.innerHTML = x.attributes.modelo;
    selectModelo.appendChild(opt);
  }
}


