// Definindo a posição inicial do mapa
let center = ol.proj.fromLonLat([-51.150604, -29.787701]);

// Criando o mapa
let map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: center,
    zoom: 16,
  }),
});

// Event listener para o botão "Encontrar endereço"
document.getElementById("button-addon2").addEventListener("click", function () {
  // Captura o valor do input de endereço
  let endereco = document.getElementById("endereco").value;

  // URL da API de geocodificação do OpenStreetMap
  let url =
    "https://nominatim.openstreetmap.org/search?format=json&q=" + endereco;

  // Requisição AJAX para obter as coordenadas do endereço
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);

      // Verifica se foram encontradas coordenadas
      if (response.length > 0) {
        let latitude = response[0].lat;
        let longitude = response[0].lon;

        // Atualiza o centro do mapa com as coordenadas do endereço
        map.getView().setCenter(ol.proj.fromLonLat([longitude, latitude]));
      } else {
        alert("Endereço não encontrado");
      }
    }
  };
  xhr.send();
});
