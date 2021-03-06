function get_selection() {
   var txt = '';
   if (window.getSelection) {
      // console.log("window selection");
      txt = window.getSelection();
      oRange = txt.getRangeAt(0); //get the text range
      oRect = oRange.getBoundingClientRect(); // get coordinates of selection
      // console.log(oRect);
      // console.log(oRect.top);
   }
   return [txt, oRect];
}

function placeToolbar(x_pos, y_pos) {
   var d = document.getElementById('editor-toolbar');
   d.style.position = "absolute";
   d.style.left = x_pos + 'px';
   d.style.top = y_pos - 30 +'px';
}

$(".content").dblclick(function() {
   var mytext = get_selection()[0];
   var coord = get_selection()[1];
   // console.log(coord);
   if(mytext != ''){
      // alert("double click " + mytext);
      $(".editor-toolbar").css("display","block");
      placeToolbar(coord.left, coord.top);
   } else{
      $(".editor-toolbar").css("display","none");
   }
});

// select text by horizontal selection via cursor and mouse drag
$(".content").bind("mouseup", function(e) {
   var mytext = get_selection()[0];
   var coord = get_selection()[1];
   // console.log(coord);
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
   var content = temp.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
   // console.log(content);
   var re = /<a>(.*?)<\/a>/g;
   var links = content.match(re); // regex to match all links of <a>()</a> format
   console.log(links);

   var ul = document.getElementById("links-display");
   ul.innerHTML = ""; // prevents repeated adding of li on multiple clicks of button
   for(var i = 0; i< links.length; i++){ // populate ul with the links colored red and blue alternatively
      var li = document.createElement("li"); // create li
      ul.appendChild(li); // append li to ul
      li.innerHTML = li.innerHTML + links[i]; // add content to li
   }
});

$(".match").click(function(){
   content = document.getElementById("content").innerHTML;
   // var content = document.getElementById("content").innerText;
   console.log(content);
   var re = /\b(?!font)\w{4}\b/g; // regex to find all 4 letter words except the word font
   // res = content.match(re);
   arr = [];
   indices = [];
   words = [];
   while(result = re.exec(content)){ // exec() tests for a match in a string.
      indices.push(result.index);
      words.push(result[0]);
   }
   // console.log(content);
   console.log("indices for content words:", indices, indices.length);
   console.log("content words:", words, words.length);
   // console.log("words from content ", res, res.length);
   l = words.length;
   for(i = 0; i < l; i++){
      getData();
   }
});

window.getData=function()
{
   $.ajax({
      url:'http://randomword.setgetgo.com/get.php?len=4',
      dataType: 'jsonp',
      success:function(data){
         arr.push(data.Word);
         if(arr.length == l)
         doneFunc();
      }
   });
}

function doneFunc(){
   console.log("Random words:", arr, arr.length);
   for (var i = 0 ;i<indices.length; i++){
   	content = content.substr(0, indices[i]) + arr[i] + content.substr(indices[i]+4);
   }
   console.log(content);
   document.getElementById("content").innerHTML = ``; // backticks used for multi line strings
   document.getElementById("content").innerHTML = content;
}
