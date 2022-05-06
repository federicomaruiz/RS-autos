const api = "https://rs-autos.herokuapp.com";
// const api = "https://localhost:1337";
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
const img2 = document.getElementById("2");
const img3 = document.getElementById("3");
const img4 = document.getElementById("4");
const img5 = document.getElementById("5");
const img6 = document.getElementById("6");

const divDetail = document.getElementById("divDetail");
const divDerecha = document.getElementById("divDerecha");

const btPreguntar = document.getElementById("btPreguntar");
const divOculto = document.getElementById("divOculto");
const btCerrar = document.getElementById("btCerrar");
const thumbnailcarousel = document.getElementById("thumbnail-carousel");

async function getCar() {
  try {
    const url = api + `/api/autos/${id}`;

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
  tdColor.textContent = auto.data.attributes.color;
  tdCombustible.textContent = auto.data.attributes.combustible;
  tdPuertas.textContent = auto.data.attributes.puertas;
  tdTransmision.textContent = auto.data.attributes.transmision;
  tdMotor.textContent = auto.data.attributes.motor;
  tdCarroceria.textContent = auto.data.attributes.carroceria;
  tdKm.textContent = auto.data.attributes.kilometros;


  console.log(auto.data.attributes.imagenes);

  
  let allImages = "";

  for (const img of auto.data.attributes.imagenes) { 

    let mainImage = ` <li class="splide__slide">
    <img src="`+img+`"
        alt="" />
    </li>`

    allImages += mainImage
    
  
  } 

  document.getElementById("mainImages").innerHTML= allImages

  document.getElementById("main2Images").innerHTML= allImages

  var main = new Splide("#image-carousel", {
    type: "fade",
    rewind: true,
    pagination: false,
    arrows: false
});

var thumbnails = new Splide("#thumbnail-carousel", {
    fixedWidth: 100,
    fixedHeight: 60,
    gap: 10,
    rewind: true,
    pagination: false,
    isNavigation: true,
    breakpoints: {
        600: {
            fixedWidth: 60,
            fixedHeight: 44
        }
    }
});

main.sync(thumbnails);
main.mount();
thumbnails.mount();
}

btPreguntar.addEventListener("click", () => {
  divOculto.style.display = "block";

  thumbnailcarousel.style.visibility = "hidden";
});

btCerrar.addEventListener("click", () => {
  divOculto.style.display = "none";

  thumbnailcarousel.style.visibility = "visible";
});

getCar();

/* fetch(
  "https://api.unsplash.com/photos/random/?count=5&client_id=52d8369eb3e2576a5f5b6423865e074e9c7045761bff1ac5664ff3e0bdb57a1d"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEaach(function (image, i) {
      document.querySelector("#slide-" + (i + 1)).innerHTML = `
       <img src="${image.urls.regular}" alt="">
         <p class="author-info">
           <a href="${image.links.html}?utm_source=slider-thing&utm_medium=referral&utm_campaign=api-credit">Photo by ${image.user.name}</a> on <a href="https://unsplash.com/">Unsplash</a>
         </p>
       `;
    });
  });
 */