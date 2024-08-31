// Changes to cpf exhibition format
function formatesCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Removes CPF mask
function removeMask (cpf) {
  return cpf.replace(/\D/g, '');
}

// Changes the date to display to users
function formatesDateExibition(data) {
  const [year, month, day] = data.split('-');
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("pt-BR");
}

// Back to homepage
function backToHome() {
  window.location.href = "/web/index.html";
}

// Converts the state abbreviation to name
function convertStateName(acronym) {

  var data;

  switch (acronym.toUpperCase()) {
    case "AC" :
      data = "Acre";
      break;
    case "AL" :
      data = "Alagoas";
      break;
    case "AM" :
      data = "Amazonas";
      break;
    case "AP" :
      data = "Amapá";
      break;
    case "BA" :
      data = "Bahia";
      break;
    case "CE" :
      data = "Ceará";
      break;
    case "DF" :
      data = "Distrito Federal";
      break;
    case "ES" :
      data = "Espírito Santo";
      break;
    case "GO" :
      data = "Goiás";
      break;
    case "MA" :
      data = "Maranhão";
      break;
    case "MG" :
      data = "Minas Gerais";
      break;
    case "MS" :
      data = "Mato Grosso do Sul";
      break;
    case "MT" :
      data = "Mato Grosso";
      break;
    case "PA" :
      data = "Pará";
      break;
    case "PB" :
      data = "Paraíba";
      break;
    case "PE" :
      data = "Pernambuco";
      break;
    case "PI" :
      data = "Piauí";
      break;
    case "PR" :
      data = "Paraná";
      break;
    case "RJ" :
      data = "Rio de Janeiro";
      break;
    case "RN" :
      data = "Rio Grande do Norte";
      break;
    case "RO" :
      data = "Rondônia";
      break;
    case "RR" :
      data = "Roraima";
      break;
    case "RS" :
      data = "Rio Grande do Sul";
      break;
    case "SC" :
      data = "Santa Catarina";
      break;
    case "SE" :
      data = "Sergipe";
      break;
    case "SP" :
      data = "São Paulo";
      break;
    case "TO" :
      data = "Tocantins";
      break;
  }

  return data;
};

// Fetches CEP data
function getDataCEP(cep, rua, bairro, cidade, estado) {

  $.getJSON("https://viacep.com.br/ws/" + $("#" + cep).val().replace(/[^\d]+/g, "") + "/json/", function(data) {

    var resultCEP = data;

    if ((resultCEP["logradouro"] !== "" && resultCEP["logradouro"] !== undefined) || (resultCEP["localidade"] !== "" && resultCEP["localidade"] !== undefined)) {

      $("#" + rua).val(unescape(resultCEP["logradouro"]));
      if (unescape(resultCEP["logradouro"]) !== "") {
        $("#" + rua).attr("readonly", true);
      }

      $("#" + bairro).val(unescape(resultCEP["bairro"]));
      if (unescape(resultCEP["bairro"]) !== "") {
        $("#" + bairro).attr("readonly", true);
      }

      $("#" + cidade).val(unescape(resultCEP["localidade"]));
      if (unescape(resultCEP["localidade"]) !== "") {
        $("#" + cidade).attr("readonly", true);
      }

      $("#" + estado).val(convertStateName(unescape(resultCEP["uf"])));
      if (unescape(resultCEP["uf"]) !== "") {
        $("#" + estado).attr("readonly", true);
      }

      $(".address").removeClass("hidden").fadeIn("slow");

    } else if (resultCEP.erro) {
      swal("", "Algo de errado! CEP não encontrado.", "warning");
    }
  });
}