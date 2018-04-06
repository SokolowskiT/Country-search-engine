var url = 'https://restcountries.eu/rest/v2/name/';
var template = $("#template-list");
var templateHtml = template.html();

$('#search').click(searchCountries);

function searchCountries() {
  var countryName = $('#country-name').val();
  if(!countryName.length) countryName = "Poland";

  $.ajax({
    url: url + countryName,
    method: 'GET',
    success: modifyData,

    error : function error(){
      alert('Incorrect value provided. Please try again'); 
    }

  });
}

function modifyData(dataJSON) {
  var dataObject = $.map(dataJSON, function(el){
    return {name: el.name,
           capital: el.capital,
           region: el.region,
           subregion: el.subregion,
           area: el.area,
           population: el.population,
           alpha2Code: el.alpha2Code,
           flag: el.flag};
  });

  var listHtml = "";

  for (var key in dataObject) {
    listHtml += templateHtml.replace(/{{name}}/g, dataObject[key]["name"])
                            .replace(/{{capital}}/g, dataObject[key]["capital"])
                            .replace(/{{region}}/g, dataObject[key]["region"])
                            .replace(/{{subregion}}/g, dataObject[key]["subregion"])
                            .replace(/{{flag}}/g, dataObject[key]["flag"])
                            .replace(/{{area}}/g, dataObject[key]["area"])
                            .replace(/{{population}}/g, dataObject[key]["population"])
                            .replace(/{{alpha2Code}}/g, dataObject[key]["alpha2Code"]);

  }

document.getElementById("lists").innerHTML = listHtml;

}