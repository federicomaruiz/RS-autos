const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function getCar() {
  try {
    const response = await fetch(`http://localhost:1337/api/autos${id}`);
    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }
    const autos = await response.json();
    printData(autos);
  } catch (error) {
    console.log(error);
  }
}

function printData(autos) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const pMarker = document.createElement("p");
  const pModel = document.createElement("p");
  const pYear = document.createElement("p");
  const pKm = document.createElement("p");
  const pPrecio = document.createElement("p");
  const img = document.createElement("img");

  pMarker.textContent = auto.attributes.marca;
  pModel.textContent = auto.attributes.modelo;
  pYear.textContent = auto.attributes.ano;
  pKm.textContent = auto.attributes.kilometros;
  pPrecio.textContent = auto.attributes.precio;
  img.src = auto.attributes.imagen;

  lista.appendChild(pMarker);
  lista.appendChild(pModel);
  lista.appendChild(pYear);
  lista.appendChild(pKm);
  lista.appendChild(pPrecio);
  lista.appendChild(img);

  a.appendChild(pMarker);
  a.appendChild(pModel);

  lista.appendChild(a);
}
