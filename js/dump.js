
 function xAdjust(point1,point2,yadj)
 {
	var x_adjust;
	if(point1.y!=point2.y)
	{
		x_adjust=(yadj)*(point2.x-point1.x)/(point2.y-point1.y);
		x_adjust=x_adjust;
	}
	else
	x_adjust=0;
	
	if(yadj==0)
	x_adjust=3;
	
	//console.log(x_adjust+" "+yadj);
	return x_adjust;
 }
 function yAdjust(theta)
 {
 var y_adjust;var l_adjust=3.1;
			if(theta>0&&theta<3)
			{
				y_adjust=-theta*(l_adjust);
				
			}
			else if(theta<0&&theta>-3)
			{
				y_adjust=-theta*(l_adjust);
			}
			else
			{
				y_adjust=0;
			}
			//if((theta>2&&theta<2.6)||(theta<-2&&theta>-2.6))
			//return y_adjust%3;
			
			return y_adjust%2.9;
 }
 	function round(val)
	{
		if(Math.round(val)<0)
			val-=2;
			if(Math.round(val)>0)
			val+=2;
			return val;
	}
	function createCircle(circle,cpoint)
{
	circle.setAttribute('cx',cpoint.x);
	circle.setAttribute('cy',cpoint.y);
	circle.setAttribute('r',4);
	circle.setAttribute('fill','white');
	svg.appendChild(circle);
}	
  function drawSVGPoint(point)
  {
	var l_adjust=3;
	point.x-=l_adjust;
	point.y-=l_adjust;
	var text = document.createElementNS(svgNS,'text');
	text.id = "t["+count+"]";
    text.setAttribute('x',point.x);
    text.setAttribute('y',point.y);
    text.setAttribute('fill','red');
	var textNode = document.createTextNode(symbol);
	text.appendChild(textNode);
    svg.appendChild(text);
	count++;
  }
  
function isCollide(a, b) {
return !(
        ((a.y + 2*a.width) < (b.y)) ||
        ((a.y - 2*a.width)  > (b.y)) ||
        ((a.x + 2*a.width) < b.x) ||
        ((a.x - 2*a.width) > (b.x))
    );
}
			//console.log(theta);
			//console.log(theta1);
			
			/*var y_adjust1=yAdjust(theta);
			var y_adjust2=yAdjust(theta1);
			var x_adjust1=xAdjust(pt1,pt2,y_adjust1);
			var x_adjust2=xAdjust(pt2,pt1,y_adjust2);
			x_adjust1=round(x_adjust1);
			x_adjust2=round(x_adjust2);
			y_adjust1=round(y_adjust1);
			y_adjust2=round(y_adjust2);*/
			//console.log(y_adjust);
			//var mod=3.1;
						//console.log(obj1.getAttribute('x'));
			//obj2.setAttribute('x',pt2.x-l_adjust);
			//obj2.setAttribute('transform','translate(-3,3)');
						//console.log("msup deleted2");
									//drawSVGPoint(pt2);
												//console.log(pt1);
			//theta1=returnDegreeRange(theta1);
						//theta1=degree(pt2,pt1);
			//console.log(theta);
						//console.log(pt1.x+" "+pt1.y+" "+pt2.x+" "+pt2.y);
			//theta = Math.atan2(pt2.y,pt2.x);
			//theta *= 180/Math.PI;
			//console.log(theta);
							//alert();
				//console.log("msup deleted1");
//||(!(((pt1.y + 10) < (pt2.y)) || ((pt1.y - 10)  > (pt2.y)) || ((pt1.x + 10) < pt2.x) ||((pt1.x - 10) > (pt2.x)))))//16=2*a.width
//alert(pt.clientX+" "+pt.clientY+" "+event.clientX+" "+event.clientY);
		//console.log(range);
		//var ptcol   = svg.createSVGPoint();
		//console.log(rect.top+" "+rect.y);
		//ptcol.x=rect.x=rect.left+3.3;//20 23 to make center bbox coincide with pt
		//ptcol.y=rect.y=rect.top+27.3;
		//alert(rect.y+" "+pt.y+" "+rect.x+" "+pt.x+" "+rect.height+" "+rect.width);
		//var flag=isCollide(rect,point);
		//alert(flag);
//point=ptcol.matrixTransform(b);
	

function Apple (type) {
    this.type = type;
    this.color = "red";
}
 
Apple.prototype.getInfo = function() {
    return this.color + ' ' + this.type + ' apple';
};

Apple.prototype.setColor = function(color) {
    this.color=color;
};
		apple=new Apple('abc');
		alert(apple.getInfo());
		apple.setColor('white');
		alert(apple.getInfo());
		var diff=(pt1.x-pt2.x)*(pt1.x-pt2.x)+(pt1.y-pt2.y)*(pt1.y-pt2.y)
				diff=Math.sqrt(diff);
				console.log(children[1].childNodes[0].nodeValue);
				/*var myWindow = window.open("", "XML", "scrollbars=yes,width=2000, height=400");
	myWindow.document.write("<html><body style='overflow:auto;'>");
    myWindow.document.write("&#60;&#63;xml version=&#34;1.0&#34;&#63;&#62;<br>");
	myWindow.document.write("&ensp;&ensp;&#60;structureGroup id=&#34;s&#34; title=&#34;&#34; type=&#34;&#34;&#62;<br>");
	var strlen=structure.length;
	for(i=0;i<strlen;i++)
	{
		myWindow.document.write("&ensp;&ensp;&ensp;&ensp;");
		myWindow.document.write("&#60;structure id=&#34;");
		myWindow.document.write("s"+(i+1)+"&#34;");
		myWindow.document.write(" title=&#34;"+structure[i].getTitle()+"&#34;");
		myWindow.document.write(" type=&#34;"+structure[i].getType()+"&#34;");
		myWindow.document.write(" formula=&#34;"+structure[i].getFormula()+"&#34;");
		myWindow.document.write(" molarmass=&#34;"+structure[i].getmolarMass()+"&#34;");
		myWindow.document.write(" state=&#34;"+structure[i].getState()+"&#34;");
		myWindow.document.write(" role=&#34;"+structure[i].getRole()+"&#34;");
		myWindow.document.write(" mp=&#34;"+structure[i].getMp()+"&#34;");
		myWindow.document.write(" bp=&#34;"+structure[i].getBp()+"&#34;");
		myWindow.document.write(" smiles=&#34;"+structure[i].getSmiles()+"&#34;");
		myWindow.document.write(" &#62;<br>");
		var frg=structure[i].getFragmentVector();
		var frglen = frg.length;
		for(j=0;j<frglen;j++)
		{
			myWindow.document.write("&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;");
			myWindow.document.write("&#60;fragment id=&#34;");
			myWindow.document.write("s"+(i+1)+'-'+(j+1)+"&#34;");
			myWindow.document.write(" title=&#34;"+frg[j].getTitle()+"&#34;");
			myWindow.document.write(" type=&#34;"+frg[j].getType()+"&#34;");
			myWindow.document.write(" formula=&#34;"+frg[j].getFormula()+"&#34;");
			myWindow.document.write(" revformula=&#34;"+frg[j].getRevFormula()+"&#34;");
			myWindow.document.write(" smiles=&#34;"+frg[j].getSmiles()+"&#34;");
			myWindow.document.write(" linkType=&#34;"+frg[j].getLinkType()+"&#34;");
			myWindow.document.write(" sklCode=&#34;"+frg[j].getSklCode()+"&#34;");
			myWindow.document.write(" template=&#34;"+frg[j].getTemplate()+"&#34;");
			myWindow.document.write(" orientation=&#34;"+frg[j].getOrientation()+"&#34;");
			myWindow.document.write(" projection=&#34;"+frg[j].getProjection()+"&#34;");
			myWindow.document.write(" x1=&#34;"+frg[j].getX1()+"&#34;");
			myWindow.document.write(" y1=&#34;"+frg[j].getY1()+"&#34;");
			myWindow.document.write(" x2=&#34;"+frg[j].getX2()+"&#34;");
			myWindow.document.write(" y2=&#34;"+frg[j].getY2()+"&#34;");
			myWindow.document.write(" &#62;<br>");
			var atm=frg[j].getAtomVector();
			var atmlen = atm.length;
			for(k=0;k<atmlen;k++)
			{
				myWindow.document.write("&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;");
				myWindow.document.write("&#60;atom id=&#34;");
				myWindow.document.write("s"+(i+1)+'-'+(j+1)+'-'+'a'+(k+1)+"&#34;");
				myWindow.document.write(" title=&#34;"+atm[k].getTitle()+"&#34;");
				myWindow.document.write(" type=&#34;"+atm[k].getType()+"&#34;");
				myWindow.document.write(" hybridization=&#34;"+atm[k].getHybridization()+"&#34;");
				myWindow.document.write(" symbol=&#34;"+atm[k].getSymbol()+"&#34;");
				myWindow.document.write(" charge=&#34;"+atm[k].getCharge()+"&#34;");
				myWindow.document.write(" chargeCount=&#34;"+atm[k].getChargeCount()+"&#34;");
				myWindow.document.write(" position=&#34;"+atm[k].getPosition()+"&#34;");
				myWindow.document.write(" isotopeLabel=&#34;"+atm[k].getIsotopeLabel()+"&#34;");
				myWindow.document.write(" electroNegativity=&#34;"+atm[k].getElectroNegativity()+"&#34;");
				myWindow.document.write(" oxdnState=&#34;"+atm[k].getOxdnState()+"&#34;");
				myWindow.document.write(" block=&#34;"+atm[k].getBlock()+"&#34;");
				myWindow.document.write(" gcCode=&#34;"+atm[k].getGcCode()+"&#34;");
				myWindow.document.write(" partcharge=&#34;"+atm[k].getPartCharge()+"&#34;");
				myWindow.document.write(" partChargeVal=&#34;"+atm[k].getPartChargeVal()+"&#34;");
				myWindow.document.write(" x=&#34;"+atm[k].getX()+"&#34;");
				myWindow.document.write(" y=&#34;"+atm[k].getY()+"&#34;");
				myWindow.document.write(" &#62;<br>");
				var elec=atm[k].getElectronLinkVector();
				var eleclen=elec.length;
				for(l=0;l<eleclen;l++)
				{
					myWindow.document.write("&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;");
					myWindow.document.write("&#60;electronLink id=&#34;");
					myWindow.document.write("s"+(i+1)+'-'+(j+1)+'-'+'a'+(k+1)+'e'+(l+1)+"&#34;");
					myWindow.document.write(" title=&#34;"+elec[l].getTitle()+"&#34;");
					myWindow.document.write(" type=&#34;"+elec[l].getType()+"&#34;");
					myWindow.document.write(" electronStatus=&#34;"+elec[l].getElectronStatus()+"&#34;");
					myWindow.document.write(" charge=&#34;"+elec[l].getCharge()+"&#34;");
					myWindow.document.write(" chargeCount=&#34;"+elec[l].getChargeCount()+"&#34;");
					myWindow.document.write(" affinity=&#34;"+elec[l].getAffinity()+"&#34;");
					myWindow.document.write(" bondType=&#34;"+elec[l].getBondType()+"&#34;");
					myWindow.document.write(" order=&#34;"+elec[l].getOrder()+"&#34;");
					myWindow.document.write(" linkStatus=&#34;"+elec[l].getLinkStatus()+"&#34;");
					myWindow.document.write(" target=&#34;"+elec[l].getTarget()+"&#34;");
					myWindow.document.write(" orientation=&#34;"+elec[l].getOrientation()+"&#34;");
					myWindow.document.write(" projection=&#34;"+elec[l].getProjection()+"&#34;");
					myWindow.document.write(" priority=&#34;"+elec[l].getPriority()+"&#34;");
					myWindow.document.write(" gcCode=&#34;"+elec[l].getGcCode()+"&#34;");
					myWindow.document.write(" partcharge=&#34;"+elec[l].getPartCharge()+"&#34;");
					myWindow.document.write(" partChargeVal=&#34;"+elec[l].getPartChargeVal()+"&#34;");
					myWindow.document.write(" x1=&#34;"+elec[l].getX1()+"&#34;");
					myWindow.document.write(" y1=&#34;"+elec[l].getY1()+"&#34;");
					myWindow.document.write(" x2=&#34;"+elec[l].getX2()+"&#34;");
					myWindow.document.write(" y2=&#34;"+elec[l].getY2()+"&#34;");
					myWindow.document.write(" /&#62;<br>");					
				}
				myWindow.document.write("&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&#60;/atom&#62;<br>");	
			}
			myWindow.document.write("&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&#60;/fragment&#62;<br>");
		}
		myWindow.document.write("&ensp;&ensp;&ensp;&ensp;&#60;/structure&#62;<br>");
	}
	myWindow.document.write("&ensp;&ensp;&#60;/structureGroup&#62;<br>");
	myWindow.document.write("</body></html>");*/
	if(cursor_flag=='benzene_ring')
		{
			if(i%2==0)
			{
				ElectronLinkVector[eId1].setOrder('double');
				ElectronLinkVector[eId1].setPriority('2.6');
				ElectronLinkVector[eId1].setGcCode('db@C');
				ElectronLinkVector[eId2].setOrder('double');
				ElectronLinkVector[eId2].setPriority('2.6');
				ElectronLinkVector[eId2].setGcCode('db@C');
				
				var eId1=electronLinkSet(frg.pt[i],frg.pt[l],frg.g[i]);
				var eId2=electronLinkSet(frg.pt[l],frg.pt[i],frg.g[l]);
				frg.pt[i].xml_id=getStructureId(frg.pt[i].atm_id);
				frg.pt[l].xml_id=getStructureId(frg.pt[l].atm_id);
				
				var ElectronLinkVector=atom[frg.pt[i].atm_id].getElectronLinkVector();
				var id = 's'+(frg.pt[l].xml_id.i+1)+'-'+(frg.pt[l].xml_id.j+1)+'-a'+(frg.pt[l].xml_id.k+1)+'e'+(eId2+1);
				ElectronLinkVector[eId1].setTarget(id);
				ElectronLinkVector[eId1].setBond('pi-z');
				ElectronLinkVector[eId1].setOrder('double');
				ElectronLinkVector[eId1].setPriority('');
				ElectronLinkVector[eId1].setGcCode('');
		
				var ElectronLinkVector=atom[frg.pt[l].atm_id].getElectronLinkVector();
				var id = 's'+(frg.pt[i].xml_id.i+1)+'-'+(frg.pt[i].xml_id.j+1)+'-a'+(frg.pt[i].xml_id.k+1)+'e'+(eId1+1);
				ElectronLinkVector[eId2].setTarget(id);
				ElectronLinkVector[eId2].setBond('pi-z');
				ElectronLinkVector[eId2].setOrder('double');
				ElectronLinkVector[eId2].setPriority('');
				ElectronLinkVector[eId2].setGcCode('');
			}
			else
			{
				ElectronLinkVector[eId1].setPriority('1.6');
				ElectronLinkVector[eId1].setGcCode('sb@C');

				ElectronLinkVector[eId2].setPriority('1.6');
				ElectronLinkVector[eId2].setGcCode('sb@C');
			}
		}
		function carbon()
  {
	deleteBridge();
	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	if(cursor_flag!='carbon')
	{
		document.getElementById("s_content").style.cursor = "url('images/carbon.cur'), auto";
		document.getElementById("carbon").style.backgroundColor = '#000000';
		//document.getElementById("s_content").addEventListener("click", drawMousePoint);
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='carbon';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		cursor_flag=false;
	}	
  }
  
  function hydrogen()
  {
  	deleteBridge();
	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	if(cursor_flag!='hydrogen')
	{
		document.getElementById("s_content").style.cursor = "url('images/hydrogen.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='hydrogen';
		symbol='H';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		cursor_flag=false;
	}	
  }
  function nitrogen()
  {
  	deleteBridge();
	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	if(cursor_flag!='nitrogen')
	{
		document.getElementById("s_content").style.cursor = "url('images/nitrogen.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='nitrogen';
		symbol='N';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		cursor_flag=false;
	}	
  }
  function oxygen()
  {
  	deleteBridge();
	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	if(cursor_flag!='oxygen')
	{
		document.getElementById("s_content").style.cursor = "url('images/oxygen.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='oxygen';
		symbol='O';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		cursor_flag=false;
	}	
  }
  function sulfur()
  {
  	deleteBridge();
	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	if(cursor_flag!='sulfur')
	{
		document.getElementById("s_content").style.cursor = "url('images/sulfur.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='sulfur';
		symbol='S';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		cursor_flag=false;
	}	
  }
  function phosphorous()
  {
  	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	if(cursor_flag!='phosphorous')
	{
		document.getElementById("s_content").style.cursor = "url('images/phosphorous.cur'), auto";
		//document.getElementById("phosphorous").style.backgroundColor = '#000000';
		//document.getElementById("s_content").addEventListener("click", drawMousePoint);
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='phosphorous';
		symbol='P';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		cursor_flag=false;
	}	
  }
  
  function fluorine()
  {
  	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	if(cursor_flag!='fluorine')
	{
		document.getElementById("s_content").style.cursor = "url('images/fluorine.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='fluorine';
		symbol='F';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		cursor_flag=false;
	}	
  }
  function chlorine()
  {
  	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	if(cursor_flag!='chlorine')
	{
		document.getElementById("s_content").style.cursor = "url('images/chlorine.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='chlorine';
		symbol='Cl';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		cursor_flag=false;
	}	
  }
  function iodine()
  {
  	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	if(cursor_flag!='iodine')
	{
		document.getElementById("s_content").style.cursor = "url('images/iodine.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='iodine';
		symbol='I';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		cursor_flag=false;
	}	
  }
  function bromine()
  {
  	skeletonFlag=false;
	bondCount = 1;
	eventClear();
	if(cursor_flag!='bromine')
	{
		document.getElementById("s_content").style.cursor = "url('images/bromine.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='bromine';
		symbol='Br';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		cursor_flag=false;
	}	
  }
  function single_bond_skeleton()
  {
	deleteBridge();
	bondCount = 1;
	eventClear();
	if(cursor_flag!='single_bond_skeleton')
	{
		document.getElementById("s_content").style.cursor = "url('images/single_bond_skeleton.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='single_bond_skeleton';
		symbol='C';
		skeletonFlag=true;
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		skeletonFlag=false;
		cursor_flag=false;
	}	
  }
  function double_bond_skeleton()
  {
	bondCount = 2;
	eventClear();
	if(cursor_flag!='double_bond_skeleton')
	{
		document.getElementById("s_content").style.cursor = "url('images/double_bond_skeleton.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='double_bond_skeleton';
		symbol='C';
		skeletonFlag=true;
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		skeletonFlag=false;
		cursor_flag=false;
	}	
  }
  function triple_bond_skeleton()
  {
	bondCount = 3;
	eventClear();
	if(cursor_flag!='triple_bond_skeleton')
	{
		document.getElementById("s_content").style.cursor = "url('images/triple_bond_skeleton.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", line);
		cursor_flag='triple_bond_skeleton';
		symbol='C';
		skeletonFlag=true;
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", line);
		document.getElementById("s_content").removeEventListener("mousemove", msmove);
		document.getElementById("s_content").removeEventListener("mouseup", msup);
		symbol='';
		skeletonFlag=false;
		cursor_flag=false;
	}	
  }
  function three_membered_ring()
  {
	bondCount = 1;
	skeletonFlag=false;
	skeletonFragmentXML=threeMemberedRing;
	eventClear();
	if(cursor_flag!='three_membered_ring')
	{
		document.getElementById("s_content").style.cursor = "url('images/three_membered_ring.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", ring_line);
		cursor_flag='three_membered_ring';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", ring_line);
		document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
		symbol='';
		cursor_flag=false;
	}
  }
  function four_membered_ring()
  {
	bondCount = 1;
	skeletonFlag=false;
	skeletonFragmentXML=fourMemberedRing;
	eventClear();
	if(cursor_flag!='four_membered_ring')
	{
		document.getElementById("s_content").style.cursor = "url('images/four_membered_ring.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", ring_line);
		cursor_flag='four_membered_ring';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", ring_line);
		document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
		symbol='';
		cursor_flag=false;
	}
  }
  function five_membered_ring()
  {
	bondCount = 1;
	skeletonFlag=false;
	skeletonFragmentXML=fiveMemberedRing;
	eventClear();
	if(cursor_flag!='five_membered_ring')
	{
		document.getElementById("s_content").style.cursor = "url('images/five_membered_ring.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", ring_line);
		cursor_flag='five_membered_ring';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", ring_line);
		document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
		symbol='';
		cursor_flag=false;
	}
  }
  function six_membered_ring()
  {
	bondCount = 1;
	skeletonFlag=false;
	skeletonFragmentXML=sixMemberedRing;
	eventClear();
	if(cursor_flag!='six_membered_ring')
	{
		document.getElementById("s_content").style.cursor = "url('images/six_membered_ring.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", ring_line);
		cursor_flag='six_membered_ring';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", ring_line);
		document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
		symbol='';
		cursor_flag=false;
	}
  }
  function seven_membered_ring()
  {
	bondCount = 1;
	skeletonFlag=false;
	skeletonFragmentXML=sevenMemberedRing;
	eventClear();
	if(cursor_flag!='seven_membered_ring')
	{
		document.getElementById("s_content").style.cursor = "url('images/seven_membered_ring.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", ring_line);
		cursor_flag='seven_membered_ring';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", ring_line);
		document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
		symbol='';
		cursor_flag=false;
	}
  }
  function eight_membered_ring()
  {
	bondCount = 1;
	skeletonFlag=false;
	skeletonFragmentXML=eightMemberedRing;
	eventClear();
	if(cursor_flag!='eight_membered_ring')
	{
		document.getElementById("s_content").style.cursor = "url('images/eight_membered_ring.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", ring_line);
		cursor_flag='eight_membered_ring';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", ring_line);
		document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
		symbol='';
		cursor_flag=false;
	}
  }
  function benzene_ring()
  {
	bondCount = 1;
	skeletonFlag=false;
	skeletonFragmentXML=benzeneRing;
	eventClear();
	if(cursor_flag!='benzene_ring')
	{
		document.getElementById("s_content").style.cursor = "url('images/benzene_ring.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", ring_line);
		cursor_flag='benzene_ring';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", ring_line);
		document.getElementById("s_content").removeEventListener("mousemove", ring_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", ring_msup);
		symbol='';
		cursor_flag=false;
	}
  }
  function zero_membered_bridge()
  {
	deleteBridge();
	bondCount = 1;
	bridgeCount=0;
	skeletonFlag=false;
	skeletonFragmentXML='zero';
	eventClear();
	if(cursor_flag!='zero_membered_bridge')
	{
		document.getElementById("s_content").style.cursor = "url('images/zero_membered_bridge.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", bridge_line);
		cursor_flag='zero_membered_bridge';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", bridge_line);
		document.getElementById("s_content").removeEventListener("mousemove", bridge_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", bridge_msup);
		symbol='';
		cursor_flag=false;
	}
  }
function one_membered_bridge()
  {
	deleteBridge();
	bondCount = 1;
	bridgeCount=1;
	skeletonFlag=false;
	skeletonFragmentXML=oneMemberSkeleton;
	eventClear();
	if(cursor_flag!='one_membered_bridge')
	{
		document.getElementById("s_content").style.cursor = "url('images/one_membered_bridge.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", bridge_line);
		cursor_flag='one_membered_bridge';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", bridge_line);
		document.getElementById("s_content").removeEventListener("mousemove", bridge_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", bridge_msup);
		symbol='';
		cursor_flag=false;
	}
  }
  function two_membered_bridge()
  {
	deleteBridge();
	bondCount = 1;
	bridgeCount=2;
	skeletonFlag=false;
	skeletonFragmentXML=twoMemberSkeleton;
	eventClear();
	if(cursor_flag!='two_membered_bridge')
	{
		document.getElementById("s_content").style.cursor = "url('images/two_membered_bridge.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", bridge_line);
		cursor_flag='two_membered_bridge';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", bridge_line);
		document.getElementById("s_content").removeEventListener("mousemove", bridge_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", bridge_msup);
		symbol='';
		cursor_flag=false;
	}
  }
  function three_membered_bridge()
  {
	deleteBridge();
	bondCount = 1;
	bridgeCount=3;
	skeletonFlag=false;
	skeletonFragmentXML=threeMemberSkeleton;
	eventClear();
	if(cursor_flag!='three_membered_bridge')
	{
		document.getElementById("s_content").style.cursor = "url('images/three_membered_bridge.cur'), auto";
		document.getElementById("s_content").addEventListener("mousedown", bridge_line);
		cursor_flag='three_membered_bridge';
		symbol='C';
	}
	else
	{
		document.getElementById("s_content").style.cursor = "default";
		document.getElementById("s_content").removeEventListener("mousedown", bridge_line);
		document.getElementById("s_content").removeEventListener("mousemove", bridge_msmove);
		document.getElementById("s_content").removeEventListener("mouseup", bridge_msup);
		symbol='';
		cursor_flag=false;
	}
  }
  function clone(obj) {
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        if(obj.hasOwnProperty(key)) {
            temp[key] = clone(obj[key]);
        }
    }
    return temp;
}
function copyStructure()
{
	var toPush = new Array();
	for(var i=0;i<structure.length;i++)
	{
		var  frgVector=structure[i].getFragmentVector().slice();
		var objStr = jQuery.extend(true, {}, structure[i]);
		var toPushAtm =  new Array();
		for(var j=0;j<frgVector.length;j++)
		{
			var atmVector=frgVector[j].getAtomVector().slice();
			var toPushElec = new Array();
			for(var k=0;k<atmVector.length;k++)
			{
				var elecVector = atmVector[k].getElectronLinkVector().slice();
				var atm = jQuery.extend(true, {}, atmVector[k]);
				atmVector[k]=atm;
				for(var l=0;l<elecVector.length;l++)
				{
					var elec = jQuery.extend(true, {}, elecVector[l]);
					elecVector[l]=elec;
				}
				toPushElec.push(elecVector);
			}
			toPushAtm.push(toPushElec);
			//frgVector[j].setAtomVector(atmVector);
		}
		toPush.push(toPushAtm);
	}
	return toPush;
}
function event_delete_structure(event)
{
	stack_check();
	var re_number = new Array();
	var arr = new Array();
	var assoc_arr = [];
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
		if(obj.getAttribute('str_id')==pt1.str_id)
		{
			svg.removeChild(obj);
			arr.push(obj);
			to_minus_count++;
		}	
		else
			re_number.push(obj);
	}
	var len=re_number.length;
	count = count - to_minus_count;
	for(var i=0;i<len;i++)
	{
		var id = "g["+i+"]";
		var old_id = re_number[i].getAttribute('id');
		assoc_arr[old_id]=id;
		re_number[i].setAttribute('id',id);
	}
	re_number = new Array();
	
	var to_minus_l_count = 0;
	for(var i=0;i<l_count;i++)
	{
		var id = "l["+i+"]";
		var obj = document.getElementById(id);
		if(obj.getAttribute('str_id')==pt1.str_id)
		{
			svg.removeChild(obj);
			arr.push(obj);
			to_minus_l_count++;
		}			
		else
			re_number.push(obj);
	}
	var len=re_number.length;
	l_count = l_count - to_minus_l_count;
	for(var i=0;i<len;i++)
	{
		var id = "l["+i+"]";
		re_number[i].setAttribute('id',id);
		var old_id = re_number[i].getAttribute('id1');
		re_number[i].setAttribute('id1',assoc_arr[old_id]);
		var old_id = re_number[i].getAttribute('id2');
		re_number[i].setAttribute('id2',assoc_arr[old_id]);
	}
	
	undo_stack.push(arr);
	console.log(undo_stack);
}
function undo()
  {
	deleteBridge();
	if(undo_stack.length!=0)
	{
		var toRemove = undo_stack.pop();
		console.log(l_count);
		var arr=new Array();
		var line_id_change = new Array(); var assoc_arr = [];
		var index=new Array();
		if(typeof(toRemove[0])=='object')
		{
			for(var i=0;i<toRemove.length;i++)
			{
				var id = toRemove[i].getAttribute('id');
				if(id.indexOf('l')!=-1)
				{
					
					if(delete_structure_flag==false)
					{
						id = "l["+l_count+"]";
						toRemove[i].setAttribute('id',id);
						line_id_change.push(toRemove[i]);
					}
					else
					{
						index.push(toRemove[i].getAttribute('id1'));
						index.push(toRemove[i].getAttribute('id2'));
					}
					l_count++;
				}
				if(id.indexOf('g')!=-1)
				{
					if(delete_structure_flag==false)
					{
						id = "g["+count+"]";
						var old_id = toRemove[i].getAttribute('id');
						var new_id = id;
						assoc_arr[old_id]=new_id;
						toRemove[i].setAttribute('id',id);
						index.push(id);
					}
					count++;
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
			if(delete_structure_flag==false)
			{
				for(var i=0;i<line_id_change.length;i++)
				{
					var old_id = line_id_change[i].getAttribute('id1');
					line_id_change[i].setAttribute('id1',assoc_arr[old_id]);
					var old_id = line_id_change[i].getAttribute('id2');
					line_id_change[i].setAttribute('id2',assoc_arr[old_id]);					
				}
			}
		delete_structure_flag=true;
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
				arr.push(obj);
				svg.removeChild(obj);
			}
		}
		
		redo_stack.push(arr);
		console.log(redo_stack);
		//console.log(l_count);
		undo_redo_flag=true;
	}
	/* if(undo_stack_jsobj.length!=0)
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
		/* console.log(undo_stack_jsobj);
		console.log(redo_stack_jsobj); 
		//console.log(structure);
	}	 */
  }
  function redo()
  {
	deleteBridge();
	if(redo_stack.length!=0)
	{
		undo_redo_flag=true;
		var toAdd = redo_stack.pop();
		var arr=new Array();
		var index=new Array();
		if(typeof(toAdd[0])!='object')
		{
			for(var i=0;i<toAdd.length;i++)
			{
				var obj=document.getElementById(toAdd[i]);
				if(toAdd[i].indexOf('g')!=-1)
					count--;
				if(toAdd[i].indexOf('l')!=-1)
					l_count--;
				arr.push(obj);
				svg.removeChild(obj);
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
				if(id.indexOf('g')!=-1)
				{
					count++;
				}
				arr.push(id);
			}
			for(var i=0;i<index.length;i++)
			{
				var obj = document.getElementById(index[i])
				svg.removeChild(obj);
				svg.appendChild(obj);
			}
		}		
		undo_stack.push(arr);
		
		//console.log(count);
		//console.log(l_count);
	}
	/* if(redo_stack_jsobj.length!=0)
	{
		var toAdd = redo_stack_jsobj.pop();
		structure = new Array();
		structure = toAdd;
		createNewFragments();
		undo_stack_jsobj.push(toAdd);
		/* console.log(undo_stack_jsobj);
		console.log(redo_stack_jsobj); 
	} */
  }
  var form  = document.createElement("FORM");
	form.setAttribute("type", "multipart/form-data");
	form.setAttribute("id", "form1");
	var upload_file = document.createElement("INPUT");
    upload_file.setAttribute("type", "file");
	upload_file.id='upload';
	form.appendChild(upload_file);
	document.body.appendChild(form);
	upload_file.click(); 	
	upload_file.onchange = function() {
	form1.submit();
	upload();
	};
	function line_adjust()
 {
	for(var i=0;i<l_count;i++)
	{
		var id = "l["+i+"]";
		var obj =  document.getElementById(id);
		if(obj==null)
			continue;
		var id1 = obj.getAttribute('id1');
		var id2 = obj.getAttribute('id2');
		var obj1 = document.getElementById(id1);
		var obj2 = document.getElementById(id2);
		var c_adjust1 = obj1.childNodes[1].childNodes[0].nodeValue.length-1;
		var c_adjust2 = obj2.childNodes[1].childNodes[0].nodeValue.length-1;
		var x1 = Number(obj.getAttribute('cx'));
		var y1 = Number(obj.getAttribute('cy'));
		var x2 = Number(obj.getAttribute('cx'));
		var y2 = Number(obj.getAttribute('cy'));
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
 /* if(bond_status_flag==false)
		{
			for(var j=0;j<ElectronLinkVector.length;j++)
			{
				if(ElectronLinkVector[j].getElectronStatus()=='uPair')
					{
						ElectronLinkVector[j].setElectronStatus('bPair');
						ElectronLinkVector[j].setX1(Number(pt1.x).toFixed(2));
						ElectronLinkVector[j].setX2(Number(pt2.x).toFixed(2));
						ElectronLinkVector[j].setY1(Number(pt1.y).toFixed(2));
						ElectronLinkVector[j].setY2(Number(pt2.y).toFixed(2));
						if(ElectronLinkVector[j].getBondType()!='Coordinate')
						{
							ElectronLinkVector[j].setBond('sigma');
							ElectronLinkVector[j].setBondType('Covalent');
							set_part_charge_elec(pt1.atm_id,pt2.atm_id,j);
						}						
						ElectronLinkVector[j].setOrder(bond);
						if(bond!='single'&&ElectronLinkVector[j].getBondType()!='Coordinate')
						{
							ElectronLinkVector=linkOverlap(ElectronLinkVector,pt1,pt2);
							ElectronLinkVector[j].setBond('pi');
						}
						ElectronLinkVector[j].setLinkStatus('linkTarget');
						var theta=degree(pt1,pt2);
						if(theta<0)
							theta +=360;
						//theta=returnDegreeRange(theta);
						ElectronLinkVector[j].setOrientation(Math.round(theta));
						if(uPairCount(pt1)==0&&obj.childNodes[1].childNodes[0].nodeValue=="C")
						{
							obj.style.visibility = "hidden";
							obj.childNodes[1].setAttribute('fill','black');
							//console.log(obj.style.visibility);
						}							
						break;
					}				
			}
		}
		if(bond_status_flag==true||j==ElectronLinkVector.length)
		{ */
		 /*  function save_image()
  {
  var arr = new Array();
  stack_check();
  var htmlString = "<?xml version='1.0' encoding='utf-8'?><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>";
  add_implied_hydrogen();
  change_obj_color();  
  var a = document.getElementById('mySvg');
  a.setAttribute("style","font-size: 50%;font-family: 'Ubuntu', sans-serif;");
  htmlString += $( s_content ).html();
  //console.log(htmlString);
  a.removeAttribute("style","font-size: 50%;font-family: 'Ubuntu', sans-serif;");
  $.post("save.php", {data: htmlString}, function (file) {
            window.location.href =  "download.php?path="+ file});  
  undo_stack.push(arr);
  var toPush = copyStructure(structure);
  undo_stack_jsobj.push(toPush);
  } */
  /* function target_coordinate_bond_set(atm_id,bond_status)
{
	var elec_vector = atom[atm_id].getElectronLinkVector();
	for(var i=0;i<elec_vector.length;i++)
	{
		if(elec_vector[i].getElectronStatus()==bond_status.src)
		{
			elec_vector[i].setBond(bond_status.bond);
			elec_vector[i].setBondType(bond_status.type);
			elec_vector[i].setOrder(bond_status.order);
			if(bond_status.src_chrg>0)
			{
				elec_vector[i].setCharge('+');
				elec_vector[i].setChargeCount(1);
			}
			else if(bond_status.src_chrg<0)
			{
				elec_vector[i].setCharge('-');
				elec_vector[i].setChargeCount(1);
			}
			else
			{
				elec_vector[i].setCharge(0);
				elec_vector[i].setChargeCount(0);
			}
			break;
		}
	}
} */
	/* var path = document.createElementNS(svgNS,'path');
	path.setAttribute('d',d_attribute);
	path.setAttribute('stroke-linecap','butt');
	path.setAttribute('stroke-linejoin','miter');
	path.setAttribute('fill','none');
	path.setAttribute('stroke','rgb(0,0,0)');
	path.setAttribute('stroke-width',0.75);
	svg.appendChild(path); */
	var d_attribute =""; var temp="";
	if(temp == ("M"+x+" "+y+" "))
		d_attribute +=("L"+x+" "+y+" ");
	else
		d_attribute +=("M"+x+" "+y+" ");
	d_attribute +=("L"+x+" "+y+" ");
	temp = ("M"+x+" "+y+" ");