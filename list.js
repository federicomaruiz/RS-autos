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
const btBuscar = document.getElementById("btBuscar");

var autosFiltrados;
let autos;
let marca;
let ano;
let modelo;

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

  search();
}

selectMarca.addEventListener("change", () => {
  marca = selectMarca.value;

  // numbers.filter(number => number > 10 )
  // mirar mayusculas minusculas de value == para que coincidan marca modelo etc
  // usar if else para concatenar mas de un filtro al mismo tiempo

  autosFiltrados = autos.data.filter((auto) => auto.attributes.marca == marca);

  console.log(autosFiltrados);

  printData(autosFiltrados);

  mostrarModelo();
  
});

selectAno.addEventListener("change", () => {
  ano = selectAno.value;

  // seguir aca mirar como mostrar despues del filtro //
  autosFiltrados = autos.data.filter((auto) => auto.attributes.ano == ano);

  lista.value = autosFiltrados;

  mostrarModelo();
});

selectModelo.addEventListener("change", () => {
  modelo = selectModelo.value;

  autosFiltrados = autos.data.filter(
    (auto) => auto.attributes.modelo == modelo
  );

  console.log(autosFiltrados);

  mostrarVersion();
});

function mostrarModelo() {
  if (marca && ano) {
    selectModelo.disabled = false;
  }
}

function mostrarVersion() {
  if (marca && ano && modelo) {
    selectVersion.disabled = false;
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
    console.log(autosFiltrados);
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

  rellenarMarca();
  rellenarAno();
  rellenarModelo();
  rellenarVersion();

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  // haciendo un if (autosFiltrados == "") mostrar todos los autos sino mostrar autosFiltrados ( quiero mostrar solo los filtrados)
  // y que los filtros vayan haciendo efectos unos sobre otros año y marca, sobre modelo version



  for (const auto of autos.data) {
    // falta agregar version tambien en BBDD

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
    // div6.appendChild(pVersion);

   

   
  }
}
search();

function rellenarMarca() {
  for (const auto of autos.data) {
    var opt = document.createElement("option");
    opt.value = auto.attributes.marca;
    opt.innerHTML = auto.attributes.marca;
    selectMarca.appendChild(opt);
  }
}

function rellenarAno() {
  for (const auto of autos.data) {
    var opt = document.createElement("option");
    opt.value = auto.attributes.ano;
    opt.innerHTML = auto.attributes.ano;
    selectAno.appendChild(opt);
  }
}

function rellenarModelo() {
  for (const auto of autos.data) {
    var opt = document.createElement("option");
    opt.value = auto.attributes.modelo;
    opt.innerHTML = auto.attributes.modelo;
    selectModelo.appendChild(opt);
  }
}

function rellenarVersion() {
  for (const auto of autos.data) {
    var opt = document.createElement("option");
    opt.value = auto.attributes.version;
    opt.innerHTML = auto.attributes.version;
    selectVersion.appendChild(opt);
  }
}
