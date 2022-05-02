const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const lista = document.getElementById("lista");

const sectionCarrucel = document.getElementById("thumbnail-carousel");
const divCarrucel = document.getElementById("divCarrucel");
const ulCarrucel = document.getElementById("ulCarrucel");
const liCarrucel = document.getElementById("liCarrucel");

const tdMarca = document.getElementById("tdMarca");
const tdModelo = document.getElementById("tdModelo");
const tdAno = document.getElementById("tdAno");
const tdColor = document.getElementById("tdColor");
const tdCombustible = document.getElementById("tdCombustible");
const tdPuertas = document.getElementById("tdPuertas");
const tdTransmision = document.getElementById("tdTransmision");
const tdMotor = document.getElementById("tdMotor");
const tdCarroceria = document.getElementById("tdCarroceria");
const tdKm = document.getElementById("tdKm");

const img1 = document.getElementById("1");
const img2 = document.getElementById("2")
const img3 = document.getElementById("3")
const img4 = document.getElementById("4")
const img5 = document.getElementById("5")
const img6 = document.getElementById("6")

const divDetail = document.getElementById("divDetail")
const divDerecha = document.getElementById("divDerecha");


async function getCar() {
  try {
    const url = `http://localhost:1337/api/autos/${id}`;

    const response = await fetch(url);

    const auto = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    printData(auto);
  } catch (error) {
    console.log(error);
  }
}

function printData(auto) {
  
  lista.innerHTML = "";


  // const img = document.createElement("img");

  pAno.textContent = auto.data.attributes.ano;
  pKm.textContent = auto.data.attributes.kilometros;
  pMarca.textContent = auto.data.attributes.marca;
  pModelo.textContent = auto.data.attributes.modelo;
  pMotor.textContent = auto.data.attributes.motor;
  pVersion.textContent = auto.data.attributes.version;
  pPrecio.textContent = auto.data.attributes.precio;

 
  tdMarca.textContent = auto.data.attributes.marca;
  tdModelo.textContent = auto.data.attributes.modelo;
  tdAno.textContent = auto.data.attributes.ano;
  tdColor.textContent =auto.data.attributes.color;
  tdCombustible.textContent =auto.data.attributes.combustible;
  tdPuertas.textContent =auto.data.attributes.puertas;
  tdTransmision.textContent =auto.data.attributes.transmision;
  tdMotor.textContent =auto.data.attributes.motor;
  tdCarroceria.textContent =auto.data.attributes.carroceria;
  tdKm.textContent = auto.data.attributes.kilometros;

 
  img1.src = auto.data.attributes.imagen;
  img2.src = auto.data.attributes.imagen;
  img3.src = auto.data.attributes.imagen;
  img4.src = auto.data.attributes.imagen;
  img5.src = auto.data.attributes.imagen;
  img6.src = auto.data.attributes.imagen;

  liCarrucel.appendChild(img1);
  liCarrucel.appendChild(img2);
  liCarrucel.appendChild(img3);
  liCarrucel.appendChild(img4);
  liCarrucel.appendChild(img5);
  liCarrucel.appendChild(img6);


  // lista.appendChild(img);
  /* 
  for (const x of auto.data.attributes.imagenes) { 

    const imagen = document.createElement("img")

    // const liCarrucel = document.createElement("li")

    // liCarrucel.className = "splide__slide";

    imagen.src = x;

    sectionCarrucel.appendChild(divCarrucel);
    divCarrucel.appendChild(ulCarrucel);
    ulCarrucel.appendChild(liCarrucel);
    liCarrucel.appendChild(imagen);

  } */

}

getCar();
