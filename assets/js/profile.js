$(() => {
    $('#edit-preferences').click(function(){
     $('#edit-preferences-modal').addClass('is-active');
    });
    $('.modal-card-head button.delete, .modal-save, .modal-cancel').click(function(){
      $('#edit-preferences-modal').removeClass('is-active');
    });
  });
  