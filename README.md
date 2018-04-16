# trail_blog
# A simple bolg using node js

`var str = "<p>zsdgdr ftnhjtryu trej trnm55y ty6mk tymjt7 tr5nhj5 56 56565656jb <img alt='' src='/images/UID' /><br/>Some plain text<br/><a href='http://www.google.com'>http://www.google.com</a></p>";

var regex = /<img.*?src='(.*?)'/;
var src = regex.exec(str)[1];

alert(src);`
