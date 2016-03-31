function lineAnimation(event)
{
	pt.x = event.clientX + clientXchange; pt.y = event.clientY + clientYchange;var l_adjust=2.7;// -4 && 15 to center the drawn text on mouse pointer
	var a = svg.getScreenCTM();
    var b = a.inverse();
    var point = pt.matrixTransform(b);
	animline.style.visibility = "visible";
	animline.setAttribute('x1',Number(pt1.x)+l_adjust);
	animline.setAttribute('y1',pt1.y-l_adjust);
	animline.setAttribute('x2',point.x+l_adjust);
	animline.setAttribute('y2',point.y-l_adjust);
	animline.setAttribute('stroke','red');
	animline.setAttribute('stroke-width',0.75);
	if(unpaired_electron_flag=='visible')
		upair_electrons(false);
	if(lonepaired_electron_flag=='visible')
		lpair_electrons(false);
	if(vacant_electron_flag=='visible')
		vacant_electrons(false);
}
function toMove(pt1,pt2,skip)
{
	var x_diff = pt2.x - pt1.x;
	var y_diff = pt2.y - pt1.y;
	var elec_assoc_arr = [];var frag_assoc_arr = [];
	var toTranslate = 'translate('+(x_diff)+','+(y_diff)+')';
	for(var i=0;i<count;i++)
	{
		var id='g['+i+']';var atm_id;var x1,y1;
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.hasAttribute('transform')==true)
			obj.removeAttribute('transform');	
		var str_id=obj.getAttribute('str_id');
		if(id!=pt1.g_id&&move_structure_flag=='move_atom')
			continue;
		if(str_id!=pt1.str_id&&move_structure_flag=='move_structure')
			continue;
		var x = Number(obj.childNodes[1].getAttribute('x'));
		var y = Number(obj.childNodes[1].getAttribute('y'));
		if(skip==false)
		{
			x1=Number(atom[i].getX('x'));
			y1=Number(atom[i].getY('y'));
		
			if(x1==x.toFixed(2)&&y1==y.toFixed(2))
				atm_id=i;
			else
				atm_id=collisionDetectAtomIndex(x,y);
		}	
			
		var x = x + x_diff;
		var y = y + y_diff;
		var l_adjust = 2.7;
		
		var c_adjust = obj.childNodes[1].childNodes[0].nodeValue.length-1;
		obj.childNodes[1].setAttribute('x',x);
		obj.childNodes[1].setAttribute('y',y);
		obj.childNodes[2].setAttribute('x',x-l_adjust);
		obj.childNodes[2].setAttribute('y',y-l_adjust);
		obj.childNodes[0].setAttribute('cx',x+l_adjust+c_adjust);
		obj.childNodes[0].setAttribute('cy',y-l_adjust);
		obj.childNodes[3].setAttribute('x',x+2*l_adjust);
		obj.childNodes[3].setAttribute('y',y-2*l_adjust);
		obj.childNodes[4].setAttribute('x',x - l_adjust+1);
		obj.childNodes[4].setAttribute('y',y - 3*l_adjust+1);
		
		if(skip==false)
		{
			atom[atm_id].setX(x.toFixed(2));
			atom[atm_id].setY(y.toFixed(2));
			
			var frg_id=collisionDetectFragmentIndex(x1,y1);
			if(frg_id!=-1)
			{
				var f_x1=Number(fragment[frg_id].getX2('x')).toFixed(2);
				var f_y1=Number(fragment[frg_id].getY2('y')).toFixed(2);
				fragment[frg_id].setX2(x.toFixed(2));
				fragment[frg_id].setY2(y.toFixed(2));
				var combine = f_x1+'-'+f_y1;
				frag_assoc_arr[combine]=x.toFixed(2)+'-'+y.toFixed(2);
			}
			var combine = x1.toFixed(2)+'-'+y1.toFixed(2);
			elec_assoc_arr[combine]=x.toFixed(2)+'-'+y.toFixed(2);
			
			var elec_vector =  atom[atm_id].getElectronLinkVector();
			var len = elec_vector.length;
			for(var j=0;j<len;j++)
			{
				elec_vector[j].setX1(x.toFixed(2));
				elec_vector[j].setY1(y.toFixed(2));
				if(elec_vector[j].getElectronStatus()=='uPair'||elec_vector[j].getElectronStatus()=='lPair'||elec_vector[j].getElectronStatus()=='vacant')
				{
					elec_vector[j].setX2(x.toFixed(2));
					elec_vector[j].setY2(y.toFixed(2));
				}
			}
		}
		
	}
	if(skip==false)
	{
		for(var i=0;i<count;i++)
		{
			var elec_vector=atom[i].getElectronLinkVector();
			var len = elec_vector.length;
			for(var j=0;j<len;j++)
			{
				if(elec_vector[j].getElectronStatus()=='bPair')
				{
					var new_x1 = Number(elec_vector[j].getX2());
					var new_y1 = Number(elec_vector[j].getY2());
					var combine = new_x1.toFixed(2)+'-'+new_y1.toFixed(2);
					combine = elec_assoc_arr[combine];
					if(typeof(combine)!='undefined')
					{
						combine = combine.split('-')
						elec_vector[j].setX2(combine[0]);
						elec_vector[j].setY2(combine[1]);
					}
				}
			}
		}
		for(var j=0;j<frg_count;j++)
		{
			var new_x1 = Number(fragment[j].getX1());
			var new_y1 = Number(fragment[j].getY1());
			var combine = new_x1.toFixed(2)+'-'+new_y1.toFixed(2);
			combine = frag_assoc_arr[combine];
			if(typeof(combine)!='undefined')
			{
				combine = combine.split('-')
				fragment[j].setX1(combine[0]);
				fragment[j].setY1(combine[1]);
			}
		}
	}	
	var bond_flag=[];
	for(var i=0;i<l_count;i++)
	{
		var id='l['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.hasAttribute('transform')==true)
			obj.removeAttribute('transform');
		if(obj.hasAttribute('old_x1')==true)
			obj.removeAttribute('old_x1');
		if(obj.hasAttribute('old_x2')==true)
			obj.removeAttribute('old_x2');
		if(obj.hasAttribute('old_y1')==true)
			obj.removeAttribute('old_y1');
		if(obj.hasAttribute('old_y2')==true)
			obj.removeAttribute('old_y2');
		var id1=obj.getAttribute('id1');
		var id2=obj.getAttribute('id2');
		if((id1!=pt1.g_id)&&move_structure_flag=='move_atom')
			if((id2!=pt1.g_id)&&move_structure_flag=='move_atom')
				continue;
		if(move_structure_flag!='move_atom')
		{
			var str_id=obj.getAttribute('str_id');
			if(str_id!=pt1.str_id&&move_structure_flag=='move_structure')
				continue;
			var new_x = Number(obj.getAttribute('x1'))+x_diff;
			var new_y = Number(obj.getAttribute('y1'))+y_diff;
			obj.setAttribute('x1',new_x);
			obj.setAttribute('y1',new_y);
			var new_x = Number(obj.getAttribute('x2'))+x_diff;
			var new_y = Number(obj.getAttribute('y2'))+y_diff;
			obj.setAttribute('x2',new_x);
			obj.setAttribute('y2',new_y);
			
		}
		else
		{
			if(id1==pt1.g_id)
			{
				var new_x = Number(pt2.x)+l_adjust;
				var new_y = Number(pt2.y)-l_adjust;
				var obj_id2 = document.getElementById(id2);
				var x2 = obj_id2.childNodes[0].getAttribute('cx');
				var y2 = obj_id2.childNodes[0].getAttribute('cy');
				var line_x2 = obj.getAttribute('x2');
				var line_y2 = obj.getAttribute('y2');
				if(!(Number(x2).toFixed(2)==Number(line_x2).toFixed(2)&&Number(y2).toFixed(2)==Number(line_y2).toFixed(2)))
				{
					
					var temp_pt1={x:new_x,y:new_y};var temp_pt2={x:Number(x2),y:Number(y2)};
					var id1_id2 = id1+id2;
					if(typeof(bond_flag[id1_id2])!='undefined')
						var rad = Math.atan2(temp_pt1.y-temp_pt2.y,temp_pt1.x-temp_pt2.x) + Math.PI/2;
					else
						var rad = Math.atan2(temp_pt1.y-temp_pt2.y,temp_pt1.x-temp_pt2.x) - Math.PI/2;
					var dist = 1.5;
					bond_flag[id1_id2]=true;
					temp_pt1.x = temp_pt1.x - dist*Math.cos(rad);
					temp_pt1.y = temp_pt1.y - dist*Math.sin(rad);
					temp_pt2.x = temp_pt2.x - dist*Math.cos(rad);
					temp_pt2.y = temp_pt2.y - dist*Math.sin(rad);
					new_x=temp_pt1.x;
					new_y=temp_pt1.y;
					obj.setAttribute('x2',temp_pt2.x);
					obj.setAttribute('y2',temp_pt2.y);
				}
				obj.setAttribute('x1',new_x);
				obj.setAttribute('y1',new_y);
			}
			else
			{
				var new_x = Number(pt2.x)+l_adjust;
				var new_y = Number(pt2.y)-l_adjust;
				var obj_id1 = document.getElementById(id1);
				var x1 = obj_id1.childNodes[0].getAttribute('cx');
				var y1 = obj_id1.childNodes[0].getAttribute('cy');
				var line_x1 = obj.getAttribute('x1');
				var line_y1 = obj.getAttribute('y1');
				if(!(Number(x1).toFixed(2)==Number(line_x1).toFixed(2)&&Number(y1).toFixed(2)==Number(line_y1).toFixed(2)))
				{
					var temp_pt1={x:new_x,y:new_y};var temp_pt2={x:Number(x1),y:Number(y1)};
					var id1_id2 = id1+id2;
					if(typeof(bond_flag[id1_id2])!='undefined')
						var rad = Math.atan2(temp_pt1.y-temp_pt2.y,temp_pt1.x-temp_pt2.x) - Math.PI/2;
					else
						var rad = Math.atan2(temp_pt1.y-temp_pt2.y,temp_pt1.x-temp_pt2.x) + Math.PI/2;
					var dist = 1.5;
					bond_flag[id1_id2]=true;
					temp_pt1.x = temp_pt1.x - dist*Math.cos(rad);
					temp_pt1.y = temp_pt1.y - dist*Math.sin(rad);
					temp_pt2.x = temp_pt2.x - dist*Math.cos(rad);
					temp_pt2.y = temp_pt2.y - dist*Math.sin(rad);
					new_x=temp_pt2.x;
					new_y=temp_pt2.y;
					obj.setAttribute('x1',temp_pt1.x);
					obj.setAttribute('y1',temp_pt1.y);
				}
				obj.setAttribute('x2',new_x);
				obj.setAttribute('y2',new_y);
			}
		}
		for(var j=0;j<t_count;j++)
			{
				var id='tri['+j+']';
				var obj3=document.getElementById(id);
				if(obj3==null)
					continue;
				var tri_id1 = obj3.getAttribute('id1');
				var tri_id2 = obj3.getAttribute('id2');
				if(id1==tri_id1&&id2==tri_id2)
				{
					if(obj3.hasAttribute('transform')==true)
						obj3.removeAttribute('transform');
					if(obj3.hasAttribute('old_points')==true)
						obj3.removeAttribute('old_points');
					var l_adjust = 2.7;var t_point1,t_point2,t_point3;
					t_point1 = {x:obj.getAttribute('x1'),y:obj.getAttribute('y1')};
					t_point2 = {x:obj.getAttribute('x2'),y:obj.getAttribute('y2')};
					t_point3 = {x:'',y:''};
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
					obj3.setAttribute('points',points);
				}
			}
	}
	var interact_change = [];
	for(var i=0;i<itl_count;i++)
	{
		var id='itl['+i+']';
		var obj=document.getElementById(id);var old_x1,old_x2,old_y1,old_y2;
		if(obj==null)
			continue;
		if(obj.hasAttribute('transform')==true)
			obj.removeAttribute('transform');
		if(obj.hasAttribute('old_x1')==true)
			obj.removeAttribute('old_x1');
		if(obj.hasAttribute('old_x2')==true)
			obj.removeAttribute('old_x2');
		if(obj.hasAttribute('old_y1')==true)
			obj.removeAttribute('old_y1');
		if(obj.hasAttribute('old_y2')==true)
			obj.removeAttribute('old_y2');
		var id1=obj.getAttribute('id1');
		var id2=obj.getAttribute('id2');
		var str_id1=obj.getAttribute('str_id1');
		var str_id2=obj.getAttribute('str_id2');
		if((id1!=pt1.g_id)&&move_structure_flag=='move_atom')
			if((id2!=pt1.g_id)&&move_structure_flag=='move_atom')
				continue;
		if(move_structure_flag=='move_structure_group')
		{
			var new_x = Number(obj.getAttribute('x1'))+x_diff;
			var new_y = Number(obj.getAttribute('y1'))+y_diff;
			var old_x1 = Number(obj.getAttribute('x1'))-l_adjust;
			var old_y1 = Number(obj.getAttribute('y1'))+l_adjust;
			old_x1 = old_x1.toFixed(2);
			old_y1 = old_y1.toFixed(2);
			var new_x1 = Number(new_x-l_adjust).toFixed(2);
			var new_y1 = Number(new_y+l_adjust).toFixed(2);
			var change = old_x1+'-'+old_y1;
			interact_change[change] = new_x1+'-'+new_y1;
			obj.setAttribute('x1',new_x);
			obj.setAttribute('y1',new_y);
			var new_x = Number(obj.getAttribute('x2'))+x_diff;
			var new_y = Number(obj.getAttribute('y2'))+y_diff;
			var old_x2 = Number(obj.getAttribute('x2'))-l_adjust;
			var old_y2 = Number(obj.getAttribute('y2'))+l_adjust;
			old_x2 = old_x2.toFixed(2);
			old_y2 = old_y2.toFixed(2);
			var new_x2 = Number(new_x-l_adjust).toFixed(2);
			var new_y2 = Number(new_y+l_adjust).toFixed(2);
			var change = old_x2+'-'+old_y2;
			interact_change[change] = new_x2+'-'+new_y2;
			obj.setAttribute('x2',new_x);
			obj.setAttribute('y2',new_y);			
		}
		else if(move_structure_flag=='move_structure')
		{
			if(str_id1==pt1.str_id)
			{								
				var line_x1 = Number(document.getElementById(id1).childNodes[0].getAttribute('cx'));
				var line_y1 = Number(document.getElementById(id1).childNodes[0].getAttribute('cy'));
				var old_x1 = Number(line_x1)-l_adjust-x_diff;
				var old_y1 = Number(line_y1)+l_adjust-y_diff;
				old_x1 = old_x1.toFixed(2);
				old_y1 = old_y1.toFixed(2);
				var change = old_x1+'-'+old_y1;
				interact_change[change] = Number(line_x1-l_adjust).toFixed(2)+'-'+Number(line_y1+l_adjust).toFixed(2);
				obj.setAttribute('x1',line_x1);
				obj.setAttribute('y1',line_y1);
				if(obj.hasAttribute('old_x1')==true)
					obj.removeAttribute('old_x1');
				if(obj.hasAttribute('old_y1')==true)					
					obj.removeAttribute('old_y1');
			}
			else if(str_id2==pt1.str_id)
			{
				var line_x2 = Number(document.getElementById(id2).childNodes[0].getAttribute('cx'));
				var line_y2 = Number(document.getElementById(id2).childNodes[0].getAttribute('cy'));
				var old_x2 = Number(line_x2)-l_adjust-x_diff;
				var old_y2 = Number(line_y2)+l_adjust-y_diff;
				old_x2 = old_x2.toFixed(2);
				old_y2 = old_y2.toFixed(2);
				var change = old_x2+'-'+old_y2;
				interact_change[change] = Number(line_x2-l_adjust).toFixed(2)+'-'+Number(line_y2+l_adjust).toFixed(2);
				obj.setAttribute('x2',line_x2);
				obj.setAttribute('y2',line_y2);
				if(obj.hasAttribute('old_x2')==false)
					obj.removeAttribute('old_x2');
				if(obj.hasAttribute('old_y2')==false)					
					obj.removeAttribute('old_y2');
			}
		}
		else
		{			
			if(id1==pt1.g_id)
			{
				var new_x = Number(pt2.x)+l_adjust;
				var new_y = Number(pt2.y)-l_adjust;
				var old_x1 = Number(pt1.x);
				var old_y1 = Number(pt1.y);
				old_x1 = old_x1.toFixed(2);
				old_y1 = old_y1.toFixed(2);
				var new_x1 = Number(pt2.x).toFixed(2);
				var new_y1 = Number(pt2.y).toFixed(2);
				var change = old_x1+'-'+old_y1;
				interact_change[change] = new_x1+'-'+new_y1;
				obj.setAttribute('x1',new_x);
				obj.setAttribute('y1',new_y);
			}
			else if(id2==pt1.g_id)
			{
				var new_x = Number(pt2.x)+l_adjust;
				var new_y = Number(pt2.y)-l_adjust;	
				var old_x2 = Number(pt1.x);
				var old_y2 = Number(pt1.y);
				old_x2 = old_x2.toFixed(2);
				old_y2 = old_y2.toFixed(2);
				var new_x2 = Number(pt2.x).toFixed(2);
				var new_y2 = Number(pt2.y).toFixed(2);
				var change = old_x2+'-'+old_y2;
				interact_change[change] = new_x2+'-'+new_y2;
				obj.setAttribute('x2',new_x);
				obj.setAttribute('y2',new_y);
			}
		}
		
	}
	interact_xy_change(interact_change);
}
function moveAnimation(event)
{
	pt.x = event.clientX + clientXchange; pt.y = event.clientY + clientYchange;var l_adjust=2.7;// -4 && 15 to center the drawn text on mouse pointer
	var a = svg.getScreenCTM();
    var b = a.inverse();
    var pt2 = pt.matrixTransform(b);
	var x_diff = pt2.x - pt1.x;
	var y_diff = pt2.y - pt1.y;
	var toTranslate = 'translate('+(x_diff)+','+(y_diff)+')';
	for(var i=0;i<count;i++)
	{
		var id='g['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		if(id!=pt1.g_id&&move_structure_flag=='move_atom')
			continue;
		var str_id=obj.getAttribute('str_id');
		if(str_id!=pt1.str_id&&move_structure_flag=='move_structure')
			continue;
		obj.setAttribute('transform',toTranslate);	
	}
	var bond_flag = [];
	for(var i=0;i<l_count;i++)
	{
		var id='l['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		var id1=obj.getAttribute('id1');
		var id2=obj.getAttribute('id2');
		
		if((id1!=pt1.g_id)&&move_structure_flag=='move_atom')
			if((id2!=pt1.g_id)&&move_structure_flag=='move_atom')
				continue;
		if(move_structure_flag!='move_atom')
		{
			var str_id=obj.getAttribute('str_id');
			if(str_id!=pt1.str_id&&move_structure_flag=='move_structure')
				continue;
			obj.setAttribute('transform',toTranslate);
			for(var j=0;j<t_count;j++)
			{
				var id='tri['+j+']';
				var obj3=document.getElementById(id);
				if(obj3==null)
					continue;
				var tri_id1 = obj3.getAttribute('id1');
				var tri_id2 = obj3.getAttribute('id2');
				if(id1==tri_id1&&id2==tri_id2)
				{
					obj3.setAttribute('transform',toTranslate);
				}
			}
		}
		else
		{
			if(id1==pt1.g_id)
			{
				var new_x = Number(pt2.x)+l_adjust;
				var new_y = Number(pt2.y)-l_adjust;
				var obj_id2 = document.getElementById(id2);
				var x2 = obj_id2.childNodes[0].getAttribute('cx');
				var y2 = obj_id2.childNodes[0].getAttribute('cy');
				var line_x1 = obj.getAttribute('x1');
				var line_y1 = obj.getAttribute('y1');
				var line_x2 = obj.getAttribute('x2');
				var line_y2 = obj.getAttribute('y2');
				if(!(Number(x2).toFixed(2)==Number(line_x2).toFixed(2)&&Number(y2).toFixed(2)==Number(line_y2).toFixed(2)))
				{
					
					var temp_pt1={x:new_x,y:new_y};var temp_pt2={x:Number(x2),y:Number(y2)};
					var id1_id2 = id1+id2;
					if(typeof(bond_flag[id1_id2])!='undefined')
						var rad = Math.atan2(temp_pt1.y-temp_pt2.y,temp_pt1.x-temp_pt2.x) + Math.PI/2;
					else
						var rad = Math.atan2(temp_pt1.y-temp_pt2.y,temp_pt1.x-temp_pt2.x) - Math.PI/2;
					var dist = 1.5;
					bond_flag[id1_id2]=true;
					temp_pt1.x = temp_pt1.x - dist*Math.cos(rad);
					temp_pt1.y = temp_pt1.y - dist*Math.sin(rad);
					temp_pt2.x = temp_pt2.x - dist*Math.cos(rad);
					temp_pt2.y = temp_pt2.y - dist*Math.sin(rad);
					new_x=temp_pt1.x;
					new_y=temp_pt1.y;
					obj.setAttribute('x2',temp_pt2.x);
					obj.setAttribute('y2',temp_pt2.y);
					if(obj.hasAttribute('old_x2')==false)
						obj.setAttribute('old_x2',line_x2);
					if(obj.hasAttribute('old_y2')==false)
						obj.setAttribute('old_y2',line_y2);
				}
				obj.setAttribute('x1',new_x);
				obj.setAttribute('y1',new_y);
				if(obj.hasAttribute('old_x1')==false)
					obj.setAttribute('old_x1',line_x1);
				if(obj.hasAttribute('old_y1')==false)					
					obj.setAttribute('old_y1',line_y1);
			}
			else
			{
				var new_x = Number(pt2.x)+l_adjust;
				var new_y = Number(pt2.y)-l_adjust;
				var obj_id1 = document.getElementById(id1);
				var x1 = obj_id1.childNodes[0].getAttribute('cx');
				var y1 = obj_id1.childNodes[0].getAttribute('cy');
				
				var line_x1 = obj.getAttribute('x1');
				var line_y1 = obj.getAttribute('y1');
				var line_x2 = obj.getAttribute('x2');
				var line_y2 = obj.getAttribute('y2');
				if(!(Number(x1).toFixed(2)==Number(line_x1).toFixed(2)&&Number(y1).toFixed(2)==Number(line_y1).toFixed(2)))
				{
					var temp_pt1={x:new_x,y:new_y};var temp_pt2={x:Number(x1),y:Number(y1)};
					var id1_id2 = id1+id2;
					if(typeof(bond_flag[id1_id2])!='undefined')
						var rad = Math.atan2(temp_pt1.y-temp_pt2.y,temp_pt1.x-temp_pt2.x) - Math.PI/2;
					else
						var rad = Math.atan2(temp_pt1.y-temp_pt2.y,temp_pt1.x-temp_pt2.x) + Math.PI/2;
					var dist = 1.5;
					bond_flag[id1_id2]=true;
					temp_pt1.x = temp_pt1.x - dist*Math.cos(rad);
					temp_pt1.y = temp_pt1.y - dist*Math.sin(rad);
					temp_pt2.x = temp_pt2.x - dist*Math.cos(rad);
					temp_pt2.y = temp_pt2.y - dist*Math.sin(rad);
					new_x=temp_pt2.x;
					new_y=temp_pt2.y;
					if(obj.hasAttribute('old_x1')==false)
						obj.setAttribute('old_x1',line_x1);
					if(obj.hasAttribute('old_y1')==false)					
						obj.setAttribute('old_y1',line_y1);
					obj.setAttribute('x1',temp_pt1.x);
					obj.setAttribute('y1',temp_pt1.y);					
				}
				if(obj.hasAttribute('old_x2')==false)
					obj.setAttribute('old_x2',line_x2);
				if(obj.hasAttribute('old_y2')==false)
					obj.setAttribute('old_y2',line_y2);
				obj.setAttribute('x2',new_x);
				obj.setAttribute('y2',new_y);				
			}
			for(var j=0;j<t_count;j++)
			{
				var id='tri['+j+']';
				var obj3=document.getElementById(id);
				if(obj3==null)
					continue;
				var tri_id1 = obj3.getAttribute('id1');
				var tri_id2 = obj3.getAttribute('id2');
				if(id1==tri_id1&&id2==tri_id2)
				{
					if(obj3.hasAttribute('transform')==true)
						obj3.removeAttribute('transform');
					if(obj3.hasAttribute('old_points')==false)
					{
						var old_points = obj3.getAttribute('points');
						obj3.setAttribute('old_points',old_points);
					}						
					var l_adjust = 2.7;var t_point1,t_point2,t_point3;
					t_point1 = {x:obj.getAttribute('x1'),y:obj.getAttribute('y1')};
					t_point2 = {x:obj.getAttribute('x2'),y:obj.getAttribute('y2')};
					t_point3 = {x:'',y:''};
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
					obj3.setAttribute('points',points);
					
				}
			}
		}
	}
	for(var i=0;i<itl_count;i++)
	{
		var id='itl['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		var id1=obj.getAttribute('id1');
		var id2=obj.getAttribute('id2');
		var str_id1=obj.getAttribute('str_id1');
		var str_id2=obj.getAttribute('str_id2');
		if((id1!=pt1.g_id)&&move_structure_flag=='move_atom')
			if((id2!=pt1.g_id)&&move_structure_flag=='move_atom')
				continue;
		if(move_structure_flag=='move_structure_group')
		{
			obj.setAttribute('transform',toTranslate);
		}
		else if(move_structure_flag=='move_structure')
		{
			if(str_id1==pt1.str_id)
			{				
				var line_x1 = document.getElementById(id1).childNodes[0].getAttribute('cx');
				var line_y1 = document.getElementById(id1).childNodes[0].getAttribute('cy');
				var new_x = Number(line_x1)+x_diff;
				var new_y = Number(line_y1)+y_diff;
				obj.setAttribute('x1',new_x);
				obj.setAttribute('y1',new_y);
				if(obj.hasAttribute('old_x1')==false)
					obj.setAttribute('old_x1',line_x1);
				if(obj.hasAttribute('old_y1')==false)					
					obj.setAttribute('old_y1',line_y1);
			}
			else if(str_id2==pt1.str_id)
			{
				var line_x2 = document.getElementById(id2).childNodes[0].getAttribute('cx');
				var line_y2 = document.getElementById(id2).childNodes[0].getAttribute('cy');
				var new_x = Number(line_x2)+x_diff;
				var new_y = Number(line_y2)+y_diff;
				obj.setAttribute('x2',new_x);
				obj.setAttribute('y2',new_y);
				if(obj.hasAttribute('old_x2')==false)
					obj.setAttribute('old_x2',line_x2);
				if(obj.hasAttribute('old_y2')==false)					
					obj.setAttribute('old_y2',line_y2);
			}
		}
		else
		{
			if(id1==pt1.g_id)
			{
				var new_x = Number(pt2.x)+l_adjust;
				var new_y = Number(pt2.y)-l_adjust;
				var line_x1 = obj.getAttribute('x1');
				var line_y1 = obj.getAttribute('y1');
				obj.setAttribute('x1',new_x);
				obj.setAttribute('y1',new_y);
				if(obj.hasAttribute('old_x1')==false)
					obj.setAttribute('old_x1',line_x1);
				if(obj.hasAttribute('old_y1')==false)					
					obj.setAttribute('old_y1',line_y1);
			}
			else if(id2==pt1.g_id)
			{
				var new_x = Number(pt2.x)+l_adjust;
				var new_y = Number(pt2.y)-l_adjust;
				var line_x2 = obj.getAttribute('x2');
				var line_y2 = obj.getAttribute('y2');
				if(obj.hasAttribute('old_x2')==false)
					obj.setAttribute('old_x2',line_x2);
				if(obj.hasAttribute('old_y2')==false)
					obj.setAttribute('old_y2',line_y2);
				obj.setAttribute('x2',new_x);
				obj.setAttribute('y2',new_y);				
			}
		}
	}
	if(unpaired_electron_flag=='visible')
		upair_electrons(false);
	if(lonepaired_electron_flag=='visible')
		lpair_electrons(false);
	if(vacant_electron_flag=='visible')
		vacant_electrons(false);
}
function toOrient(pt1,pt2)
{
	var l_adjust=2.7;var temp_pt;var interact_change=[];
	if(lineConnectedNumber(pt1.g_id)>1)
		return;
	if(undo_redo_flag==true)
	{
		var obj1 = document.getElementById(pt1.g_id);
		pt2.x = Number(pt2.x);
		pt2.y = Number(pt2.y);
		var c_adjust = obj1.childNodes[1].childNodes[0].nodeValue.length-1;
		obj1.childNodes[1].setAttribute('x',pt2.x);
		obj1.childNodes[1].setAttribute('y',pt2.y);
		obj1.childNodes[0].setAttribute('cx',pt2.x+l_adjust+c_adjust);
		obj1.childNodes[0].setAttribute('cy',pt2.y-l_adjust);
		obj1.childNodes[2].setAttribute('x',pt2.x-l_adjust);
		obj1.childNodes[2].setAttribute('y',pt2.y-l_adjust);
		obj1.childNodes[3].setAttribute('x',pt2.x+2*l_adjust);
		obj1.childNodes[3].setAttribute('y',pt2.y-2*l_adjust);
		obj1.childNodes[4].setAttribute('x',pt2.x - l_adjust+1);
		obj1.childNodes[4].setAttribute('y',pt2.y - 3*l_adjust+1);
	}
	for(var i=0;i<l_count;i++)
	{
		var id='l['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		var x1 = Number(obj.getAttribute('x1'));
		var y1 = Number(obj.getAttribute('y1'));
		var x2 = Number(obj.getAttribute('x2'));
		var y2 = Number(obj.getAttribute('y2'));
		var dist = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
		dist = Math.round(dist);
		if(obj.hasAttribute('transform')==true)
			obj.removeAttribute('transform');
		var point ={x:x1,y:y1};
		var id1=obj.getAttribute('id1');
		var id2=obj.getAttribute('id2');
		if((id2==pt1.g_id))
		{
			var obj1=document.getElementById(pt1.g_id);
			var obj2=document.getElementById(id1);
			var deg=degree(point,pt2);
			var deg =  returnDegreeRange(deg);
			var deg1 = deg * Math.PI/180;
			if(deg<180)
				deg=deg+180;
			else
				deg=deg-180;
			if(obj1.hasAttribute('transform')==true)
					obj1.removeAttribute('transform');
				temp_pt={x:Number(point.x - dist * Math.cos(deg1)),y:Number(point.y - dist * Math.sin(deg1))};
				
			if(undo_redo_flag==true)
			{
				obj.setAttribute('x2',pt2.x+l_adjust);
				obj.setAttribute('y2',pt2.y-l_adjust);
				break;
			}			
				if(obj1.hasAttribute('transform')==true)
					obj1.removeAttribute('transform');
				temp_pt={x:Number(point.x - dist * Math.cos(deg1)),y:Number(point.y - dist * Math.sin(deg1))};
			obj.setAttribute('x2',temp_pt.x);
			obj.setAttribute('y2',temp_pt.y);
			var old_x = obj1.childNodes[1].getAttribute('x');
			var old_y = obj1.childNodes[1].getAttribute('y');
			var c_adjust = obj1.childNodes[1].childNodes[0].nodeValue.length-1;
			obj1.childNodes[1].setAttribute('x',temp_pt.x-l_adjust);
			obj1.childNodes[1].setAttribute('y',temp_pt.y+l_adjust);
			obj1.childNodes[0].setAttribute('cx',temp_pt.x);
			obj1.childNodes[0].setAttribute('cy',temp_pt.y);
			obj1.childNodes[3].setAttribute('x',temp_pt.x+l_adjust);
			obj1.childNodes[3].setAttribute('y',temp_pt.y-l_adjust);
			obj1.childNodes[4].setAttribute('x',temp_pt.x - 2*l_adjust+1);
			obj1.childNodes[4].setAttribute('y',temp_pt.y- 2*l_adjust-1);
			obj1.childNodes[2].setAttribute('x',temp_pt.x-l_adjust-l_adjust);
			obj1.childNodes[2].setAttribute('y',temp_pt.y);
			
			for(var j=0;j<t_count;j++)
			{
				var id='tri['+j+']';
				var obj3=document.getElementById(id);
				if(obj3==null)
					continue;
				var tri_id1 = obj3.getAttribute('id1');
				var tri_id2 = obj3.getAttribute('id2');
				if(id1==tri_id1&&id2==tri_id2)
				{
					if(obj3.hasAttribute('transform')==true)
						obj3.removeAttribute('transform');
					var l_adjust = 2.7;var t_point1,t_point2,t_point3;
					t_point1 = {x:obj.getAttribute('x1'),y:obj.getAttribute('y1')};
					t_point2 = {x:obj.getAttribute('x2'),y:obj.getAttribute('y2')};
					t_point3 = {x:'',y:''};
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
					obj3.setAttribute('points',points);
				}
			}			
					
			var atm_id1=collisionDetectAtomIndex(old_x,old_y);
			var atm_id2=collisionDetectAtomIndex(obj2.childNodes[1].getAttribute('x'),obj2.childNodes[1].getAttribute('y'));			
			
			var x = Number(temp_pt.x-l_adjust).toFixed(2);
			var y = Number(temp_pt.y+l_adjust).toFixed(2);
			atom[atm_id1].setX(x);
			atom[atm_id1].setY(y);
			
			var elec_vector = atom[atm_id1].getElectronLinkVector();
			for(var j=0;j<elec_vector.length;j++)
			{
				elec_vector[j].setX1(x);
				elec_vector[j].setY1(y);
				if(elec_vector[j].getElectronStatus()=='uPair'||elec_vector[j].getElectronStatus()=='lPair'||elec_vector[j].getElectronStatus()=='vacant')
				{
					elec_vector[j].setX2(x);
					elec_vector[j].setY2(y);
				}
			}
			var elec_vector = atom[atm_id2].getElectronLinkVector();
			for(var j=0;j<elec_vector.length;j++)
			{
				if(Number(old_x).toFixed(2)==elec_vector[j].getX2()&&Number(old_y).toFixed(2)==elec_vector[j].getY2())
				{
					elec_vector[j].setX2(x);
					elec_vector[j].setY2(y);
					break;
				}				
			}
			var frg_id = collisionDetectFragmentIndex(old_x,old_y);
			fragment[frg_id].setX2(x);
			fragment[frg_id].setY2(y);
		}				
	}
	if(typeof(temp_pt)!='undefined')
	{
	for(var i=0;i<itl_count;i++)
	{
		var id='itl['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		var id1=obj.getAttribute('id1');
		var id2=obj.getAttribute('id2');
		var old_x1,old_y1;
		if(id1==pt1.g_id)
		{
			if(obj.hasAttribute('old_x1')==true)
			{
				old_x1 = Number(obj.getAttribute('old_x1'));
				obj.removeAttribute('old_x1');
				if(obj.hasAttribute('old_y1')==true)
				{
					old_y1 = Number(obj.getAttribute('old_y1'));
					obj.removeAttribute('old_y1');
				}
				var change = old_x1.toFixed(2)+'-'+old_y1.toFixed(2);
				var new_x1 = Number(temp_pt.x) - l_adjust;
				var new_y1 = Number(temp_pt.y) + l_adjust;
				interact_change[change] = Number(new_x1).toFixed(2)+'-'+Number(new_y1).toFixed(2);
			}
			if(undo_redo_flag==true)
			{
				old_x1 = Number(obj.getAttribute('x1'))-l_adjust;
				old_y1 = Number(obj.getAttribute('y1'))+l_adjust;
				var change = old_x1.toFixed(2)+'-'+old_y1.toFixed(2);
				var new_x1 = Number(pt2.x);
				var new_y1 = Number(pt2.y);
				interact_change[change] = Number(new_x1).toFixed(2)+'-'+Number(new_y1).toFixed(2);
				obj.setAttribute('x1',pt2.x+l_adjust);
				obj.setAttribute('y1',pt2.y-l_adjust);
			}
			obj.setAttribute('x1',temp_pt.x);
			obj.setAttribute('y1',temp_pt.y);
		}
		else if(id2==pt1.g_id)
		{
			if(obj.hasAttribute('old_x2')==true)
			{
				old_x2 = Number(obj.getAttribute('old_x2'));
				obj.removeAttribute('old_x2');
				if(obj.hasAttribute('old_y2')==true)
				{
					old_y2 = Number(obj.getAttribute('old_y2'));
					obj.removeAttribute('old_y2');
				}
				var change = old_x2.toFixed(2)+'-'+old_y2.toFixed(2);
				var new_x1 = Number(temp_pt.x) - l_adjust;
				var new_y1 = Number(temp_pt.y) + l_adjust;
				interact_change[change] = Number(new_x1).toFixed(2)+'-'+Number(new_y1).toFixed(2);
			}
			if(undo_redo_flag==true)
			{
				old_x2 = Number(obj.getAttribute('x2'))-l_adjust;
				old_y2 = Number(obj.getAttribute('y2'))+l_adjust;
				var change = old_x2.toFixed(2)+'-'+old_y2.toFixed(2);
				var new_x1 = Number(pt2.x);
				var new_y1 = Number(pt2.y);
				interact_change[change] = Number(new_x1).toFixed(2)+'-'+Number(new_y1).toFixed(2);
				obj.setAttribute('x2',pt2.x+l_adjust);
				obj.setAttribute('y2',pt2.y-l_adjust);
			}
			obj.setAttribute('x2',temp_pt.x);
			obj.setAttribute('y2',temp_pt.y);
		}
	}
	}
	interact_xy_change(interact_change);
	return temp_pt;
}
function orientationAnimation(event)
{
	pt.x = event.clientX + clientXchange; pt.y = event.clientY + clientYchange;var l_adjust=2.7;// -4 && 15 to center the drawn text on mouse pointer
	var a = svg.getScreenCTM();
    var b = a.inverse();
    var pt2 = pt.matrixTransform(b);
	pt2.x = pt2.x + l_adjust;
	pt2.y = pt2.y - l_adjust;
	var toTranslate;var temp_pt;
	if(lineConnectedNumber(pt1.g_id)>1)
		return;
	for(var i=0;i<l_count;i++)
	{
		var id='l['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		var x1 = Number(obj.getAttribute('x1'));
		var y1 = Number(obj.getAttribute('y1'));
		var x2 = Number(obj.getAttribute('x2'));
		var y2 = Number(obj.getAttribute('y2'));
		var dist = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
		dist = Math.round(dist);
		var point ={x:x1,y:y1};
		var id2 = obj.getAttribute('id2');
		var id1 = obj.getAttribute('id1');
		if((id2==pt1.g_id))
		{
			var deg=degree(point,pt2);
			var deg1 = deg * Math.PI/180;
			if(deg<180)
				deg=deg+180;
			else
				deg=deg-180;
			var new_point = {x:Number(pt1.x) + l_adjust,y:pt1.y - l_adjust};
			var old_deg=degree(point,new_point);
			if(old_deg<180)
				old_deg=old_deg+180;
			else
				old_deg=old_deg-180;
			
			deg = (deg - old_deg);
			if(deg<0)
				deg = 360 + deg;
			temp_pt={x:Number(point.x - dist * Math.cos(deg1)),y:Number(point.y - dist * Math.sin(deg1))};
			toTranslate = 'rotate('+(deg)+','+(x1)+','+(y1)+')';
			obj.setAttribute('transform',toTranslate);
			for(var j=0;j<t_count;j++)
			{
				var id='tri['+j+']';
				var obj3=document.getElementById(id);
				if(obj3==null)
					continue;
				var tri_id1 = obj3.getAttribute('id1');
				var tri_id2 = obj3.getAttribute('id2');
				if(id1==tri_id1&&id2==tri_id2)
				{
					obj3.setAttribute('transform',toTranslate);
				}
			}
			var obj1=document.getElementById(pt1.g_id);
			var x_diff = temp_pt.x - pt1.x - l_adjust;
			var y_diff = temp_pt.y - pt1.y + l_adjust;
			var toTranslate = 'translate('+(x_diff)+','+(y_diff)+')';
			obj1.setAttribute('transform',toTranslate);			
		}				
	}
	if(typeof(temp_pt)!='undefined')
	{
		for(var i=0;i<itl_count;i++)
		{
			var id='itl['+i+']';
			var obj=document.getElementById(id);
			if(obj==null)
				continue;
			var id1=obj.getAttribute('id1');
			var id2=obj.getAttribute('id2');var old_x1,old_y1;
			if(id1==pt1.g_id)
			{
				if(obj.hasAttribute('old_x1')==false)
				{
					old_x1 = Number(obj.getAttribute('x1'))-l_adjust;
					obj.setAttribute('old_x1',old_x1);
				}	
				if(obj.hasAttribute('old_y1')==false)
				{
					old_y1 = Number(obj.getAttribute('y1'))+l_adjust;
					obj.setAttribute('old_y1',old_y1);
				}
				obj.setAttribute('x1',temp_pt.x);
				obj.setAttribute('y1',temp_pt.y);
			}
			else if(id2==pt1.g_id)
			{
				if(obj.hasAttribute('old_x2')==false)
				{
					old_x2 = Number(obj.getAttribute('x2'))-l_adjust;
					obj.setAttribute('old_x2',old_x2);
				}	
				if(obj.hasAttribute('old_y2')==false)
				{
					old_y2 = Number(obj.getAttribute('y2'))+l_adjust;
					obj.setAttribute('old_y2',old_y2);
				}
				obj.setAttribute('x2',temp_pt.x);
				obj.setAttribute('y2',temp_pt.y);
			}
		}
	}
	
	if(unpaired_electron_flag=='visible')
		upair_electrons(false);
	if(lonepaired_electron_flag=='visible')
		lpair_electrons(false);
	if(vacant_electron_flag=='visible')
		vacant_electrons(false);
}
function captionAnimation(event)
{
	pt.x = event.clientX + clientXchange; pt.y = event.clientY + clientYchange;var l_adjust=2.7;// -4 && 15 to center the drawn text on mouse pointer
	var a = svg.getScreenCTM();
    var b = a.inverse();
    var pt2 = pt.matrixTransform(b);
	if(capt_id!=0)
	{
		var obj = document.getElementById(capt_id);
		obj.setAttribute('x',pt2.x);
		obj.setAttribute('y',pt2.y);
	}
}
function remove_attribute()
{
	for(var i=0;i<count;i++)
	{
		var id='g['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.hasAttribute('transform')==true)
			obj.removeAttribute('transform');
	}
	for(var i=0;i<l_count;i++)
	{
		var id='l['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.hasAttribute('transform')==true)
			obj.removeAttribute('transform');
		if(obj.hasAttribute('old_x1')==true)
		{
			var line_x1 = obj.getAttribute('old_x1');
			obj.setAttribute('x1',line_x1);
			obj.removeAttribute('old_x1');
		}			
		if(obj.hasAttribute('old_x2')==true)
		{
			var line_x2 = obj.getAttribute('old_x2');
			obj.setAttribute('x2',line_x2);
			obj.removeAttribute('old_x2');
		}
		if(obj.hasAttribute('old_y1')==true)
		{
			var line_y1 = obj.getAttribute('old_y1');
			obj.setAttribute('y1',line_y1);
			obj.removeAttribute('old_y1');
		}
		if(obj.hasAttribute('old_y2')==true)
		{
			var line_y2 = obj.getAttribute('old_y2');
			obj.setAttribute('y2',line_y2);
			obj.removeAttribute('old_y2');
		}
	}
	for(var i=0;i<itl_count;i++)
	{
		var id='itl['+i+']';
		var obj=document.getElementById(id);
		if(obj==null)
			continue;
		if(obj.hasAttribute('transform')==true)
			obj.removeAttribute('transform');
		if(obj.hasAttribute('old_x1')==true)
		{
			var line_x1 = obj.getAttribute('old_x1');
			obj.setAttribute('x1',line_x1);
			obj.removeAttribute('old_x1');
		}			
		if(obj.hasAttribute('old_x2')==true)
		{
			var line_x2 = obj.getAttribute('old_x2');
			obj.setAttribute('x2',line_x2);
			obj.removeAttribute('old_x2');
		}
		if(obj.hasAttribute('old_y1')==true)
		{
			var line_y1 = obj.getAttribute('old_y1');
			obj.setAttribute('y1',line_y1);
			obj.removeAttribute('old_y1');
		}
		if(obj.hasAttribute('old_y2')==true)
		{
			var line_y2 = obj.getAttribute('old_y2');
			obj.setAttribute('y2',line_y2);
			obj.removeAttribute('old_y2');
		}
	}
	for(var j=0;j<t_count;j++)
	{
		var id='tri['+j+']';
		var obj3=document.getElementById(id);
		if(obj3==null)
			continue;
		if(obj3.hasAttribute('transform')==true)
			obj3.removeAttribute('transform');
		if(obj3.hasAttribute('old_points')==true)
		{			
			var old_points = obj3.getAttribute('old_points');
			obj3.setAttribute('points',old_points);
			obj3.removeAttribute('old_points');
		}
	}
}
function interact_xy_change(interact_change)
{
	for(var j=0;j<structure.length;j++)
	{
		if(typeof(structure[j].getFragmentVector)!='function')
		{
			var x1 = (structure[j].getX1());
			var x2 = (structure[j].getX2());
			var y1 = (structure[j].getY1());
			var y2 = (structure[j].getY2());
			var old_xy1 = x1+'-'+y1;
			var old_xy2 = x2+'-'+y2;
			var new_xy1 = interact_change[old_xy1];
			var new_xy2 = interact_change[old_xy2];
			if(typeof(new_xy1)!='undefined')
			{
				new_xy1 = String(new_xy1).split('-');
				structure[j].setX1(new_xy1[0]);
				structure[j].setY1(new_xy1[1]);
			}
			if(typeof(new_xy2)!='undefined')
			{
				new_xy2 = String(new_xy2).split('-');
				structure[j].setX2(new_xy2[0]);
				structure[j].setY2(new_xy2[1]);
			}
		}
	}
}