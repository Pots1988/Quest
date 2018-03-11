$(".header__btn").on("click", function(){
  $(".user").addClass("active");
  $(".user").on("click", function(){
    $(this).removeClass("active");
  });
});

var initialPoint,
    finalPoint;
document.addEventListener("touchstart", function(e) {
  initialPoint = event.changedTouches[0];
}, false);
document.addEventListener("touchend", function(e) {
  finalPoint = event.changedTouches[0];
  var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX),
      yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
  if (xAbs > 20 || yAbs > 20) {
    if (xAbs > yAbs) {
      if (finalPoint.pageX < initialPoint.pageX){
        if ($(".user").hasClass("active")) {
          $(".user").removeClass("active");
        }
      } else{
        // console.log("right");
      }
    }
  }
}, false);