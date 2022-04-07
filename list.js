const form = document.getElementById("form");
const year = document.getElementById("year");
const marker = document.getElementById("marker");
const model = document.getElementById("model");
const version = document.getElementById("version");
const km = document.getElementById("km");
const btClear = document.getElementById("limpiar");

async function search() {
  try {
    let response = await fetch(`http://localhost:1337/api/autos`);
    const autos = await response.json();

    if (!response.ok) {
      const message = `Error: ${response.status}`;
      throw new Error(message);
    }

    printData(autos);
    console.log(autos);
  } catch (error) {
    console.log(error);
  }
}

function printData(autos) {

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (const auto of autos.data) {

    const a = document.createElement("a");
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

    a.href = `detail.html?id=${auto.id}`;

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
}
search();
