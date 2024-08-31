
// Fetches and listing all registers
function fetchesPatients () {

  $.get(`http://localhost:3000/pacientes/`, function (response) {

    console.log(response);

    var table_body = 'table-body-patients';

    if (response.pacientes.length > 0) {

      $('#total-itens').html(response.pacientes.length);

      $('#' + table_body).empty();

      $.each(response.pacientes, function (key, json) {

        $('#' + table_body)
          .append(
            '<tr>'+
            '<td>'+ json['id'] +'</td>' +
            '<td>'+ json['nome'] +'</td>' +
            '<td>'+ formatesCPF(json['cpf']) +'</td>' +
            '<td>'+ formatesDateExibition(json['data_nascimento']) +'</td>' +
            '</tr>'
          );
      });
    } else {
      $('#table-body-patients')
        .html('<tr class="text-center"><td colspan="7">Nenhum registro encontrado!</td></tr>');
    }
  });
}