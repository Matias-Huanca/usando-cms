function addWorkCard(params) {
  console.log("datos ue llegan de la api", params);
  // Agarramos la etiueta template del html
  const cardTemplate = document.querySelector("#portfolio-card-template");
  console.log(cardTemplate);

  // Agarramos la etiueta del contenedor
  const contPortfolio = document.querySelector(".portfolio-content");
  console.log(contPortfolio);

  // Modificamos el title
  cardTemplate.content.querySelector(".portfolio-card-title").textContent =
    params.title;
  // Modificamos la descripcion
  cardTemplate.content.querySelector(".portfolio-card-text").textContent =
    params.description;
  // Modificamos la imagen
  cardTemplate.content.querySelector(".portfolio-img").src = params.imagen;
  // Modificamos la URL
  cardTemplate.content.querySelector(".portfolio-card-link").href = params.url;

  // Clona el contenido de template
  const clone = document.importNode(cardTemplate.content, true);

  // Lo appendea a la euita html portfolio-content
  contPortfolio.appendChild(clone);
}

function getContentfullData() {
  return fetch(
    "https://cdn.contentful.com/spaces/x1pxru8h2o9p/environments/master/entries?access_token=Iq09zQFnvWmqk1KkKdaIo4-GKCUg2Bc_8xy58-BEB-I",
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const fieldsCollections = data.items.map((item) => {
        // Buscamos la imagen correspondiente usando el id
        const imageAsset = data.includes.Asset.find(
          (asset) => asset.sys.id === item.fields.imagen.sys.id,
        );
        return {
          title: item.fields.titulo,
          description: item.fields.descripcion,
          url: item.fields.url,
          imagen: imageAsset ? `https:${imageAsset.fields.file.url}` : null, // Agregamos la URL de la imagen
        };
      });
      return fieldsCollections;
    });
}

function main() {
  const obj = {
    title: "Soy un cambio en el titulo",
    description: "Soy un cambio en la Descripcion",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR5mJWvTjcJpLb2vmMPtYdZzDrD3q7ljGIhRZ5km0Jsw&s=10",
    url: "https://google.com",
  };

  getContentfullData().then(function (data) {
    for (const w of data) {
      addWorkCard(w);
    }
  });
  //   addWorkCard(obj);
}

main();
