$(".quest-in__hint").on("click", function(){
  if ($(this).prop("disabled") == false) {
    $(this).prop("disabled", true);
    $(".quest-in__help").fadeIn();
  }
  $(".btn-close").on("click", function(){
    $(this).closest(".quest-in__help").fadeOut();
  });
});


function validEmptyQuest(el) {
    var $form = el.closest("form"),
        $input = $form.find(":required"),
        val = $.trim($input.val());
    if (val.length == 0) {
      $input.addClass("quest-in__error");
    } else {
      $input.removeClass("quest-in__error");
    }
  }
$(".quest-in__form [type='submit']").on("click", function(e){
  e.preventDefault();
  var $form = $(this).closest("form");
  $form.find(":required").each(function(){
    console.log($(this));
    validEmptyQuest($(this));
  });
  if ($form.find(".quest-in__error").length == 0) {
    $.ajax({
      url: $form.attr("action"),
      type: $form.attr("method"),
      data: $form.serialize(),
      success: function(data) {
        console.log(data);
      }
    });
  }
});

$(".quest-in__form input:required").on("keyup change", function(){
  validEmptyQuest($(this));
});