function line(event)
  {
	e = event;
	if(event.which==3)
		return;
	pt.x = event.clientX + clientXchange; pt.y = event.clientY + clientYchange;
	var a = svg.getScreenCTM();
    var b = a.inverse();
    var point = pt.matrixTransform(b);
	pt1.x=point.x;
	pt1.y=point.y;
	stack_check();
	if(skeletonFlag==false)
	{
		pt1=drawMousePoint(event,true,false,bondCount);
		if(pt1==0)
			{
				clear();
				return;
			}
		if(pt1.collision==false)
		{
			var id = pt1.g_id;
			var arr=new Array();
			arr.push(id);
			undo_stack.push(arr);
			var toPush = copyStructure(structure);
			undo_stack_jsobj.push(toPush);
		}
	}
	
	
	
	animline.style.visibility = "hidden";
	document.getElementById("s_content").addEventListener('mouseup',msup);
	document.getElementById("s_content").addEventListener('mousemove',msmove);
  }
 function msmove(event)
 {	
	mousemove=true;
	lineAnimation(event);
	document.getElementById("s_content").addEventListener('mouseup',msup);	
 }
 
 function msup(event)
		{			
			if(pt1.collision==true)
			{
				pt2 = jsObjCollisionDetect(event,0);
				if(pt2.collision==true&&round(pt1.x)==round(pt2.x)&&round(pt1.y)==round(pt2.y))
				{
					atom_replace(pt1);
					clear();
					return;
				}
			}
			if(pt1==0||pt1.uPair==0)
			{
				clear();
				return;
			}
			pt.x = event.clientX + clientXchange; pt.y = event.clientY + clientYchange;// -4 && 15 to center the drawn text on mouse pointer
			var a = svg.getScreenCTM();
			var b = a.inverse();
			var point = pt.matrixTransform(b);
			var pt2={x:0,y:0,id:'', g_id:'',str_id:'',frg_id:'',atm_id:'',xml_id:'',collision:false,uPair:2};
			pt2.x=point.x;
			pt2.y=point.y;
			var theta=degree(pt1,pt2);
			theta=returnDegreeRange(theta);
			pt2.x=pt1.x-bondDistance*cos(theta);
			pt2.y=pt1.y-bondDistance*sin(theta);
			var col_id = collisionDetectAtomIndex(pt2.x,pt2.y);
			if(col_id!=-1)
			{
				pt2.x = atom[col_id].getX();
				pt2.y = atom[col_id].getY();
				pt2.atm_id = col_id;
				pt2.xml_id = getStructureId(col_id);
				pt2.frg_id = pt2.xml_id.frgIndex;
				pt2.collision = true;
				var g_col_id = collisionDetect(pt2.x,pt2.y);
				pt2.g_id = "g["+g_col_id+"]";
				pt2.id = "t["+g_col_id+"]";
				pt2.x = Number(document.getElementById(pt2.id).getAttribute('x'));
				pt2.y = Number(document.getElementById(pt2.id).getAttribute('y'));
				pt2.uPair = uPairCount(pt2)+lPairCount(pt2);
				pt2.str_id = "s"+pt2.xml_id.i;
			}
			mousemove=false;
			if(skeletonFlag==false)
			{
				if(col_id==-1)
				{
					pt2=drawMousePoint(event,false,false,bondCount);
				}			
				if(pt2==0||pt1.id==pt2.id||pt2.uPair==0)
				{
					clear();
					return;
				}
				if(pt2.collision==true&&symbol!=document.getElementById(pt2.g_id).childNodes[1].childNodes[0].nodeValue)
				{
					clear();
					return;
				}
				if(curStrId!=pt2.str_id||symbol!=document.getElementById(pt2.g_id).childNodes[1].childNodes[0].nodeValue)
					var pt2=drawMousePoint(event,false,true,bondCount);
			}
			var bond_type = check_bond_type(pt1,pt2);
			if(bond_type==0)
			{
				clear();
				if(pt2.collision==false)
				{
					atom.pop();
					fragment.pop();
					structure[pt2.xml_id.i].getFragmentVector().pop();
					count--;
					frg_count--;
					svg.removeChild(document.getElementById(pt2.g_id));
				}
				return;
			}
			var l_id = "l["+l_count+"]";
			var arr=new Array();
			arr.push(l_id);
			if(pt1.collision==false&&skeletonFlag==false)
			{
				undo_stack.pop();
				undo_stack_jsobj.pop();
				arr.push(pt1.g_id);
			}
			if(pt1.collision==false&&skeletonFlag==true)
			{
				arr.push(pt1.g_id);
			}
			if(pt2.collision==false)
			{
				arr.push(pt2.g_id);
			}
			for(var i=0;i<bondCount;i++)
			{
			pt1.uPair = pt1.uPair - 1;
			pt2.uPair = pt2.uPair - 1;
			var obj1=document.getElementById(pt1.g_id);
			var obj2=document.getElementById(pt2.g_id);
			var overlap = false;

			var line = document.createElementNS(svgNS,'line');
			line.id = "l["+l_count+"]";			
			var l_adjust=2.7;
			var c_adjust = obj1.childNodes[1].childNodes[0].nodeValue.length-1;
			pt1.x=Number(pt1.x)+l_adjust+c_adjust;
			var c_adjust = obj2.childNodes[1].childNodes[0].nodeValue.length-1;
			pt2.x=Number(pt2.x)+l_adjust+c_adjust;
			pt1.y=Number(pt1.y)-l_adjust;
			pt2.y=Number(pt2.y)-l_adjust;
			var theta=degree(pt1,pt2);
			theta=returnDegreeRange(theta);
			if(pt2.collision==false)
			{
				pt2.x=pt1.x-bondDistance*cos(theta);
				pt2.y=pt1.y-bondDistance*sin(theta);
			}	
			if(pt2.collision==true||bondCount>1)
			{
				overlap = lineOverlap(pt1,pt2);
				var temp_overlap=overlap;
				var upair_count1 = uPairCount(pt1);
				var lpair_count1 = lPairCount(pt1);
				var vacant_count1 = vacantCount(pt1);
				var vacant_dcount1 = vacantdCount(pt1);
				var upair_count2 = uPairCount(pt2);
				var lpair_count2 = lPairCount(pt2);
				var vacant_count2 = vacantCount(pt2);
				var vacant_dcount2 = vacantdCount(pt2);
				if(upair_count1==0&&lpair_count1==0&&vacant_dcount1==0||upair_count2==0&&lpair_count2==0&&vacant_dcount2==0||bond_type.bond=='ligand')
				{
					//console.log(bond_type.bond);
					clear();
					return;
				}
				if(overlap==true)
				{
					var rad = Math.atan2(pt1.y-pt2.y,pt1.x-pt2.x) - Math.PI/2;
					var dist = 1.5;
					pt1.x = pt1.x - dist*Math.cos(rad);
					pt1.y = pt1.y - dist*Math.sin(rad);
					pt2.x = pt2.x - dist*Math.cos(rad);
					pt2.y = pt2.y - dist*Math.sin(rad);
					overlap = lineOverlap(pt1,pt2);
					bond = 'double';
				}
				if(overlap==true)
				{
					var rad = Math.atan2(pt1.y-pt2.y,pt1.x-pt2.x) + Math.PI/2;
					var dist = 3;
					pt1.x = pt1.x - dist*Math.cos(rad);
					pt1.y = pt1.y - dist*Math.sin(rad);
					pt2.x = pt2.x - dist*Math.cos(rad);
					pt2.y = pt2.y - dist*Math.sin(rad);
					overlap = lineOverlap(pt1,pt2);
					bond = 'triple';
				}				
				if(overlap==true)
				{
					Alert.render("Bond Overlap not possible");
					undo_stack.push(arr);
					var toPush = copyStructure(structure);
					undo_stack_jsobj.push(toPush);
					clear();
					return;
				}
				overlap=temp_overlap;
				/* if(bond=='triple'&&(upair_count1==0||upair_count2==0))
				{
					clear();
					return;
				} */
			}
			pt1.theta=theta;
			if(theta<180)
				pt2.theta=theta+180;
			else
				pt2.theta=theta-180;

			if((skeletonFlag==true||msup_flag==true)&&i>0)
			{
				arr.push(line.id);
				console.log(arr);
			}
			pt1.x = Number(pt1.x);
			pt2.x = Number(pt2.x);
			pt1.y = Number(pt1.y);
			pt2.y = Number(pt2.y);
			line.setAttribute('id1',pt1.g_id);
			line.setAttribute('id2',pt2.g_id);
			line.setAttribute('str_id',curStrId);
			line.setAttribute('x1',pt1.x);
			line.setAttribute('y1',pt1.y);
			line.setAttribute('x2',pt2.x);
			line.setAttribute('y2',pt2.y);
			line.setAttribute('stroke-linecap','round');
			line.setAttribute('stroke','rgb(0,0,0)');
			line.setAttribute('stroke-width',0.75);	
			if(overlap==false)
			{
			children=obj2.childNodes;
			var c_adjust = children[1].childNodes[0].nodeValue.length-1;
			children[0].setAttribute('cx',pt2.x);
			children[0].setAttribute('cy',pt2.y);
			children[1].setAttribute('x',pt2.x-l_adjust-c_adjust);
			children[1].setAttribute('y',pt2.y+l_adjust);	
			children[2].setAttribute('x',pt2.x-l_adjust-l_adjust-c_adjust);
			children[2].setAttribute('y',pt2.y);
			children[3].setAttribute('x',pt2.x+l_adjust-c_adjust);
			children[3].setAttribute('y',pt2.y-l_adjust);
			children[4].setAttribute('x',pt2.x-2*l_adjust+1-c_adjust);
			children[4].setAttribute('y',pt2.y-2*l_adjust-1);
			}
			/* if(pt1.uPair==0)
				obj1.childNodes[1].setAttribute('fill','black');
			if(pt2.uPair==0)
				obj2.childNodes[1].setAttribute('fill','black'); */
			svg.removeChild(obj1);
			svg.removeChild(obj2);
			
			svg.appendChild(line);
			svg.appendChild(obj1);
			svg.appendChild(obj2);			
			
			l_count++;
			
			pt1.x=Number(obj1.childNodes[1].getAttribute('x'));
			pt2.x=Number(obj2.childNodes[1].getAttribute('x'));
			pt1.y=Number(obj1.childNodes[1].getAttribute('y'));
			pt2.y=Number(obj2.childNodes[1].getAttribute('y'));
			
			var eId1=electronLinkSet(pt1,pt2,obj1);
			
			fragment[pt2.frg_id].setX1(pt1.x.toFixed(2));
			fragment[pt2.frg_id].setX2(pt2.x.toFixed(2));
			fragment[pt2.frg_id].setY1(pt1.y.toFixed(2));
			fragment[pt2.frg_id].setY2(pt2.y.toFixed(2));
			fragment[pt2.frg_id].setOrientation(pt1.theta);
			
			atom[pt2.atm_id].setX(pt2.x.toFixed(2));
			atom[pt2.atm_id].setY(pt2.y.toFixed(2));
			
			var eId2=electronLinkSet(pt2,pt1,obj2);
			
			var ElectronLinkVector=atom[pt1.atm_id].getElectronLinkVector();
			var id = 's'+(pt2.xml_id.i)+'-'+(pt2.xml_id.j)+'-a'+(pt2.xml_id.k)+'e'+(eId2);
			ElectronLinkVector[eId1].setTarget(id);
			set_charge(pt1.atm_id);
		
			var ElectronLinkVector=atom[pt2.atm_id].getElectronLinkVector();
			var id = 's'+(pt1.xml_id.i)+'-'+(pt1.xml_id.j)+'-a'+(pt1.xml_id.k)+'e'+(eId1);
			ElectronLinkVector[eId2].setTarget(id);
			ElectronLinkVector[eId2].setLinkStatus('linkSource');
			set_charge(pt2.atm_id);
			bond ='single';
		}
		if(msup_flag==true)
		{
			bondCount = 1;
			msup_flag = false;
		}
		undo_stack.push(arr);
		var toPush = copyStructure(structure);
		undo_stack_jsobj.push(toPush);
		clear();
}
function bond_skeleton_msdown(event)
{
	e = event;
	if(event.which==3)
		return;
	stack_check();
	pt1=jsObjCollisionDetect(e,0);
	if(pt1==0||pt1.collision==false)
	{
		clear();
		return;
	}
	animline.style.visibility = "hidden";
	document.getElementById("s_content").addEventListener('mouseup',bond_skeleton_msup);
	document.getElementById("s_content").addEventListener('mousemove',bond_skeleton_msmove);
}
function bond_skeleton_msmove(event)
{
	lineAnimation(event);
	document.getElementById("s_content").addEventListener('mouseup',bond_skeleton_msup);	
}
function bond_skeleton_msup(event)
{
	var arr=new Array();
	var pt2=jsObjCollisionDetect(event,0);
	if(pt2==0||pt2.collision==false)
	{
		clear();
		return;
	}
	var break_flag = false;
	var tgt_id1 = 's'+pt1.xml_id.i+'-'+pt1.xml_id.j+'-a'+pt1.xml_id.k;
	var tgt_id2 = 's'+pt2.xml_id.i+'-'+pt2.xml_id.j+'-a'+pt2.xml_id.k;
	var elec_vector = atom[pt2.atm_id].getElectronLinkVector();
	for(var i=0;i<elec_vector.length;i++)
	{
		var tgt = elec_vector[i].getTarget().split('e')[0];
		if(tgt==tgt_id1&&elec_vector[i].getBondType()=='Coordinate')
		{
			clear();
			return;
		}
		if(tgt==tgt_id1)
			break_flag=true;
	}
	if(break_flag==false)
	{
		clear();
		return;
	}
	if(bondCount==1)
	{
		var elec_vector = atom[pt1.atm_id].getElectronLinkVector();
		for(var i=0;i<elec_vector.length;i++)
		{
			var tgt = elec_vector[i].getTarget();
			var bnd = elec_vector[i].getBond();
			var odr = elec_vector[i].getOrder();
			if(tgt.split('e')[0]==tgt_id2&&bnd.indexOf('pi')!=-1&&(odr=='double'||odr=='triple'))
			{
				clearBond(elec_vector[i]);
			}
			else if(tgt.split('e')[0]==tgt_id2&&bnd=='sigma'&&(odr=='double'||odr=='triple'))
			{
				elec_vector[i].setOrder('single');
			}
		}
		var elec_vector = atom[pt2.atm_id].getElectronLinkVector();
		for(var i=0;i<elec_vector.length;i++)
		{
			var tgt = elec_vector[i].getTarget();
			var bnd = elec_vector[i].getBond();
			var odr = elec_vector[i].getOrder();
			if(tgt.split('e')[0]==tgt_id1&&bnd.indexOf('pi')!=-1&&(odr=='double'||odr=='triple'))
			{
				clearBond(elec_vector[i]);
			}
			else if(tgt.split('e')[0]==tgt_id1&&bnd=='sigma'&&(odr=='double'||odr=='triple'))
			{
				elec_vector[i].setOrder('single');
			}
		}
		for(var i=0;i<l_count;i++)
		{
			var id ="l["+i+"]";
			var obj = document.getElementById(id);
			if(obj==null)
				continue;
			var id1 = obj.getAttribute("id1");
			var id2 = obj.getAttribute("id2");
			if(((id1==pt1.g_id)&&(id2==pt2.g_id))||((id1==pt2.g_id)&&(id2==pt1.g_id)))
			{
				var obj1 = document.getElementById(id1);
				var obj2 = document.getElementById(id2);
				var x1 = Number(obj1.childNodes[0].getAttribute('cx'));
				var x2 = Number(obj2.childNodes[0].getAttribute('cx'));
				var y1 = Number(obj1.childNodes[0].getAttribute('cy'));
				var y2 = Number(obj2.childNodes[0].getAttribute('cy'));
				var l_x1 = Number(obj.getAttribute('x1'));
				var l_x2 = Number(obj.getAttribute('x2'));
				var l_y1 = Number(obj.getAttribute('y1'));
				var l_y2 = Number(obj.getAttribute('y2'));
				if(x1!=l_x1||x2!=l_x2||y1!=l_y1||y2!=l_y2)
				{
					obj.setAttribute('skip','not skip');
					arr.push(obj);
					svg.removeChild(obj);
					obj1.childNodes[1].setAttribute('fill','red');
					obj2.childNodes[1].setAttribute('fill','red');
					obj1.style.visibility = 'visible';
					obj2.style.visibility = 'visible';
				}
			}			
		}
	}
	else if(bondCount==2)
	{
		var elec_vector = atom[pt1.atm_id].getElectronLinkVector();
		var clearBond_flag=false;var tri_db_flag = false;
		for(var i=0;i<elec_vector.length;i++)
		{
			var tgt = elec_vector[i].getTarget();
			var bnd = elec_vector[i].getBond();
			var odr = elec_vector[i].getOrder();
			if(tgt.split('e')[0]==tgt_id2&&bnd.indexOf('pi')!=-1&&(odr=='triple'))
			{
				if(clearBond_flag==true)
				{
					clearBond(elec_vector[i]);
					tri_db_flag = true;
				}					
				else
					elec_vector[i].setOrder('double');
				clearBond_flag = true;
			}
			else if(tgt.split('e')[0]==tgt_id2&&(odr=='double'))
			{
				tri_db_flag = true;
			}
			else if(tgt.split('e')[0]==tgt_id2&&bnd=='sigma'&&(odr=='triple'))
			{
				elec_vector[i].setOrder('double');
			}
		}
		var elec_vector = atom[pt2.atm_id].getElectronLinkVector();var clearBond_flag=false;
		for(var i=0;i<elec_vector.length;i++)
		{
			var tgt = elec_vector[i].getTarget();
			var bnd = elec_vector[i].getBond();
			var odr = elec_vector[i].getOrder();
			if(tgt.split('e')[0]==tgt_id1&&bnd.indexOf('pi')!=-1&&(odr=='triple'))
			{
				if(clearBond_flag==true)
					clearBond(elec_vector[i]);
				else
					elec_vector[i].setOrder('double');
				clearBond_flag = true;				
			}
			else if(tgt.split('e')[0]==tgt_id1&&bnd=='sigma'&&(odr=='triple'))
			{
				elec_vector[i].setOrder('double');
			}
		}
		var clearBond_flag=false;
		for(var i=0;i<l_count;i++)
		{
			var id ="l["+i+"]";
			var obj = document.getElementById(id);
			if(obj==null)
				continue;
			var id1 = obj.getAttribute("id1");
			var id2 = obj.getAttribute("id2");
			if(((id1==pt1.g_id)&&(id2==pt2.g_id))||((id1==pt2.g_id)&&(id2==pt1.g_id)))
			{
				var obj1 = document.getElementById(id1);
				var obj2 = document.getElementById(id2);
				var x1 = Number(obj1.childNodes[0].getAttribute('cx'));
				var x2 = Number(obj2.childNodes[0].getAttribute('cx'));
				var y1 = Number(obj1.childNodes[0].getAttribute('cy'));
				var y2 = Number(obj2.childNodes[0].getAttribute('cy'));
				var l_x1 = Number(obj.getAttribute('x1'));
				var l_x2 = Number(obj.getAttribute('x2'));
				var l_y1 = Number(obj.getAttribute('y1'));
				var l_y2 = Number(obj.getAttribute('y2'));
				if(x1!=l_x1||x2!=l_x2||y1!=l_y1||y2!=l_y2)
				{
					if(clearBond_flag==false)
					{
						clearBond_flag=true;
						continue;
					}
					obj.setAttribute('skip','not skip');
					arr.push(obj);
					svg.removeChild(obj);
					obj1.childNodes[1].setAttribute('fill','red');
					obj2.childNodes[1].setAttribute('fill','red');
					obj1.style.visibility = 'visible';
					obj2.style.visibility = 'visible';
				}
			}			
		}
		var upair_count1 = uPairCount(pt1);
		var upair_count2 = uPairCount(pt2);
		if(tri_db_flag==false&&upair_count1>=1&&upair_count2>=1)
		{
			bondCount -=1;
			msup(event);
			bondCount +=1;
		}
	}
	else if(bondCount==3)
	{
		var elec_vector = atom[pt1.atm_id].getElectronLinkVector();
		var upair_count1 = uPairCount(pt1);
		var upair_count2 = uPairCount(pt2);
		var lpair_count1 = lPairCount(pt1);
		var lpair_count2 = lPairCount(pt2);
		var vacant_pcount1 = vacantpCount(pt1);
		var vacant_pcount2 = vacantpCount(pt2);
		for(var i=0;i<elec_vector.length;i++)
		{
			var tgt = elec_vector[i].getTarget();
			var bnd = elec_vector[i].getBond();
			var odr = elec_vector[i].getOrder();
			if(tgt.split('e')[0]==tgt_id2&&(odr=='double')&&((upair_count1>=1&&upair_count2>=1)||(lpair_count1>=1&&lpair_count2>=1&&vacant_pcount1>=1&&vacant_pcount2>=1)))
			{
				bondCount =1; 
				msup(event);
				bondCount =3;
				break;
			}
		}
		for(var i=0;i<elec_vector.length;i++)
		{
			var tgt = elec_vector[i].getTarget();
			var bnd = elec_vector[i].getBond();
			var odr = elec_vector[i].getOrder();
			if(tgt.split('e')[0]==tgt_id2&&(odr=='single')&&((upair_count1>=2&&upair_count2>=2)||(lpair_count1>=1&&lpair_count2>=1&&vacant_pcount1>=1&&vacant_pcount2>=1)))
			{
				bondCount =2; 
				msup(event);
				bondCount =3;
				break;
			}
		}
	}
	if(arr.length!=0)
	{
		undo_stack.push(arr);
		var toPush = copyStructure(structure);
		undo_stack_jsobj.push(toPush);
	}
	clear();
}
function ring_line(event)
  {
	e = event;
	if(event.which==3)
		return;
	stack_check();
	pt1=jsObjCollisionDetect(e,bondCount);
	if(pt1==0||pt1.uPair==0)
	{
		clear();
		return;
	}
	animline.style.visibility = "hidden";
	document.getElementById("s_content").addEventListener('mouseup',ring_msup);
	document.getElementById("s_content").addEventListener('mousemove',ring_msmove);
  }
 function ring_msmove(event)
 {
	lineAnimation(event);
	document.getElementById("s_content").addEventListener('mouseup',ring_msup);	
 }
 
 function ring_msup(event)
{
	var arr=new Array();
	var pt2=jsObjCollisionDetect(event,bondCount);var spiro_flag = false;var fuse_flag = false;
	if(pt2==0||(pt2.collision==true&&pt2.str_id!=pt1.str_id))
	{
		clear();
		return;
	}
	var obj1;var l_adjust=2.7;var title;
	var frg;
	if(pt2.collision==true&&(pt1.x==pt2.x&&pt1.y==pt2.y))
	{
		curStrId=pt1.str_id;
		title = fragment[pt1.frg_id].getTitle();
		if(uPairCount(pt1)<2)
		{
			Alert.render("Invalid target for spiro ring");
			clear();
			return;
		}
		if(title.indexOf('Ring')!=-1||title.indexOf('Skeleton')!=-1)
		{
			spiro_flag = true;
			var atomList = skeletonFragmentXML.getElementsByTagName("atom");
			var len=atomList.length;
			var atm_orient = Number(atomList[0].getAttribute("orientation"));
			if(len>6||title.indexOf('BenzeneRing')==0)
			{
				clear();
				return;
			}
			frg = createSkeletonFragment(curStrId,pt1,0,len,atm_orient);
			structure[structure.length-1].setFragment(frg.fragment);
		}
		else
		{
			Alert.render("Invalid target for spiro ring");
			clear();
			return;
		}
	}
	else if(pt1.collision==true&&pt2.collision==true)
	{
		curStrId=pt1.str_id;var break_flag = false;
		var tgt_id = 's'+pt1.xml_id.i+'-'+pt1.xml_id.j+'-a'+pt1.xml_id.k;
		var elec_vector = atom[pt2.atm_id].getElectronLinkVector();
		for(var i=0;i<elec_vector.length;i++)
		{
			if(elec_vector[i].getTarget().split('e')[0]==tgt_id)
				break_flag=true;
		}
		if(break_flag == false)
		{
			Alert.render("Invalid target for fuse ring");
			clear();
			return;
		}
		var title1 = fragment[pt1.frg_id].getTitle();
		var title2 = fragment[pt2.frg_id].getTitle();
		if((title1.indexOf('Ring')!=-1||title1.indexOf('Skeleton')!=-1)&&(title2.indexOf('Ring')!=-1||title2.indexOf('Skeleton')!=-1))
		{
			fuse_flag = true;
			var atomList = skeletonFragmentXML.getElementsByTagName("atom");
			var len=atomList.length;
			var atm_orient = Number(atomList[0].getAttribute("orientation"));
			if(len>6)
			{
				clear();
				return;
			}
			var temp_count = count;var temp_frg_count = frg_count;
			frg = createSkeletonFragment(curStrId,pt1,pt2,len,atm_orient);
			if(frg=="error")
			{
				count = temp_count;
				frg_count = temp_frg_count;
				clear();
				return;
			}
			structure[structure.length-1].setFragment(frg.fragment);
			if(frg.pt[0].atm_id==pt1.atm_id)
			{
				if(uPairCount(pt1)<1&&frg.skip_pt[1]==false)
				{					
					Alert.render("Invalid target for fuse ring");
					count = temp_count;
					frg_count = temp_frg_count;
					clear();
					return;
				}
				if(uPairCount(pt2)<1&&frg.skip_pt[frg.skip_pt.length-2]==false)
				{					
					Alert.render("Invalid target for fuse ring");
					count = temp_count;
					frg_count = temp_frg_count;
					clear();
					return;
				}
			}
			if(frg.pt[frg.skip_pt.length-1].atm_id==pt1.atm_id)
			{
				if(uPairCount(pt1)<1&&frg.skip_pt[frg.skip_pt.length-2]==false)
				{					
					Alert.render("Invalid target for fuse ring");
					count = temp_count;
					frg_count = temp_frg_count;
					clear();
					return;
				}
				if(uPairCount(pt2)<1&&frg.skip_pt[1]==false)
				{					
					Alert.render("Invalid target for fuse ring");
					count = temp_count;
					frg_count = temp_frg_count;
					clear();
					return;
				}
			}
		}
		else
		{
			Alert.render("Invalid target for fuse ring");
			clear();
			return;
		}
	}
	else if(pt1.collision==false)
	{
		if(pt1.x==pt2.x&&pt1.y==pt2.y)
		{
			clear();
			return;
		}
		var theta=degree(pt1,pt2);
		theta=returnDegreeRange(theta);
		pt2.x=pt1.x-bondDistance*cos(theta);
		pt2.y=pt1.y-bondDistance*sin(theta);
		curStrId='s'+structure.length;
		structure[structure.length]=new Structure();
		structure[structure.length-1].setId(curStrId);
		frg = createRingFragment(curStrId,pt1,theta);
		structure[structure.length-1].setFragment(frg.fragment);
	}
	else
	{
		if(pt1.x==pt2.x&&pt1.y==pt2.y)
		{
			clear();
			return;
		}
		curStrId=pt1.str_id;
		var theta=degree(pt1,pt2);
		theta=returnDegreeRange(theta);
		pt2.x=pt1.x-bondDistance*cos(theta);
		pt2.y=pt1.y-bondDistance*sin(theta);
		frg = createRingFragment(curStrId,pt2,theta);
		obj1=document.getElementById(pt1.g_id);
		var c_adjust = obj1.childNodes[1].childNodes[0].nodeValue.length-1;
		pt1.x=Number(obj1.childNodes[0].getAttribute('cx'))-l_adjust-c_adjust;
		pt1.y=Number(obj1.childNodes[0].getAttribute('cy'))+l_adjust;
		var l_id=drawLine(pt1,frg.pt[0],l_adjust);
		arr.push(l_id);
		setLineAttribute(l_id,pt1.g_id,frg.g[0].getAttribute('id'));
		svg.removeChild(obj1);
		svg.appendChild(obj1);
		structure[pt1.str_id.slice(1)].setFragment(frg.fragment);
	}		
	var len = frg.pt.length;
	for(var i=0;i<len;i++)
	{
		var l=(i+1)%len;
		if(fuse_flag==true&&frg.skip_pt[i]==true&&(frg.skip_pt[l]==true||l==len-1))
			continue;
		if(fuse_flag==true&&i==len-1)
			continue;
		var id1=frg.g[i].getAttribute('id');
		var id2=frg.g[l].getAttribute('id');
		var l_id=drawLine(frg.pt[i],frg.pt[l],l_adjust);
		arr.push(l_id);
		if(!((spiro_flag==true||fuse_flag==true)&&frg.skip_pt[i]==true))
			arr.push(id1);
		setLineAttribute(l_id,id1,id2);
		if(cursor_flag=='benzene_ring'&&(i%2==1))
		{
			if(((spiro_flag==true)&&(i==5)))
				continue;
			if((spiro_flag==true||fuse_flag==true)&&frg.skip_pt[l]==true)
			{
				var upair_count=uPairCount(frg.pt[l]);
				if(upair_count<2)
					continue;
			}
			if((spiro_flag==true||fuse_flag==true)&&frg.skip_pt[i]==true)
			{
				var upair_count=uPairCount(frg.pt[i]);
				if(upair_count<2)
					continue;
			}
			var temp_pt1={x:frg.pt[i].x,y:frg.pt[i].y};var temp_pt2={x:frg.pt[l].x,y:frg.pt[l].y};
			var rad = Math.atan2(temp_pt1.y-temp_pt2.y,temp_pt1.x-temp_pt2.x) - Math.PI/2;
			var dist = -1.5;
			temp_pt1.x = temp_pt1.x - dist*Math.cos(rad);
			temp_pt1.y = temp_pt1.y - dist*Math.sin(rad);
			temp_pt2.x = temp_pt2.x - dist*Math.cos(rad);
			temp_pt2.y = temp_pt2.y - dist*Math.sin(rad);
			var l_id=drawLine(temp_pt1,temp_pt2,l_adjust);
			arr.push(l_id);
			setLineAttribute(l_id,id1,id2);
		}
	}
	for(var i=0;i<len;i++)
	{
		var l=(i+1)%len;
		if(fuse_flag==true&&frg.skip_pt[i]==true&&(frg.skip_pt[l]==true||l==len-1))
			continue;
		if(fuse_flag==true&&i==len-1)
			continue;
		var eId1=electronLinkSet(frg.pt[i],frg.pt[l],frg.g[i]);
		var eId2=electronLinkSet(frg.pt[l],frg.pt[i],frg.g[l]);
		frg.pt[i].xml_id=getStructureId(frg.pt[i].atm_id);
		frg.pt[l].xml_id=getStructureId(frg.pt[l].atm_id);
				
		var ElectronLinkVector1=atom[frg.pt[i].atm_id].getElectronLinkVector();
		var id = 's'+(frg.pt[l].xml_id.i)+'-'+(frg.pt[l].xml_id.j)+'-a'+(frg.pt[l].xml_id.k)+'e'+(eId2);
		ElectronLinkVector1[eId1].setTarget(id);
		set_charge(frg.pt[i].atm_id);
		
		var ElectronLinkVector2=atom[frg.pt[l].atm_id].getElectronLinkVector();
		var id = 's'+(frg.pt[i].xml_id.i)+'-'+(frg.pt[i].xml_id.j)+'-a'+(frg.pt[i].xml_id.k)+'e'+(eId1);
		ElectronLinkVector2[eId2].setTarget(id);
		set_charge(frg.pt[l].atm_id);

		if(cursor_flag=='benzene_ring')
		{
			if(((spiro_flag==true)&&(i==5)))
				continue;
			if((spiro_flag==true||fuse_flag==true)&&frg.skip_pt[l]==true)
			{
				var upair_count=uPairCount(frg.pt[l]);
				if(upair_count<2)
					continue;
			}
			if((spiro_flag==true||fuse_flag==true)&&frg.skip_pt[i]==true)
			{
				var upair_count=uPairCount(frg.pt[i]);
				if(upair_count<2)
					continue;
			}
			if(i%2==1)
			{
				ElectronLinkVector1[eId1].setOrder('double');
				ElectronLinkVector1[eId1].setPriority('2.6');
				ElectronLinkVector1[eId1].setGcCode('db@C');
				ElectronLinkVector2[eId2].setOrder('double');
				ElectronLinkVector2[eId2].setPriority('2.6');
				ElectronLinkVector2[eId2].setGcCode('db@C');
				
				var eId1=electronLinkSet(frg.pt[i],frg.pt[l],frg.g[i]);
				var eId2=electronLinkSet(frg.pt[l],frg.pt[i],frg.g[l]);
				frg.pt[i].xml_id=getStructureId(frg.pt[i].atm_id);
				frg.pt[l].xml_id=getStructureId(frg.pt[l].atm_id);
				
				var ElectronLinkVector=atom[frg.pt[i].atm_id].getElectronLinkVector();
				var id = 's'+(frg.pt[l].xml_id.i)+'-'+(frg.pt[l].xml_id.j)+'-a'+(frg.pt[l].xml_id.k)+'e'+(eId2);
				ElectronLinkVector[eId1].setTarget(id);
				ElectronLinkVector[eId1].setBond('pi-z');
				ElectronLinkVector[eId1].setOrder('double');
				ElectronLinkVector[eId1].setPriority('');
				ElectronLinkVector[eId1].setGcCode('');
				set_charge(frg.pt[i].atm_id);
		
				var ElectronLinkVector=atom[frg.pt[l].atm_id].getElectronLinkVector();
				var id = 's'+(frg.pt[i].xml_id.i)+'-'+(frg.pt[i].xml_id.j)+'-a'+(frg.pt[i].xml_id.k)+'e'+(eId1);
				ElectronLinkVector[eId2].setTarget(id);
				ElectronLinkVector[eId2].setBond('pi-z');
				ElectronLinkVector[eId2].setOrder('double');
				ElectronLinkVector[eId2].setPriority('');
				ElectronLinkVector[eId2].setGcCode('');
				set_charge(frg.pt[l].atm_id);
			}
			else
			{
				ElectronLinkVector1[eId1].setPriority('1.6');
				ElectronLinkVector1[eId1].setGcCode('sb@C');

				ElectronLinkVector2[eId2].setPriority('1.6');
				ElectronLinkVector2[eId2].setGcCode('sb@C');
			}
		}
	}
	if(pt1.collision==true&&spiro_flag==false&&fuse_flag==false)
	{
		fragment[frg.frg_id].setX1(pt1.x.toFixed(2));
		fragment[frg.frg_id].setY1(pt1.y.toFixed(2));
		var eId1=electronLinkSet(pt1,frg.pt[0],obj1);
		var eId2=electronLinkSet(frg.pt[0],pt1,frg.g[0]);

		frg.pt[0].xml_id=getStructureId(frg.pt[0].atm_id);
		
		var ElectronLinkVector=atom[pt1.atm_id].getElectronLinkVector();
		var id = 's'+(frg.pt[0].xml_id.i)+'-'+(frg.pt[0].xml_id.j)+'-a'+(frg.pt[0].xml_id.k)+'e'+(eId2);
		ElectronLinkVector[eId1].setTarget(id);
		set_charge(pt1.atm_id);
	
		var ElectronLinkVector=atom[frg.pt[0].atm_id].getElectronLinkVector();
		var id = 's'+(pt1.xml_id.i)+'-'+(pt1.xml_id.j)+'-a'+(pt1.xml_id.k)+'e'+(eId1);
		ElectronLinkVector[eId2].setTarget(id);
		set_charge(frg.pt[0].atm_id);
	}
	var len = frg.g.length;
	for(var i=0;i<len;i++)
	{
		svg.appendChild(frg.g[i]);
	}
	undo_stack.push(arr);
	var toPush = copyStructure(structure);
	undo_stack_jsobj.push(toPush);
	clear();
}
function bridge_line(event)
  {
	e = event;
	if(event.which==3)
		return;
	stack_check();
	pt1=jsObjCollisionDetect(e,bondCount);
	if(pt1==0||pt1.uPair==0||pt1.collision==false)
	{
		clear();
		return;
	}
	if(bridgeAtom.length==0)
		bridgeStart=pt1;
	animline.style.visibility = "hidden";
	document.getElementById("s_content").addEventListener('mouseup',bridge_msup);
	document.getElementById("s_content").addEventListener('mousemove',bridge_msmove);
  }
 function bridge_msmove(event)
 {
	lineAnimation(event);
	document.getElementById("s_content").addEventListener('mouseup',bridge_msup);	
 }
 function bridge_msup(event)
{
	var pt2=jsObjCollisionDetect(event,bondCount);curStrId=pt1.str_id;
	if(pt2==0||pt2.uPair==0)
	{
		clear();
		return;
	}
	if(pt1.x==pt2.x&&pt1.y==pt2.y)
	{
		clear();
		return;
	}
	if(pt2.collision==true&&bridgeCount==0)
	{
		if(check_bond_type(pt1,pt2)==0)
		{	
			clear();
			return;
		}
		if(lineCollisionDetect(pt1.g_id,pt2.g_id,true)>0)
		{
			deleteBridge();
		}
		else if(pt1.str_id==pt2.str_id)
		{
			var obj1=document.getElementById(pt1.g_id);var l_adjust=2.7;
			var c_adjust = obj1.childNodes[1].childNodes[0].nodeValue.length-1;
			pt1.x=Number(obj1.childNodes[0].getAttribute('cx'))-l_adjust-c_adjust;
			pt1.y=Number(obj1.childNodes[0].getAttribute('cy'))+l_adjust;
			var obj2=document.getElementById(pt2.g_id);
			var c_adjust = obj2.childNodes[1].childNodes[0].nodeValue.length-1;
			pt2.x=Number(obj2.childNodes[0].getAttribute('cx'))-l_adjust-c_adjust;
			pt2.y=Number(obj2.childNodes[0].getAttribute('cy'))+l_adjust;
			var l_id=drawLine(pt1,pt2,l_adjust);
			bridge_stack_arr.push(l_id);
			setLineAttribute(l_id,pt1.g_id,pt2.g_id);
			
			svg.removeChild(obj1);
			svg.removeChild(obj2);
			
			svg.appendChild(obj1);
			svg.appendChild(obj2);
	
			if(skeletonFragmentXML=='zero')
			{
				var eId1=electronLinkSet(pt1,pt2,pt1.g_id);
				var eId2=electronLinkSet(pt2,pt1,pt2.g_id);
					
				var ElectronLinkVector1=atom[pt1.atm_id].getElectronLinkVector();
				var id = 's'+(pt2.xml_id.i)+'-'+(pt2.xml_id.j)+'-a'+(pt2.xml_id.k)+'e'+(eId2);
				ElectronLinkVector1[eId1].setTarget(id);
				ElectronLinkVector1[eId1].setLinkStatus('BridgeTarget');
				set_charge(pt1.atm_id);
		
				var ElectronLinkVector2=atom[pt2.atm_id].getElectronLinkVector();
				var id = 's'+(pt1.xml_id.i)+'-'+(pt1.xml_id.j)+'-a'+(pt1.xml_id.k)+'e'+(eId1);
				ElectronLinkVector2[eId2].setTarget(id);
				ElectronLinkVector2[eId1].setLinkStatus('BridgeSource');
				set_charge(pt2.atm_id);
			}
			else
			{
				var frg=createBridgeFragment(bridgeAtom);
				len=bridgeAtom.length;
				for(var i=0;i<len-1;i++)
				{
					var l=(i+1);
					var eId1=electronLinkSet(frg.pt[i],frg.pt[l],frg.pt[i].g_id);
					var eId2=electronLinkSet(frg.pt[l],frg.pt[i],frg.pt[l].g_id);
					frg.pt[i].xml_id=getStructureId(frg.pt[i].atm_id);
					frg.pt[l].xml_id=getStructureId(frg.pt[l].atm_id);
				
					var ElectronLinkVector1=atom[frg.pt[i].atm_id].getElectronLinkVector();
					var id = 's'+(frg.pt[l].xml_id.i)+'-'+(frg.pt[l].xml_id.j)+'-a'+(frg.pt[l].xml_id.k)+'e'+(eId2);
					ElectronLinkVector1[eId1].setTarget(id);
					ElectronLinkVector1[eId1].setOrientation('');
					set_charge(frg.pt[i].atm_id);
		
					var ElectronLinkVector2=atom[frg.pt[l].atm_id].getElectronLinkVector();
					var id = 's'+(frg.pt[i].xml_id.i)+'-'+(frg.pt[i].xml_id.j)+'-a'+(frg.pt[i].xml_id.k)+'e'+(eId1);
					ElectronLinkVector2[eId2].setTarget(id);
					ElectronLinkVector2[eId2].setOrientation('');
					set_charge(frg.pt[l].atm_id);
				}
				var i=0;
				var eId1=electronLinkSet(bridgeStart,frg.pt[i],bridgeStart.g_id);
				var eId2=electronLinkSet(frg.pt[i],bridgeStart,frg.pt[i].g_id);
				
				var ElectronLinkVector1=atom[bridgeStart.atm_id].getElectronLinkVector();
				var id = 's'+(frg.pt[i].xml_id.i)+'-'+(frg.pt[i].xml_id.j)+'-a'+(frg.pt[i].xml_id.k)+'e'+(eId2);
				ElectronLinkVector1[eId1].setTarget(id);
				ElectronLinkVector1[eId1].setLinkStatus('bridgeTarget1');
				ElectronLinkVector1[eId1].setOrientation('');
				set_charge(bridgeStart.atm_id);
		
				var ElectronLinkVector2=atom[frg.pt[i].atm_id].getElectronLinkVector();
				var id = 's'+(bridgeStart.xml_id.i)+'-'+(bridgeStart.xml_id.j)+'-a'+(bridgeStart.xml_id.k)+'e'+(eId1);
				ElectronLinkVector2[eId2].setTarget(id);
				ElectronLinkVector2[eId2].setLinkStatus('bridgeSource1');
				ElectronLinkVector2[eId2].setOrientation('');
				set_charge(frg.pt[i].atm_id);
				
				var i=len-1;
				var eId1=electronLinkSet(frg.pt[i],pt2,frg.pt[i].g_id);
				var eId2=electronLinkSet(pt2,frg.pt[i],pt2.g_id);
				frg.pt[i].xml_id=getStructureId(frg.pt[i].atm_id);
				
				var ElectronLinkVector1=atom[frg.pt[i].atm_id].getElectronLinkVector();
				var id = 's'+(pt2.xml_id.i)+'-'+(pt2.xml_id.j)+'-a'+(pt2.xml_id.k)+'e'+(eId2);
				ElectronLinkVector1[eId1].setTarget(id);
				ElectronLinkVector1[eId1].setLinkStatus('bridgeSource2');
				ElectronLinkVector1[eId1].setOrientation('');
				set_charge(frg.pt[i].atm_id);
				
		
				var ElectronLinkVector2=atom[pt2.atm_id].getElectronLinkVector();
				var id = 's'+(frg.pt[i].xml_id.i)+'-'+(frg.pt[i].xml_id.j)+'-a'+(frg.pt[i].xml_id.k)+'e'+(eId1);
				ElectronLinkVector2[eId2].setTarget(id);
				ElectronLinkVector2[eId2].setLinkStatus('bridgeTarget2');
				ElectronLinkVector2[eId2].setOrientation('');
				set_charge(pt2.atm_id);
			}
			undo_stack.push(bridge_stack_arr);
			var toPush = copyStructure(structure);
			undo_stack_jsobj.push(toPush);
		}
		else
		{
			deleteBridge();
		}		
		bridgeCount=bridgeCount+deleteCount;
		deleteCount=0;
		bridgeAtom=new Array();
		bridge_stack_arr=new Array();
	}
	else if(pt2.collision==false&&bridgeCount!=0)
	{
		curStrId=pt1.str_id;
		pt2=drawMousePoint(event,false,true,bondCount);
		var obj1=document.getElementById(pt1.g_id);var l_adjust=2.7;
		var c_adjust = obj1.childNodes[1].childNodes[0].nodeValue.length-1;
		pt1.x=Number(obj1.childNodes[0].getAttribute('cx'))-l_adjust-c_adjust;
		pt1.y=Number(obj1.childNodes[0].getAttribute('cy'))+l_adjust;
		var obj2=document.getElementById(pt2.g_id);
		var c_adjust = obj2.childNodes[1].childNodes[0].nodeValue.length-1;
		pt2.x=Number(obj2.childNodes[0].getAttribute('cx'))-l_adjust-c_adjust;
		pt2.y=Number(obj2.childNodes[0].getAttribute('cy'))+l_adjust;
		var l_id=drawLine(pt1,pt2,l_adjust);
		bridge_stack_arr.push(l_id);
		bridge_stack_arr.push(pt2.g_id);
		setLineAttribute(l_id,pt1.g_id,pt2.g_id);
		
		bridgeAtom.push(pt2);
		svg.removeChild(obj1);
		svg.removeChild(obj2);
			
		svg.appendChild(obj1);
		svg.appendChild(obj2);
		deleteCount++;
		bridgeCount--;
		if(check_bond_type(pt1,pt2)==0)
		{	
			deleteBridge();	
			clear();
			return;
		}
	}
	else
	{
		deleteBridge();		
	}
	clear();
}
function event_delete_structure(event)
{
	if(event.which==3)
		return;
	stack_check();
	var arr = new Array();
	var pt1=jsObjCollisionDetect(event,bondCount);
	if(pt1==0||pt1.collision==false)
	{
		clear();
		return;
	}
	var to_minus_count = 0;
	for(var i=0;i<count;i++)
	{
		var id = "g["+i+"]";
		var obj = document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.getAttribute('str_id')==pt1.str_id)
		{
			svg.removeChild(obj);
			arr.push(obj);
			to_minus_count++;
		}	
	}
	
	var to_minus_l_count = 0;
	for(var i=0;i<l_count;i++)
	{
		var id = "l["+i+"]";
		var obj = document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.getAttribute('str_id')==pt1.str_id)
		{
			svg.removeChild(obj);
			arr.push(obj);
			to_minus_l_count++;
		}			
	}	
	for(var i=0;i<itl_count;i++)
	{
		var id = "itl["+i+"]";
		var obj = document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.getAttribute('str_id1')==pt1.str_id||obj.getAttribute('str_id2')==pt1.str_id)
		{
			svg.removeChild(obj);
			arr.push(obj);
			find_interact(obj,'skip');
		}
		
	}
	var toDelete = pt1.str_id.slice(1);
	for(var i = 0;i<structure.length;i++)
	{
		if(Number(toDelete)==Number(i))
			toSkip[i]='skip';
		else if(typeof(toSkip[i])=='undefined')
			toSkip[i]='not skip';
	}
	undo_stack.push(arr);
	var toPush = copyStructure(structure);
	undo_stack_jsobj.push(toPush);
}
function str_grp_down(event)
  {
	e = event;
	if(event.which==3)
		return;
	stack_check();
	pt1=jsObjCollisionDetect(e,bondCount);
	if(pt1==0||pt1.collision==false)
	{
		clear();
		return;
	}
	document.getElementById("s_content").addEventListener('mouseup',str_grp_up);
	document.getElementById("s_content").addEventListener('mousemove',str_grp_move);
  }
 function str_grp_move(event)
 {
	moveAnimation(event);
	document.getElementById("s_content").addEventListener('mouseup',str_grp_up);	
 }
 
 function str_grp_up(event)
{
	var arr=new Array();
	var pt2=jsObjCollisionDetect(event,bondCount);
	if(pt2==0)
	{
		clear();
		return;
	}
	pt2.str_id=pt1.str_id;
	pt2.g_id=pt1.g_id;
	toMove(pt1,pt2,false);	
	arr.push('move');
	arr.push(pt2);
	arr.push(pt1);
	arr.push(move_structure_flag);
	undo_stack.push(arr);
	var toPush = copyStructure(structure);
	undo_stack_jsobj.push(toPush);
	clear();
}
function event_plane_projection(event)
{
	if(event.which==3)
		return;
	var pt1 = jsObjCollisionDetect(event,bondCount);
	var arr=new Array();
	stack_check();
	if(pt1==0)
	{
		clear();
		return;
	}
	pt1.x = Math.round(pt1.x);
	pt1.y = Math.round(pt1.y);
	for(var i=0;i<l_count;i++)
	{
		var id='l['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		var id1 = obj.getAttribute('id1');
		var id2 = obj.getAttribute('id2');
		var l_adjust = 2.7;var t_point1,t_point2,t_point3;
		t_point1 = {x:obj.getAttribute('x1'),y:obj.getAttribute('y1')};
		t_point2 = {x:obj.getAttribute('x2'),y:obj.getAttribute('y2')};
		t_point3 = {x:'',y:''};
		var x1 = Math.round(t_point1.x)-l_adjust;
		var y1 = Math.round(t_point1.y)+l_adjust;
		var x2 = Math.round(t_point2.x)-l_adjust;
		var y2 = Math.round(t_point2.y)+l_adjust;		
		var x_diff = (x2-x1)/2;
		var y_diff = (y2-y1)/2;
		x1=x1 + x_diff - 2.7 ;
		x2=x2 - x_diff + 2.7 ;
		y1=y1 + y_diff - 2.7 ;
		y2=y2 - y_diff + 2.7 ;
		if((pt1.x>=x1&&pt1.x<=x2)&&(pt1.y>=y1&&pt1.y<=y2)&&lineCollisionDetect(id1,id2,false)==1)
		{
			if(plane_projection_flag=='above_plane_projection')
			{
				for(var j=t_count-1;j>=0;j--)
				{
					var id='tri['+j+']';
					var obj=document.getElementById(id);
					if(obj==null)
						continue;
					var tri_id1 = obj.getAttribute('id1');
					var tri_id2 = obj.getAttribute('id2');
					if(id1==tri_id1&&id2==tri_id2)
					{
						var style = obj.getAttribute('style');
						if(style=='fill:black')
							return;
						else
							break;
					}
				}
				var x_diff = (t_point2.x - t_point1.x);
				var y_diff = (t_point2.y - t_point1.y);
				var l_dist = Math.sqrt(x_diff*x_diff + y_diff*y_diff);
				l_dist = round(l_dist)/4;
				x_diff = (t_point2.x - t_point1.x)/l_dist;
				y_diff = (t_point2.y - t_point1.y)/l_dist;
				
				t_point1.x = Number(t_point1.x) + x_diff*l_dist/(1.3*l_dist);
				t_point1.y = Number(t_point1.y) + y_diff*l_dist/(1.3*l_dist);
				t_point2.x = Number(t_point2.x) - x_diff;
				t_point2.y = Number(t_point2.y) - y_diff;
				var rad = Math.atan2(t_point1.y-t_point2.y,t_point1.x-t_point2.x) + Math.PI/2;
				var dist = 5;
				t_point3.x = t_point2.x - dist*Math.cos(rad);
				t_point3.y = t_point2.y - dist*Math.sin(rad);
				var points = t_point1.x+","+t_point1.y+" "+t_point2.x+","+t_point2.y+" "+t_point3.x+","+t_point3.y;
				var triangle = document.createElementNS(svgNS,'polygon');
				var id = "tri["+t_count+"]";
				triangle.id = id ;
				triangle.setAttribute('points',points);
				triangle.setAttribute('style','fill:black');
				triangle.setAttribute('id1',id1);
				triangle.setAttribute('id2',id2);
				svg.appendChild(triangle);
				var obj1=document.getElementById(id1);
				svg.removeChild(obj1);
				svg.appendChild(obj1);
				var obj2=document.getElementById(id2);
				svg.removeChild(obj2);
				svg.appendChild(obj2);
				
				var x1 = Number(obj1.childNodes[1].getAttribute('x')).toFixed(2);
				var y1 = Number(obj1.childNodes[1].getAttribute('y')).toFixed(2);
				var x2 = Number(obj2.childNodes[1].getAttribute('x')).toFixed(2);
				var y2 = Number(obj2.childNodes[1].getAttribute('y')).toFixed(2);
				projection_set(x1,y1,x2,y2,'Below Plane');
				projection_set(x2,y2,x1,y1,'Above Plane');
				
				arr.push(id);
				t_count++;
			}
			if(plane_projection_flag=='below_plane_projection')
			{
				for(var j=t_count-1;j>=0;j--)
				{
					var id='tri['+j+']';
					var obj=document.getElementById(id);
					if(obj==null)
						continue;
					var tri_id1 = obj.getAttribute('id1');
					var tri_id2 = obj.getAttribute('id2');
					if(id1==tri_id1&&id2==tri_id2)
					{
						var style = obj.getAttribute('style');
						if(style=='fill:grey')
							return;
						else
							break;
					}
				}
				var x_diff = (t_point2.x - t_point1.x);
				var y_diff = (t_point2.y - t_point1.y);
				var l_dist = Math.sqrt(x_diff*x_diff + y_diff*y_diff);
				l_dist = round(l_dist)/4;
				x_diff = (t_point2.x - t_point1.x)/l_dist;
				y_diff = (t_point2.y - t_point1.y)/l_dist;
				
				t_point1.x = Number(t_point1.x) + x_diff*l_dist/(1.3*l_dist);
				t_point1.y = Number(t_point1.y) + y_diff*l_dist/(1.3*l_dist);
				t_point2.x = Number(t_point2.x) - x_diff;
				t_point2.y = Number(t_point2.y) - y_diff;
				var rad = Math.atan2(t_point1.y-t_point2.y,t_point1.x-t_point2.x) + Math.PI/2;
				var dist = 5;
				t_point3.x = t_point2.x - dist*Math.cos(rad);
				t_point3.y = t_point2.y - dist*Math.sin(rad);
				var points = t_point1.x+","+t_point1.y+" "+t_point2.x+","+t_point2.y+" "+t_point3.x+","+t_point3.y;
				var triangle = document.createElementNS(svgNS,'polygon');
				var id = "tri["+t_count+"]";
				triangle.id = id ;
				triangle.setAttribute('points',points);
				triangle.setAttribute('style','fill:grey');
				triangle.setAttribute('id1',id1);
				triangle.setAttribute('id2',id2);
				svg.appendChild(triangle);
				var obj1=document.getElementById(id1);				
				svg.removeChild(obj1);
				svg.appendChild(obj1);
				var obj2=document.getElementById(id2);				
				svg.removeChild(obj2);
				svg.appendChild(obj2);
				
				var x1 = Number(obj1.childNodes[1].getAttribute('x')).toFixed(2);
				var y1 = Number(obj1.childNodes[1].getAttribute('y')).toFixed(2);
				var x2 = Number(obj2.childNodes[1].getAttribute('x')).toFixed(2);
				var y2 = Number(obj2.childNodes[1].getAttribute('y')).toFixed(2);
				projection_set(x1,y1,x2,y2,'Above Plane');
				projection_set(x2,y2,x1,y1,'Below Plane');
				
				arr.push(id);
				t_count++;
			}
			if(plane_projection_flag=='in_plane_projection')
			{
				for(var j=0;j<t_count;j++)
				{
					var id='tri['+j+']';
					var obj=document.getElementById(id);
					if(obj==null)
						continue;
					var tri_id1 = obj.getAttribute('id1');
					var tri_id2 = obj.getAttribute('id2');
					if(id1==tri_id1&&id2==tri_id2)
					{
						arr.push(obj);
						svg.removeChild(obj);
						
						var obj1=document.getElementById(id1);
						var obj2=document.getElementById(id2);
						var x1 = Number(obj1.childNodes[1].getAttribute('x')).toFixed(2);
						var y1 = Number(obj1.childNodes[1].getAttribute('y')).toFixed(2);
						var x2 = Number(obj2.childNodes[1].getAttribute('x')).toFixed(2);
						var y2 = Number(obj2.childNodes[1].getAttribute('y')).toFixed(2);
						projection_set(x1,y1,x2,y2,'');
						projection_set(x2,y2,x1,y1,'');
					}
				}
			}
			if(arr.length!=0)
			{
				undo_stack.push(arr);
				var toPush = copyStructure(structure);
				undo_stack_jsobj.push(toPush);				
			}		
		}		
	}	
}
function change_orientation_down(event)
  {
	e = event;
	if(event.which==3)
		return;
	stack_check();
	pt1=jsObjCollisionDetect(e,bondCount);
	if(pt1==0||pt1.collision==false)
	{
		clear();
		return;
	}
	document.getElementById("s_content").addEventListener('mouseup',change_orientation_up);
	document.getElementById("s_content").addEventListener('mousemove',change_orientation_move);
  }
 function change_orientation_move(event)
 {
	orientationAnimation(event);	
	document.getElementById("s_content").addEventListener('mouseup',change_orientation_up);	
 }
 
 function change_orientation_up(event)
{
	var arr=new Array();var l_adjust=2.7;	
	var pt2=jsObjCollisionDetect(event,bondCount);
	if(pt2==0||pt2.collision==true)
	{
		clear();
		return;
	}
	pt2.str_id=pt1.str_id;
	pt2.g_id=pt1.g_id;
	var temp_pt = toOrient(pt1,pt2);
	if(typeof(temp_pt)=='undefined')
	{
		clear();
		return;
	}
	pt2.x = temp_pt.x-l_adjust;
	pt2.y = temp_pt.y+l_adjust;
	arr.push('orient');
	arr.push(pt2);
	arr.push(pt1);
	undo_stack.push(arr);
	var toPush = copyStructure(structure);
	undo_stack_jsobj.push(toPush);
	clear();
}
function event_atom_postion(event)
{
	if(event.which==3)
		return;
	var pt1 = jsObjCollisionDetect(event,bondCount);
	stack_check();
	if(pt1==0||pt1.collision==false)
	{
		clear();
		return;
	}
	var position = prompt('Enter Atom Position');
	var obj = document.getElementById(pt1.g_id);
	obj.childNodes[2].childNodes[0].nodeValue=position;
	clear();
}
/* function event_add_charge(event)
{
	if(event.which==3)
		return;
	var arr_charge_count = new Array();
	var arr = new Array();
	var pt1 = jsObjCollisionDetect(event,bondCount);
	stack_check();
	if(pt1==0||pt1.collision==false)
	{
		clear();
		return;
	}
	var obj = document.getElementById(pt1.g_id);
	var toDisp = '';
	var sym = obj.childNodes[1].childNodes[0].nodeValue;
	var atomList=atomFragmentListXML.getElementsByTagName('atomFragment');
	var len=atomList.length;var temp_atom=new Atom();
	for(var i=0;i<len;i++)
	{
		var elementAtom = atomList[i];
		if(elementAtom.getAttribute("symbol")==sym&&elementAtom.getAttribute("chargeCount")!=0)
		{
			var charge = elementAtom.getAttribute("charge");
			var chargeCount = elementAtom.getAttribute("chargeCount");
			var txt = charge + chargeCount;
			toDisp = toDisp.concat(txt+" ");
			arr_charge_count.push(txt);
		}
		else if(elementAtom.getAttribute("symbol")==sym&&elementAtom.getAttribute("chargeCount")==0)
		{
			var orbList = elementAtom.getElementsByTagName("electronLink");		
			for (var k = 0; k < orbList.length; k++) 
			{
				var elementOrb =orbList[k];
				elink = new ElectronLink();
				elink.setElectronStatus(elementOrb.getAttribute("electronStatus"));
				elink.setCharge(elementOrb.getAttribute("charge"));
				elink.setChargeCount(elementOrb.getAttribute("chargeCount"));
				temp_atom.setElectronLink(elink);
			}
		}
	}
	atm1_id = collisionDetectAtomIndex(pt1.x,pt1.y);
	elec2_vector  = atom[atm1_id].getElectronLinkVector();
	var len1 = elec2_vector.length;
	positive_charge = 0;
	negative_charge = 0;
	temp_atom = copy_atom_state(temp_atom,atm1_id);
	elec1_vector  = temp_atom.getElectronLinkVector();
	var len = elec1_vector.length;
	for(var i=0;i<len;i++)
	{
		if(elec1_vector[i].getElectronStatus()=='lPair')
		{
			positive_charge += 2;
		}
		else if(elec1_vector[i].getElectronStatus()=='uPair')
		{
			positive_charge += 1;
			negative_charge -= 1;
		}
	}
	Prompt.render(arr_charge_count,'status');
} */
function event_add_plus_charge(event)
{
	if(event.which==3)
		return;
	var pt1 = jsObjCollisionDetect(event,bondCount);
	stack_check();
	if(pt1==0||pt1.collision==false)
	{
		clear();
		return;
	}
	var arr = new Array();
	var atom1 = atom[pt1.atm_id];
	var ElectronLinkVector=atom[pt1.atm_id].getElectronLinkVector();
	for(var j=ElectronLinkVector.length-1;j>=0;j--)
	{
		if(ElectronLinkVector[j].getElectronStatus()=='vacant'||ElectronLinkVector[j].getElectronStatus()=='bPair')
		{
			continue;
		}
		var charge = ElectronLinkVector[j].getCharge();
		var chargeCount = ElectronLinkVector[j].getChargeCount();
		var txt = charge + chargeCount;
		var chrg = Number(txt) + 1;
		if(chrg<0)
		{
			charge = '-';
			chargeCount = Math.abs(chrg);
		}
		else if(chrg>0)
		{
			charge = '+';
			chargeCount = Math.abs(chrg);
		}
		else
		{
			charge = '0';
			chargeCount = '0';
		}
		if(ElectronLinkVector[j].getElectronStatus()=='lPair')
		{
			ElectronLinkVector[j].setElectronStatus('uPair');
		}
		else
		{
			ElectronLinkVector[j].setElectronStatus('vacant');
		}		
		ElectronLinkVector[j].setCharge(charge);
		ElectronLinkVector[j].setChargeCount(chargeCount);
		break;
	}
	if(j>=0)
	{
		set_charge(pt1.atm_id);
		undo_stack.push(arr);
		var toPush = copyStructure(structure);
		undo_stack_jsobj.push(toPush);
	}
	clear();
}
function event_add_minus_charge(event)
{
	if(event.which==3)
		return;
	var pt1 = jsObjCollisionDetect(event,bondCount);
	stack_check();
	if(pt1==0||pt1.collision==false)
	{
		clear();
		return;
	}
	var arr = new Array();
	var atom1 = atom[pt1.atm_id];var orb_arr = {};var charge_update_flag =false;
	var ElectronLinkVector=atom[pt1.atm_id].getElectronLinkVector();
	for(var j=0;j<ElectronLinkVector.length;j++)
	{
		var str = ElectronLinkVector[j].getTitle().substring(0,2);
		var num = Number(str.substring(0,1));
		if(str.substring(1,2)=='p')
			num +=0.75;
		else if(str.substring(1,2)=='d')
			num +=1.5;
		else if(str.substring(1,2)=='f')
			num +=2.25;
		if(typeof(orb_arr[num])!='undefined')
		{
			orb_arr[num].push(ElectronLinkVector[j].getTitle());
		}
		else
		{
			var new_arr = new Array();
			new_arr.push(ElectronLinkVector[j].getTitle());
			orb_arr[num]=new_arr;
		}			
	}
	for(var propName in orb_arr) 
	{
		if(orb_arr.hasOwnProperty(propName)) 
		{
			var title_name = orb_arr[propName];
			for(var j=0;j<title_name.length;j++)
			{				
				for(var k=0;k<ElectronLinkVector.length;k++)
				{
					if(title_name[j]==ElectronLinkVector[k].getTitle()&&ElectronLinkVector[k].getElectronStatus()=='vacant')
					{
						var charge = ElectronLinkVector[k].getCharge();
						var chargeCount = ElectronLinkVector[k].getChargeCount();
						var txt = charge + chargeCount;
						var chrg = Number(txt) - 1;
						if(chrg<0)
						{
							charge = '-';
							chargeCount = Math.abs(chrg);
						}
						else if(chrg>0)
						{
							charge = '+';
							chargeCount = Math.abs(chrg);
						}
						else
						{
							charge = '0';
							chargeCount = '0';
						}
						ElectronLinkVector[k].setElectronStatus('uPair');
						ElectronLinkVector[k].setCharge(charge);
						ElectronLinkVector[k].setChargeCount(chargeCount);
						charge_update_flag =true;
						break;
					}
				}
				if(charge_update_flag==true)
					break;
			}
			if(charge_update_flag==true)
				break;
			else
			{
				for(var j=0;j<title_name.length;j++)
				{				
					for(var k=0;k<ElectronLinkVector.length;k++)
					{
						if(title_name[j]==ElectronLinkVector[k].getTitle()&&ElectronLinkVector[k].getElectronStatus()=='uPair')
						{
							var charge = ElectronLinkVector[k].getCharge();
							var chargeCount = ElectronLinkVector[k].getChargeCount();
							var txt = charge + chargeCount;
							var chrg = Number(txt) - 1;
							if(chrg<0)
							{
								charge = '-';
								chargeCount = Math.abs(chrg);
							}
							else if(chrg>0)
							{
								charge = '+';
								chargeCount = Math.abs(chrg);
							}
							else
								{
									charge = '0';
									chargeCount = '0';
							}
								ElectronLinkVector[k].setElectronStatus('lPair');
								ElectronLinkVector[k].setCharge(charge);
								ElectronLinkVector[k].setChargeCount(chargeCount);
								charge_update_flag =true;
								break;
							}
						}
					if(charge_update_flag==true)
						break;
				}
			}
			if(charge_update_flag==true)
				break;
		}
	}
	if(charge_update_flag==true)
	{
		set_charge(pt1.atm_id);
		undo_stack.push(arr);
		var toPush = copyStructure(structure);
		undo_stack_jsobj.push(toPush);
	}	
	clear();
}
/* function set_add_charge(div)
{
 var input = Number(div.innerHTML);
	var len = elec1_vector.length;var arr = new Array();
	if(input>0&&input<=positive_charge)
	{
		atom[atm1_id].setCharge('+');
		atom[atm1_id].setChargeCount(input);
		for(var i=0;i<len;i++)
		{
			if(input==0)
				break;
			if(elec1_vector[i].getElectronStatus()=='lPair')
			{
				elec1_vector[i].setElectronStatus('uPair');
				elec1_vector[i].setCharge('+');
				var temp_charge = Number(elec1_vector[i].getChargeCount());
				temp_charge++;
				elec1_vector[i].setChargeCount(temp_charge);
				input--;
			}
		}
		for(var i=0;i<len;i++)
		{
			if(input==0)
				break;
			if(elec1_vector[i].getElectronStatus()=='uPair')
			{
				elec1_vector[i].setElectronStatus('vacant');
				elec1_vector[i].setCharge('+');
				var temp_charge = Number(elec1_vector[i].getChargeCount());
				temp_charge++;
				elec1_vector[i].setChargeCount(temp_charge);
				input--;
			}
		}
		for(var i=0;i<len;i++)
		{
			elec2_vector[i].setElectronStatus(elec1_vector[i].getElectronStatus());
			elec2_vector[i].setCharge(elec1_vector[i].getCharge());
			elec2_vector[i].setChargeCount(elec1_vector[i].getChargeCount());
		}
		undo_stack.push(arr);
		var toPush = copyStructure(structure);
		undo_stack_jsobj.push(toPush);
	}
	else if(input<0&&input>=negative_charge)
	{
		atom[atm1_id].setCharge('-');
		atom[atm1_id].setChargeCount(Math.abs(input));
		for(var i=0;i<len;i++)
		{
			if(input==0)
				break;
			if(elec1_vector[i].getElectronStatus()=='uPair')
			{
				elec1_vector[i].setElectronStatus('lPair');
				elec1_vector[i].setCharge('-');
				elec1_vector[i].setChargeCount(1);
				input++;
			}
		}
		for(var i=0;i<len;i++)
		{
			elec2_vector[i].setElectronStatus(elec1_vector[i].getElectronStatus());
			elec2_vector[i].setCharge(elec1_vector[i].getCharge());
			elec2_vector[i].setChargeCount(elec1_vector[i].getChargeCount());
		}
		undo_stack.push(arr);
		var toPush = copyStructure(structure);
		undo_stack_jsobj.push(toPush);
	}
	else if(input==0)
	{
		var charge = 0;var chargeCount=0;
		for(var i=0;i<len;i++)
		{
			elec2_vector[i].setElectronStatus(elec1_vector[i].getElectronStatus());
			if(charge == 0)
				charge = elec1_vector[i].getCharge();
			chargeCount += Number(elec1_vector[i].getChargeCount());
			elec2_vector[i].setCharge(elec1_vector[i].getCharge());
			elec2_vector[i].setChargeCount(elec1_vector[i].getChargeCount());
		}
		atom[atm1_id].setCharge(charge);
		atom[atm1_id].setChargeCount(chargeCount);
		undo_stack.push(arr);
		var toPush = copyStructure(structure);
		undo_stack_jsobj.push(toPush);
	}
	else
	{
		error_flag=true;
	}
	var elec_vector = atom[atm1_id].getElectronLinkVector();
	var cnt=0;
	for(var i=0;i<elec_vector.length;i++)
	{
		if(elec_vector[i].getElectronStatus()=='uPair'||elec_vector[i].getElectronStatus()=='lPair'||elec_vector[i].getElectronStatus()=='vacant')
		{
			cnt++;
		}
	}
	if(cnt==0)
	{
		var g_id = 'g['+collisionDetect(atom[atm1_id].getX(),atom[atm1_id].getY())+']';
		var obj=document.getElementById(g_id);
		if(obj==null)
		{
			clear();
			return;
		}
		if(obj.childNodes[1].childNodes[0].nodeValue=="C")
		{
			obj.childNodes[1].setAttribute('fill','black');
			obj.style.visibility='hidden';
		}
		else
		{
			obj.childNodes[1].setAttribute('fill','black');
		}
	}
	else
	{
		var g_id = 'g['+collisionDetect(atom[atm1_id].getX(),atom[atm1_id].getY())+']';
		var obj=document.getElementById(g_id);
		if(obj==null)
		{
			clear();
			return;
		}
		if(obj.childNodes[1].childNodes[0].nodeValue=="C")
		{
			obj.childNodes[1].setAttribute('fill','red');
			obj.style.visibility='visible';
		}
		else
		{
			obj.childNodes[1].setAttribute('fill','red');
		}
	}
	clear();
} */
function down_interact(event)
  {
	e = event;
	if(event.which==3)
		return;
	stack_check();
	pt1=jsObjCollisionDetect(e,bondCount);
	if(pt1==0||pt1.collision==false)
	{
		clear();
		return;
	}
	document.getElementById("s_content").addEventListener('mouseup',up_interact);
	document.getElementById("s_content").addEventListener('mousemove',move_interact);
  }
 function move_interact(event)
 {
	lineAnimation(event);
	document.getElementById("s_content").addEventListener('mouseup',up_interact);	
 }
 
 function up_interact(event)
{
	var arr=new Array();
	var pt2=jsObjCollisionDetect(event,bondCount);
	if(pt2==0||pt2.collision==false||pt2.str_id==pt1.str_id)
	{
		clear();
		return;
	}
	if(interact_flag=='ion_ion')
	{
		var atom1 = atom[pt1.atm_id];
		var atom2 = atom[pt2.atm_id];
		var atom1_charge = atom1.getCharge();
		var atom2_charge = atom2.getCharge();
		var l_adjust = 2.7;
		if(atom1_charge!='0'&&atom1_charge!=''&&atom2_charge!='0'&&atom2_charge!=''&&atom1_charge!=atom2_charge)
		{
			for(var i=0;i<structure.length;i++)
			{
				if(typeof(structure[i].getFragmentVector)!='function')
				{
					var x1 = Number(structure[i].getX1());
					var x2 = Number(structure[i].getX2());
					var y1 = Number(structure[i].getY1());
					var y2 = Number(structure[i].getY2());
					var at_x1 = Number(atom1.getX());
					var at_x2 = Number(atom2.getX());
					var at_y1 = Number(atom1.getY());
					var at_y2 = Number(atom2.getY());
					if((at_x1==x1&&at_x2==x2&&at_y1==y1&&at_y2==y2)||(at_x1==x2&&at_x1==x2&&at_y1==y2&&at_y2==y1))
					{
						clear();
						return;
					}
				}
			}
			var line = document.createElementNS(svgNS,'line');
			line.id = "itl["+itl_count+"]";
			line.setAttribute('x1',Number(pt1.x)+l_adjust);
			line.setAttribute('y1',Number(pt1.y)-l_adjust);
			line.setAttribute('x2',Number(pt2.x)+l_adjust);
			line.setAttribute('y2',Number(pt2.y)-l_adjust);
			line.setAttribute('id1',pt1.g_id);
			line.setAttribute('id2',pt2.g_id);
			line.setAttribute('str_id1',pt1.str_id);
			line.setAttribute('str_id2',pt2.str_id);
			line.setAttribute('stroke','Aqua');
			line.setAttribute('stroke-dasharray','1,1');
			line.setAttribute('d','M5 20 l215 0');
			line.setAttribute('stroke-width',0.75);
			svg.appendChild(line);
			
			var obj1= document.getElementById(pt1.g_id);
			svg.removeChild(obj1);
			svg.appendChild(obj1);
			var obj2= document.getElementById(pt2.g_id);
			svg.removeChild(obj2);
			svg.appendChild(obj2);
			arr.push(line.id);
			
			var itr = new Interact();
			structure.push(itr);
			itr.setTitle('ionic');
			itr.setType('ion-ion');
			itr.setSourceObject(atom1.getTitle());
			itr.setTargetObject(atom2.getTitle());
			var elec1_vector = atom1.getElectronLinkVector();
			for(var l=0;l<elec1_vector.length;l++)
			{
				if(elec1_vector[l].getCharge()!='0'&&elec1_vector[l].getCharge()!='')
					break;
			}
			var id = 's'+(pt1.xml_id.i)+'-'+(pt1.xml_id.j)+'-a'+(pt1.xml_id.k)+'e'+(l);
			itr.setSourceId(id);
			var elec1_vector = atom2.getElectronLinkVector();
			for(var l=0;l<elec1_vector.length;l++)
			{
				if(elec1_vector[l].getCharge()!='0'&&elec1_vector[l].getCharge()!='')
					break;
			}
			var id = 's'+(pt2.xml_id.i)+'-'+(pt2.xml_id.j)+'-a'+(pt2.xml_id.k)+'e'+(l);
			itr.setTargetId(id);
			itr.setX1(atom1.getX());
			itr.setY1(atom1.getY());
			itr.setX2(atom2.getX());
			itr.setY2(atom2.getY());
			
			itl_count++;
			undo_stack.push(arr);
			var toPush = copyStructure(structure);
			undo_stack_jsobj.push(toPush);
		}
	}
	if(interact_flag=='ion_dipole')
	{
		var atom1 = atom[pt1.atm_id];
		var atom2 = atom[pt2.atm_id];
		var atom1_charge = atom1.getCharge();
		var atom2_charge = atom2.getCharge();
		var atom1_partcharge = atom1.getPartCharge();
		var atom2_partcharge = atom2.getPartCharge();
		var l_adjust = 2.7;
		if((atom1_charge!='0'&&atom1_charge!=''&&atom2_partcharge!='0'&&atom2_partcharge!=''&&atom1_charge!=atom2_partcharge)||(atom1_partcharge!='0'&&atom1_partcharge!=''&&atom2_charge!='0'&&atom2_charge!=''&&atom1_partcharge!=atom2_charge))
		{
			for(var i=0;i<structure.length;i++)
			{
				if(typeof(structure[i].getFragmentVector)!='function')
				{
					var x1 = Number(structure[i].getX1());
					var x2 = Number(structure[i].getX2());
					var y1 = Number(structure[i].getY1());
					var y2 = Number(structure[i].getY2());
					var at_x1 = Number(atom1.getX());
					var at_x2 = Number(atom2.getX());
					var at_y1 = Number(atom1.getY());
					var at_y2 = Number(atom2.getY());
					if((at_x1==x1&&at_x2==x2&&at_y1==y1&&at_y2==y2)||(at_x1==x2&&at_x1==x2&&at_y1==y2&&at_y2==y1))
					{
						clear();
						return;
					}
				}
			}
			var line = document.createElementNS(svgNS,'line');
			line.id = "itl["+itl_count+"]";
			line.setAttribute('x1',Number(pt1.x)+l_adjust);
			line.setAttribute('y1',Number(pt1.y)-l_adjust);
			line.setAttribute('x2',Number(pt2.x)+l_adjust);
			line.setAttribute('y2',Number(pt2.y)-l_adjust);
			line.setAttribute('id1',pt1.g_id);
			line.setAttribute('id2',pt2.g_id);
			line.setAttribute('str_id1',pt1.str_id);
			line.setAttribute('str_id2',pt2.str_id);
			line.setAttribute('stroke','lime');
			line.setAttribute('stroke-dasharray','1,1');
			line.setAttribute('d','M5 20 l215 0');
			line.setAttribute('stroke-width',0.75);
			svg.appendChild(line);
			
			var obj1= document.getElementById(pt1.g_id);
			svg.removeChild(obj1);
			svg.appendChild(obj1);
			var obj2= document.getElementById(pt2.g_id);
			svg.removeChild(obj2);
			svg.appendChild(obj2);
			arr.push(line.id);
			
			var itr = new Interact();
			structure.push(itr);
			itr.setTitle('cordinate');
			itr.setType('ion-dipole');
			itr.setSourceObject(atom1.getTitle());
			itr.setTargetObject(atom2.getTitle());
			var elec1_vector = atom1.getElectronLinkVector();
			for(var l=0;l<elec1_vector.length;l++)
			{
				if(elec1_vector[l].getCharge()!='0'&&elec1_vector[l].getCharge()!='')
					break;
			}
			if(l==elec1_vector.length)
			{
				for(var l=0;l<elec1_vector.length;l++)
				{
					if(elec1_vector[l].getPartCharge()!='0'&&elec1_vector[l].getPartCharge()!='')
						break;
				}
				var id = 's'+(pt1.xml_id.i)+'-'+(pt1.xml_id.j)+'-a'+(pt1.xml_id.k)+'e'+(l);
				itr.setSourceId(id);
				var elec1_vector = atom2.getElectronLinkVector();
				for(var l=0;l<elec1_vector.length;l++)
				{
					if(elec1_vector[l].getCharge()!='0'&&elec1_vector[l].getCharge()!='')
						break;
				}
				var id = 's'+(pt2.xml_id.i)+'-'+(pt2.xml_id.j)+'-a'+(pt2.xml_id.k)+'e'+(l);
				itr.setTargetId(id);
			}
			else
			{
				var id = 's'+(pt1.xml_id.i)+'-'+(pt1.xml_id.j)+'-a'+(pt1.xml_id.k)+'e'+(l);
				itr.setSourceId(id);
				var elec1_vector = atom2.getElectronLinkVector();
				for(var l=0;l<elec1_vector.length;l++)
				{
					if(elec1_vector[l].getPartCharge()!='0'&&elec1_vector[l].getPartCharge()!='')
						break;
				}
				if(l==elec1_vector.length)
				{
					var elec1_vector = atom1.getElectronLinkVector();
					for(var l=0;l<elec1_vector.length;l++)
					{
						if(elec1_vector[l].getPartCharge()!='0'&&elec1_vector[l].getPartCharge()!='')
							break;
					}
					var id = 's'+(pt1.xml_id.i)+'-'+(pt1.xml_id.j)+'-a'+(pt1.xml_id.k)+'e'+(l);
					itr.setSourceId(id);
					var elec1_vector = atom2.getElectronLinkVector();
					for(var l=0;l<elec1_vector.length;l++)
					{
						if(elec1_vector[l].getCharge()!='0'&&elec1_vector[l].getCharge()!='')
							break;
					}					
				}
				var id = 's'+(pt2.xml_id.i)+'-'+(pt2.xml_id.j)+'-a'+(pt2.xml_id.k)+'e'+(l);
				itr.setTargetId(id);
			}
			
			itr.setX1(atom1.getX());
			itr.setY1(atom1.getY());
			itr.setX2(atom2.getX());
			itr.setY2(atom2.getY());
			
			itl_count++;
			undo_stack.push(arr);
			var toPush = copyStructure(structure);
			undo_stack_jsobj.push(toPush);
		}
	}	
	if(interact_flag=='dipole_dipole')
	{
		var atom1 = atom[pt1.atm_id];
		var atom2 = atom[pt2.atm_id];
		var atom1_partcharge = atom1.getPartCharge();
		var atom2_partcharge = atom2.getPartCharge();
		var l_adjust = 2.7;
		if(atom1_partcharge!='0'&&atom1_partcharge!=''&&atom2_partcharge!='0'&&atom2_partcharge!=''&&atom1_partcharge!=atom2_partcharge)
		{
			for(var i=0;i<structure.length;i++)
			{
				if(typeof(structure[i].getFragmentVector)!='function')
				{
					var x1 = Number(structure[i].getX1());
					var x2 = Number(structure[i].getX2());
					var y1 = Number(structure[i].getY1());
					var y2 = Number(structure[i].getY2());
					var at_x1 = Number(atom1.getX());
					var at_x2 = Number(atom2.getX());
					var at_y1 = Number(atom1.getY());
					var at_y2 = Number(atom2.getY());
					if((at_x1==x1&&at_x2==x2&&at_y1==y1&&at_y2==y2)||(at_x1==x2&&at_x1==x2&&at_y1==y2&&at_y2==y1))
					{
						clear();
						return;
					}
				}
			}
			var line = document.createElementNS(svgNS,'line');
			line.id = "itl["+itl_count+"]";
			line.setAttribute('x1',Number(pt1.x)+l_adjust);
			line.setAttribute('y1',Number(pt1.y)-l_adjust);
			line.setAttribute('x2',Number(pt2.x)+l_adjust);
			line.setAttribute('y2',Number(pt2.y)-l_adjust);
			line.setAttribute('id1',pt1.g_id);
			line.setAttribute('id2',pt2.g_id);
			line.setAttribute('str_id1',pt1.str_id);
			line.setAttribute('str_id2',pt2.str_id);
			line.setAttribute('stroke','rgb(255, 102, 0)');
			line.setAttribute('stroke-dasharray','1,1');
			line.setAttribute('d','M5 20 l215 0');
			line.setAttribute('stroke-width',0.75);
			svg.appendChild(line);
			
			var obj1= document.getElementById(pt1.g_id);
			svg.removeChild(obj1);
			svg.appendChild(obj1);
			var obj2= document.getElementById(pt2.g_id);
			svg.removeChild(obj2);
			svg.appendChild(obj2);
			arr.push(line.id);
			
			var itr = new Interact();
			structure.push(itr);
			itr.setTitle('cordinate');
			itr.setType('dipole-dipole');
			itr.setSourceObject(atom1.getTitle());
			itr.setTargetObject(atom2.getTitle());
			var elec1_vector = atom1.getElectronLinkVector();
			for(var l=0;l<elec1_vector.length;l++)
			{
				if(elec1_vector[l].getPartCharge()!='0'&&elec1_vector[l].getPartCharge()!='')
					break;
			}
			var id = 's'+(pt1.xml_id.i)+'-'+(pt1.xml_id.j)+'-a'+(pt1.xml_id.k)+'e'+(l);
			itr.setSourceId(id);
			var elec1_vector = atom2.getElectronLinkVector();
			for(var l=0;l<elec1_vector.length;l++)
			{
				if(elec1_vector[l].getPartCharge()!='0'&&elec1_vector[l].getPartCharge()!='')
					break;
			}
			var id = 's'+(pt2.xml_id.i)+'-'+(pt2.xml_id.j)+'-a'+(pt2.xml_id.k)+'e'+(l);
			itr.setTargetId(id);			
			itr.setX1(atom1.getX());
			itr.setY1(atom1.getY());
			itr.setX2(atom2.getX());
			itr.setY2(atom2.getY());
			
			itl_count++;
			undo_stack.push(arr);
			var toPush = copyStructure(structure);
			undo_stack_jsobj.push(toPush);
		}
	}
	if(interact_flag=='h_bond')
	{
		var atom1 = atom[pt1.atm_id];
		var atom2 = atom[pt2.atm_id];
		var atom1_partcharge = atom1.getPartCharge();
		var atom2_partcharge = atom2.getPartCharge();
		var obj = document.getElementById(pt1.g_id);
		if(obj.childNodes[1].childNodes[0].nodeValue!="H")
		{
			clear();
			return;
		}
		var l_adjust = 2.7;
		if(atom1_partcharge!='0'&&atom1_partcharge!=''&&atom2_partcharge!='0'&&atom2_partcharge!=''&&atom1_partcharge!=atom2_partcharge)
		{
			for(var i=0;i<structure.length;i++)
			{
				if(typeof(structure[i].getFragmentVector)!='function')
				{
					var x1 = Number(structure[i].getX1());
					var x2 = Number(structure[i].getX2());
					var y1 = Number(structure[i].getY1());
					var y2 = Number(structure[i].getY2());
					var at_x1 = Number(atom1.getX());
					var at_x2 = Number(atom2.getX());
					var at_y1 = Number(atom1.getY());
					var at_y2 = Number(atom2.getY());
					if((at_x1==x1&&at_x2==x2&&at_y1==y1&&at_y2==y2)||(at_x1==x2&&at_x1==x2&&at_y1==y2&&at_y2==y1))
					{
						clear();
						return;
					}
				}
			}
			var line = document.createElementNS(svgNS,'line');
			line.id = "itl["+itl_count+"]";
			line.setAttribute('x1',Number(pt1.x)+l_adjust);
			line.setAttribute('y1',Number(pt1.y)-l_adjust);
			line.setAttribute('x2',Number(pt2.x)+l_adjust);
			line.setAttribute('y2',Number(pt2.y)-l_adjust);
			line.setAttribute('id1',pt1.g_id);
			line.setAttribute('id2',pt2.g_id);
			line.setAttribute('str_id1',pt1.str_id);
			line.setAttribute('str_id2',pt2.str_id);
			line.setAttribute('stroke','Fuchsia');
			line.setAttribute('stroke-dasharray','1,1');
			line.setAttribute('d','M5 20 l215 0');
			line.setAttribute('stroke-width',0.75);
			svg.appendChild(line);
			
			var obj1= document.getElementById(pt1.g_id);
			svg.removeChild(obj1);
			svg.appendChild(obj1);
			var obj2= document.getElementById(pt2.g_id);
			svg.removeChild(obj2);
			svg.appendChild(obj2);
			arr.push(line.id);
			
			var itr = new Interact();
			structure.push(itr);
			itr.setTitle('hydrogen bond');
			itr.setType('HBond');
			itr.setSourceObject(atom1.getTitle());
			itr.setTargetObject(atom2.getTitle());
			var elec1_vector = atom1.getElectronLinkVector();
			for(var l=0;l<elec1_vector.length;l++)
			{
				if(elec1_vector[l].getPartCharge()!='0'&&elec1_vector[l].getPartCharge()!='')
					break;
			}
			var id = 's'+(pt1.xml_id.i)+'-'+(pt1.xml_id.j)+'-a'+(pt1.xml_id.k)+'e'+(l);
			itr.setSourceId(id);
			var elec1_vector = atom2.getElectronLinkVector();
			for(var l=0;l<elec1_vector.length;l++)
			{
				if(elec1_vector[l].getPartCharge()!='0'&&elec1_vector[l].getPartCharge()!='')
					break;
			}
			var id = 's'+(pt2.xml_id.i)+'-'+(pt2.xml_id.j)+'-a'+(pt2.xml_id.k)+'e'+(l);
			itr.setTargetId(id);			
			itr.setX1(atom1.getX());
			itr.setY1(atom1.getY());
			itr.setX2(atom2.getX());
			itr.setY2(atom2.getY());
			
			itl_count++;
			undo_stack.push(arr);
			var toPush = copyStructure(structure);
			undo_stack_jsobj.push(toPush);
		}
	}
	clear();
}
function event_isotope_label(event)
{
	if(event.which==3)
		return;
	var arr_isotope_count = new Array();
	var arr = new Array();
	pt1 = jsObjCollisionDetect(event,bondCount);
	stack_check();
	if(pt1==0||pt1.collision==false)
	{
		clear();
		return;
	}
	var obj = document.getElementById(pt1.g_id);
	var isotopeList=isotopeOwl.getElementsByTagName('ClassAssertion');
	var atm_id = collisionDetectAtomIndex(pt1.x,pt1.y);
	var title = atom[atm_id].getTitle();
	var len=isotopeList.length;
	
	for(var i=0;i<len;i++)
	{
		var namedIndividual = isotopeList[i].getElementsByTagName('NamedIndividual');
		namedIndividual = namedIndividual[0].getAttribute('IRI');
		namedIndividual = namedIndividual.slice(1);
		namedIndividual = namedIndividual.split('-');
		if(namedIndividual[0]==title)
		{
			if(typeof(namedIndividual[1])=='undefined')
				arr_isotope_count.push('none');
			else
				arr_isotope_count.push(namedIndividual[1]);
		}		
	}
	Prompt.render(arr_isotope_count,'status');
}
function set_isotope_label(div)
{
	var value = div.innerHTML;
	var obj = document.getElementById(pt1.g_id);
	if(value=='none')
	{
		obj.childNodes[4].childNodes[0].nodeValue="";
		atom[pt1.atm_id].setIsotopeLabel('');
	}
	else
	{
		obj.childNodes[4].childNodes[0].nodeValue=value;
		atom[pt1.atm_id].setIsotopeLabel(value);
	}		
}
function find_interact(obj,skip_value)
{
	for(var j=0;j<structure.length;j++)
	{
		if(typeof(structure[j].getFragmentVector)!='function')
		{
			var x1 = Number(structure[j].getX1());
			var x2 = Number(structure[j].getX2());
			var y1 = Number(structure[j].getY1());
			var y2 = Number(structure[j].getY2());
			var l_adjust=2.7;
			var at_x1 = Number(obj.getAttribute('x1'))-l_adjust;
			var at_x2 = Number(obj.getAttribute('x2'))-l_adjust;
			var at_y1 = Number(obj.getAttribute('y1'))+l_adjust;
			var at_y2 = Number(obj.getAttribute('y2'))+l_adjust;
			at_x1 = at_x1.toFixed(2);
			at_x2 = at_x2.toFixed(2);
			at_y1 = at_y1.toFixed(2);
			at_y2 = at_y2.toFixed(2);
			if((at_x1==x1&&at_x2==x2&&at_y1==y1&&at_y2==y2)||(at_x1==x2&&at_x1==x2&&at_y1==y2&&at_y2==y1))
			{
				toSkip[j]=skip_value;
			}
		}
	}
}
function click_open_template(event)
  {
	e = event;
	if(event.which==3)
		return;
	stack_check();
	var arr = new Array();
	pt1=jsObjCollisionDetect(e,bondCount);
	if(pt1==0||pt1.collision==true)
	{
		clear();
		return;
	}
	var old_count = count;
	var old_l_count = l_count;
	draw_xml(pt1);
	for(var i=old_l_count;i<l_count;i++)
	{
		var id = "l["+i+"]";
		arr.push(id);
	}
	for(var i=old_count;i<count;i++)
	{
		var id = "g["+i+"]";
		arr.push(id);
	}
	undo_stack.push(arr);
	var toPush = copyStructure(structure);
	undo_stack_jsobj.push(toPush);
  }
  function click_add_caption(event)
  {
	e = event;
	if(event.which==3)
		return;
	stack_check();
	var arr = new Array();
	pt1=jsObjCollisionDetect(e,bondCount);
	if(pt1==0||pt1.collision==true)
	{
		clear();
		return;
	}
	input_prompt.render();
  }
  function set_caption(value)
  {
	 var text = document.createElementNS(svgNS,'text');
	text.id = "capt["+capt_count+"]";
    text.setAttribute('x',pt1.x);
    text.setAttribute('y',pt1.y);
    text.setAttribute('fill','black');
	var textNode = document.createTextNode(value);

	text.appendChild(textNode);
	svg.appendChild(text);
	capt_count++;
  }
  function down_move_caption(event)
  {
	e = event;
	if(event.which==3)
		return;
	pt1=jsObjCollisionDetect(e,bondCount);
	if(pt1==0||pt1.collision==true)
	{
		clear();
		return;
	}
	var collision_flag = false;capt_id=0;
	for(var i=0;i<capt_count;i++)
	{
		var id = 'capt['+i+']';
		var obj = document.getElementById(id);
		if(obj==null)
			continue;
		var x1 = Number(obj.getAttribute('x'));
		var y1 = Number(obj.getAttribute('y'))- 2.7;
		var txt = obj.childNodes[0].nodeValue;
		var y2 = y1 + 6;
		var x2 = x1 + txt.length*3;
		if(pt1.x>x1&&pt1.x<x2&&pt1.y>y1&&pt1.y<y2)
		{
			collision_flag = true;
			capt_id = id;
		}
	}
	if(collision_flag==true)
	{
		document.getElementById("s_content").addEventListener('mousemove',move_move_caption);
	}	
  }
 function move_move_caption(event)
 {
	captionAnimation(event);
	document.getElementById("s_content").addEventListener('mouseup',up_move_caption);	
 }
 
 function up_move_caption(event)
{
	e = event;
	if(event.which==3)
		return;
	var pt2=jsObjCollisionDetect(e,bondCount);
	if(pt2==0||pt2.collision==true)
	{
		clear();
		return;
	}
	if(capt_id!=0)
	{
		var obj = document.getElementById(capt_id);
		obj.setAttribute('x',pt2.x);
		obj.setAttribute('y',pt2.y);
	}	
	clear();
}
function setLineAttribute(line_id,id1,id2)
{
	var line = document.getElementById(line_id);
	line.setAttribute('id1',id1);
	line.setAttribute('id2',id2);
}
function atom_replace(pt)
{
	var arr = new Array();
	var obj = document.getElementById(pt.g_id);
	if(obj.childNodes[1].childNodes[0].nodeValue!=symbol&&obj.childNodes[3].childNodes[0].nodeValue.length==0)
	{
		var bpair_count = 0;var upair_count = 0;
		var elink_array = new Array();var tgt_id_arr = new Array();var atm_id_arr = new Array();var elec_id_arr = new Array();var tgt_elec_id_arr = new Array();
		var elec_vector = atom[pt.atm_id].getElectronLinkVector();
		for(var i=0;i<elec_vector.length;i++)
		{
			var e_status = elec_vector[i].getElectronStatus();
			if(elec_vector[i].getBondType()=='Coordinate')
				return;
			if(e_status=='bPair')
			{
				bpair_count++;
				elink_array.push(elec_vector[i]);
				tgt_id_arr.push(elec_vector[i].getTarget());
			}
		}
		atomList=atomFragmentListXML.getElementsByTagName('atomFragment');
		var len=atomList.length;var temp_atom;var id=atom[pt.atm_id].getId();
		for(i=0;i<len;i++)
		{
			var elementAtom = atomList[i];
			if(elementAtom.getAttribute("symbol")==symbol&&elementAtom.getAttribute("chargeCount")==0)
			{
				temp_atom = new Atom();
				temp_atom.setId(id);
				temp_atom.setX(pt.x.toFixed(2));
				temp_atom.setY(pt.y.toFixed(2));
				temp_atom.setAtNo(elementAtom.getAttribute("atNo"));
				temp_atom.setTitle(elementAtom.getAttribute("name"));
				temp_atom.setSymbol(elementAtom.getAttribute("symbol"));
				temp_atom.setCharge(elementAtom.getAttribute("charge"));
				temp_atom.setChargeCount(elementAtom.getAttribute("chargeCount"));
				temp_atom.setElectroNegativity(elementAtom.getAttribute("electroNegativity"));
				temp_atom.setBlock(elementAtom.getAttribute("block"));
				temp_atom.setHybridization(elementAtom.getAttribute("hybridization"));
				temp_atom.setPartCharge(0);
				temp_atom.setPartChargeVal(0);
				var orbList = elementAtom.getElementsByTagName("electronLink");
				var l=0;	
				for (k = 0; k < orbList.length; k++) 
				{
					var elementOrb =orbList[k];
					elink = new ElectronLink();
					var eid=id+'e'+k;  
					elink.setX1(pt.x.toFixed(2));
					elink.setX2(pt.x.toFixed(2));
					elink.setY1(pt.y.toFixed(2));
					elink.setY2(pt.y.toFixed(2));
					elink.setPartCharge(0);
					elink.setPartChargeVal(0);
					elink.setElectronStatus(elementOrb.getAttribute("electronStatus"));
					elink.setCharge(elementOrb.getAttribute("charge"));
					elink.setChargeCount(elementOrb.getAttribute("chargeCount"));
					if(elink.getElectronStatus()=='uPair')
					{
						upair_count++;
						if(l<elink_array.length)
						{
							elink = elink_array[l++];
							elec_id_arr.push(k);
							tgt_elec_id_arr.push(eid);
						}						
					}
					elink.setId(eid);
					elink.setTitle(elementOrb.getAttribute("title"));
					elink.setType(elementOrb.getAttribute("type"));
					temp_atom.setElectronLink(elink);
				}

			}
		}
		if(bpair_count<=upair_count)
		{
			atom[pt.atm_id] = temp_atom;
			var frg_len = fragment.length;
			for(var i=0;i<frg_len;i++)
			{
				var atm_vec = fragment[i].getAtomVector();
				var atm_len = atm_vec.length;
				for(var j=0;j<atm_len;j++)
				{				
					if(atm_vec[j].getId()==id)
					{
						atm_vec[j]=atom[pt.atm_id];
						if(fragment[i].type=='AtomFragment')
						{
							fragment[i].setTitle(temp_atom.getTitle());
							fragment[i].setFormula(symbol);
						}
					}
				}
			}
			var atm_len = atom.length;
			var tgt_len = tgt_id_arr.length;
			for(var j=0;j<tgt_len;j++)			
			{			
				for(var i=0;i<atm_len;i++)
				{				
					var a_id = atom[i].getId();
					if(tgt_id_arr[j].split('e')[0]==a_id)
					{
						var elec_vec = atom[i].getElectronLinkVector();
						var elec_len = elec_vec.length;
						for(var k=0;k<elec_len;k++)
						{							
							if(elec_vec[k].getId()==tgt_id_arr[j])
							{
								set_part_charge_elec(i,pt.atm_id,k);
								elec_vec[k].setTarget(tgt_elec_id_arr[j]);
								break;
							}								
						}
						set_part_charge_atom(i);
						atm_id_arr.push(i);
					}
				}
			}
			for(var i=0;i<atm_id_arr.length;i++)
			{
				set_part_charge_elec(pt.atm_id,atm_id_arr[i],elec_id_arr[i]);
			}
			set_part_charge_atom(pt.atm_id);
			arr.push('atom_replace');
			arr.push(obj);
			arr.push(obj.childNodes[1].childNodes[0].nodeValue);
			obj.childNodes[1].childNodes[0].nodeValue=symbol;
			obj.childNodes[2].childNodes[0].nodeValue="";
			obj.childNodes[3].childNodes[0].nodeValue="";
			obj.childNodes[4].childNodes[0].nodeValue="";			
			
			if(uPairCount(pt)==0&&lPairCount(pt)==0)
			{
				if(symbol=='C')
				{
					obj.style.visibility='hidden';
					obj.childNodes[1].setAttribute('fill','black');
				}
				else
				{
					obj.style.visibility='visible';
					obj.childNodes[1].setAttribute('fill','black');
				}
			}
			else
			{
				obj.style.visibility='visible';
				obj.childNodes[1].setAttribute('fill','red');
			}
		}
		else
		{
			Alert.render("Invalid Atom Replacement");
		}
	}
	else
	{
		return;
	}
	undo_stack.push(arr);
	var toPush = copyStructure(structure);
	undo_stack_jsobj.push(toPush);
}
function msdown_arrow(event)
{
	e = event;
	if(event.which==3)
		return;
	stack_check();
	pt1=jsObjCollisionDetect(e,0);
	if(pt1==0||pt1.collision==true)
	{
		clear();
		return;
	}
	animline.style.visibility = "hidden";
	document.getElementById("s_content").addEventListener('mouseup',msup_arrow);
	document.getElementById("s_content").addEventListener('mousemove',msmove_arrow);
}
function msmove_arrow(event)
{
	lineAnimation(event);
	document.getElementById("s_content").addEventListener('mouseup',msup_arrow);	
}
function msup_arrow(event)
{
	var pt2 = jsObjCollisionDetect(event,0);var temp_pt = {x:0,y:0};var arrow_head_dist = 5;var l_adjust = 2.7
	pt1.x=pt1.x+l_adjust;
	pt1.y=pt1.y-l_adjust;
	pt2.x=pt2.x+l_adjust;
	pt2.y=pt2.y-l_adjust;
	
	var g = document.createElementNS(svgNS, "g");
	g.id = 'arw_g['+arrow_count+']';
    g.setAttribute('shape-rendering', 'inherit');
    g.setAttribute('pointer-events', 'all');
	
	var line = document.createElementNS(svgNS,'line');
	line.id = 'arw_st['+arrow_count+']';
	line.setAttribute('x1',pt1.x);
	line.setAttribute('y1',pt1.y);
	line.setAttribute('x2',pt2.x);
	line.setAttribute('y2',pt2.y);
	line.setAttribute('stroke','rgb(0,0,0)');
	line.setAttribute('stroke-width',0.75);
	g.appendChild(line);
	
	var deg = round(degree(pt1,pt2));
	if(deg<0)
		deg += 360;
	temp_pt.x=pt2.x-arrow_head_dist*Math.cos((deg-135)*Math.PI/180);
	temp_pt.y=pt2.y-arrow_head_dist*Math.sin((deg-135)*Math.PI/180);
	
	var line = document.createElementNS(svgNS,'line');
	line.id = 'arw_up['+arrow_count+']';
	line.setAttribute('x1',pt2.x);
	line.setAttribute('y1',pt2.y);
	line.setAttribute('x2',temp_pt.x);
	line.setAttribute('y2',temp_pt.y);
	line.setAttribute('stroke','rgb(0,0,0)');
	line.setAttribute('stroke-width',0.75);
	g.appendChild(line);
	
	temp_pt.x=pt2.x-arrow_head_dist*Math.cos((deg+135)*Math.PI/180);
	temp_pt.y=pt2.y-arrow_head_dist*Math.sin((deg+135)*Math.PI/180);
	
	var line = document.createElementNS(svgNS,'line');
	line.id = 'arw_bw['+arrow_count+']';
	line.setAttribute('x1',pt2.x);
	line.setAttribute('y1',pt2.y);
	line.setAttribute('x2',temp_pt.x);
	line.setAttribute('y2',temp_pt.y);
	line.setAttribute('stroke','rgb(0,0,0)');
	line.setAttribute('stroke-width',0.75);
	g.appendChild(line);
	
	svg.appendChild(g);
	arrow_count++;
	clear();
}
function msdown_rev_arrow(event)
{
	e = event;
	if(event.which==3)
		return;
	stack_check();
	pt1=jsObjCollisionDetect(e,0);
	if(pt1==0||pt1.collision==true)
	{
		clear();
		return;
	}
	animline.style.visibility = "hidden";
	document.getElementById("s_content").addEventListener('mouseup',msup_rev_arrow);
	document.getElementById("s_content").addEventListener('mousemove',msmove_rev_arrow);
}
function msmove_rev_arrow(event)
{
	lineAnimation(event);
	document.getElementById("s_content").addEventListener('mouseup',msup_rev_arrow);	
}
function msup_rev_arrow(event)
{
	var pt2 = jsObjCollisionDetect(event,0);var temp_pt = {x:0,y:0};var arrow_head_dist = 5;var l_adjust = 2.7
	pt1.x=pt1.x+l_adjust;
	pt1.y=pt1.y-l_adjust;
	pt2.x=pt2.x+l_adjust;
	pt2.y=pt2.y-l_adjust;
	
	var g = document.createElementNS(svgNS, "g");
	g.id = 'rarw_g['+rev_arrow_count+']';
    g.setAttribute('shape-rendering', 'inherit');
    g.setAttribute('pointer-events', 'all');
	
	var line = document.createElementNS(svgNS,'line');
	line.id = 'rarw_st1['+rev_arrow_count+']';
	line.setAttribute('x1',pt1.x);
	line.setAttribute('y1',pt1.y);
	line.setAttribute('x2',pt2.x);
	line.setAttribute('y2',pt2.y);
	line.setAttribute('stroke','rgb(0,0,0)');
	line.setAttribute('stroke-width',0.75);
	g.appendChild(line);
	
	var deg = round(degree(pt1,pt2));
	if(deg<0)
		deg += 360;
	temp_pt.x=pt2.x-arrow_head_dist*Math.cos((deg-135)*Math.PI/180);
	temp_pt.y=pt2.y-arrow_head_dist*Math.sin((deg-135)*Math.PI/180);
	
	var line = document.createElementNS(svgNS,'line');
	line.id = 'rarw_up['+rev_arrow_count+']';
	line.setAttribute('x1',pt2.x);
	line.setAttribute('y1',pt2.y);
	line.setAttribute('x2',temp_pt.x);
	line.setAttribute('y2',temp_pt.y);
	line.setAttribute('stroke','rgb(0,0,0)');
	line.setAttribute('stroke-width',0.75);
	g.appendChild(line);
	
	var rad = Math.atan2(pt1.y-pt2.y,pt1.x-pt2.x) - Math.PI/2;
	var dist = -1.5;
	pt1.x = pt1.x - dist*Math.cos(rad);
	pt1.y = pt1.y - dist*Math.sin(rad);
	pt2.x = pt2.x - dist*Math.cos(rad);
	pt2.y = pt2.y - dist*Math.sin(rad);
	
	var line = document.createElementNS(svgNS,'line');
	line.id = 'rarw_st2['+rev_arrow_count+']';
	line.setAttribute('x1',pt1.x);
	line.setAttribute('y1',pt1.y);
	line.setAttribute('x2',pt2.x);
	line.setAttribute('y2',pt2.y);
	line.setAttribute('stroke','rgb(0,0,0)');
	line.setAttribute('stroke-width',0.75);
	g.appendChild(line);
	
	temp_pt.x=pt1.x-arrow_head_dist*Math.cos((deg+45)*Math.PI/180);
	temp_pt.y=pt1.y-arrow_head_dist*Math.sin((deg+45)*Math.PI/180);
	
	var line = document.createElementNS(svgNS,'line');
	line.id = 'rarw_bw['+rev_arrow_count+']';
	line.setAttribute('x1',temp_pt.x);
	line.setAttribute('y1',temp_pt.y);
	line.setAttribute('x2',pt1.x);
	line.setAttribute('y2',pt1.y);
	line.setAttribute('stroke','rgb(0,0,0)');
	line.setAttribute('stroke-width',0.75);
	g.appendChild(line);
	
	svg.appendChild(g);
	rev_arrow_count++;
	clear();
}
function event_draw_sign(event)
{
	if(event.which==3)
		return;
	stack_check();
	var pt=jsObjCollisionDetect(event,0);
	if(pt==0||pt.collision==true)
	{
		clear();
		return;
	}
	var text = document.createElementNS(svgNS,'text');
	text.id = "sign["+sign_count+"]";var sign_adjust = 0;
	if(symbol=='+')
		sign_adjust = 2;
	else
		sign_adjust = -4;
    text.setAttribute('x',pt.x);
    text.setAttribute('y',pt.y+sign_adjust);
    text.setAttribute('fill','black');
	text.setAttribute('font-size','11px');
	var textNode = document.createTextNode(symbol);
	text.appendChild(textNode);
	svg.appendChild(text);
	sign_count++;
	clear();
}
function event_delete_caption(event)
{
	if(event.which==3)
		return;
	stack_check();var pt={x:0,y:0};
	pt.x = event.clientX; pt.y = event.clientY;
	for(var i=0;i<capt_count;i++)
	{
		var id = "capt["+i+"]";
		var elem = document.getElementById(id);		
		if(elem!=null)
		{
			var rect = elem.getBoundingClientRect();
			if(pt.x<=rect.right&&pt.x>=rect.left&&pt.y<=rect.bottom&&pt.y>=rect.top)
			{
				svg.removeChild(document.getElementById(id));				
				break;
			}
		}
	}
	clear();
}
function event_del_arr_sign(event)
{
	if(event.which==3)
		return;
	stack_check();var pt={x:0,y:0};
	pt.x = event.clientX; pt.y = event.clientY;var i;
	for(i=0;i<arrow_count;i++)
	{
		var id = "arw_g["+i+"]";
		var elem = document.getElementById(id);		
		if(elem!=null)
		{
			var rect = elem.getBoundingClientRect();
			if(pt.x<=rect.right&&pt.x>=rect.left&&pt.y<=rect.bottom&&pt.y>=rect.top)
			{
				svg.removeChild(document.getElementById(id));				
				break;
			}
		}
	}
	if(i==arrow_count)
	{
		for(i=0;i<rev_arrow_count;i++)
		{
			var id = "rarw_g["+i+"]";
			var elem = document.getElementById(id);		
			if(elem!=null)
			{
				var rect = elem.getBoundingClientRect();
				if(pt.x<=rect.right&&pt.x>=rect.left&&pt.y<=rect.bottom&&pt.y>=rect.top)
				{
					svg.removeChild(document.getElementById(id));				
					break;
				}
			}
		}
	}
	if(i==rev_arrow_count)
	{
		for(i=0;i<sign_count;i++)
		{
			var id = "sign["+i+"]";
			var elem = document.getElementById(id);		
			if(elem!=null)
			{
				var rect = elem.getBoundingClientRect();
				if(pt.x<=rect.right&&pt.x>=rect.left&&pt.y<=rect.bottom&&pt.y>=rect.top)
				{
					svg.removeChild(document.getElementById(id));				
					break;
				}
			}
		}
	}
	clear();
}
function clear()
{
	animline.style.visibility = "hidden";
	document.getElementById("s_content").removeEventListener("mouseup", msup);
	document.getElementById("s_content").removeEventListener("mousemove", msmove);
	document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
	document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
	document.getElementById("s_content").removeEventListener("mousemove", bridge_msmove);
	document.getElementById("s_content").removeEventListener("mouseup", bridge_msup);
	document.getElementById("s_content").removeEventListener("mousemove", str_grp_move);
	document.getElementById("s_content").removeEventListener("mouseup", str_grp_up);
	document.getElementById("s_content").removeEventListener("mousemove", change_orientation_move);
	document.getElementById("s_content").removeEventListener("mouseup", change_orientation_up);
	document.getElementById("s_content").removeEventListener("mousemove", move_interact);
	document.getElementById("s_content").removeEventListener("mouseup", up_interact);
	document.getElementById("s_content").removeEventListener('mouseup',down_move_caption);
	document.getElementById("s_content").removeEventListener('mousemove',move_move_caption);
	document.getElementById("s_content").removeEventListener("mousemove", bond_skeleton_msmove);
	document.getElementById("s_content").removeEventListener("mouseup", bond_skeleton_msup);
	document.getElementById("s_content").removeEventListener("mousemove", msmove_arrow);
	document.getElementById("s_content").removeEventListener("mouseup", msup_arrow);
	document.getElementById("s_content").removeEventListener("mousemove", msmove_rev_arrow);
	document.getElementById("s_content").removeEventListener("mouseup", msup_rev_arrow);
	drawChargeCount();
	if(unpaired_electron_flag=='visible')
		upair_electrons(false);
	if(lonepaired_electron_flag=='visible')
		lpair_electrons(false);
	if(vacant_electron_flag=='visible')
		vacant_electrons(false);
}
function clr()
{
	animline.style.visibility = "hidden";
	document.getElementById("s_content").removeEventListener("mouseup", msup);
	document.getElementById("s_content").removeEventListener("mousemove", msmove);
	document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
	document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
	document.getElementById("s_content").removeEventListener("mousemove", bridge_msmove);
	document.getElementById("s_content").removeEventListener("mouseup", bridge_msup);
	document.getElementById("s_content").removeEventListener("mousemove", str_grp_move);
	document.getElementById("s_content").removeEventListener("mouseup", str_grp_up);
	remove_attribute();
	document.getElementById("s_content").removeEventListener("mousemove", change_orientation_move);
	document.getElementById("s_content").removeEventListener("mouseup", change_orientation_up);
	document.getElementById("s_content").removeEventListener("mousemove", move_interact);
	document.getElementById("s_content").removeEventListener("mouseup", up_interact);
	document.getElementById("s_content").removeEventListener('mouseup',down_move_caption);
	document.getElementById("s_content").removeEventListener('mousemove',move_move_caption);
	document.getElementById("s_content").removeEventListener("mousemove", bond_skeleton_msmove);
	document.getElementById("s_content").removeEventListener("mouseup", bond_skeleton_msup);
	document.getElementById("s_content").removeEventListener("mousemove", msmove_arrow);
	document.getElementById("s_content").removeEventListener("mouseup", msup_arrow);
	document.getElementById("s_content").removeEventListener("mousemove", msmove_rev_arrow);
	document.getElementById("s_content").removeEventListener("mouseup", msup_rev_arrow);
	drawChargeCount();
	if(unpaired_electron_flag=='visible')
		upair_electrons(false);
	if(lonepaired_electron_flag=='visible')
		lpair_electrons(false);
	if(vacant_electron_flag=='visible')
		vacant_electrons(false);
}
  function eventClear()
  {
	document.getElementById("s_content").removeEventListener("mousedown", bridge_line);
	document.getElementById("s_content").removeEventListener("mousemove", bridge_msmove);
	document.getElementById("s_content").removeEventListener("mouseup", bridge_msup);
	document.getElementById("s_content").removeEventListener("mousedown", ring_line);
	document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
	document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
	document.getElementById("s_content").removeEventListener("mousedown", line);
	document.getElementById("s_content").removeEventListener("mousemove", msmove);
	document.getElementById("s_content").removeEventListener("mouseup", msup);
	document.getElementById("s_content").removeEventListener("click", event_delete_structure);
	document.getElementById("s_content").removeEventListener("mousedown", str_grp_down);
	document.getElementById("s_content").removeEventListener("mousemove", str_grp_move);
	document.getElementById("s_content").removeEventListener("mouseup", str_grp_up);
	document.getElementById("s_content").removeEventListener("click", event_plane_projection);
	document.getElementById("s_content").removeEventListener("mousedown", change_orientation_down);
	document.getElementById("s_content").removeEventListener("mousemove", change_orientation_move);
	document.getElementById("s_content").removeEventListener("mouseup", change_orientation_up);
	document.getElementById("s_content").removeEventListener("click", event_atom_postion);
	document.getElementById("s_content").removeEventListener("click", event_add_plus_charge);
	document.getElementById("s_content").removeEventListener("click", event_add_minus_charge);
	document.getElementById("s_content").removeEventListener("mousedown", down_interact);
	document.getElementById("s_content").removeEventListener("mousemove", move_interact);
	document.getElementById("s_content").removeEventListener("mouseup", up_interact);
	document.getElementById("s_content").removeEventListener("click", event_isotope_label);
	document.getElementById("s_content").removeEventListener("click", click_open_template);
	document.getElementById("s_content").removeEventListener("click", click_add_caption);
	document.getElementById("s_content").removeEventListener('mousedown',down_move_caption);
	document.getElementById("s_content").removeEventListener('mousemove',move_move_caption);
	document.getElementById("s_content").removeEventListener('mouseup',up_move_caption);
	document.getElementById("s_content").removeEventListener("mousedown", bond_skeleton_msdown);
	document.getElementById("s_content").removeEventListener("mousemove", bond_skeleton_msmove);
	document.getElementById("s_content").removeEventListener("mouseup", bond_skeleton_msup);
	document.getElementById("s_content").removeEventListener("mousedown", msdown_arrow);
	document.getElementById("s_content").removeEventListener("mousemove", msmove_arrow);
	document.getElementById("s_content").removeEventListener("mouseup", msup_arrow);
	document.getElementById("s_content").removeEventListener("mousedown", msdown_rev_arrow);
	document.getElementById("s_content").removeEventListener("mousemove", msmove_rev_arrow);
	document.getElementById("s_content").removeEventListener("mouseup", msup_rev_arrow);
	document.getElementById("s_content").removeEventListener("click", event_draw_sign);
	document.getElementById("s_content").removeEventListener("click", event_delete_caption);
	document.getElementById("s_content").removeEventListener("click", event_del_arr_sign);
	drawChargeCount();
	if(unpaired_electron_flag=='visible')
		upair_electrons(false);
	if(lonepaired_electron_flag=='visible')
		lpair_electrons(false);
	if(vacant_electron_flag=='visible')
		vacant_electrons(false);
	bondDistance = 20;
  }