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

  const pPrecio = document.createElement("p");
  // const img = document.createElement("img");

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



  
  pPrecio.textContent = auto.data.attributes.precio;
  // img.src = auto.data.attributes.imagen;
  


  
  lista.appendChild(pPrecio);
  // lista.appendChild(img);
  
  for (const x of auto.data.attributes.imagenes) { 

    const imagen = document.createElement("img")

    // const liCarrucel = document.createElement("li")

    // liCarrucel.className = "splide__slide";

    imagen.src = x;

    sectionCarrucel.appendChild(divCarrucel);
    divCarrucel.appendChild(ulCarrucel);
    ulCarrucel.appendChild(liCarrucel);
    liCarrucel.appendChild(imagen);

  }

}

getCar();
