// Validation form
  function validEmpty(el) {
    var regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i,
        type = el.attr("type"),
        $parent = el.parent(),
        val = el.val(),
        messageText = [
          'Login должен быть длиной не менее 2-х символов',
          'Имя должно быть длиной не менее 2-х символов',
          'Не верно введена почта',
          'Пароль должен быть длиной не менее 6-ти символов'
        ];
    $parent.find(".invalid-text").remove();
    if (type == "email") {
      if (val.search(regEmail) != 0) {
        invalidField(el, messageText[2], $parent);
      } else {
        validField(el, $parent);
      }
    } else if (type == "text") {
      if (val.length < 2) {
        if (el.attr("name") == "name") {
          invalidField(el, messageText[1], $parent);
        } else {
          invalidField(el, messageText[0], $parent);
        }
      } else {
        validField(el, $parent);
      }
    } else if (type == "password") {
      if (val.length < 6) {
        invalidField(el, messageText[3], $parent);
      } else {
        validField(el, $parent);
      }
    }
  }
  function validField(el, parent){
    el.removeClass("invalid").addClass("valid");
    parent.find(".invalid-text").remove();
  }
  function invalidField(el, mess, parent){
    $('<p class="invalid-text">' + mess + '</p>').appendTo(parent);
    el.removeClass("valid").addClass("invalid");
  }
// ----------------------------------------------------
  
// Submit on form
  // Search keyup on input
    $(".form input").on("keyup change", function(){
      validEmpty($(this));
    });
  // ----------------------------------------------------
  $(".form [type='submit']").on("submit click", function(e){
    e.preventDefault();
    var $form = $(this).closest("form");
    $form.find("input").each(function(){
      validEmpty($(this));
    });
    if ($form.find(".invalid-text").length == 0) {
      $.ajax({
        url: $form.attr("action"),
        type: $form.attr("method"),
        data: $form.serialize(), // serializes the form's elements.
        success: function(data) {
          console.log(data);
        }
      });
    }
  });
// ----------------------------------------------------