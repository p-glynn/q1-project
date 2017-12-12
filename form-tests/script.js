function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
  vars[key] = value;
  });
return vars;
}

var name = getUrlVars()['name'];
var age = getUrlVars()['age'];
var msg = getUrlVars()['msg'];

console.log(name);
console.log(age);
console.log(msg);

$('.container').append(name);
$('.container').append(age);
$('.container').append(msg);
