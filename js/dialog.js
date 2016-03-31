function CustomAlert(){
	this.render = function(dialog){
	
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
	    dialogbox.style.top = "100px";
		dialogbox.style.width = "auto";
		dialogbox.style.height = "auto";
	    dialogbox.style.display = "table";
		var myNode = document.getElementById('dialogboxbody');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var myNode = document.getElementById('dialogboxfoot');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var txt = "<td style='padding:20px;text-align:center;cursor:default'>"+dialog+"</td>";
	    document.getElementById('dialogboxbody').innerHTML = txt;
		document.getElementById('dialogboxfoot').innerHTML = '<td onclick="Alert.ok()">OK</td>';
		document.getElementById('dialogboxhead').innerHTML = '<td>Alert</td>';
		var rect = dialogbox.getBoundingClientRect();
		var width = rect.right - rect.left;
		dialogbox.style.left = (winW/2) - (width * .5)+"px";
	}
	this.ok = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var Alert = new CustomAlert();

function AboutAlert(){
	this.render = function(dialog){
	
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
	    dialogbox.style.top = "100px";
		dialogbox.style.width = "400px";
		dialogbox.style.height = "auto";
	    dialogbox.style.display = "table";
		var td = document.createElement("TD");
		var myNode = document.getElementById('dialogboxbody');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var myNode = document.getElementById('dialogboxfoot');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var div = document.createElement("div");
		div.innerHTML = document.getElementById('about').innerHTML;
		div.setAttribute('style','padding-left:20px;padding-bottom:10px;padding-top:10px;padding-right:20px;font-family:arial;');
		td.appendChild(div);
	    document.getElementById('dialogboxbody').appendChild(td);
		document.getElementById('dialogboxfoot').innerHTML = '<td onclick="aboutAlert.ok()">OK</td>';
		document.getElementById('dialogboxhead').innerHTML = '<td>About</td>';
		var rect = dialogbox.getBoundingClientRect();
		var width = rect.right - rect.left;
		dialogbox.style.left = (winW/2) - (width * .5)+"px";
	}
	this.ok = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var aboutAlert = new AboutAlert();

function SaveAlert(){
	this.render = function(dialog){
	
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
	    dialogbox.style.top = "100px";
		dialogbox.style.width = "200px";
		dialogbox.style.height = "100px";
	    dialogbox.style.display = "table";
		var myNode = document.getElementById('dialogboxbody');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var myNode = document.getElementById('dialogboxfoot');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var txt = "<td style='padding:20px;text-align:center;cursor:default'>"+dialog+"</td>";
	    document.getElementById('dialogboxbody').innerHTML = txt;
		document.getElementById('dialogboxhead').innerHTML = '<td>Alert</td>';
		var rect = dialogbox.getBoundingClientRect();
		var width = rect.right - rect.left;
		dialogbox.style.left = (winW/2) - (width * .5)+"px";
	}
	this.ok = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var saveAlert = new SaveAlert();

function change_color(div,bgcolor,color,template_preview)
{
	div.style.backgroundColor = bgcolor;
	div.style.color = color;
	if(template_preview==true)
	{
		var filename =  div.childNodes[1].value;
		var last_index = filename.lastIndexOf('.xml')
		if(last_index!=-1)
		{
			filename = filename.substring(0,last_index);
		}
		filename +='.png';
		var img =  document.getElementById('template_preview');
		img.src = 'library/'+filename;
	}
}
function CustomPrompt(){
	this.render = function(dialog,func){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
	    dialogbox.style.top = "100px";
		dialogbox.style.width = "200px";
		dialogbox.style.height = "auto";
	    dialogbox.style.display = "table";
		var myNode = document.getElementById('dialogboxbody');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var myNode = document.getElementById('dialogboxfoot');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var td = document.createElement("TD");
		for(var i=0;i<dialog.length;i++)
		{
			var div = document.createElement("DIV");
			div.innerHTML = dialog[i];
			td.appendChild(div);
			div.setAttribute('onmouseover',"change_color(this,'#879AB7','black',false)");
			div.setAttribute('onmouseleave',"change_color(this,'#F4F6F6','black',false)");
			div.setAttribute('onclick',"Prompt.ok(this)");
		}
		document.getElementById('dialogboxbody').appendChild(td);
		document.getElementById('dialogboxfoot').innerHTML = '<td onclick="Prompt.cancel()">Cancel</td>';
		if(cursor_flag!='add_charge')
		{
			document.getElementById('dialogboxhead').innerHTML = '<td>Isotope Labelling</td>';
		}
		else
		{
			document.getElementById('dialogboxhead').innerHTML = '<td>Add Charge</td>';
		}
		var rect = dialogbox.getBoundingClientRect();
		var width = rect.right - rect.left;
		dialogbox.style.left = (winW/2) - (width * .5)+"px";
	}
	this.cancel = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.ok = function(div){
	if(cursor_flag=='add_charge')
		set_add_charge(div);
	else if(cursor_flag=='isotope_label')
		set_isotope_label(div);
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
		
		if(cursor_flag=='add_charge'&&error_flag==true)
			Alert.render('Invalid add charge action');
		error_flag=false;
	}
}
var Prompt = new CustomPrompt();

function CustomPromptLogin(){
	this.render = function(){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "table";
		dialogbox.style.width = "auto";
		dialogbox.style.height = "auto";
		var myNode = document.getElementById('dialogboxbody');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var myNode = document.getElementById('dialogboxfoot');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var div = document.createElement("div");
		div.setAttribute("class", "login");
		
		var p1 = document.createElement("p");
		
		var input1 = document.createElement("INPUT");
		input1.setAttribute("type", "text");
		input1.setAttribute("name", "myusername");
		input1.setAttribute("id", "login");
		input1.setAttribute("placeholder", "Username");
		input1.setAttribute("onkeydown", "if (event.keyCode == 13) { login_Prompt.ok(); }");
		
		p1.appendChild(input1);
		var p2 = document.createElement("p");
		
		var input2 = document.createElement("INPUT");
		input2.setAttribute("type", "password");
		input2.setAttribute("name", "mypassword");
		input2.setAttribute("id", "password");
		input2.setAttribute("placeholder", "Password");
		input2.setAttribute("onkeydown", "if (event.keyCode == 13) { login_Prompt.ok(); }");
		
		p2.appendChild(input2);
		var p3 = document.createElement("p");
		p3.setAttribute("class", "login-submit");
		
		var button1 = document.createElement("Button");
		button1.setAttribute("class", "login-button");
		button1.setAttribute("onclick", "login_Prompt.ok()");
		
		p3.appendChild(button1);
		
		var div1 = document.createElement("div");
		div1.setAttribute("id", "txthnt");
		
		div.appendChild(p1);
		div.appendChild(p2);
		div.appendChild(p3);
		div.appendChild(div1);
		
		document.getElementById('dialogboxbody').appendChild(div);
		document.getElementById('dialogboxfoot').innerHTML = '<button onclick="login_Prompt.cancel()">Cancel</button>';
		document.getElementById('dialogboxhead').innerHTML = 'Login';
		var rect = dialogbox.getBoundingClientRect();
		var width = rect.right - rect.left;
		dialogbox.style.left = (winW/2) - (width * .5)+"px";
	}
	this.cancel = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.ok = function(div){
		var username  = document.getElementById('login').value;
		var password = document.getElementById('password').value;
		 $.post("login2.php", {myusername: username,mypassword:password}, function (status) {
		 status=status.split('-');
		 if(status[0]=="Success")
		 {
			document.getElementById('txthnt').innerHTML = status;
			document.getElementById('dialogbox').style.display = "none";
			document.getElementById('dialogoverlay').style.display = "none";
			document.getElementById('log1').innerHTML = "Welcome "+status[1]+",<br>Logout";
			login_set  = true;
		}
		 else
		 {
			document.getElementById('txthnt').innerHTML = status;
			login_set = false;
		 }			
		});
	}
	}
var login_Prompt = new CustomPromptLogin();

function CustomTemplatePrompt(){
	this.render = function(folder_name){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
		dialogbox.style.left = (winW/2) - (550 * .5)+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "table";
		dialogbox.style.width = "400px";
		dialogbox.style.height = "auto";
		var myNode = document.getElementById('dialogboxbody');
		var td = document.createElement("TD");
		td.setAttribute("style","border-right:thin solid #879AB7;");
		var td1 = document.createElement("TD");
		td1.width = "50%";
		td1.setAttribute("style","text-align:center;");
		var img = document.createElement("img");
		img.id = "template_preview";
		td1.appendChild(img);
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var myNode = document.getElementById('dialogboxfoot');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		$.post("list.php",{folder_name:folder_name},function(file_list){
			file_list = JSON.parse(file_list);
			for(var i=0;i<file_list.length-2;i++)
			{
				if((file_list[i].indexOf('.png')!='-1')||(file_list[i].indexOf('.PNG')!='-1'))
					continue;
				var div = document.createElement("DIV");
				var input = document.createElement("INPUT");
				input.type = 'hidden';
				input.value = file_list[i];
				div.innerHTML = file_list[i].replace(".xml","");
				div.appendChild(input);
				td.appendChild(div);
				div.setAttribute('onmouseover',"change_color(this,'#879AB7','black',true)");
				div.setAttribute('onmouseleave',"change_color(this,'#F4F6F6','black',false)");
				if(folder_name=='library')
					div.setAttribute('onclick',"template_prompt.ok(this,'library')");
				else
					div.setAttribute('onclick',"template_prompt.ok(this,'ligand_library')");
			}			
		});
		document.getElementById('dialogboxbody').appendChild(td);
		document.getElementById('dialogboxbody').appendChild(td1);
		document.getElementById('dialogboxfoot').innerHTML = '<td colspan=2 onclick="template_prompt.cancel()">Cancel</td>';
		document.getElementById('dialogboxhead').innerHTML = '<td colspan=2>Show Template</td>';
		var rect = dialogbox.getBoundingClientRect();
		var width = rect.right - rect.left;
		dialogbox.style.left = (winW/2) - (width * .5)+"px";
		img.style.width ='200px';
		img.style.height = '178px';
		img.src = folder_name+"/blank.png";
	}
	this.cancel = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.ok = function(div,folder_name){
		var filename  = folder_name+"/"+div.childNodes[1].value;
		templateXML = loadXMLDoc(filename);
		if(templateXML==null||templateXML=="")
		{
			var filename  = folder_name+"/"+div.innerHTML+'.xml';
			templateXML = loadXMLDoc(filename);
		}
		deleteBridge();
		skeletonFlag=false;
		eventClear();
		document.getElementById("s_content").style.cursor = "default";
		$("button").css("background-image", "" );
		cursor_flag="default";
		document.getElementById("s_content").style.cursor = "url('images/template.png'), auto";
		if(folder_name=='library')
		{
			document.getElementById("s_content").addEventListener("click", click_open_template);
			cursor_flag='open_template';
		}
		symbol='';
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	}
var template_prompt = new CustomTemplatePrompt();

function CustomInputPrompt(){
	this.render = function(){
		var winW = window.innerWidth;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
	    dialogbox.style.top = "100px";
	    dialogbox.style.display = "table";
		dialogbox.style.width = "200px";
		dialogbox.style.height = "auto";
		var myNode = document.getElementById('dialogboxbody');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var myNode = document.getElementById('dialogboxfoot');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var div = document.createElement("div");
		var td = document.createElement("TD");
		div.setAttribute("class", "login");
		
		var p1 = document.createElement("p");
		
		var input1 = document.createElement("INPUT");
		input1.setAttribute("type", "text");
		input1.setAttribute("name", "myusername");
		input1.setAttribute("id", "fname");
		if(cursor_flag!='add_caption')
		{
			input1.setAttribute("placeholder", "Template name");
		}
		else
		{
			input1.setAttribute("placeholder", "Caption");
		}
		
		td.setAttribute('colspan','2');
		td.setAttribute('style','padding:20px;text-align:center;cursor:default');
		p1.appendChild(input1);
		
		div.appendChild(p1);
		td.appendChild(div);
		document.getElementById('dialogboxbody').appendChild(td);
		if(cursor_flag!='add_caption')
		{
			document.getElementById('dialogboxhead').innerHTML = '<td colspan="2">Update Template</td>';
		}
		else
		{
			document.getElementById('dialogboxhead').innerHTML = '<td colspan="2">Add Caption</td>';
		}
		document.getElementById('dialogboxfoot').innerHTML = '<td onclick="input_prompt.ok()" style="border-right:thin solid #879AB7;width:100px;">Ok</td><td onclick="input_prompt.cancel()" style="width:100px;">Cancel</td>';
		var rect = dialogbox.getBoundingClientRect();
		var width = rect.right - rect.left;
		dialogbox.style.left = (winW/2) - (width * .5)+"px";
	}
	this.cancel = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.ok = function(div){
		if(cursor_flag!='add_caption')
		{
		var filename  = document.getElementById('fname').value;
		filename =  filename.replace(".xml","");
		filename =  filename.replace(".","");
		if(filename==""||filename==null)
		{
			Alert.render('Template name is empty');
			return;
		}
		var str = writeXML('save_template');
		str = str.replace(/%2B/g, '+');
		str = str.replace(/%2D/g, '-');
		 $.post("updatexml.php", {fname: filename,data:str}, function (status) {
		 if(status=="Success")
		 {
			document.getElementById('dialogbox').style.display = "none";
			document.getElementById('dialogoverlay').style.display = "none";
			save_template(filename);
			Alert.render('File successfully uploaded to library');
		}
		 else
		 {
			document.getElementById('dialogbox').style.display = "none";
			document.getElementById('dialogoverlay').style.display = "none";
			Alert.render('Unsuccessful upload to library');
		 }			
		});
	}
	else
	{
		set_caption(document.getElementById('fname').value);
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}		
	}
	}
var input_prompt = new CustomInputPrompt();

function CustomPromptPTable(){
	this.render = function(){
		var winW = window.innerWidth/2;
	    var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
	    var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
	    dialogoverlay.style.height = winH+"px";
	    dialogbox.style.top = "100px";
		dialogbox.style.width = "auto";
		dialogbox.style.height = "auto";
	    dialogbox.style.display = "table";
		var td = document.createElement("TD");
		var myNode = document.getElementById('dialogboxbody');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var myNode = document.getElementById('dialogboxhead');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var myNode = document.getElementById('dialogboxfoot');
		while (myNode.firstChild) 
		{
			myNode.removeChild(myNode.firstChild);
		}
		var div = document.createElement("div");
		div.innerHTML = document.getElementById('ptable').innerHTML;
		div.setAttribute('class','alrt'); 
		
		td.appendChild(div);	
		document.getElementById('dialogboxbody').appendChild(td);
		document.getElementById('dialogboxfoot').innerHTML = '<td onclick="ptable_prompt.cancel()">Cancel</td>';
		document.getElementById('dialogboxhead').innerHTML = '<td>Periodic Table</td>';
		var rect = dialogbox.getBoundingClientRect();
		var width = rect.right - rect.left;
		dialogbox.style.left = (winW/2) - (width * .5)+"px";
	}
	this.cancel = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.ok = function(curFlag,sym,curExist){		
		atomButton(curFlag,sym,curExist);
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	}
var ptable_prompt = new CustomPromptPTable();