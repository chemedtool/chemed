function drawMousePoint(event,flagStrCreate,skipCollision,uPairCount)
  {
	pt.x = event.clientX + clientXchange; pt.y = event.clientY + clientYchange;// -4 && 15 to center the drawn text on mouse pointer
	var a = svg.getScreenCTM();
    var b = a.inverse();
    var point = pt.matrixTransform(b);
	if(!skipCollision==true)
	{	
	for(var i=0;i<count;i++)
	{
		var name = "t["+i+"]";
		var gname = "g["+i+"]";
		var rect=document.getElementById(name);
		if(rect==null)
			continue;
		var retx=rect.getAttribute('x');
		var rety=rect.getAttribute('y');
		var x=retx;
		var y=rety;
		x-=point.x;
		y-=point.y;
		var range=Math.sqrt((x*x)+(y*y));
		if(range<=8)
		{	
			var atm_id =collisionDetectAtomIndex(retx,rety); 
			if(atm_id==-1)
			{
				continue;
			}				
			var xml_id=getStructureId(atm_id);
			var strId = 's'+xml_id.i;
			var ElectronLinkVector=atom[atm_id].getElectronLinkVector();
			var countElectronStatus = 0;
			for(j=0;j<ElectronLinkVector.length;j++)
			{
				if(ElectronLinkVector[j].getElectronStatus()=='uPair'||ElectronLinkVector[j].getElectronStatus()=='lPair'||ElectronLinkVector[j].getElectronStatus()=='vacant')
				{
					countElectronStatus++;
				}
			}
			if(flagStrCreate==true)
			{
				curStrId=strId;
			}
			return {x:Number(retx), y:Number(rety), id:name, g_id:gname,frg_id:xml_id.frgIndex,atm_id:atm_id,str_id:strId,xml_id:xml_id,collision:true,uPair:countElectronStatus};
		}
	}	
	}
		
	var g = document.createElementNS(svgNS, "g");var l_adjust=2.7;
	g.id = "g["+count+"]";
    g.setAttribute('shape-rendering', 'inherit');
    g.setAttribute('pointer-events', 'all');
	
	var circle = document.createElementNS(svgNS,'circle');
	circle.id = "c["+count+"]";
	var c_adjust = symbol.length - 1;
	circle.setAttribute('cx',point.x+l_adjust+c_adjust);
	circle.setAttribute('cy',point.y-l_adjust);var radius = 3.5 + (symbol.length-1)*1;
	circle.setAttribute('r',radius);
	circle.setAttribute('fill','white');
	g.appendChild(circle);
	
    var text = document.createElementNS(svgNS,'text');
	text.id = "t["+count+"]";
    text.setAttribute('x',point.x);
    text.setAttribute('y',point.y);
    text.setAttribute('fill','red');
	text.setAttribute('font-size','7px');
	var textNode = document.createTextNode(symbol);
	
	var text1 = document.createElementNS(svgNS,'text');
	text1.id = "at["+count+"]";
    text1.setAttribute('x',point.x - l_adjust);
    text1.setAttribute('y',point.y - l_adjust);
    text1.setAttribute('fill','rgb(0, 102, 255)');
	text1.setAttribute('font-size','4px');
	var text1Node = document.createTextNode('');
	
	var text2 = document.createElementNS(svgNS,'text');
	text2.id = "at1["+count+"]";
    text2.setAttribute('x',point.x + 2*l_adjust);
    text2.setAttribute('y',point.y - 2*l_adjust);
    text2.setAttribute('fill','red');
	text2.setAttribute('font-size','4px');
	var text2Node = document.createTextNode('');
	
	var text3 = document.createElementNS(svgNS,'text');
	text3.id = "at2["+count+"]";
    text3.setAttribute('x',point.x - l_adjust+1);
    text3.setAttribute('y',point.y - 3*l_adjust+1);
    text3.setAttribute('fill','black');
	text3.setAttribute('font-size','4px');
	var text3Node = document.createTextNode('');
	
	if(flagStrCreate==true)
	{
		curStrId='s'+structure.length;
		structure[structure.length]=new Structure();
		structure[structure.length-1].setId(curStrId);
	}
	frg=createAtomFragment(symbol,curStrId,point);
	
	for(i=0;i<structure.length;i++)
	if(structure[i].getId()==curStrId)
	{structure[i].setFragment(frg);}
	text.appendChild(textNode);
	
	g.setAttribute('str_id', curStrId);
	g.appendChild(text);	
	
	text1.appendChild(text1Node);
	g.appendChild(text1);
	
	text2.appendChild(text2Node);
	g.appendChild(text2);
	
	text3.appendChild(text3Node);
	g.appendChild(text3);
	
    svg.appendChild(g);
	
	var rect = text.getBoundingClientRect();
	
	ElectronLinkVector=atom[count].getElectronLinkVector();
	var countElectronStatus=0;
	for(j=0;j<ElectronLinkVector.length;j++)
	{
		if(ElectronLinkVector[j].getElectronStatus()=='uPair'||ElectronLinkVector[j].getElectronStatus()=='lPair'||ElectronLinkVector[j].getElectronStatus()=='vacant')
		{
			countElectronStatus++;
		}
	}
	count++;
	var xml_id = getStructureId(count-1);
	return {x:Number(point.x), y:Number(point.y), id:text.id, g_id:g.id,str_id:curStrId,frg_id:xml_id.frgIndex,atm_id:count-1,xml_id:xml_id,collision:false,uPair:countElectronStatus};
  } 
  
 function lineOverlap(pt1,pt2)
 {
	for(i=0;i<l_count;i++)
	{
		var id = "l["+i+"]";
		var line=document.getElementById(id);
		if(line==null)
			continue;
		pt1.x = Number(pt1.x);
		pt2.x = Number(pt2.x);
		pt1.y = Number(pt1.y);
		pt2.y = Number(pt2.y);
		var x1=Number(line.getAttribute('x1')).toFixed(2);
		var y1=Number(line.getAttribute('y1')).toFixed(2);
		var x2=Number(line.getAttribute('x2')).toFixed(2);
		var y2=Number(line.getAttribute('y2')).toFixed(2);
		if((pt1.x.toFixed(2)==x1&&pt1.y.toFixed(2)==y1&&pt2.x.toFixed(2)==x2&&pt2.y.toFixed(2)==y2)||(pt1.x.toFixed(2)==x2&&pt1.y.toFixed(2)==y2&&pt2.x.toFixed(2)==x1&&pt2.y.toFixed(2)==y1))
			return true;
	}
	return false;
 }
 function jsObjCollisionDetect(event,uPairCount)
  {
	pt.x = event.clientX + clientXchange; pt.y = event.clientY + clientYchange;var l_adjust=2.7;// -4 && 15 to center the drawn text on mouse pointer
	var a = svg.getScreenCTM();
    var b = a.inverse();
    var point = pt.matrixTransform(b);
	for(var i=0;i<count;i++)
	{
		var name = "t["+i+"]";
		var gname = "g["+i+"]";
		var rect=document.getElementById(name);
		if(rect==null)
			continue;
		var retx=rect.getAttribute('x');
		var rety=rect.getAttribute('y');
		var x=retx;
		var y=rety;
		x-=point.x;
		y-=point.y;
		var range=Math.sqrt((x*x)+(y*y));
		if(range<=8)
		{	
			var atm_id =collisionDetectAtomIndex(retx,rety); 
			if(atm_id==-1)
			{
				continue;
			}
			var xml_id=getStructureId(atm_id);
			var strId = 's'+xml_id.i;
			var ElectronLinkVector=atom[atm_id].getElectronLinkVector();
			var countElectronStatus = 0;
			for(j=0;j<ElectronLinkVector.length;j++)
			{
				if(ElectronLinkVector[j].getElectronStatus()=='uPair'||ElectronLinkVector[j].getElectronStatus()=='lPair'||ElectronLinkVector[j].getElectronStatus()=='vacant')
				{
					countElectronStatus++;
				}
			}
			return {x:Number(retx), y:Number(rety), id:name, g_id:gname,frg_id:xml_id.frgIndex,atm_id:atm_id,str_id:strId,xml_id:xml_id,collision:true,uPair:countElectronStatus};
		}
	}	
	return {x:Number(point.x), y:Number(point.y), id:'', g_id:'',str_id:'',frg_id:'',atm_id:'',xml_id:'',collision:false,uPair:2};
  } 
  function drawAtom(point,position)
  {
	
	var g = document.createElementNS(svgNS, "g");var l_adjust=2.7;
	g.id = "g["+count+"]";
    g.setAttribute('shape-rendering', 'inherit');
    g.setAttribute('pointer-events', 'all');
	g.setAttribute('str_id', curStrId);
	
	var circle = document.createElementNS(svgNS,'circle');
	circle.id = "c["+count+"]";
	var c_adjust = symbol.length - 1;
	circle.setAttribute('cx',point.x+l_adjust+c_adjust);
	circle.setAttribute('cy',point.y-l_adjust);var radius = 3.5 + (symbol.length-1)*1;
	circle.setAttribute('r',radius);
	circle.setAttribute('fill','white');
	g.appendChild(circle);
	
    var text = document.createElementNS(svgNS,'text');
	text.id = "t["+count+"]";
    text.setAttribute('x',point.x);
    text.setAttribute('y',point.y);
    text.setAttribute('fill','red');
	text.setAttribute('font-size','7px');
	var textNode = document.createTextNode(symbol);

	text.appendChild(textNode);
	g.appendChild(text);
	
	var text1 = document.createElementNS(svgNS,'text');
	text1.id = "at["+count+"]";
    text1.setAttribute('x',point.x - l_adjust);
    text1.setAttribute('y',point.y - l_adjust);
    text1.setAttribute('fill','rgb(0, 102, 255)');
	text1.setAttribute('font-size','4px');
	text1.style.visibility = atom_position_visiblity;
	var text1Node = document.createTextNode(position);
	
	text1.appendChild(text1Node);
	g.appendChild(text1);
	
	var text2 = document.createElementNS(svgNS,'text');
	text2.id = "at1["+count+"]";
    text2.setAttribute('x',point.x + 2*l_adjust);
    text2.setAttribute('y',point.y - 2*l_adjust);
    text2.setAttribute('fill','red');
	text2.setAttribute('font-size','4px');
	var text2Node = document.createTextNode('');
	
	text2.appendChild(text2Node);
	g.appendChild(text2);
	
	var text3 = document.createElementNS(svgNS,'text');
	text3.id = "at2["+count+"]";
    text3.setAttribute('x',point.x - l_adjust+1);
    text3.setAttribute('y',point.y - 3*l_adjust+1);
    text3.setAttribute('fill','black');
	text3.setAttribute('font-size','4px');
	var text3Node = document.createTextNode('');
	
	text3.appendChild(text3Node);
	g.appendChild(text3);
	return g;
  }
  function drawLine(point1,point2,l_adjust)
  {
	var line = document.createElementNS(svgNS,'line');
	line.id = "l["+l_count+"]";
	line.setAttribute('str_id', curStrId);
	line.setAttribute('x1',Number(point1.x)+l_adjust);
	line.setAttribute('y1',point1.y-l_adjust);
	line.setAttribute('x2',Number(point2.x)+l_adjust);
	line.setAttribute('y2',point2.y-l_adjust);
	line.setAttribute('stroke-linecap','round');
	line.setAttribute('stroke','rgb(0,0,0)');
	line.setAttribute('stroke-width',0.75);
	svg.appendChild(line);
	l_count++;
	return line.id;
  }
  function drawChargeCount()
  {
	for(i=0;i<count;i++)
	{
		var g_id = 'g['+i+']';
		var obj = document.getElementById(g_id);
		if(obj==null)
			continue;
		var txt = '';
		obj.childNodes[3].childNodes[0].nodeValue = txt;
		
	}
	for(i=0;i<count;i++)
	{
		if(Number(atom[i].getChargeCount())==0)
			continue;
		else
		{
			var g_id = 'g['+collisionDetect(atom[i].getX(),atom[i].getY())+']';
			var obj = document.getElementById(g_id);
			if(obj==null)
				continue;
			var txt = atom[i].getCharge() + atom[i].getChargeCount();
			obj.childNodes[3].childNodes[0].nodeValue = txt;
		}
		
	}
  }
function change_obj_color()
  {
	for(i=0;i<count;i++)
	{
		var g_id = 'g['+i+']';
		var obj = document.getElementById(g_id);
		if(obj==null)
			continue;
		if(obj.childNodes[1].childNodes[0].nodeValue=="C")
		{
			obj.style.visibility = "hidden";
			obj.childNodes[1].setAttribute('fill','black');
		}
		else
			obj.childNodes[1].setAttribute('fill','black');
	}

  }
  function draw_xml(point1)
  {
	var diff_flag=false; var strXML;
	if(point1.x==0)
	{
		new_structure(true);
		strXML = openXML.getElementsByTagName('structure');
		diff_flag=true;
	}		
	else
		strXML = templateXML.getElementsByTagName('structure');
	
	if(strXML.length>1&&point1.x!=0)
	{
		Alert.render('Cannot load group of structures as template');
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("click", click_open_template);
		return;
	}
	var old_count = count;
	var x_diff=0;var y_diff=0;var ids=[];
	for(var i=0;i<strXML.length;i++)
	{
		structure.push(new Structure());
		len = structure.length-1;
		id = 's'+len;
		structure[len].setId(id);
		var frgXML = strXML[i].getElementsByTagName('fragment');
		for(var j=0;j<frgXML.length;j++)
		{
			var x1 = Number(frgXML[j].getAttribute('x1'));
			var x2 = Number(frgXML[j].getAttribute('x2'));
			var y1 = Number(frgXML[j].getAttribute('y1'));
			var y2 = Number(frgXML[j].getAttribute('y2'));
			if(x1==0&&y1==0&&x2==0&&y2==0)
				continue;
			fragment[frg_count] = new Fragment();
			id = 's'+len+'-'+j;
			fragment[frg_count].setId(id);
			if(diff_flag==false)
			{
				x_diff = Number(x1-point1.x);
				y_diff = Number(y1-point1.y);
				diff_flag = true;
			}			
			x1 -= x_diff;
			x2 -= x_diff;
			y1 -= y_diff;
			y2 -= y_diff;
			
			fragment[frg_count].setX1(x1.toFixed(2));
			fragment[frg_count].setX2(x2.toFixed(2));
			fragment[frg_count].setY1(y1.toFixed(2));
			fragment[frg_count].setY2(y2.toFixed(2));
			fragment[frg_count].setTitle(frgXML[j].getAttribute('title'));
			fragment[frg_count].setType(frgXML[j].getAttribute('type'));
			fragment[frg_count].setFormula(frgXML[j].getAttribute('formula'));
			fragment[frg_count].setOrientation(frgXML[j].getAttribute('orientation'));
			fragment[frg_count].setSmiles(frgXML[j].getAttribute("smiles"));
			var atmXML = frgXML[j].getElementsByTagName('atom');
			for(var k=0;k<atmXML.length;k++)
			{
				atom[count]=new Atom();
				id = 's'+len+'-'+j+'-a'+k;
				atom[count].setId(id);
				var x = Number(atmXML[k].getAttribute('x'));
				var y = Number(atmXML[k].getAttribute('y'));
				x -= x_diff;
				y -= y_diff;
				atom[count].setX(x.toFixed(2));
				atom[count].setY(y.toFixed(2));
				atom[count].setAtNo(atmXML[k].getAttribute('atNo'));
				atom[count].setTitle(atmXML[k].getAttribute('title'));
				atom[count].setSymbol(atmXML[k].getAttribute("symbol"));
				atom[count].setCharge(atmXML[k].getAttribute("charge"));
				atom[count].setChargeCount(atmXML[k].getAttribute("chargeCount"));
				atom[count].setElectroNegativity(atmXML[k].getAttribute("electroNegativity"));
				atom[count].setIsotopeLabel(atmXML[k].getAttribute("isotopeLabel"));
				atom[count].setBlock(atmXML[k].getAttribute("block"));
				atom[count].setHybridization(atmXML[k].getAttribute("hybridization"));
				atom[count].setPartCharge(atmXML[k].getAttribute("partcharge"));
				atom[count].setPartChargeVal(atmXML[k].getAttribute("partChargeVal"));
				var elecXML = atmXML[k].getElementsByTagName('electronLink');
				var part_charge=0;
				for(var l=0;l<elecXML.length;l++)
				{
					var elink = new ElectronLink();
					id = 's'+len+'-'+j+'-a'+k+'e'+l;
					ids[elecXML[l].getAttribute('id')]=id;					
					elink.setId(id);  
					var x1 = Number(elecXML[l].getAttribute('x1'));
					var x2 = Number(elecXML[l].getAttribute('x2'));
					var y1 = Number(elecXML[l].getAttribute('y1'));
					var y2 = Number(elecXML[l].getAttribute('y2'));
					x1 -= x_diff;
					x2 -= x_diff;
					y1 -= y_diff;
					y2 -= y_diff;
					elink.setX1(x1.toFixed(2));
					elink.setX2(x2.toFixed(2));
					elink.setY1(y1.toFixed(2));
					elink.setY2(y2.toFixed(2));
					elink.setTitle(elecXML[l].getAttribute("title"));
					elink.setType(elecXML[l].getAttribute("type"));
					if(x1==x2&&y1==y2&&elecXML[l].getAttribute("electronStatus")=='bPair')
					{
						elink.setElectronStatus("uPair");
						elink.setPartCharge(0);
						elink.setPartChargeVal(0);
						elink.setCharge(0);
						elink.setChargeCount(0);
					}
					else
					{
						elink.setElectronStatus(elecXML[l].getAttribute("electronStatus"));
						elink.setCharge(elecXML[l].getAttribute("charge"));
						elink.setAffinity(elecXML[l].getAttribute("affinity"));
						elink.setChargeCount(elecXML[l].getAttribute("chargeCount"));
						elink.setBond(elecXML[l].getAttribute("bond"));
						elink.setBondType(elecXML[l].getAttribute("bondType"));
						elink.setOrder(elecXML[l].getAttribute("order"));
						elink.setLinkStatus(elecXML[l].getAttribute("linkStatus"));
						var id = elecXML[l].getAttribute("target").split('-');
						if(id.length>2)
						{
							id[0] = id[0].slice(1);
							id[0] = Number(id[0])-1;
							if(point1.x!=0)
								id[0] = 's'+len;
							else
								id[0] = 's'+id[0];
							id[1] = Number(id[1])-1;
							id[1] = id[1];
							var eid = id[2];
							var e_index = id[2].indexOf('e');
							id[2] = id[2].slice(1,e_index);
							id[2] = Number(id[2])-1;
							id[2] = 'a'+id[2];
							var eid = eid.slice(e_index+1);
							eid = Number(eid)-1;
							eid = 'e'+eid;
							id = id[0]+'-'+id[1]+'-'+id[2]+eid;
						}
						else
							id = elecXML[l].getAttribute("target");
						elink.setTarget(id);
						elink.setOrientation(elecXML[l].getAttribute("orientation"));
						elink.setProjection(elecXML[l].getAttribute("projection"));
						elink.setPriority(elecXML[l].getAttribute("priority"));
						elink.setGcCode(elecXML[l].getAttribute("gcCode"));
						elink.setPartCharge(elecXML[l].getAttribute("partcharge"));
						elink.setPartChargeVal(elecXML[l].getAttribute("partChargeVal"));
					}					
					var chrg = elink.getPartCharge();
					var val = elink.getPartChargeVal();
					var txt = chrg+val;
					part_charge += Number(txt);
					atom[count].setElectronLink(elink);	
				}
				if(part_charge<0)
				{
					atom[count].setPartCharge('-');
					atom[count].setPartChargeVal(Math.abs(part_charge).toFixed(2));
				}
				else if(set_charge>0)
				{
					atom[count].setPartCharge('+');
					atom[count].setPartChargeVal(Math.abs(set_charge).toFixed(2));
				}
				else
				{
					atom[count].setPartCharge(0);
					atom[count].setPartChargeVal(0);
				}
				fragment[frg_count].setAtom(atom[count++]);
			}
			structure[len].setFragment(fragment[frg_count++]);
		}
	}
	if(point1.x==0)
		var itrXML = openXML.getElementsByTagName('interaction');
	else
		var itrXML = templateXML.getElementsByTagName('interaction');
	for(var i=0;i<itrXML.length;i++)
	{
		structure.push(new Interact());
		len = structure.length-1;
		structure[len].setId(itrXML[i].getAttribute('id'));
		structure[len].setX1(itrXML[i].getAttribute("x1"));
		structure[len].setX2(itrXML[i].getAttribute("x2"));
		structure[len].setY1(itrXML[i].getAttribute("y1"));
		structure[len].setY2(itrXML[i].getAttribute("y2"));
		structure[len].setTitle(itrXML[i].getAttribute("title"));
		structure[len].setType(itrXML[i].getAttribute("type"));
		structure[len].setSourceObject(itrXML[i].getAttribute("sourceObject"));
		structure[len].setTargetObject(itrXML[i].getAttribute("targetObject"));
		structure[len].setSourceId(ids[itrXML[i].getAttribute("sourceId")]);
		structure[len].setTargetId(ids[itrXML[i].getAttribute("targetId")]);
		
	}
	count = old_count;
	if(point1.x==0)
		draw_structure();
	else
		draw_template(point1);
  }
  function draw_structure()
 {
	count = 0;l_count = 0;
	var lineSkip = [];var l_adjust = 2.7;
	for(var i=0;i<structure.length;i++)
	{
		if(typeof(structure[i].getFragmentVector)!='function')
		{
			var x1 = structure[i].getX1();
			var x2 = structure[i].getX2();
			var y1 = structure[i].getY1();
			var y2 = structure[i].getY2();
			var point1 = {x:Number(x1),y:Number(y1)};
			var point2 = {x:Number(x2),y:Number(y2)};
			var line = document.createElementNS(svgNS,'line');
			line.id = "itl["+itl_count+"]";
			
			var src = structure[i].getTargetId().split('-');
			var src_i = Number(src[0].substring(1,src[0].length));
			var src_j = Number(src[1]);
			var src_k = Number(src[2].substring(1,src[2].indexOf('e')));
			var src_symbol = structure[src_i].getFragmentVector()[src_j].getAtomVector()[src_k].getSymbol();
			var c_adjust1 = src_symbol.length-1;
			
			var tgt = structure[i].getTargetId().split('-');
			var tgt_i = Number(tgt[0].substring(1,tgt[0].length));
			var tgt_j = Number(tgt[1]);
			var tgt_k = Number(tgt[2].substring(1,tgt[2].indexOf('e')));
			var tgt_symbol = structure[tgt_i].getFragmentVector()[tgt_j].getAtomVector()[tgt_k].getSymbol();
			var c_adjust2 = tgt_symbol.length-1;
			
			line.setAttribute('x1',Number(point1.x)+l_adjust+c_adjust1);
			line.setAttribute('y1',Number(point1.y)-l_adjust);
			line.setAttribute('x2',Number(point2.x)+l_adjust+c_adjust2);
			line.setAttribute('y2',Number(point2.y)-l_adjust);
			line.setAttribute('stroke-dasharray','1,1');
			line.setAttribute('d','M5 20 l215 0');
			line.setAttribute('stroke-width',0.75);
			line.setAttribute('c_adjust1',c_adjust1);
			line.setAttribute('c_adjust2',c_adjust2);
			itl_count++;
			var type = structure[i].getType();
			if(type=='ion-ion')
				line.setAttribute('stroke','Aqua');
			else if(type=='ion-dipole')
				line.setAttribute('stroke','lime');
			else if(type=='dipole-dipole')
				line.setAttribute('stroke','rgb(255, 102, 0)');
			else if(type=='HBond')
				line.setAttribute('stroke','Fuchsia');
			svg.appendChild(line);
		}
	}
	for(var i=0;i<structure.length;i++)
	{
		if(typeof(structure[i].getFragmentVector)=='function')
		{
			var frg_vector = structure[i].getFragmentVector();
			for(var j=0;j<frg_vector.length;j++)
			{
				var atm_vector = frg_vector[j].getAtomVector();
				for(var k=0;k<atm_vector.length;k++)
				{
					var point = {x:Number(atm_vector[k].getX()),y:Number(atm_vector[k].getY())};
					if(point.x==0&&point.y==0)
						continue;
					var elec_vector = atm_vector[k].getElectronLinkVector();
					var dist = -1.5;var bond_flag = false;var visibility_flag = 'hidden';var bond_db_tri = [];
					for(var l=0;l<elec_vector.length;l++)
					{
						var e_id = elec_vector[l].getId();
						if(typeof(lineSkip[e_id])!='undefined')
						{
							continue;
						}
						if(elec_vector[l].getElectronStatus()=='uPair'||elec_vector[l].getElectronStatus()=='lPair'||elec_vector[l].getElectronStatus()=='vacant')
							visibility_flag='visible';
						var bond = elec_vector[l].getOrder();
						var x1 = elec_vector[l].getX1();
						var x2 = elec_vector[l].getX2();
						var y1 = elec_vector[l].getY1();
						var y2 = elec_vector[l].getY2();
						if(x1==x2&&y1==y2)
							continue;
						var c_adjust1 = atm_vector[k].getSymbol().length-1;
						var point1 = {x:Number(x1),y:Number(y1)};point1.x += c_adjust1;
						
						var tgt = elec_vector[l].getTarget().split('-');
						var tgt_i = Number(tgt[0].substring(1,tgt[0].length));
						var tgt_j = Number(tgt[1]);
						var tgt_k = Number(tgt[2].substring(1,tgt[2].indexOf('e')));
						var tgt_symbol = structure[tgt_i].getFragmentVector()[tgt_j].getAtomVector()[tgt_k].getSymbol();
						var tgt_id = elec_vector[l].getTarget().split('e');
						var c_adjust2 = tgt_symbol.length-1;
						
						var point2 = {x:Number(x2),y:Number(y2)};point2.x += c_adjust2;
						var ord = elec_vector[l].getBond();
						if(typeof(bond_db_tri[tgt_id[0]])!='undefined')
						{
							var rad = Math.atan2(point1.y-point2.y,point1.x-point2.x) - Math.PI/2;
							dist = dist*Number(bond_db_tri[tgt_id[0]]);
							point1.x = point1.x - dist*Math.cos(rad);
							point1.y = point1.y - dist*Math.sin(rad);
							point2.x = point2.x - dist*Math.cos(rad);
							point2.y = point2.y - dist*Math.sin(rad);
							bond_db_tri[tgt_id[0]]=Number(bond_db_tri[tgt_id[0]])*-1;
						}
						else
						{
							bond_db_tri[tgt_id[0]] = 1;
						}
						var line_id = drawLine(point1,point2,l_adjust);
						var str_id = 's'+i;
						document.getElementById(line_id).setAttribute('str_id',str_id);
						var t_id = elec_vector[l].getTarget();
						lineSkip[t_id]=true;
						if(bond=='double'||bond=='triple')
							bond_flag=true;
					}
					symbol = atm_vector[k].getSymbol();
					if(atm_vector.length>1)
					{
						var obj = drawAtom(point,j+1);
						obj.setAttribute('str_id',str_id);
						if(obj.childNodes[1].childNodes[0].nodeValue=="C"&&visibility_flag=='hidden')
						{
							obj.style.visibility = "hidden";
							obj.childNodes[1].setAttribute('fill','black');
						}
						else if(visibility_flag=='hidden')
						{
							obj.childNodes[1].setAttribute('fill','black');
						}
						svg.appendChild(obj);
					}					
					else
					{
						var obj = drawAtom(point,'');
						obj.setAttribute('str_id',str_id);
						if(obj.childNodes[1].childNodes[0].nodeValue=="C"&&visibility_flag=='hidden')
						{
							obj.style.visibility = "hidden";
							obj.childNodes[1].setAttribute('fill','black');
						}
						else if(visibility_flag=='hidden')
						{
							obj.childNodes[1].setAttribute('fill','black');
						}				
						svg.appendChild(obj);
					}
					count++;
				}			
			}
		}
	}
	initial_state = copyStructure();
	set_line_ids();
	set_itline_ids();
	drawChargeCount();
 }
 function draw_template(temp_pt1)
 {
	var lineSkip = [];var l_adjust=2.7;
	var frg_vector = structure[structure.length-1].getFragmentVector();
	var diff_flag=false;var x_diff,y_diff;
	for(var j=0;j<frg_vector.length;j++)
	{
		var atm_vector = frg_vector[j].getAtomVector();
		for(var k=0;k<atm_vector.length;k++)
		{
			var x = Number(atm_vector[k].getX());
			var y = Number(atm_vector[k].getY())
			if(diff_flag==false)
			{
				x_diff = Number(x-temp_pt1.x);
				y_diff = Number(y-temp_pt1.y);
				diff_flag=true;
			}			
			var point = {x:Number(x-x_diff),y:Number(y-y_diff)};
			if(point.x==0&&point.y==0)
				continue;
			var elec_vector = atm_vector[k].getElectronLinkVector();
			var dist = -1.5;var bond_flag = false;var visibility_flag = 'hidden';var bond_db_tri = [];
			for(var l=0;l<elec_vector.length;l++)
			{
				var e_id = elec_vector[l].getId();
				if(typeof(lineSkip[e_id])!='undefined')
				{
					continue;
				}					
				var bond = elec_vector[l].getOrder();
				if(elec_vector[l].getElectronStatus()=='uPair'||elec_vector[l].getElectronStatus()=='lPair'||elec_vector[l].getElectronStatus()=='vacant')
					visibility_flag='visible';
				var x1 = elec_vector[l].getX1();
				var x2 = elec_vector[l].getX2();
				var y1 = elec_vector[l].getY1();
				var y2 = elec_vector[l].getY2();
				if(x1==x2&&y1==y2)
					continue;
				var c_adjust1 = atm_vector[k].getSymbol().length-1;
				var point1 = {x:Number(x1-x_diff),y:Number(y1-y_diff)};point1.x += c_adjust1;
				
				var tgt = elec_vector[l].getTarget().split('-');
				var tgt_j = Number(tgt[1]);
				var tgt_k = Number(tgt[2].substring(1,tgt[2].indexOf('e')));
				var tgt_symbol = frg_vector[tgt_j].getAtomVector()[tgt_k].getSymbol();
				var tgt_id = elec_vector[l].getTarget().split('e');
				var c_adjust2 = tgt_symbol.length-1;
						
				var point2 = {x:Number(x2-x_diff),y:Number(y2-y_diff)};point2.x += c_adjust2;
				var ord = elec_vector[l].getBond();
				if(typeof(bond_db_tri[tgt_id[0]])!='undefined')
				{
					var rad = Math.atan2(point1.y-point2.y,point1.x-point2.x) - Math.PI/2;
					dist = dist*Number(bond_db_tri[tgt_id[0]]);
					point1.x = point1.x - dist*Math.cos(rad);
					point1.y = point1.y - dist*Math.sin(rad);
					point2.x = point2.x - dist*Math.cos(rad);
					point2.y = point2.y - dist*Math.sin(rad);
					bond_db_tri[tgt_id[0]]=Number(bond_db_tri[tgt_id[0]])*-1;
				}
				else
				{
					bond_db_tri[tgt_id[0]] = 1;
				}			
				var line_id = drawLine(point1,point2,l_adjust);
				var str_id = 's'+(structure.length-1);
				document.getElementById(line_id).setAttribute('str_id',str_id);
				var t_id = elec_vector[l].getTarget();
				lineSkip[t_id]=true;
				if(bond=='double'||bond=='triple')
					bond_flag=true;
			}
			symbol = atm_vector[k].getSymbol();
			if(atm_vector.length>1)
			{
				var obj = drawAtom(point,j+1);
				obj.setAttribute('str_id',str_id);
				if(obj.childNodes[1].childNodes[0].nodeValue=="C"&&visibility_flag=='hidden')
				{
					obj.style.visibility = "hidden";
					obj.childNodes[1].setAttribute('fill','black');
				}
				else if(visibility_flag=='hidden')
				{
					obj.childNodes[1].setAttribute('fill','black');
				}
				svg.appendChild(obj);
			}					
			else
			{
				var obj = drawAtom(point,'');
				obj.setAttribute('str_id',str_id);
				if(obj.childNodes[1].childNodes[0].nodeValue=="C"&&visibility_flag=='hidden')
				{
					obj.style.visibility = "hidden";
					obj.childNodes[1].setAttribute('fill','black');
				}
				else if(visibility_flag=='hidden')
				{
					obj.childNodes[1].setAttribute('fill','black');
				}				
				svg.appendChild(obj);
			}
			count++;
		}
	}
	set_line_ids();
	drawChargeCount();
 }
 function set_line_ids()
 {
	var l_adjust=2.7;
	for(var i=0;i<l_count;i++)
	{
		var id = "l["+i+"]";
		var obj =  document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.hasAttribute('id1')==true)
			continue;
		var x1 = Number(obj.getAttribute('x1')) - l_adjust;
		var y1 = Number(obj.getAttribute('y1')) + l_adjust;
		var x2 = Number(obj.getAttribute('x2')) - l_adjust;
		var y2 = Number(obj.getAttribute('y2')) + l_adjust;
		var cd = collisionDetect(x1,y1);var dist = 1.5;
		if(cd==-1)
		{
			var rad = Math.atan2(y1-y2,x1-x2) - Math.PI/2;
			x1 = x1 - dist*Math.cos(rad);
			y1 = y1 - dist*Math.sin(rad);
			x2 = x2 - dist*Math.cos(rad);
			y2 = y2 - dist*Math.sin(rad);
			cd = collisionDetect(x1,y1);			
			if(cd==-1)
			{
				dist = -3;
				var rad = Math.atan2(y1-y2,x1-x2) - Math.PI/2;
				x1 = x1 - dist*Math.cos(rad);
				y1 = y1 - dist*Math.sin(rad);
				x2 = x2 - dist*Math.cos(rad);
				y2 = y2 - dist*Math.sin(rad);
				cd = collisionDetect(x1,y1);
			}
		}
		var id1 = "g["+cd+"]";
		obj.setAttribute('id1',id1);
		var id2 = "g["+collisionDetect(x2,y2)+"]";
		obj.setAttribute('id2',id2);
	}
 }
  function set_itline_ids()
 {
	for(var i=0;i<itl_count;i++)
	{
		var id = "itl["+i+"]";var l_adjust=2.7;var c_adjust1=0;var c_adjust2=0;
		var obj =  document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.hasAttribute('id1')==true)
			continue;
		if(obj.hasAttribute('c_adjust1')==true)
			c_adjust1 = Number(obj.getAttribute('c_adjust1'));
		if(obj.hasAttribute('c_adjust2')==true)
			c_adjust2 = Number(obj.getAttribute('c_adjust2'));
		var x1 = Number(obj.getAttribute('x1')) - l_adjust - c_adjust1;
		var y1 = Number(obj.getAttribute('y1')) + l_adjust;
		var x2 = Number(obj.getAttribute('x2')) - l_adjust - c_adjust2;
		var y2 = Number(obj.getAttribute('y2')) + l_adjust;
		var str_id1 = getStructureId(collisionDetect(x1,y1));
		var id1 = "g["+str_id1.k+"]";var s_id1 = 's'+str_id1.i;
		obj.setAttribute('id1',id1);
		obj.setAttribute('str_id1',s_id1);
		var str_id2 = getStructureId(collisionDetect(x2,y2));
		var id2 = "g["+str_id2.k+"]";var s_id2 = 's'+str_id2.i;
		obj.setAttribute('id2',id2);
		obj.setAttribute('str_id2',s_id2);
	}
 }
 function minXminY()
 {
	var svg_elm = document.getElementById('mySvg');
	var minx = 100000; var miny = 100000;var maxx = 0; var maxy = 0;
	for(var i=0;i<count;i++)
	{
		var id = "c["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('cx'));
			var y = Number(elem.getAttribute('cy'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
		var id = "t["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x'));
			var y = Number(elem.getAttribute('y'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
		var id = "at["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x'));
			var y = Number(elem.getAttribute('y'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
		var id = "at1["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x'));
			var y = Number(elem.getAttribute('y'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
		var id = "at2["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x'));
			var y = Number(elem.getAttribute('y'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
	}
	for(var i=0;i<l_count;i++)
	{
		var id = "l["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x1'));
			var y = Number(elem.getAttribute('y1'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
			var x = Number(elem.getAttribute('x2'));
			var y = Number(elem.getAttribute('y2'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
	}
	for(var i=0;i<itl_count;i++)
	{
		var id = "itl["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x1'));
			var y = Number(elem.getAttribute('y1'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
			var x = Number(elem.getAttribute('x2'));
			var y = Number(elem.getAttribute('y2'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
	}
	for(var i=0;i<arrow_count;i++)
	{
		var id = "arw_st["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x1'));
			var y = Number(elem.getAttribute('y1'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
			var x = Number(elem.getAttribute('x2'));
			var y = Number(elem.getAttribute('y2'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
		var id = "arw_up["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x1'));
			var y = Number(elem.getAttribute('y1'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
			var x = Number(elem.getAttribute('x2'));
			var y = Number(elem.getAttribute('y2'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
		var id = "arw_bw["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x1'));
			var y = Number(elem.getAttribute('y1'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
			var x = Number(elem.getAttribute('x2'));
			var y = Number(elem.getAttribute('y2'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
	}
	for(var i=0;i<rev_arrow_count;i++)
	{
		var id = "rarw_st1["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x1'));
			var y = Number(elem.getAttribute('y1'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
			var x = Number(elem.getAttribute('x2'));
			var y = Number(elem.getAttribute('y2'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
		var id = "rarw_up["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x1'));
			var y = Number(elem.getAttribute('y1'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
			var x = Number(elem.getAttribute('x2'));
			var y = Number(elem.getAttribute('y2'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
		var id = "rarw_st2["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x1'));
			var y = Number(elem.getAttribute('y1'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
			var x = Number(elem.getAttribute('x2'));
			var y = Number(elem.getAttribute('y2'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
		var id = "rarw_bw["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x1'));
			var y = Number(elem.getAttribute('y1'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
			var x = Number(elem.getAttribute('x2'));
			var y = Number(elem.getAttribute('y2'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
	}
	for(var i=0;i<capt_count;i++)
	{
		var id = "capt["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x'));
			var y = Number(elem.getAttribute('y'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
	}
	for(var i=0;i<sign_count;i++)
	{
		var id = "sign["+i+"]";
		var elem = document.getElementById(id);
		if(elem!=null)
		{
			var x = Number(elem.getAttribute('x'));
			var y = Number(elem.getAttribute('y'));
			if(x<minx)
				minx = x;
			if(x>maxx)
				maxx = x;
			if(y<miny)
				miny = y;
			if(y>maxy)
				maxy = y;
		}
	}
	return {minx:minx,miny:miny,maxx:maxx,maxy:maxy};
 }