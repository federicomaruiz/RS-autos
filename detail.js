const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const lista = document.getElementById("lista");

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

  const pMarca = document.createElement("p");
  const pModelo = document.createElement("p");
  const pAno = document.createElement("p");
  const pColor = document.createElement("p");
  const pCombustible = document.createElement("p");
  const pPuertas = document.createElement("p");
  const pTransmision = document.createElement("p");
  const pMotor = document.createElement("p");
  const pCarroceria = document.createElement("p");
  const pKm = document.createElement("p");
  const pPrecio = document.createElement("p");
  const img = document.createElement("img");
 

  pMarca.textContent = auto.data.attributes.marca;
  pModelo.textContent = auto.data.attributes.modelo;
  pAno.textContent = auto.data.attributes.ano;
  pColor.textContent =auto.data.attributes.color;
  pCombustible.textContent =auto.data.attributes.combustible;
  pPuertas.textContent =auto.data.attributes.puertas;
  pTransmision.textContent =auto.data.attributes.transmision;
  pMotor.textContent =auto.data.attributes.motor;
  pCarroceria.textContent =auto.data.attributes.carroceria;
  pKm.textContent = auto.data.attributes.kilometros;
  pPrecio.textContent = auto.data.attributes.precio;
  img.src = auto.data.attributes.imagen;
  

  lista.appendChild(pMarca);
  lista.appendChild(pModelo);
  lista.appendChild(pAno);
  lista.appendChild(pColor);
  lista.appendChild(pCombustible);
  lista.appendChild(pPuertas);
  lista.appendChild(pTransmision);
  lista.appendChild(pMotor);
  lista.appendChild(pCarroceria);
  lista.appendChild(pKm);
  lista.appendChild(pPrecio);
  lista.appendChild(img);
  
  for (const x of auto.data.attributes.imagenes) { 

    const imagen = document.createElement("img")

    imagen.src = x;

  
    lista.appendChild(imagen);

  }

}

getCar();
