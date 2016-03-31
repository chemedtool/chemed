 $(function() {
    $( "#dialogbox" ).draggable();
  });
document.onkeydown = KeyPress;
svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgNS = svg.namespaceURI;
	pt    = svg.createSVGPoint();
	clientXchange = -6;
	clientYchange = 7;
	bondDistance = 20;
	var rectangle;
	var error_flag;
	var bond_status;
function variable_init()
{
	loop =false;
	bond_status_flag = false;
	atom=new Array();
	fragment = new Array();
	structure = new Array();
	templateXML = '';
	pt1 = {x:0, y:0, id:'', g_id:''};
	svg.id='mySvg';
	symbol='';
	itl_count = 0;
	sign_count = 0;
	cursor_flag=false;
	msup_flag = false;
	unpaired_electron_flag = 'hidden';
	lonepaired_electron_flag = 'hidden';
	vacant_electron_flag = 'hidden';
	count=0;
	l_count=0;
	arrow_count = 0;
	rev_arrow_count = 0;
	grid_set = false;
	t_count = 0;
	frg_count = 0;
	st_count = 0;
	toSkip = [];
	interact_flag='';
	atom_position_visiblity = 'hidden';
	undo_redo_flag=false;
	plane_projection_flag='';
	move_structure_flag='';
	initial_state = new Array();
	bridge_stack_arr = new Array();
	undo_stack = new Array();
	redo_stack = new Array();
	undo_stack_jsobj = new Array();
	redo_stack_jsobj = new Array();
	skeletonFragmentXML='';
	skeleton = new Array();
	curStrId='';
	skeletonFlag = false;
	bond = 'single';
	bondCount = 1;
	bridgeCount=0;
	deleteCount=0;
	capt_count = 0;
	bridgeAtom=new Array();
    bridgeStart='';
	animline = document.createElementNS(svgNS,'line');
	uPair_svg = document.createElementNS(svgNS, "g");
	mousemove=false;
	animline.id = "anim";
	svg.appendChild(animline);
	svg.appendChild(uPair_svg);
}
	function st(log_val)
	{
		variable_init();
		login_set = log_val;
		document.getElementById('s_content').appendChild(svg);
		var a = document.getElementById('mySvg');
		a.setAttribute("width","100%");
		a.setAttribute("height","100%");
		a.setAttribute("version","1.1");
		a.setAttribute("font-weight","bold");
		a.setAttribute("xmlns","http://www.w3.org/2000/svg");
		a.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink");
		a.setAttribute("xml:space","preserve");
		atomFragmentListXML=loadXMLDoc('xml/AtomFragmentList.xml');
		isotopeOwl = loadXMLDoc('xml/PTableOwl.owl');
		threeMemberedRing=loadXMLDoc('xml/ThreeMemberedRing.xml');
		fourMemberedRing=loadXMLDoc('xml/FourMemberedRing.xml')
		fiveMemberedRing=loadXMLDoc('xml/FiveMemberedRing.xml')
		sixMemberedRing=loadXMLDoc('xml/SixMemberedRing.xml')
		sevenMemberedRing=loadXMLDoc('xml/SevenMemberedRing.xml')
		eightMemberedRing=loadXMLDoc('xml/EightMemberedRing.xml')
		benzeneRing=loadXMLDoc('xml/BenzeneRing.xml')
		skeleton[0]=loadXMLDoc('xml/OneMemberSkeleton.xml');
		skeleton[1]=loadXMLDoc('xml/TwoMemberSkeleton.xml');
		skeleton[2]=loadXMLDoc('xml/ThreeMemberSkeleton.xml');
		skeleton[3]=loadXMLDoc('xml/FourMemberSkeleton.xml');
		skeleton[4]=loadXMLDoc('xml/FiveMemberSkeleton.xml');
		oneMemberSkeleton = skeleton[0];
		twoMemberSkeleton = skeleton[1];
		threeMemberSkeleton = skeleton[2];
		strGrp = new StructureGroup();
		strGrp.setId('s');
		strGrp.setStructureVector(structure);
		resize();
	}
	function resize()
	{
		var width = $(window).width();
		var height = $(window).height();
		var view_width = width/4 * 1.75;
		var view_height = height/5 * 1.75;
		var viewbox = "0 0 "+Math.floor(view_width)+" "+Math.floor(view_height);
		var a = document.getElementById('mySvg');
		a.setAttribute("viewBox",viewbox);

		width = Math.floor(width/30)-5;		
		$("button").css("width", width );
		$("button").css("background-size", "cover" );
		$(".splbutton").css("width", "auto");
		if(document.getElementById('login_btn').innerHTML.indexOf('Login')!=-1)
		{
			display_menu('#t_login');	
			display_menu('#t_login');
		}
		else
		{
			display_menu('#t_logged');	
			display_menu('#t_logged');
		}
	}
	function display_menu(id)
	{
		$(".menu").css("display", "none");
		$(".menu").css("z-index", "-1");
		if((id=='#t_login'||id=='#t_logged')&&$(id).css("z-index")=='1')
		{
			$(".menu_login").css("display", "none");
			$(".menu_login").css("z-index", "-1");
			if(document.getElementById('login_btn').innerHTML.indexOf('Login')!=-1)
				document.getElementById('login_btn').innerHTML = "Login&#x25BC";
			else
				document.getElementById('login_btn').innerHTML = "Welcome&#x25BC";
			document.getElementById('txthnt').innerHTML ="";
			$('#login').removeAttr('style');
			return;
		}
		$(id).css("display", "table");
		$(id).css("z-index", "1");
		if(id=='#t_file')
		{
			var rect = document.getElementById('file').getBoundingClientRect();
			width = rect.left+'px';
			height = (rect.bottom-1)+'px';
			$(id).css("top", height);
			$(id).css("left", width);
			$('#file').css("background", "linear-gradient(to top, rgba(233,245,247,1) 0%,rgba(233,245,247,1) 7%,rgba(233,245,247,1) 12%,rgba(254,254,254,1) 12%,rgba(237,243,247,1) 30%,rgba(215,228,237,1) 54%,rgba(206,219,232,1) 75%,rgba(196,208,226,1) 100%)");
		}
		if(id=='#t_caption')
		{
			var rect = document.getElementById('caption').getBoundingClientRect();
			width = (rect.left)+'px';
			height = (rect.bottom-1)+'px';
			$(id).css("top", height);
			$(id).css("left", width);
			$('#caption').css("background", "linear-gradient(to top, rgba(233,245,247,1) 0%,rgba(233,245,247,1) 7%,rgba(233,245,247,1) 12%,rgba(254,254,254,1) 12%,rgba(237,243,247,1) 30%,rgba(215,228,237,1) 54%,rgba(206,219,232,1) 75%,rgba(196,208,226,1) 100%)");
		}
		if(id=='#t_template')
		{
			var rect = document.getElementById('template').getBoundingClientRect();
			width = (rect.left)+'px';
			height = (rect.bottom-1)+'px';
			$(id).css("top", height);
			$(id).css("left", width);
			$('#template').css("background", "linear-gradient(to top, rgba(233,245,247,1) 0%,rgba(233,245,247,1) 7%,rgba(233,245,247,1) 12%,rgba(254,254,254,1) 12%,rgba(237,243,247,1) 30%,rgba(215,228,237,1) 54%,rgba(206,219,232,1) 75%,rgba(196,208,226,1) 100%)");
		}
		if(id=='#t_ligand')
		{
			var rect = document.getElementById('ligand').getBoundingClientRect();
			width = (rect.left)+'px';
			height = (rect.bottom-1)+'px';
			$(id).css("top", height);
			$(id).css("left", width);
			$('#ligand').css("background", "linear-gradient(to top, rgba(233,245,247,1) 0%,rgba(233,245,247,1) 7%,rgba(233,245,247,1) 12%,rgba(254,254,254,1) 12%,rgba(237,243,247,1) 30%,rgba(215,228,237,1) 54%,rgba(206,219,232,1) 75%,rgba(196,208,226,1) 100%)");
		}
		if(id=='#t_login'||id=='#t_logged')
		{
			var rect;
			if(document.getElementById('login_btn').innerHTML.indexOf('Login')!=-1)
			{
				document.getElementById('login_btn').innerHTML = "Login&#x25B2";
				rect = document.getElementById('t_login').getBoundingClientRect();
			}				
			else
			{
				document.getElementById('login_btn').innerHTML = "Welcome&#x25B2";
				rect = document.getElementById('t_logged').getBoundingClientRect();
			}				
			var width=$(window).width()-(rect.right)+(rect.left)-1;
			width = (width)+'px';
			var rect = document.getElementById('login').getBoundingClientRect();
			height = (rect.bottom-1)+'px';
			$(id).css("top", height);
			$(id).css("left", width);
			$('#login').css("background", "linear-gradient(to top, rgba(233,245,247,1) 0%,rgba(233,245,247,1) 7%,rgba(233,245,247,1) 12%,rgba(254,254,254,1) 12%,rgba(237,243,247,1) 30%,rgba(215,228,237,1) 54%,rgba(206,219,232,1) 75%,rgba(196,208,226,1) 100%)");
					}
	}
	function hide_menu(id)
	{
		$(".menu").css("display", "none");
		$(".menu").css("z-index", "-1");
		$('#file').css("background", "transparent");
		$('#caption').css("background", "transparent");
		$('#template').css("background", "transparent");
		$('#ligand').css("background", "transparent");
	}
	function atomButton(curFlag,sym,curExist)
  {
	deleteBridge();
	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	var selector_id = '#'+curFlag;
	if(curExist==true)
		var url="url('images/"+curFlag+".png'), auto";
	else
		var url="url('images/cursor.png'), auto";
	if(cursor_flag!=curFlag)
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag=curFlag;
		symbol=sym;
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		var selector_id = '#'+cursor_flag;
		cursor_flag=false;		
		$(selector_id).css("background-image", "" );
	}	
  }
   function bondSkeletonButton(curFlag,sym,bdcount)
  {
	deleteBridge();
	bondCount = bdcount;
	eventClear();
	var selector_id = '#'+curFlag;
	var url="url('images/"+curFlag+".png'), auto";
	if(cursor_flag!=curFlag)
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("mousedown", bond_skeleton_msdown);
		cursor_flag=curFlag;
		symbol=sym;
		skeletonFlag=true;
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", bond_skeleton_msdown);
		document.getElementById("s_content").removeEventListener("mousemove", bond_skeleton_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", bond_skeleton_msup);
		symbol='';
		skeletonFlag=false;
		var selector_id = '#'+cursor_flag;
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}	
  }
   function ringButton(curFlag,sym,skfrgxml)
  {
	deleteBridge();
	bondCount = 1;
	skeletonFlag=false;
	skeletonFragmentXML=skfrgxml;
	eventClear();
	var selector_id = '#'+curFlag;
	var url="url('images/"+curFlag+".png'), auto";
	if(cursor_flag!=curFlag)
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("mousedown", ring_line);
		cursor_flag=curFlag;
		symbol=sym;
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", ring_line);
		document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
		symbol='';
		var selector_id = '#'+cursor_flag;
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}
  }
   function bridgeButton(curFlag,sym,skfrgxml,brcount)
  {
	deleteBridge();
	bondCount = 1;
	bridgeCount=brcount;
	skeletonFlag=false;
	skeletonFragmentXML=skfrgxml;
	eventClear();
	var selector_id = '#'+curFlag;
	var url="url('images/"+curFlag+".png'), auto";
	if(cursor_flag!=curFlag)
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("mousedown", bridge_line);
		cursor_flag=curFlag;
		symbol=sym;
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", bridge_line);
		document.getElementById("s_content").removeEventListener("mousemove", bridge_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", bridge_msup);
		symbol='';
		var selector_id = '#'+cursor_flag;
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}
  } 
  function undo()
  {
	deleteBridge();
	skeletonFlag=false;
	//console.log(undo_stack);
	if(undo_stack.length!=0)
	{
		undo_redo_flag=true;
		var toRemove = undo_stack.pop();
		var arr=new Array();
		var line_id_change = new Array(); var assoc_arr = [];
		var index=new Array();
		if(toRemove.length!=0)
		{
		if(toRemove[0]!='move'&&toRemove[0]!='orient'&&toRemove[0]!='atom_replace')
		{
		if(typeof(toRemove[0])=='object')
		{			
			if(toRemove[0].hasAttribute('str_id')&&!toRemove[0].hasAttribute('skip'))
			{
				var toNotSkip=toRemove[0].getAttribute('str_id').slice(1);
				toSkip[toNotSkip]='not skip';
			}	
			for(var i=0;i<toRemove.length;i++)
			{
				if(toRemove[i].hasAttribute('str_id1'))
				{
					find_interact(toRemove[i],'not skip');
				}
				var id = toRemove[i].getAttribute('id');
				if(id.indexOf('l')!=-1)
				{					
					index.push(toRemove[i].getAttribute('id1'));
					index.push(toRemove[i].getAttribute('id2'));
				}
				if(id.indexOf('tri')!=-1)
				{					
					index.push(toRemove[i].getAttribute('id1'));
					index.push(toRemove[i].getAttribute('id2'));
				}
				svg.appendChild(toRemove[i]);
				arr.push(id);
			}
			for(var i=0;i<index.length;i++)
			{
				var obj = document.getElementById(index[i])
				svg.removeChild(obj);
				svg.appendChild(obj);
			}
		}
		else
		{
			for(var i=0;i<toRemove.length;i++)
			{
				var obj=document.getElementById(toRemove[i]);
				if(toRemove[i].indexOf('g')!=-1)
					count--;
				if(toRemove[i].indexOf('l')!=-1)
					l_count--;
				if(toRemove[i].indexOf('itl')!=-1)
					itl_count--;
				arr.push(obj);
				svg.removeChild(obj);
			}
		}
		}
		else if(toRemove[0]=='atom_replace')
		{
			var obj = toRemove[1];
			arr.push('atom_replace');
			arr.push(obj);
			arr.push(obj.childNodes[1].childNodes[0].nodeValue);
			obj.childNodes[1].childNodes[0].nodeValue=toRemove[2];
		}
		else if(toRemove[0]=='move')
		{
			var temp = move_structure_flag;
			move_structure_flag = toRemove[3];
			toMove(toRemove[1],toRemove[2],true);
			move_structure_flag = temp;
			arr=toRemove;
		}
		else
		{
			toOrient(toRemove[1],toRemove[2]);
			arr=toRemove;
		}
		}
		redo_stack.push(arr);
	}
	if(undo_stack_jsobj.length!=0)
	{
		var toRemove = undo_stack_jsobj.pop();
		var length = undo_stack_jsobj.length;
		if(length!=0)
		{
			structure = new Array();
			structure = undo_stack_jsobj[length-1];
		}			
		else
		{
			structure = new Array();
			structure = initial_state;
		}
		redo_stack_jsobj.push(toRemove);
		createNewFragments();
	}
	drawChargeCount();
	if(unpaired_electron_flag=='visible')
		upair_electrons(false);
	if(lonepaired_electron_flag=='visible')
		lpair_electrons(false);
	if(vacant_electron_flag=='visible')
		vacant_electrons(false);
  }
  function redo()
  {
	deleteBridge();
	skeletonFlag=false;
	if(redo_stack.length!=0)
	{
		undo_redo_flag=true;
		var toAdd = redo_stack.pop();
		var arr=new Array();
		var index=new Array();
		if(toAdd.length!=0)
		{
		if(toAdd[0]!='move'&&toAdd[0]!='orient'&&toAdd[0]!='atom_replace')
		{
		if(typeof(toAdd[0])!='object')
		{
			if(document.getElementById(toAdd[0]).hasAttribute('str_id')&&!document.getElementById(toAdd[0]).hasAttribute('skip'))
			{
				var skip=document.getElementById(toAdd[0]).getAttribute('str_id').slice(1);
				toSkip[skip]='skip';
			}			
			for(var i=0;i<toAdd.length;i++)
			{
				var obj=document.getElementById(toAdd[i]);
				arr.push(obj);
				svg.removeChild(obj);
				if(obj.hasAttribute('str_id1'))
				{
					find_interact(obj,'skip');
				}
			}
		}
		else
		{
			for(var i=0;i<toAdd.length;i++)
			{
				svg.appendChild(toAdd[i]);
				var id = toAdd[i].getAttribute('id');
				if(id.indexOf('l')!=-1)
				{
					index.push(toAdd[i].getAttribute('id1'));
					index.push(toAdd[i].getAttribute('id2'));
					l_count++;
				}
				if(id.indexOf('tri')!=-1)
				{					
					index.push(toAdd[i].getAttribute('id1'));
					index.push(toAdd[i].getAttribute('id2'));
				}
				if(id.indexOf('g')!=-1)
				{					
					count++;
				}
				if(id.indexOf('itl')!=-1)
				{					
					index.push(toAdd[i].getAttribute('id1'));
					index.push(toAdd[i].getAttribute('id2'));
					itl_count++;
				}
				arr.push(id);
			}
			for(var i=0;i<index.length;i++)
			{
				var obj = document.getElementById(index[i]);
				svg.removeChild(obj);
				svg.appendChild(obj);
			}
		}
		}
		else if(toAdd[0]=='atom_replace')
		{
			var obj = toAdd[1];
			arr.push('atom_replace');
			arr.push(obj);
			arr.push(obj.childNodes[1].childNodes[0].nodeValue);
			obj.childNodes[1].childNodes[0].nodeValue=toAdd[2];
		}
		else if(toAdd[0]=='move')
		{
			var temp = move_structure_flag;
			move_structure_flag = toAdd[3];
			toMove(toAdd[2],toAdd[1],true);
			move_structure_flag = temp;
			arr=toAdd;
		}
		else
		{
			toOrient(toAdd[2],toAdd[1]);
			arr=toAdd;
		}
		}
		undo_stack.push(arr);
	}
	 if(redo_stack_jsobj.length!=0)
	{
		var toAdd = redo_stack_jsobj.pop();
		structure = new Array();
		structure = toAdd;
		createNewFragments();
		undo_stack_jsobj.push(toAdd);
	} 
	drawChargeCount();
	if(unpaired_electron_flag=='visible')
		upair_electrons(false);
	if(lonepaired_electron_flag=='visible')
		lpair_electrons(false);
	if(vacant_electron_flag=='visible')
		vacant_electrons(false);
  }
  function delete_structure()
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var selector_id = '#delete_structure';
	var url="url('images/delete_structure.png'), auto";
	if(cursor_flag!='delete_structure')
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("click", event_delete_structure);
		cursor_flag='delete_structure';
		symbol='C';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("click", event_delete_structure);
		symbol='';		
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}
  }
  function implicit_carbon()
  {
	deleteBridge();
	skeletonFlag=false;
	for(i=0;i<count;i++)
	{
		var id='g['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.childNodes[1].childNodes[0].nodeValue=="C"&&obj.childNodes[1].getAttribute('fill')=='black')
		{
			if(obj.style.visibility =='hidden')
				obj.style.visibility='visible';
			else
				obj.style.visibility='hidden';
		}
	}
  }
  function move(flag)
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	move_structure_flag=flag;
	var selector_id = '#'+flag;
	var url="url('images/"+flag+".png'), auto";
	if(cursor_flag!=flag)
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("mousedown", str_grp_down);
		cursor_flag=flag;
		symbol='';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", str_grp_down);
		document.getElementById("s_content").removeEventListener("mousemove", str_grp_move);
		document.getElementById("s_content").removeEventListener("mouseup", str_grp_up);
		symbol='';
		var selector_id = '#'+cursor_flag;
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}
  }
  function KeyPress(e) 
  {
        var evtobj = window.event? event : e;
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) 
			undo();
		if (evtobj.keyCode == 89 && evtobj.ctrlKey) 
			redo();
  }
  function plane_projection(projection)
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	plane_projection_flag=projection;
	var selector_id = '#'+projection;
	var url="url('images/"+projection+".png'), auto";
	if(cursor_flag!=projection)
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("click", event_plane_projection);
		cursor_flag=projection;
		symbol='';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("click", event_plane_projection);
		symbol='';
		var selector_id = '#'+cursor_flag;
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}
  }
  function orientation()
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var selector_id = '#Change_orientation';
	if(cursor_flag!='Change_orientation')
	{
		document.getElementById("s_content").style.cursor = "url('images/Change_orientation.png'), auto";
		document.getElementById("s_content").addEventListener("mousedown", change_orientation_down);
		cursor_flag='Change_orientation';
		symbol='';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", change_orientation_down);
		document.getElementById("s_content").removeEventListener("mousemove", change_orientation_move);
		document.getElementById("s_content").removeEventListener("mouseup", change_orientation_up);
		symbol='';
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}
  }
  function upair_electrons(toggle)
  {
	deleteBridge();
	skeletonFlag=false;
	if(toggle==true)
	{
		if(unpaired_electron_flag=='hidden')
			unpaired_electron_flag = 'visible';
		else
			unpaired_electron_flag = 'hidden';
	}
	for(i=0;i<count;i++)
	{
		var g_id = 'g['+i+']';
		var obj = document.getElementById(g_id);
		if(obj==null)
			continue;
		while(obj.childNodes.length!=5)
			obj.removeChild(obj.lastChild);
	}
	if(unpaired_electron_flag=='hidden')
	{
		return;
	}
	lonepaired_electron_flag = 'hidden';
	vacant_electron_flag = 'hidden';
	for(i=0;i<count;i++)
	{
		var elec_vector = atom[i].getElectronLinkVector();var l_adjust=3;var c_adjust = 6;var r1 = 2.5;var r2=0.5;var c_adjust1 = 1.5;
		var x =  Number(atom[i].getX());
		var y =  Number(atom[i].getY());
		var g_id = 'g['+collisionDetect(x,y)+']';
		if(g_id=='g[-1]')
			continue
		var obj = document.getElementById(g_id);
		if(obj==null)
			continue;
		var x =  x + l_adjust;
		var y =  y - l_adjust;
		var uPair_count = 0;
		for(j=0;j<elec_vector.length;j++)
		{
			if(elec_vector[j].getElectronStatus()=='uPair')
			{
				uPair_count++;
				if(uPair_count==1)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x - c_adjust);
					circle.setAttribute('cy',y);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','rgb(92, 230, 230)');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x - c_adjust);
					circle.setAttribute('cy',y + c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
				}
				if(uPair_count==2)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y - c_adjust);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','rgb(92, 230, 230)');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y - c_adjust + c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
				}
				if(uPair_count==3)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x + c_adjust);
					circle.setAttribute('cy',y);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','rgb(92, 230, 230)');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x + c_adjust);
					circle.setAttribute('cy',y + c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
				}
				if(uPair_count==4)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y + c_adjust);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','rgb(92, 230, 230)');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y + c_adjust + c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
				}
			}
		}
	}
  }
  function lpair_electrons(toggle)
  {
	deleteBridge();
	skeletonFlag=false;
	if(toggle==true)
	{
		if(lonepaired_electron_flag=='hidden')
			lonepaired_electron_flag = 'visible';
		else
			lonepaired_electron_flag = 'hidden';
	}
	for(i=0;i<count;i++)
	{
		var g_id = 'g['+i+']';
		var obj = document.getElementById(g_id);
		if(obj==null)
			continue;
		while(obj.childNodes.length!=5)
			obj.removeChild(obj.lastChild);
	}
	if(lonepaired_electron_flag=='hidden')
	{
		return;
	}
	unpaired_electron_flag = 'hidden';
	vacant_electron_flag = 'hidden';
	for(i=0;i<count;i++)
	{
		var elec_vector = atom[i].getElectronLinkVector();var l_adjust=3;var c_adjust = 6;var r1 = 2.5;var r2=0.5;var c_adjust1 = 1.5;
		var x =  Number(atom[i].getX());
		var y =  Number(atom[i].getY());
		var g_id = 'g['+collisionDetect(x,y)+']';
		if(g_id=='g[-1]')
			continue
		var obj = document.getElementById(g_id);
		if(obj==null)
			continue;
		var x =  x + l_adjust;
		var y =  y - l_adjust;
		var lPair_count = 0;
		for(j=0;j<elec_vector.length;j++)
		{
			if(elec_vector[j].getElectronStatus()=='lPair')
			{
				lPair_count++;
				if(lPair_count==1)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x - c_adjust);
					circle.setAttribute('cy',y);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','rgb(0, 255, 0)');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x - c_adjust);
					circle.setAttribute('cy',y + c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x - c_adjust);
					circle.setAttribute('cy',y - c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
				}
				if(lPair_count==2)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y - c_adjust);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','rgb(0, 255, 0)');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y - c_adjust + c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y - c_adjust - c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
				}
				if(lPair_count==3)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x + c_adjust);
					circle.setAttribute('cy',y);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','rgb(0, 255, 0)');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x + c_adjust);
					circle.setAttribute('cy',y + c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x + c_adjust);
					circle.setAttribute('cy',y - c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
				}
				if(lPair_count==4)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y + c_adjust);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','rgb(0, 255, 0)');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y + c_adjust + c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y + c_adjust - c_adjust1);
					circle.setAttribute('r',r2);
					circle.setAttribute('fill','black');
					obj.appendChild(circle);
				}
			}
		}
	}
  }
  function vacant_electrons(toggle)
  {
	deleteBridge();
	skeletonFlag=false;
	if(toggle==true)
	{
		if(vacant_electron_flag=='hidden')
			vacant_electron_flag = 'visible';
		else
			vacant_electron_flag = 'hidden';
	}
	for(i=0;i<count;i++)
	{
		var g_id = 'g['+i+']';
		var obj = document.getElementById(g_id);
		if(obj==null)
			continue;
		while(obj.childNodes.length!=5)
			obj.removeChild(obj.lastChild);
	}
	if(vacant_electron_flag=='hidden')
	{
		return;
	}
	unpaired_electron_flag = 'hidden';
	lonepaired_electron_flag = 'hidden';
	for(i=0;i<count;i++)
	{
		var elec_vector = atom[i].getElectronLinkVector();var l_adjust=3;var c_adjust = 6;var r1 = 2.5;var r2=0.5;var c_adjust1 = 1.5;var width = 0.5;
		var x =  Number(atom[i].getX());
		var y =  Number(atom[i].getY());
		var g_id = 'g['+collisionDetect(x,y)+']';
		if(g_id=='g[-1]')
			continue
		var obj = document.getElementById(g_id);
		if(obj==null)
			continue;
		var x =  x + l_adjust;
		var y =  y - l_adjust;
		var vacant_count = 0;
		for(j=0;j<elec_vector.length;j++)
		{
			if(elec_vector[j].getElectronStatus()=='vacant')
			{
				vacant_count++;
				if(vacant_count==1)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x - c_adjust);
					circle.setAttribute('cy',y);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','white');
					circle.setAttribute('stroke','grey');
					circle.setAttribute('stroke-width',width);
					obj.appendChild(circle);										
				}
				if(vacant_count==2)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y - c_adjust);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','white');
					circle.setAttribute('stroke','grey');
					circle.setAttribute('stroke-width',width);
					obj.appendChild(circle);
				}
				if(vacant_count==3)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x + c_adjust);
					circle.setAttribute('cy',y);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','white');
					circle.setAttribute('stroke','grey');
					circle.setAttribute('stroke-width',width);
					obj.appendChild(circle);					
				}
				if(vacant_count==4)
				{
					var circle = document.createElementNS(svgNS,'circle');
					circle.setAttribute('cx',x);
					circle.setAttribute('cy',y + c_adjust);
					circle.setAttribute('r',r1);
					circle.setAttribute('fill','white');
					circle.setAttribute('stroke','grey');
					circle.setAttribute('stroke-width',width);
					obj.appendChild(circle);					
				}
			}
		}
	}
  }
  function atom_position()
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var selector_id = '#atom_position';
	if(cursor_flag!='atom_position')
	{
		document.getElementById("s_content").style.cursor = "url('images/atom_position.png'), auto";
		document.getElementById("s_content").addEventListener("click", event_atom_postion);
		for(i=0;i<count;i++)
		{
			var g_id = 'g['+i+']';
			var obj = document.getElementById(g_id);
			if(obj==null)
				continue;
			obj.childNodes[2].style.visibility = 'visible';
		}
		cursor_flag='atom_position';
		symbol='';
		atom_position_visiblity='visible';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		
		document.getElementById("s_content").removeEventListener("click", event_atom_postion);
		symbol='';
		cursor_flag=false;
		atom_position_visiblity = 'hidden';
		$(selector_id).css("background-image", "" );
	}
	
	for(i=0;i<count;i++)
	{
		var g_id = 'g['+i+']';
		var obj = document.getElementById(g_id);
		if(obj==null)
			continue;
		obj.childNodes[2].style.visibility = atom_position_visiblity;
	}
  }
  /* function add_charge()
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var selector_id = '#add_charge';
	if(cursor_flag!='add_charge')
	{
		document.getElementById("s_content").style.cursor = "url('images/add_charge.png'), auto";
		document.getElementById("s_content").addEventListener("click", event_add_charge);
		cursor_flag='add_charge';
		symbol='';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";		
		document.getElementById("s_content").removeEventListener("click", event_add_charge);
		symbol='';
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}	
  } */
  function add_plus_charge()
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var selector_id = '#add_plus_charge';
	if(cursor_flag!='add_plus_charge')
	{
		document.getElementById("s_content").style.cursor = "url('images/add_plus_charge.png'), auto";
		document.getElementById("s_content").addEventListener("click", event_add_plus_charge);
		cursor_flag='add_plus_charge';
		symbol='';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";		
		document.getElementById("s_content").removeEventListener("click", event_add_plus_charge);
		symbol='';
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}	
  }
  function add_minus_charge()
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var selector_id = '#add_minus_charge';
	if(cursor_flag!='add_minus_charge')
	{
		document.getElementById("s_content").style.cursor = "url('images/add_minus_charge.png'), auto";
		document.getElementById("s_content").addEventListener("click", event_add_minus_charge);
		cursor_flag='add_minus_charge';
		symbol='';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";		
		document.getElementById("s_content").removeEventListener("click", event_add_minus_charge);
		symbol='';
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}	
  }
  function interaction(interact)
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	interact_flag = interact;
	var selector_id = '#'+interact;
	var url = "url('images/"+interact+".png'), auto";
	if(cursor_flag!=interact)
	{
		document.getElementById("s_content").style.cursor = url ;
		document.getElementById("s_content").addEventListener("mousedown", down_interact);
		cursor_flag=interact;
		symbol='';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", down_interact);
		document.getElementById("s_content").removeEventListener("mousemove", move_interact);
		document.getElementById("s_content").removeEventListener("mouseup", up_interact);
		symbol='';
		var selector_id = '#'+cursor_flag;
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}
  }
    function isotope_label()
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var selector_id = '#isotope_label';
	if(cursor_flag!='isotope_label')
	{
		document.getElementById("s_content").style.cursor = "url('images/isotope_label.png'), auto";
		document.getElementById("s_content").addEventListener("click", event_isotope_label);
		cursor_flag='isotope_label';
		symbol='';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";		
		document.getElementById("s_content").removeEventListener("click", event_isotope_label);
		symbol='';
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}	
  }
  function open_template()
  {
	deleteBridge();
	skeletonFlag=false;
	var obj = document.getElementById('upload');
	if(obj!=null)
		document.body.removeChild(obj);
	var upload_file = document.createElement("INPUT");
    upload_file.setAttribute("type", "file");
	upload_file.style.visibility='hidden';
	upload_file.id='upload';
	document.body.appendChild(upload_file);
	upload_file.click(); 	
	upload_file.onchange = function() {
	//Alert.render();
	upload();
	eventClear();
	document.getElementById("s_content").style.cursor = "url('images/template.png'), auto";
	document.getElementById("s_content").addEventListener("click", click_open_template);
	cursor_flag='open_template';
	symbol='';
	};
  }
  function add_implied_hydrogen()
  {
	var str_id = 0;
	for(var i=0;i<structure.length;i++)
	{
		if(toSkip[i]=='skip')
			continue;
		if(typeof(structure[i].getFragmentVector)=='function')
		{
			var frg_vector = structure[i].getFragmentVector();
			for(var j=0;j<frg_vector.length;j++)
			{
				var atm_vector = frg_vector[j].getAtomVector();
				for(var k=0;k<atm_vector.length;k++)
				{
					var elec_vector = atm_vector[k].getElectronLinkVector();
					var part_charge = 0 ;
					for(var l=0;l<elec_vector.length;l++)
					{						
						if(elec_vector[l].getElectronStatus()=='uPair')
						{
							var pt={x:Number(atm_vector[k].getX()),y:Number(atm_vector[k].getY())};
							var frg = createAtomFragment('H',structure[i].getId(),{x:0,y:0});
							structure[i].setFragment(frg);
							
							var elec_vector1 = frg.getAtomVector()[0].getElectronLinkVector()[0];
							elec_vector[l].setElectronStatus('bPair');
							elec_vector[l].setX1(pt.x.toFixed(2));
							elec_vector[l].setX2(pt.x.toFixed(2));
							elec_vector[l].setY1(pt.y.toFixed(2));
							elec_vector[l].setY2(pt.y.toFixed(2));
							elec_vector[l].setLinkStatus('linkTarget');
							elec_vector[l].setBond('sigma');
							elec_vector[l].setBondType('PolarCovalent');
							elec_vector[l].setOrder('single');
							elec_vector[l].setOrientation(0);
							var target = 's'+(str_id)+'-'+(structure[i].getFragmentVector().length-1)+'-a0e0';
							elec_vector[l].setTarget(target);
							
							elec_vector1.setElectronStatus('bPair');
							elec_vector1.setX1(0);
							elec_vector1.setX2(0);
							elec_vector1.setY1(0);
							elec_vector1.setY2(0);
							elec_vector1.setLinkStatus('linkTarget');
							elec_vector1.setBond('sigma');
							elec_vector1.setBondType('PolarCovalent');
							elec_vector1.setOrder('single');
							elec_vector1.setOrientation(0);
							var target = 's'+(str_id)+'-'+(j)+'-a'+(k)+'e'+(l);
							elec_vector1.setTarget(target);
							var set_charge = frg.getAtomVector()[0].getElectroNegativity() - atm_vector[k].getElectroNegativity();
							part_charge += set_charge;
							if(set_charge<0)
							{
								elec_vector[l].setPartCharge('-');
								elec_vector[l].setPartChargeVal(Math.abs(set_charge).toFixed(2));
								elec_vector1.setPartCharge('+');
								elec_vector1.setPartChargeVal(Math.abs(set_charge).toFixed(2));
							}
							else if(set_charge>0)
							{
								elec_vector[l].setPartCharge('+');
								elec_vector[l].setPartChargeVal(Math.abs(set_charge).toFixed(2));
								elec_vector1.setPartCharge('-');
								elec_vector1.setPartChargeVal(Math.abs(set_charge).toFixed(2));
							}
							else
							{
								elec_vector[l].setPartCharge(0);
								elec_vector[l].setPartChargeVal(0);
								elec_vector1.setPartCharge(0);
								elec_vector1.setPartChargeVal(0);
							}
							if(Math.abs(set_charge)<=1.7)
							{
								elec_vector[l].setBondType('Covalent');
							}
							else if(Math.abs(set_charge)>1.7)
							{
								elec_vector[l].setBondType('Electrovalent');
								elec_vector[l].setBond('ionic');
							}
						}
						else
						{
							var chrg = elec_vector[l].getPartCharge();
							var val = elec_vector[l].getPartChargeVal();
							var txt = chrg+val;
							part_charge += Number(txt);
						}
					}
					if(part_charge<0)
					{
						atm_vector[k].setPartCharge('-');
						atm_vector[k].setPartChargeVal(Math.abs(part_charge).toFixed(2));
					}
					else if(part_charge>0)
					{
						atm_vector[k].setPartCharge('+');
						atm_vector[k].setPartChargeVal(Math.abs(part_charge).toFixed(2));
					}
					else
					{
						atm_vector[k].setPartCharge(0);
						atm_vector[k].setPartChargeVal(0);
					}
				}
			}
			str_id++;
		}		
	}
  }
  function grid()
  {
	var s_content = document.getElementById('s_content');
	if(grid_set == true)
	{
		s_content.style.backgroundImage = '';
		grid_set = false;
	}		
	else
	{
		s_content.style.backgroundImage = 'url(\'img/grid1.png\')';
		grid_set = true;		
	}
		
  }
  function new_structure(skip)
  {	
	var myNode = document.getElementById("mySvg");
	var len = myNode.childNodes.length;
	if(skip==false)
	if(len>2)
	{
		if(confirm("Drawing space is not free.\nPlease save before clearing drawing space.\nDo you want to continue anyway?")==false)
			return;
	}
	document.getElementById("s_content").style.cursor = "default";
	$("button").css("background-image", "" );
	while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
	}
	variable_init();
	eventClear();	
}
function open_structure()
{
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var myNode = document.getElementById("mySvg");
	var len = myNode.childNodes.length;
	cursor_flag = 'open_structure';
	if(len>2)
	{
		if(confirm("Drawing space is not free.\nPlease save before opening new structure.\nDo you want to continue anyway?")==false)
			return;
	}
	var obj = document.getElementById('upload');
	if(obj!=null)
		document.body.removeChild(obj);
	var upload_file = document.createElement("INPUT");
    upload_file.setAttribute("type", "file");
	upload_file.style.visibility='hidden';
	upload_file.id='upload';
	document.body.appendChild(upload_file);
	upload_file.click(); 	
	upload_file.onchange = function() {
	upload();
	};
}
function template_library()
{
	template_prompt.render('library');
}
function update_library()
{
	check_login();
	if(login_set==false)	
	{
		Alert.render("Login to update template");
		return;
	}
	var strlen=structure.length;
	var cnt=0;
	for(var i=0;i<strlen;i++)
	{
		if(toSkip[i]=='skip')
			continue;
		cnt++;
	}
	if(cnt>1)
	{
		Alert.render('Cannot update more than one structure to library');
		return;
	}
	else if(cnt==0)
	{
		Alert.render('Cannot update empty structure to library');
		return;
	}
	input_prompt.render();
}
function ligand_library()
{
	template_prompt.render('ligand_library');
}
function update_ligand_library()
{
	check_login();
	if(login_set==false)	
	{
		Alert.render("Login to update Ligand Library");
		return;
	}
	var strlen=structure.length;
	var cnt=0;
	for(var i=0;i<strlen;i++)
	{
		if(toSkip[i]=='skip')
			continue;
		cnt++;
	}
	if(cnt>1)
	{
		Alert.render('Cannot update more than one Ligand to library');
		return;
	}
	else if(cnt==0)
	{
		Alert.render('Cannot update empty structure to library');
		return;
	}
	input_prompt.render();
}
function check_login()
{
	deleteBridge();
	skeletonFlag=false;
	$.post("checklogin.php", {},function(status){
		if(status.trim()=="false")
		{
			login_set = false;
			
		}
		else
			login_set = true;
	});	
}
function logOut()
{
	$.post("logout.php");
	login_set = false;
	document.getElementById('login_btn').innerHTML = "Login&#x25BC";
	$(".menu_login").css("display", "none");
	$(".menu_login").css("z-index", "-1");
	$('#login').removeAttr('style');
	document.getElementById('login').setAttribute('onclick',"display_menu('#t_login')");
}
function add_caption()
{
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	$("button").css("background-image", "" );
	document.getElementById("s_content").style.cursor = "url('images/caption.png'), auto";
	document.getElementById("s_content").addEventListener("click", click_add_caption);
	cursor_flag='add_caption';
	symbol='';
}
function move_caption()
{
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	document.getElementById("s_content").style.cursor = "url('images/caption.png'), auto";
	document.getElementById("s_content").addEventListener("mousedown", down_move_caption);
	cursor_flag='move_caption';
	$("button").css("background-image", "" );
	symbol='';
}
function draw_arrow(curFlag)
{
	deleteBridge();
	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	var selector_id = '#'+curFlag;
	var url="url('images/draw_arrow.png'), auto";
	if(cursor_flag!=curFlag)
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("mousedown", msdown_arrow);
		cursor_flag=curFlag;
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", msdown_arrow);
		document.getElementById("s_content").removeEventListener("mousemove", msmove_arrow);
		document.getElementById("s_content").removeEventListener("mouseup", msup_arrow);
		var selector_id = '#'+cursor_flag;
		cursor_flag=false;		
		$(selector_id).css("background-image", "" );
	}
}
function draw_rev_arrow(curFlag)
{
	deleteBridge();
	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	var selector_id = '#'+curFlag;
	var url="url('images/draw_rev_arrow.png'), auto";
	if(cursor_flag!=curFlag)
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("mousedown", msdown_rev_arrow);
		cursor_flag=curFlag;
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", msdown_rev_arrow);
		document.getElementById("s_content").removeEventListener("mousemove", msmove_rev_arrow);
		document.getElementById("s_content").removeEventListener("mouseup", msup_rev_arrow);
		var selector_id = '#'+cursor_flag;
		cursor_flag=false;		
		$(selector_id).css("background-image", "" );
	}
}
function draw_sign(sign,sym,cur)
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var selector_id = '#'+sign;
	var url="url('images/"+cur+".png'), auto";
	if(cursor_flag!=sign)
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("click", event_draw_sign);
		cursor_flag=sign;
		symbol=sym;	
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("click", event_draw_sign);
		symbol='';		
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}
  }
 function delete_caption()
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var url="url('images/caption.png'), auto";
	if(cursor_flag!='delete_caption')
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("click", event_delete_caption);
		cursor_flag='delete_caption';
		$("button").css("background-image", "" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("click", event_delete_caption);
		symbol='';		
		cursor_flag=false;
	}
  }
 function del_arr_sign()
  {
	deleteBridge();
	skeletonFlag=false;
	eventClear();
	var selector_id = '#del_arr_sign';
	var url="url('images/erase_arrow.png'), auto";
	if(cursor_flag!='#del_arr_sign')
	{
		document.getElementById("s_content").style.cursor = url;
		document.getElementById("s_content").addEventListener("click", event_del_arr_sign);
		cursor_flag='#del_arr_sign';
		$("button").css("background-image", "" );
		$(selector_id).css("background-image", "linear-gradient(to bottom, #9E9E9E 5%, #f9f9f9 100%)" );
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("click", event_del_arr_sign);
		symbol='';		
		cursor_flag=false;
		$(selector_id).css("background-image", "" );
	}
  }
function upload()
{
	var file =  document.getElementById("upload").files[0];
	if (!file.type.match('text/xml')) {
	return;
	}
	var formData = new FormData();
	formData.append('data',file,file.name);
	 if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	
	var response = xmlhttp.responseText;
	response = response.split('-');
	if(response[0].trim()=='success')
	{		
		var filename = 'upload/'+response[1];
		if(cursor_flag=='open_template')
		{
			templateXML = loadXMLDoc(filename);
			$.post("unlink.php", {data: filename});
		}
		else
		{
			openXML = loadXMLDoc(filename);
			draw_xml({x:0,y:0});
			$.post("unlink.php", {data: filename});
		}	
	}
    }
  }

  xmlhttp.open("POST","upload.php",true);
xmlhttp.send(formData);
}
function loginShow()
{
	var username  = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	document.getElementById('txthnt').innerHTML = "";
	$.post("login2.php", {myusername: username,mypassword:password}, function (status) {
	status=status.split('-');
		if(status[0]=="Success")
		 {
			document.getElementById('login_btn').innerHTML = "Welcome&#x25BC";
			document.getElementById('logged_username').innerHTML = "Username:"+username;
			login_set  = true;
			document.getElementById('username').value="";
			document.getElementById('password').value="";
			$(".menu_login").css("display", "none");
			$(".menu_login").css("z-index", "-1");
			document.getElementById('login').setAttribute('onclick',"display_menu('#t_logged')");
			$('#login').removeAttr('style');
		}
		 else
		 {
			document.getElementById('txthnt').innerHTML = status;
			login_set = false;
		 }			
		});
}

 function save_xml(save_val)
{
 var str = writeXML(save_val);
 if(str==false)
{
	Alert.render('Cannot save more than one structure as template');
	return;
}
 var arr = new Array();
 stack_check();
 str = str.replace(/%2B/g, '+');
 str = str.replace(/%2D/g, '-');
 $.post("savexml.php", {data: str}, function (file) {
 window.location.href =  "downloadxml.php?path="+ file});
 if(save_val=='save')
	change_obj_color();
 undo_stack.push(arr);
 var toPush = copyStructure(structure);
 undo_stack_jsobj.push(toPush);
}
function save_image() 
{
	saveAlert.render('Saving.....');
	var arr = new Array();
	stack_check();
	add_implied_hydrogen();
	change_obj_color();  
	var a = document.getElementById('mySvg');
	renderCanvas(10);
	
    html2canvas($("#canvas"), {
			onrendered: function(){
            // canvas is the final rendered <canvas> element
            var myImage = canvas.toDataURL("image/png");

			var a = document.createElement('a');
			a.setAttribute("download", "image.png");
			a.setAttribute("href", myImage);
			a.id = 'image';
			
			document.body.appendChild(a);
			$('#image')[0].click();
			document.body.removeChild(a);
			
			var cvas = document.getElementById('canvas');
			var context = cvas.getContext('2d');
			context.clearRect(0, 0, cvas.width, cvas.height);
			cvas.removeAttribute('width');
			cvas.removeAttribute('height');
			cvas.removeAttribute('style');
			saveAlert.ok();
        } 
    });
	
	undo_stack.push(arr);
	var toPush = copyStructure(structure);
	undo_stack_jsobj.push(toPush);
}
function save_template(filename) 
{
	saveAlert.render('Saving Template...');
	var a = document.getElementById('mySvg');var msg;
	renderCanvas(4);	
    html2canvas($("#canvas"), {
			onrendered: function(){
            // canvas is the final rendered <canvas> element
            var myImage = canvas.toDataURL("image/png");
			$.post("updateimg.php", {fname: filename,data:myImage}, function (status) {
				var cvas = document.getElementById('canvas');
				var context = cvas.getContext('2d');
				context.clearRect(0, 0, cvas.width, cvas.height);
				cvas.removeAttribute('width');
				cvas.removeAttribute('height');
				cvas.removeAttribute('style');
				msg = status;
				saveAlert.ok();
			})
        } 
    });
	return msg;
}
function renderCanvas(zoom)
{
    var oSerializer = new XMLSerializer();
	
	var a = document.getElementById('mySvg');
	var minmax_point = minXminY();
	var temp_viewbox = a.getAttribute("viewBox");
	var temp_x = a.getAttribute("width");
	var temp_y = a.getAttribute("height");
	var new_width = (minmax_point.maxx-minmax_point.minx+5)*zoom;
	var new_height = (minmax_point.maxy-minmax_point.miny+5)*zoom;
	
	document.getElementById("canvas").style.visibility = 'hidden';
	
	var viewbox = Math.floor(minmax_point.minx)+" "+Math.floor(minmax_point.miny)+" "+Math.floor(new_width/zoom)+" "+Math.floor(new_height/zoom);
	a.setAttribute("viewBox",viewbox);	
	a.setAttribute('width',new_width);
	a.setAttribute('height',new_height);
	a.setAttribute('preserveAspectRatio',"xMinYMin meet");
	
    var sXML = oSerializer.serializeToString(document.getElementById("mySvg"));
	a.setAttribute("viewBox",temp_viewbox);
	a.setAttribute('width',temp_x);
	a.setAttribute('height',temp_y);
	a.removeAttribute('preserveAspectRatio');
	
    canvg(document.getElementById('canvas'), sXML,{ ignoreMouse: true, ignoreAnimation: true });
}