$("div.blog-post")
  .slice(0, 4)
  .show();
$("#load-more-post").on("click", function(e) {
  e.preventDefault();
  $("div.blog-post:hidden")
    .slice(0, 1)
    .slideDown(300);
  if ($("div.blog-post:hidden").length == 0) {
    $("#post-end-message")
      .html('<div class="end">End</div>')
      .fadeIn(800);
    $("#load-more-post").fadeOut(100);
  }
  console.log("clicked");
});
