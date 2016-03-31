function loadXMLDoc(filename)
{
if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else // code for IE5 and IE6
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET",filename,false);
xhttp.send();
return xhttp.responseXML;
}
function writeXML(display)
{ 
	var strlen=structure.length;
	var str_i=0;var s_id = [];var cnt=0;
	for(var i=0;i<strlen;i++)
	{
		if(toSkip[i]=='skip')
			continue;
		cnt++;
	}
	if(display=='save_template'&&cnt>1)
		return false;
	var txt="value=<?xml version='1.0'?>";
	if(display=='save')
	{
		add_implied_hydrogen();
		txt="<?xml version='1.0'?>"
	}
	if(display=='save_template')
		txt="<?xml version='1.0'?>"
		
	if(display!='save_template')
		txt = txt.concat("<structureGroup id='s' title='' type=''>");
		
	var ids=[];
	for(var i=0;i<strlen;i++)
	{
		if(toSkip[i]=='skip')
			continue;
		if(typeof(structure[i].getFragmentVector)=='function')
		{
		txt = txt.concat("");var old_id = 's'+(i);var new_id  ='s'+(str_i+1);
		s_id[old_id]=new_id;
		txt = txt.concat("<structure id='");
		txt = txt.concat("s"+(str_i+1)+"'");
		txt = txt.concat(" title='"+structure[i].getTitle()+"'");
		txt = txt.concat(" type='"+structure[i].getType()+"'");
		txt = txt.concat(" formula='"+structure[i].getFormula()+"'");
		txt = txt.concat(" molarmass='"+structure[i].getmolarMass()+"'");
		txt = txt.concat(" state='"+structure[i].getState()+"'");
		txt = txt.concat(" role='"+structure[i].getRole()+"'");
		txt = txt.concat(" mp='"+structure[i].getMp()+"'");
		txt = txt.concat(" bp='"+structure[i].getBp()+"'");
		txt = txt.concat(" smiles='"+structure[i].getSmiles()+"'");
		txt = txt.concat(" >");
		var frg=structure[i].getFragmentVector();
		var frglen = frg.length;
		for(var j=0;j<frglen;j++)
		{
			txt = txt.concat("");
			txt = txt.concat("<fragment id='");
			txt = txt.concat("s"+(str_i+1)+'-'+(j+1)+"'");
			txt = txt.concat(" title='"+frg[j].getTitle()+"'");
			txt = txt.concat(" type='"+frg[j].getType()+"'");
			txt = txt.concat(" formula='"+frg[j].getFormula()+"'");
			txt = txt.concat(" revformula='"+frg[j].getRevFormula()+"'");
			txt = txt.concat(" smiles='"+frg[j].getSmiles()+"'");
			txt = txt.concat(" linkType='"+frg[j].getLinkType()+"'");
			txt = txt.concat(" sklCode='"+frg[j].getSklCode()+"'");
			txt = txt.concat(" template='"+frg[j].getTemplate()+"'");
			txt = txt.concat(" orientation='"+frg[j].getOrientation()+"'");
			txt = txt.concat(" projection='"+frg[j].getProjection()+"'");
			txt = txt.concat(" x1='"+frg[j].getX1()+"'");
			txt = txt.concat(" y1='"+frg[j].getY1()+"'");
			txt = txt.concat(" x2='"+frg[j].getX2()+"'");
			txt = txt.concat(" y2='"+frg[j].getY2()+"'");
			txt = txt.concat(" >");
			var atm=frg[j].getAtomVector();
			var atmlen = atm.length;
			for(var k=0;k<atmlen;k++)
			{
				txt = txt.concat("");
				txt = txt.concat("<atom id='");
				txt = txt.concat("s"+(str_i+1)+'-'+(j+1)+'-'+'a'+(k+1)+"'");
				txt = txt.concat(" title='"+atm[k].getTitle()+"'");
				txt = txt.concat(" type='"+atm[k].getType()+"'");
				txt = txt.concat(" atNo='"+atm[k].getAtNo()+"'");
				txt = txt.concat(" hybridization='"+atm[k].getHybridization()+"'");
				txt = txt.concat(" symbol='"+atm[k].getSymbol()+"'");
				if(atm[k].getCharge()=='+')
					txt = txt.concat(" charge='%2B'");
				else if(atm[k].getCharge()=='-')
					txt = txt.concat(" charge='%2D'");
				else
					txt = txt.concat(" charge='"+atm[k].getCharge()+"'");
				txt = txt.concat(" chargeCount='"+atm[k].getChargeCount()+"'");
				txt = txt.concat(" position='"+atm[k].getPosition()+"'");
				txt = txt.concat(" isotopeLabel='"+atm[k].getIsotopeLabel()+"'");
				txt = txt.concat(" electroNegativity='"+atm[k].getElectroNegativity()+"'");
				txt = txt.concat(" oxdnState='"+atm[k].getOxdnState()+"'");
				txt = txt.concat(" block='"+atm[k].getBlock()+"'");
				txt = txt.concat(" gcCode='"+atm[k].getGcCode()+"'");
				if(atm[k].getPartCharge()=='+')
					txt = txt.concat(" partcharge='%2B'");
				else if(atm[k].getPartCharge()=='-')
					txt = txt.concat(" partcharge='%2D'");
				else
					txt = txt.concat(" partcharge='"+atm[k].getPartCharge()+"'");
				txt = txt.concat(" partChargeVal='"+atm[k].getPartChargeVal()+"'");
				txt = txt.concat(" x='"+atm[k].getX()+"'");
				txt = txt.concat(" y='"+atm[k].getY()+"'");
				txt = txt.concat(" >");
				var elec=atm[k].getElectronLinkVector();
				var eleclen=elec.length;
				for(var l=0;l<eleclen;l++)
				{
					txt = txt.concat("");var old = (j)+'-'+'a'+(k)+'e'+(l);
					txt = txt.concat("<electronLink id='");ids[old]=(j+1)+'-'+'a'+(k+1)+'e'+(l+1);
					txt = txt.concat("s"+(str_i+1)+'-'+(j+1)+'-'+'a'+(k+1)+'e'+(l+1)+"'");
					txt = txt.concat(" title='"+elec[l].getTitle()+"'");
					txt = txt.concat(" type='"+elec[l].getType()+"'");
					txt = txt.concat(" electronStatus='"+elec[l].getElectronStatus()+"'");
					if(elec[l].getCharge()=='+')
						txt = txt.concat(" charge='%2B'");
					else if(elec[l].getCharge()=='-')
						txt = txt.concat(" charge='%2D'");
					else
						txt = txt.concat(" charge='"+elec[l].getCharge()+"'");
					txt = txt.concat(" chargeCount='"+elec[l].getChargeCount()+"'");
					txt = txt.concat(" affinity='"+elec[l].getAffinity()+"'");
					txt = txt.concat(" bond='"+elec[l].getBond()+"'");
					txt = txt.concat(" bondType='"+elec[l].getBondType()+"'");
					txt = txt.concat(" order='"+elec[l].getOrder()+"'");
					txt = txt.concat(" linkStatus='"+elec[l].getLinkStatus()+"'");
					var target=elec[l].getTarget().split("-");
					if(target.length>1)
					{
						target[0]='s'+(str_i+1);
						target[1] = Number(target[1])+1;
						target[1] = target[1];
						var eid = target[2];
						var e_index = target[2].indexOf('e');
						target[2] = target[2].slice(1,e_index);
						target[2] = Number(target[2])+1;
						target[2] = 'a'+target[2];
						var eid = eid.slice(e_index+1);
						eid = Number(eid)+1;
						eid = 'e'+eid;
						target = target[0]+'-'+target[1]+'-'+target[2]+eid;
					}						
					txt = txt.concat(" target='"+target+"'");
					txt = txt.concat(" orientation='"+elec[l].getOrientation()+"'");
					txt = txt.concat(" projection='"+elec[l].getProjection()+"'");
					txt = txt.concat(" priority='"+elec[l].getPriority()+"'");
					txt = txt.concat(" gcCode='"+elec[l].getGcCode()+"'");
					if(elec[l].getPartCharge()=='+')
						txt = txt.concat(" partcharge='%2B'");
					else if(elec[l].getPartCharge()=='-')
						txt = txt.concat(" partcharge='%2D'");
					else
						txt = txt.concat(" partcharge='"+elec[l].getPartCharge()+"'");
					txt = txt.concat(" partChargeVal='"+elec[l].getPartChargeVal()+"'");
					txt = txt.concat(" x1='"+elec[l].getX1()+"'");
					txt = txt.concat(" y1='"+elec[l].getY1()+"'");
					txt = txt.concat(" x2='"+elec[l].getX2()+"'");
					txt = txt.concat(" y2='"+elec[l].getY2()+"'");
					txt = txt.concat(" />");					
				}
				txt = txt.concat("</atom>");	
			}
			txt = txt.concat("</fragment>");
		}
		txt = txt.concat("</structure>");
		str_i++;
	}
	}
	for(var i=0;i<strlen;i++)
	{
		if(toSkip[i]=='skip')
			continue;
		if(typeof(structure[i].getFragmentVector)!='function')
		{
			txt = txt.concat("<interaction id='"+structure[i].getId()+"'");
			txt = txt.concat(" title='"+structure[i].getTitle()+"'");
			txt = txt.concat(" type='"+structure[i].getType()+"'");
			txt = txt.concat(" sourceObject='"+structure[i].getSourceObject()+"'");
			txt = txt.concat(" targetObject='"+structure[i].getTargetObject()+"'");
			var target=structure[i].getSourceId().split('-');
			target[0] = s_id[target[0]];
			target[1] = target[1]+'-'+target[2];
			target = target[0]+'-'+ids[target[1]];
			txt = txt.concat(" sourceId='"+target+"'");
			var target=structure[i].getTargetId().split('-');
			target[0] = s_id[target[0]];
			target[1] = target[1]+'-'+target[2];
			target = target[0]+'-'+ids[target[1]];
			txt = txt.concat(" targetId='"+target+"'");
			txt = txt.concat(" x1='"+structure[i].getX1()+"'");
			txt = txt.concat(" y1='"+structure[i].getY1()+"'");
			txt = txt.concat(" x2='"+structure[i].getX2()+"'");
			txt = txt.concat(" y2='"+structure[i].getY2()+"'");
			txt = txt.concat(" />");
		}
	}
	if(display!='save_template')
		txt = txt.concat("</structureGroup>");
	if(display=='save'||display=='save_template')
		return txt;
	
	 if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	var myWindow = window.open("newfile.xml","temp XML","scrollbars=yes,width=2000, height=400");
    }
  }

  xmlhttp.open("POST","writeXML.php",false);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(txt);
	
}
