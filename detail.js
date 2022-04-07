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
  const pMarker = document.createElement("p");
  const pModel = document.createElement("p");
  const pYear = document.createElement("p");
  const pColour = document.createElement("p");
  const pCombustible = document.createElement("p");
  const pPuertas = document.createElement("p");
  const pTransmision = document.createElement("p");
  const pMotor = document.createElement("p");
  const pCarroceria = document.createElement("p");
  const pKm = document.createElement("p");
  const pPrecio = document.createElement("p");
  const img = document.createElement("img");

  pMarker.textContent = auto.data.attributes.marca;
  pModel.textContent = auto.data.attributes.modelo;
  pYear.textContent = auto.data.attributes.ano;
  pColour.textContent =auto.data.attributes.color;
  pCombustible.textContent =auto.data.attributes.combustible;
  pPuertas.textContent =auto.data.attributes.puertas;
  pTransmision.textContent =auto.data.attributes.transmision;
  pMotor.textContent =auto.data.attributes.motor;
  pCarroceria.textContent =auto.data.attributes.carroceria;
  pKm.textContent = auto.data.attributes.kilometros;
  pPrecio.textContent = auto.data.attributes.precio;
  img.src = auto.data.attributes.imagen;

  lista.appendChild(pMarker);
  lista.appendChild(pModel);
  lista.appendChild(pYear);
  lista.appendChild(pColour);
  lista.appendChild(pCombustible);
  lista.appendChild(pPuertas);
  lista.appendChild(pTransmision);
  lista.appendChild(pMotor);
  lista.appendChild(pCarroceria);
  lista.appendChild(pKm);
  lista.appendChild(pPrecio);
  lista.appendChild(img);

  a.appendChild(pMarker);
  a.appendChild(pModel);

  lista.appendChild(a);
}

getCar();
