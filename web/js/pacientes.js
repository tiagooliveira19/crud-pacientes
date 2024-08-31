
// Fetches and listing all registers
function fetchesPatients () {

  $.get(`http://localhost:3000/pacientes/`, function (response) {

    // console.log(response);

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
            '<td>' +
              '<i class="fa-solid fa-trash-can me-3 icon-edit" title="Excluir" onclick="deletePacient (' + json['id'] + ')"></i>' +
              '<i class="fa-solid fa-pen-to-square icon-delete" title="Editar" data-bs-toggle="modal" data-bs-target="#updatePatientModal" onclick="fetchesPatientById (' + json['id'] + ')"></i>' +
            '</td>' +
            '</tr>'
          );
      });
    } else {
      $('#table-body-patients')
        .html('<tr class="text-center"><td colspan="7">Nenhum registro encontrado!</td></tr>');
    }
  });
}

// Register new pacient
function registerPacient (data) {

  $.ajax({
    url: 'http://localhost:3000/pacientes',
    dataType: 'json',
    type: 'post',
    data: data,

    success: function (response) {

      toastr.success('Paciente cadastrado com sucesso!', '', {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        showDuration: "500",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
      });

      setTimeout(function () {
        backToHome();
      }, 2000);
    }
  });
}

// Deletes patient
function deletePacient (id) {

  $.ajax({
    url: 'http://localhost:3000/pacientes/' + id,
    dataType: 'json',
    type: 'delete',

    success: function (response) {

      toastr.success('Paciente excluído com sucesso!', '', {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        showDuration: "500",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
      });

      setTimeout(function () {
        location.reload();
      }, 2000);
    }
  });
}

// Fetches register by id
function fetchesPatientById (id) {

  $.ajax({
    url: 'http://localhost:3000/pacientes/' + id,
    dataType: 'json',
    type: 'get',

    success: function (response) {
      // console.log(response);

      var data = response.data;

      if (data) {
        $('#id').val(data.id);
        $('#nome').val(data.nome);
        $('#cpf').val(data.cpf).addClass('cpf');
        $('#data_nascimento').val(data.data_nascimento)
        $('#email').val(data.email)
        $('#telefone').val(data.telefone)
        $('#cep').val(data.cep).addClass('cep');
        $('#rua').val(data.logradouro);
        $('#bairro').val(data.bairro);
        $('#cidade').val(data.localidade);
        $('#estado').val(data.uf);
      }
    },

    error: function (xhr, status, error) {
      toastr.error(error, '', {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        showDuration: "500",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
      });
    }
  });
}

// Updates patient data
function updatePacient (id, data) {

  $.ajax({
    url: 'http://localhost:3000/pacientes/' + id,
    dataType: 'json',
    type: 'patch',
    data: data,

    success: function (response) {

      toastr.success('Paciente atualizado com sucesso!', '', {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        showDuration: "1000",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
      });

      $('#updatePatientModal').modal('hide');

      setTimeout(function () {
        location.reload();
      }, 3000);
    }
  });
}