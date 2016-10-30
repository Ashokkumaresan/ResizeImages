 var l_width=0;
 var l_height=0;
 
 function resize () {
	 if(validate()){
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img_list=document.getElementsByClassName("original");
for(var i=0;i<img_list.length;i++){
 img = img_list[i];
//img.src='five.jpg';
//img.width=300;
//img.height=300;
    canvas.height = document.getElementById("img_height").value;//canvas.width * (img.width / img.height);
	canvas.width = document.getElementById("img_width").value;
    /// step 1
    var oc = document.createElement('canvas'),
        octx = oc.getContext('2d');

    oc.width = img.width;
    oc.height = img.height;
    octx.drawImage(img, 0, 0, oc.width, oc.height);

    /// step 2
    octx.drawImage(oc, 0, 0, oc.width, oc.height);

    ctx.drawImage(oc, 0, 0, oc.width, oc.height,
    0, 0, canvas.width, canvas.height);
	var anchor=document.createElement("a");
	anchor.href=canvas.toDataURL();
	anchor.download=(i+1).toString()+".jpg";
	//setTimeout(function(){anchor.click();},100)
	anchor.click();
}
	 }
	 else
					alert('Please select images and specify the resize size');
}
	document.onreadystatechange=function(){
		if(document.readyState==="complete"){
		  document.getElementById("btnresize").addEventListener('click',function(){
				resize();
		  });
		document.getElementById("fileupload").addEventListener('change',function(e){
			try{
			var files=this.files;
				var readerObj={};
				var imgCollection=new Array();
				for(var i=0;i<files.length;i++){
					var fileName=files[i].name.split(".")[0];
					readerObj[fileName]=new FileReader();				
					readerObj[fileName].readAsDataURL(files[i]);
					imgCollection.push(readerObj);			
				readerObj[fileName].onload = function (e) {
					var img=document.createElement("img");				
					  img.setAttribute("src",e.target.result);
					  img.setAttribute("class","original");	
					document.getElementById("imgload").appendChild(img);
					  //console.log(e.target.result);               
				};
				}
			}
			catch(e){
				alert("Works only in latest browsers");
			}
		}); 	
		document.getElementById("btnsize").addEventListener('click',function(){
			if(validate()){
			var l_width=document.getElementById("img_width").value;
			var l_height=document.getElementById("img_height").value;
			var img_list=document.getElementsByClassName("original");
			for(var i=0;i<img_list.length;i++){
				img_list[i].style.width=l_width+"px";
				img_list[i].style.height=l_height+"px";
			}	
			}
				else
					alert('Please select images and specify the resize size');
		});
		
		}	 
   }
   
   function validate(){
	   	 l_width=document.getElementById("img_width").value;
		 l_height=document.getElementById("img_height").value;
		 if(isNaN(parseInt(document.getElementById("img_width").value)) || isNaN(parseInt(document.getElementById("img_height").value)) || document.getElementById("fileupload").files.length==0)			 
		    return false;
		else 
			return true;
   }
