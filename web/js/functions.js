// Changes to cpf exhibition format
function formatesCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Changes the date to display to users
function formatesDateExibition (data) {
  let date = new Date(data);
  return date.toLocaleDateString('pt-BR');
}