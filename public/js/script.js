// console.log('js is here....!');

$(document).ready(function(){


  // var number_of_sections = $('gardenSections').val();
  // console.log('number_of_sections '+number_of_sections);


});

$('#myModal').on('shown.bs.modal', function() {
  var button = $(event.editProfile); // Button that triggered the modal
  var user = button.data(currentUser); // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  modal.find('.modal-title').text('New message to ' + user);
  modal.find('.modal-body input').val(user);
  $('#authEmail').trigger('focus');
})

// USER PUT
$('.update-user').on('submit', function(e){
  // prevent default action
  e.preventDefault();
  console.log('you selected to update your profile...');
  var userObj = $(this);
  var userUrl = userObj.attr('action');
  var userData = userObj.serialize();
  $.ajax({
    method: 'PUT',
    url: userUrl,
    data: userData
  }).done(function(user){
    // location.reload();
    console.log('sending your update to profile...');
  });
});

// USER DELETE
$('.delete-user').on('click', function(e){
  //prevent default action
  e.preventDefault();
  var userObj = $(this);
  var userUrl = userObj.attr('href');
  $.ajax({
    method: 'DELETE',
    url: userUrl
  }).done(function(user){
    console.log('you selected to delete your profile...');
  });
});
