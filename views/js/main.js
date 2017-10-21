var ppp = 0;
		var hhh = 50;
		var wid = 0;
$("#speedp").click(function(){
	ppp+=0.1;
});

$("#speedd").click(function(){
	ppp-=0.1;
});
$("#heightp").click(function(){
	hhh+=10;
});
$("#heightd").click(function(){
	hhh-=10;
});
$("#widthp").click(function(){
	wid+=0.1;
});
$("#widthd").click(function(){
	wid-=0.1;
});
     var myAarray = new Array;

var globCount=0.1;

function rend()
{
var counter = 0;
var ce=0;
var jj=0;


var increase = Math.PI /90+wid;
var example = document.getElementById("example")
example.width = window.innerWidth;
example.height = window.innerHeight;
var withi = window.innerWidth/5
	for ( i = 0; i <=withi; i ++ )
	{
		x = i;
		y = Math.sin(counter+globCount) + 6;
		counter += increase;
		var pp =150+y*hhh;
		if(myAarray[i]==undefined || myAarray[i]=='' )
		{
			myAarray[i]=example.getContext('2d');
		}


		myAarray[i].beginPath();
		myAarray[i].lineWidth="10";
		myAarray[i].strokeStyle="linear-gradient(75deg, rgba(119, 205, 155, 0.82), rgba(69, 24, 115, 0.53))"; // Green path
		myAarray[i].moveTo(0+jj,0);
		myAarray[i].lineTo(jj,pp);
		myAarray[i].stroke(); // Draw it
		jj+=5;
	}
	globCount+=0.1+ppp;

}
setInterval('rend()',50);
