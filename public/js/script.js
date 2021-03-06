
////DOCUMENT READY/////
$(document).ready(function(){
  // console.log('js is here....!');

  // MODAL
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

  // $('#list-example')
  // $('body').scrollspy({ target: '#bootstrap-scrollspy' })

  $('.carousel').carousel({
    interval: 5000
  });
  // $('#carousel_info').carousel();

  ////////ROUTE HELPERS////////

  // USER PUT
  $('.update-user').on('submit', function(e){
    // prevent default action
    e.preventDefault();
    var userObj = $(this);
    var userUrl = userObj.attr('action');
    var userData = userObj.serialize();
    $.ajax({
      method: 'PUT',
      url: userUrl,
      data: userData
    }).done(function(user){
      window.location = '/user/profile/';
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
      window.location = '/';
    });
  });

  // GARDEN UPDATE
  $('.edit-garden').on('submit', function(e){
    //prevent default action
    e.preventDefault();
    var gardenObj = $(this);
    var gardenUrl = gardenObj.attr('action');
    var gardenData = gardenObj.serialize();
    $.ajax({
      method: 'PUT',
      url: gardenUrl,
      data: gardenData
    }).done(function(user){
      window.location = '/garden/show/' + user.user;
    });
  });

  // GARDEN DELETE
  $('.delete-garden').on('click', function(e){
    //prevent default action
    e.preventDefault();
    var gardenObj = $(this);
    var gardenUrl = gardenObj.attr('href');
    $.ajax({
      method: 'DELETE',
      url: gardenUrl
    }).done(function(garden){
      window.location.reload();
    });
  });

  // SECTION UPDATE
  $('.update-section').on('submit', function(e){
    //prevent default action
    e.preventDefault();
    var sectionObj = $(this);
    var sectionUrl = sectionObj.attr('action');
    var sectionData = sectionObj.serialize();
    $.ajax({
      method: 'PUT',
      url: sectionUrl,
      data: sectionData
    }).done(function(section){
      window.location = '/section/show/' + section.section;
    });
  });

  // SECTION DELETE
  $('.delete-section').on('click', function(e){
    //prevent default action
    e.preventDefault();
    var sectionObj = $(this);
    var sectionUrl = sectionObj.attr('href');
    $.ajax({
      method: 'DELETE',
      url: sectionUrl
    }).done(function(section){
      window.location.reload();
    });
  });

}); // end of document ready
