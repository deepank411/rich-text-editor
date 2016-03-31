$(document).ready(function(){
  $("p").addClass("paragraph");
});

function get_selection() {
  var txt = '';
  if (window.getSelection) {
    console.log("");
    txt = window.getSelection();
    oRange = txt.getRangeAt(0); //get the text range
    oRect = oRange.getBoundingClientRect(); // get coordinates of selection
    // console.log(oRect);
    // console.log(oRect.top);
  }
  // for cross browser compatibility
  // else if (document.getSelection) {
  //   console.log("doc");
  //   txt = document.getSelection();
  // }
  // else if (document.selection) {
  //   console.log("doc range");
  //   txt = document.selection.createRange().text;
  // }
  return [txt, oRect];
}

function placeToolbar(x_pos, y_pos) {
  var d = document.getElementById('editor-toolbar');
  d.style.position = "absolute";
  d.style.left = x_pos-80+'px';
  d.style.top = y_pos-60+'px';
}

$(".content").dblclick(function() {
  mytext = get_selection()[0];
  coord = get_selection()[1];
  console.log(coord);
  if(mytext != ''){
    // alert("double click " + mytext);
    $(".editor-toolbar").css("display","block");
    placeToolbar(coord.left, coord.top);
  } else{
    $(".editor-toolbar").css("display","none");
  }
});

// select text by horizontal selection via cursor
$(".content").bind("mouseup", function(e) {
  mytext = get_selection()[0];
  coord = get_selection()[1];
  console.log(coord);
  if(mytext != ''){
    // alert("selection " + mytext);
    $(".editor-toolbar").css("display","block");
    placeToolbar(coord.left, coord.top);
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
  var links = content.match(re); // regex to match all links of <a>()</a> format
  console.log(links);

  var ul = document.getElementById("links-display");
  ul.innerHTML = ""; // prevents repeated adding of li on multiple clicks on button
  for(var i = 0; i< links.length; i++){ // populate ul with the links colored red and blue alternatively
    var li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = li.innerHTML + links[i];
  }
});

$(".match").click(function(){
  var content = document.getElementById("content").innerText;
  console.log(content);
  var re = /\b\w{4}\b/g; // regex to find all 4 letter words
  res = content.match(re);
  console.log(res);
});
