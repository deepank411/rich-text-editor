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

$(".content").dblclick(function() {
  mytext = get_selection();
  if(mytext != ''){
    // alert("double click " + mytext);
    $(".editor-toolbar").css("display","block");
  } else{
    $(".editor-toolbar").css("display","none");
  }
});

// select text by horizontal selection via cursor
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

$(".done").click(function(){
  var temp = document.getElementById("content").outerHTML;
  console.log(temp);
  var content = temp.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  console.log(content);
  var re = /<a>(.*?)<\/a>/g;
  var links = content.match(re); // regex to match all links of this format
  console.log(links);

  var ul = document.getElementById("links-display");
  for(var i = 0; i< links.length; i++){ // populate ul with the links colored red and blue alternatively
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = li.innerHTML + links[i];
  }
});

$(".match").click(function(){
  var content = document.getElementById("content").innerText;
  console.log(content);
  var re = /\b\w{4}\b/g; // regex to match all 4 letter words
  res = content.match(re);
  console.log(res);
});
