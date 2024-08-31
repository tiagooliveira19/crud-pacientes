// Menu behavior
$('#patients').on('click', function () {
  $('#new-patient').removeClass('light-gray');
  $(this).addClass('light-gray');
});

$('#new-patient').on('click', function () {
  $('#patients').removeClass('light-gray');
  $(this).addClass('light-gray');
});