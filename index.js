$(document).ready(function(){
  $("p").addClass("paragraph");
});

function get_selection() {
  var txt = '';
  if (window.getSelection) {
    txt = window.getSelection();
  } else if (document.getSelection) {
    txt = document.getSelection();
  } else if (document.selection) {
    txt = document.selection.createRange().text;
  }
  return txt;
}

$(".content").dblclick(function(e) {
  mytext = get_selection();
  if(mytext != ''){
    // alert("double click " + mytext);
    $(".editor-toolbar").css("display","block");
  } else{
    $(".editor-toolbar").css("display","none");
  }
});
$(".content").bind("mouseup", function(e) {
  mytext = get_selection();
  if(mytext != ''){
    // alert("selection " + mytext);
    $(".editor-toolbar").css("display","block");
  } else{
    $(".editor-toolbar").css("display","none");
  }
});
$('.editor-action-bold').click(function(){
  document.execCommand('bold');
});
$('.editor-action-italic').click(function(){
  document.execCommand('italic');
});
$('.editor-action-underline').click(function(){
  document.execCommand('underline');
});
$('.editor-action-changecolor').click(function(){
  document.execCommand('foreColor', false,  'red');
});
