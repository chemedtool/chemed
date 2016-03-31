function electronLinkSet(pt1,pt2,obj)
{
	if(typeof(obj)!='object')
		obj = document.getElementById(obj);
	var ElectronLinkVector=atom[pt1.atm_id].getElectronLinkVector();
	if(bond_status_flag==false)
	{
		bond_status = check_bond_type(pt1,pt2);
		bond_status_flag = true;
	}
	else
	{
		var temp = bond_status.tgt;
		bond_status.tgt = bond_status.src;
		bond_status.src = temp;
		var temp = bond_status.tgt_chrg;
		bond_status.tgt_chrg = bond_status.src_chrg;
		bond_status.src_chrg = temp;
		bond_status_flag = false;
	}
	for(var j=0;j<ElectronLinkVector.length;j++)
	{
		if(ElectronLinkVector[j].getElectronStatus()==bond_status.tgt)
		{
			if(atom[pt1.atm_id].getBlock()=='d'&&bond_status.elec_title!=null&&ElectronLinkVector[j].getTitle()!=bond_status.elec_title)
				continue;
			ElectronLinkVector[j].setElectronStatus('bPair');
			ElectronLinkVector[j].setX1(Number(pt1.x).toFixed(2));
			ElectronLinkVector[j].setX2(Number(pt2.x).toFixed(2));
			ElectronLinkVector[j].setY1(Number(pt1.y).toFixed(2));
			ElectronLinkVector[j].setY2(Number(pt2.y).toFixed(2));
			ElectronLinkVector[j].setBond(bond_status.bond);
			ElectronLinkVector[j].setBondType(bond_status.type);
			ElectronLinkVector[j].setOrder(bond_status.order);
			if(bond!='single')
			{
				ElectronLinkVector=linkOverlap(ElectronLinkVector,pt1,pt2);
			}
			ElectronLinkVector[j].setLinkStatus('linkTarget');
			var theta=degree(pt1,pt2);
			theta=returnDegreeRange(theta);
			ElectronLinkVector[j].setOrientation(theta);
			if(bond_status.tgt_chrg>0)
			{
				ElectronLinkVector[j].setCharge('+');
				ElectronLinkVector[j].setChargeCount(1);
			}
			else if(bond_status.tgt_chrg<0)
			{
				ElectronLinkVector[j].setCharge('-');
				ElectronLinkVector[j].setChargeCount(1);
			}
			else
			{
				ElectronLinkVector[j].setCharge(0);
				ElectronLinkVector[j].setChargeCount(0);
			}
			/* if(bond_status.tgt_chrg==-1&&bond_status.tgt=='uPair'&&bond_status.src=='lPair')
			{
				ElectronLinkVector[j].setCharge(0);
				ElectronLinkVector[j].setChargeCount(0);
				var nxt_upair = next_upair(pt1.atm_id); 
				ElectronLinkVector[nxt_upair].setCharge('-');
				ElectronLinkVector[nxt_upair].setChargeCount(1);
				ElectronLinkVector[nxt_upair].setElectronStatus('lPair');
			} */
			/* if(bond_status.tgt_chrg==0&&bond_status.tgt=='lPair'&&bond_status.src=='uPair')
			{
				var nxt_vacantd = next_vacantd(pt1.atm_id);
				ElectronLinkVector[nxt_vacantd].setElectronStatus('uPair');
			} */
			if(bond_status.tgt_chrg==-1&&bond_status.tgt=='uPair'&&bond_status.src=='lPair')
			{
				ElectronLinkVector[j].setCharge(0);
				ElectronLinkVector[j].setChargeCount(0);
				var nxt_vacantp = next_vacantp(pt1.atm_id); 
				if(nxt_vacantp==0)
				{
					nxt_vacantp= next_upair(pt1.atm_id);
					ElectronLinkVector[nxt_vacantp].setElectronStatus('lPair');
				}
				else
					ElectronLinkVector[nxt_vacantp].setElectronStatus('uPair');
				ElectronLinkVector[nxt_vacantp].setCharge('-');
				ElectronLinkVector[nxt_vacantp].setChargeCount(1);				
			}
			if(bond_status.tgt_chrg==0&&bond_status.tgt=='lPair'&&bond_status.src=='uPair')
			{
				var nxt_vacantp = next_vacantp(pt1.atm_id);
				if(nxt_vacantp==0)
				{
					nxt_vacantp= next_vacantd(pt1.atm_id);
				}
				ElectronLinkVector[nxt_vacantp].setElectronStatus('uPair');
			}
			if(bond_status.tgt_chrg==0&&bond_status.tgt=='lPair'&&bond_status.src=='lPair')
			{
				var nxt_vacantp = next_vacantp(pt1.atm_id);
				if(nxt_vacantp==0)
				{
					nxt_vacantp= next_vacantd(pt1.atm_id);
				}
				ElectronLinkVector[nxt_vacantp].setElectronStatus('uPair');
			}
			set_part_charge_elec(pt1.atm_id,pt2.atm_id,j);
			if(j==ElectronLinkVector.length-1&&obj.childNodes[1].childNodes[0].nodeValue=="C")
			{
				obj.style.visibility = "hidden";
				obj.childNodes[1].setAttribute('fill','black');
			}							
			break;
		}	
	}	
	set_part_charge_atom(pt1.atm_id);
	return j;
}	
	function set_charge(atm_id)
	{
		var charge=0;var charge_count = 0;
		var ElectronLinkVector=atom[atm_id].getElectronLinkVector();
		for(var i=0;i<ElectronLinkVector.length;i++)
		{
			var chrg = ElectronLinkVector[i].getCharge();
			var chrg_val = ElectronLinkVector[i].getChargeCount();
			var txt = chrg + chrg_val;
			charge_count += Number(txt);
		}
		if(charge_count>0)
		{
			atom[atm_id].setCharge('+');
			atom[atm_id].setChargeCount(Math.abs(charge_count));
		}
		else if(charge_count<0)
		{
			atom[atm_id].setCharge('-');
			atom[atm_id].setChargeCount(Math.abs(charge_count));
		}
		else
		{
			atom[atm_id].setCharge(0);
			atom[atm_id].setChargeCount(0);
		}
	}
function next_upair(atm_id)
{
	var elec_vector = atom[atm_id].getElectronLinkVector();
	for(var i=0;i<elec_vector.length;i++)
	{
		if(elec_vector[i].getElectronStatus()=='uPair')
			return i;
	}
	return 0;
}
function next_vacantd(atm_id)
{
	var elec_vector = atom[atm_id].getElectronLinkVector();
	for(var i=0;i<elec_vector.length;i++)
	{
		if(elec_vector[i].getElectronStatus()=='vacant'&&elec_vector[i].getTitle().indexOf('d')!=-1)
			return i;
	}
	return 0;
}
function next_vacantp(atm_id)
{
	var elec_vector = atom[atm_id].getElectronLinkVector();
	for(var i=0;i<elec_vector.length;i++)
	{
		if(elec_vector[i].getElectronStatus()=='vacant'&&elec_vector[i].getTitle().indexOf('p')!=-1)
			return i;
	}
	return 0;
}
	function set_part_charge_elec(atm_id1,atm_id2,j)
	{
		var partChargeVal = atom[atm_id2].getElectroNegativity() - atom[atm_id1].getElectroNegativity();
		partChargeVal = partChargeVal.toFixed(2);
		var partCharge = '';
		var ElectronLinkVector=atom[atm_id1].getElectronLinkVector();
		if(partChargeVal>0&&partChargeVal<=1.7)
		{
			ElectronLinkVector[j].setPartCharge('+');
			ElectronLinkVector[j].setPartChargeVal(Math.abs(partChargeVal));
			if(ElectronLinkVector[j].getBondType()!='Coordinate')
				ElectronLinkVector[j].setBondType('Covalent');
			if(ElectronLinkVector[j].getBond()=='ionic')
				ElectronLinkVector[j].setBond('sigma');
		}
		else if(partChargeVal>1.7)
		{
			ElectronLinkVector[j].setPartCharge('+');
			ElectronLinkVector[j].setPartChargeVal(Math.abs(partChargeVal));
			ElectronLinkVector[j].setBondType('Electrovalent');
			ElectronLinkVector[j].setBond('ionic');
		}
		else if(partChargeVal<0&&partChargeVal>=-1.7)
		{
			ElectronLinkVector[j].setPartCharge('-');
			ElectronLinkVector[j].setPartChargeVal(Math.abs(partChargeVal));
			if(ElectronLinkVector[j].getBondType()!='Coordinate')
				ElectronLinkVector[j].setBondType('Covalent');
			if(ElectronLinkVector[j].getBond()=='ionic')
				ElectronLinkVector[j].setBond('sigma');
		}
		else if(partChargeVal<-1.7)
		{
			ElectronLinkVector[j].setPartCharge('-');
			ElectronLinkVector[j].setPartChargeVal(Math.abs(partChargeVal));
			ElectronLinkVector[j].setBondType('Electrovalent');
			ElectronLinkVector[j].setBond('ionic');
		}
	}
	function set_part_charge_atom(atm_id)
	{
		var ElectronLinkVector=atom[atm_id].getElectronLinkVector();
		var partChargeVal = 0;
		for(var i=0;i<ElectronLinkVector.length;i++)
		{
			var chrg = ElectronLinkVector[i].getPartCharge();
			var chrg_val = ElectronLinkVector[i].getPartChargeVal();
			var txt = chrg + chrg_val;
			partChargeVal += Number(txt);
		}
		if(partChargeVal>0)
		{
			atom[atm_id].setPartCharge('+');
			atom[atm_id].setPartChargeVal(Math.abs(partChargeVal));
		}
		else if(partChargeVal<0)
		{
			atom[atm_id].setPartCharge('-');
			atom[atm_id].setPartChargeVal(Math.abs(partChargeVal));
		}
		else
		{
			atom[atm_id].setPartCharge(0);
			atom[atm_id].setPartChargeVal(0);
		}
	}
	function linkOverlap(ElectronLinkVector,pt1,pt2)
	{
		for(var j=0;j<ElectronLinkVector.length;j++)
			{
				if(ElectronLinkVector[j].getElectronStatus()=='bPair')
					{
						var x1=ElectronLinkVector[j].getX1();
						var x2=ElectronLinkVector[j].getX2();
						var y1=ElectronLinkVector[j].getY1();
						var y2=ElectronLinkVector[j].getY2();
						var bondOrder=ElectronLinkVector[j].getOrder();
						if(pt1.x.toFixed(2)==x1&&pt1.y.toFixed(2)==y1&&pt2.x.toFixed(2)==x2&&pt2.y.toFixed(2)==y2&&bondOrder!=bond)
							ElectronLinkVector[j].setOrder(bond);
					}
			}
		return ElectronLinkVector;
	}
function check_bond_type(pt1,pt2)
{
	if(pt1.hasOwnProperty('atm_id')&&pt2.hasOwnProperty('atm_id'))
	{
		var upair_count1 = uPairCount(pt1);
		var lpair_count1 = lPairCount(pt1);
		var vacant_count1 = vacantCount(pt1);
		var vacant_dcount1 = vacantdCount(pt1);
		var vacant_pcount1 = vacantpCount(pt1);
		var upair_count2 = uPairCount(pt2);
		var lpair_count2 = lPairCount(pt2);
		var vacant_count2 = vacantCount(pt2);
		var vacant_dcount2 = vacantdCount(pt2);
		var vacant_pcount2 = vacantpCount(pt2);
		var block1 = atom[pt1.atm_id].getBlock();
		var block2 = atom[pt2.atm_id].getBlock();
		var sym1 = atom[pt1.atm_id].getSymbol();
		var sym2 = atom[pt2.atm_id].getSymbol();
		var elec_title = null;
		if(atom[pt1.atm_id].getBlock()=='d'||atom[pt2.atm_id].getBlock()=='d')
		{
			if(atom[pt1.atm_id].getBlock()=='d'&&atom[pt2.atm_id].getBlock()=='d')
				return 0;
			if(atom[pt1.atm_id].getBlock()=='d')
			{
				var ElectronLinkVector=atom[pt1.atm_id].getElectronLinkVector();
				for(var j=0;j<ElectronLinkVector.length;j++)
				{
					if(ElectronLinkVector[j].getTitle().indexOf('s')!=-1&&ElectronLinkVector[j].getElectronStatus()=='lPair')
					{
							elec_title = ElectronLinkVector[j].getTitle();
						if(upair_count2>=1&&bond=='single')
							return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:elec_title};
					}
				}
			}	
			else if(atom[pt2.atm_id].getBlock()=='d')
			{
				var ElectronLinkVector=atom[pt2.atm_id].getElectronLinkVector();
				for(var j=0;j<ElectronLinkVector.length;j++)
				{
					if(ElectronLinkVector[j].getTitle().indexOf('s')!=-1&&ElectronLinkVector[j].getElectronStatus()=='lPair')
					{
							elec_title = ElectronLinkVector[j].getTitle();
						if(upair_count1>=1&&bond=='single')
							return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'uPair',src:'lPair',elec_title:elec_title};
					}
				}
			}
			if(upair_count1>=1&&upair_count2>=1&&bond=='single')
				return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'uPair',src:'uPair',elec_title:null};
			if(upair_count1>=1&&upair_count2>=1&&bond!='single')
				return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:0,src_chrg:0,tgt:'uPair',src:'uPair',elec_title:null};
			if(atom[pt1.atm_id].getBlock()=='d')
			{
				if(lpair_count1>=1&&upair_count2>=1&&vacant_pcount1>=1&&bond=='single')
					return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
				if(lpair_count1>=1&&upair_count2>=1&&vacant_pcount1>=1&&bond!='single')
					return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			}
			else if(atom[pt2.atm_id].getBlock()=='d')
			{
				if(lpair_count2>=1&&upair_count1>=1&&vacant_pcount2>=1&&bond=='single')
					return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'uPair',src:'lPair',elec_title:null};
				if(lpair_count2>=1&&upair_count1>=1&&vacant_pcount2>=1&&bond!='single')
					return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:0,src_chrg:0,tgt:'uPair',src:'lPair',elec_title:null};
			}
			if(lpair_count1>=1&&lpair_count2>=1&&vacant_pcount1>=1&&vacant_pcount2>=1&&bond=='single')
				return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'lPair',elec_title:null};
			if(lpair_count1>=1&&lpair_count2>=1&&vacant_pcount1>=1&&vacant_pcount2>=1&&bond!='single')
				return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'lPair',elec_title:null};
		}
		else
		{
			/* if(upair_count1>=1&&upair_count2>=1&&(block1=='d'&&sym2=='C'||block2=='d'&&sym1=='C'))
				return {bond:"organoMetallic",type:"Covalent",order:bond,tgt_chrg:0,src_chrg:0,tgt:'uPair',src:'uPair',elec_title:null}; */
			if(upair_count1>=1&&upair_count2>=1&&bond=='single')
				return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'uPair',src:'uPair',elec_title:null};
			if(upair_count1>=1&&upair_count2>=1&&bond!='single')
				return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:0,src_chrg:0,tgt:'uPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2>=1&&vacant_pcount1>=1&&bond=='single')
				return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2>=1&&vacant_pcount1>=1&&bond!='single')
				return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2>=1&&vacant_pcount2>=1&&bond=='single')
				return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:1,src_chrg:-1,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2>=1&&vacant_pcount2>=1&&bond!='single')
				return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:1,src_chrg:-1,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2>1&&vacant_pcount2==0&&vacant_dcount1>=1&&bond=='single')
			{
				msup_flag = true;
				bondCount = 2;
				return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			}			
			if(lpair_count1>=1&&upair_count2>1&&vacant_pcount2==0&&vacant_dcount1>=1&&bond!='single')
			{
				msup_flag = true;
				bondCount = 2;
				return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			}			
			if(lpair_count1>=1&&upair_count2>1&&vacant_pcount2==0&&bond=='single')
				return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:1,src_chrg:-1,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2>1&&vacant_pcount2==0&&bond!='single')
				return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:1,src_chrg:-1,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2==1&&vacant_pcount2==0&&vacant_dcount1>=1&&bond=='single')
				return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2==1&&vacant_pcount2==0&&vacant_dcount1>=1&&bond!='single')
				return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2==1&&vacant_pcount2==0&&bond=='single')
				return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:1,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2==1&&vacant_pcount2==0&&bond!='single')
				return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:1,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&lpair_count2>=1&&vacant_pcount1>=1&&vacant_pcount2>=1&&bond=='single')
				return {bond:"sigma",type:"Covalent",order:"single",tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'lPair',elec_title:null};
			if(lpair_count1>=1&&lpair_count2>=1&&vacant_pcount1>=1&&vacant_pcount2>=1&&bond!='single')
				return {bond:"pi",type:"Covalent",order:bond,tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'lPair',elec_title:null};
			/* if(lpair_count1>=1&&upair_count2==1&&vacant_dcount1>=1)
				return {bond:"sigma",type:"Coordinate",order:"single",tgt_chrg:0,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2==1&&vacant_dcount1==0)
				return {bond:"sigma",type:"Coordinate",order:"single",tgt_chrg:1,src_chrg:0,tgt:'lPair',src:'uPair',elec_title:null};
			if(lpair_count1>=1&&upair_count2>=1)
				return {bond:"sigma",type:"Coordinate",order:"single",tgt_chrg:1,src_chrg:-1,tgt:'lPair',src:'uPair',elec_title:null};
			if(vacant_dcount1>=1&&lpair_count2>=1)
				return {bond:"sigma",type:"Coordinate",order:"single",tgt_chrg:-1,src_chrg:1,tgt:'vacant',src:'lPair',elec_title:null};
			if(lpair_count1>=1&&vacant_count2>=1)
				return {bond:"sigma",type:"Coordinate",order:"single",tgt_chrg:-1,src_chrg:1,tgt:'lPair',src:'vacant',elec_title:null}; */
		}
	}
	return 0;
}
  function getStructureId(atomIndex)
  {
	var len=structure.length;
	for(var i=0;i<len;i++)
	{
		if(typeof(structure[i].getFragmentVector)!='function')
			continue;
		var frg=structure[i].getFragmentVector();
		var frglen = frg.length;
		for(var j=0;j<frglen;j++)
		{
			var atm=frg[j].getAtomVector();
			var atmlen = atm.length;
			for(var k=0;k<atmlen;k++)
				{
					var frgIndex = getFragmentId(frg[j].getId());  
					if(atom[atomIndex].getId()==atm[k].getId())
						return {i:i,j:j,k:k,frgIndex:frgIndex};
				}
		}
	}
  }
function getFragmentId(fragmentIndex)
{
	var len=fragment.length;
	for(var i=0;i<len;i++)
	{
		if(fragment[i].getId()==fragmentIndex)
			return i;
	}	
}
function getAtomIndex(atmIndex)
{
	for(var i=0;i<count;i++)
	{
		if(atom[i].getId()==atmIndex)
			return i;
	}
} 
function createAtomFragment(symbol,strId,pt)
{
	atomList=atomFragmentListXML.getElementsByTagName('atomFragment');
	var len=atomList.length;
	for(i=0;i<len;i++)
	{
		var elementAtom = atomList[i];
		if(elementAtom.getAttribute("symbol")==symbol&&elementAtom.getAttribute("chargeCount")==0)
		{
			atom[count] = new Atom();
			fragment[frg_count]=new Fragment();
			var index = strId.slice(1);
			var frg_len = structure[index].getFragmentVector().length;
			var frgId=strId+'-'+frg_len;
			var atm_len = fragment[frg_count].getAtomVector().length;
			fragment[frg_count].setId(frgId);
			fragment[frg_count].setX1(pt.x.toFixed(2));
			fragment[frg_count].setX2(pt.x.toFixed(2));
			fragment[frg_count].setY1(pt.y.toFixed(2));
			fragment[frg_count].setY2(pt.y.toFixed(2));
			fragment[frg_count].setTitle(elementAtom.getAttribute("name"));
			fragment[frg_count].setType("AtomFragment");
			fragment[frg_count].setFormula(symbol);
			var id=frgId+'-a'+atm_len;
			atom[count].setId(id);
			atom[count].setX(pt.x.toFixed(2));
			atom[count].setY(pt.y.toFixed(2));
			atom[count].setAtNo(elementAtom.getAttribute("atNo"));
			atom[count].setTitle(elementAtom.getAttribute("name"));
			atom[count].setSymbol(elementAtom.getAttribute("symbol"));
			atom[count].setCharge(elementAtom.getAttribute("charge"));
			atom[count].setChargeCount(elementAtom.getAttribute("chargeCount"));
			atom[count].setElectroNegativity(elementAtom.getAttribute("electroNegativity"));
			atom[count].setBlock(elementAtom.getAttribute("block"));
			atom[count].setHybridization(elementAtom.getAttribute("hybridization"));
			atom[count].setPartCharge(0);
			atom[count].setPartChargeVal(0);
			var orbList = elementAtom.getElementsByTagName("electronLink");
						
			for (k = 0; k < orbList.length; k++) 
				{
				var elementOrb =orbList[k];
				elink = new ElectronLink();
				var eid=id+'e'+k;
				elink.setId(eid);  
				elink.setX1(pt.x.toFixed(2));
				elink.setX2(pt.x.toFixed(2));
				elink.setY1(pt.y.toFixed(2));
				elink.setY2(pt.y.toFixed(2));
				elink.setPartCharge(0);
				elink.setPartChargeVal(0);
				elink.setTitle(elementOrb.getAttribute("title"));
				elink.setType(elementOrb.getAttribute("type"));
				elink.setElectronStatus(elementOrb.getAttribute("electronStatus"));
				elink.setCharge(elementOrb.getAttribute("charge"));
				elink.setChargeCount(elementOrb.getAttribute("chargeCount"));
				atom[count].setElectronLink(elink);
				}
			fragment[frg_count].setAtom(atom[count]);
			return fragment[frg_count++];
		}
	}
}
function createRingFragment(strId,pt,degree)
{
	var frg=skeletonFragmentXML.getElementsByTagName('fragment');
	fragment[frg_count]=new Fragment();
	return_pt = new Array();
	var atomList = frg[0].getElementsByTagName("atom");
	var g=new Array();
	var len=atomList.length;
	var d_adjust = 360/len;
	var index = strId.slice(1);
	var frg_len = structure[index].getFragmentVector().length;
	var frgId=strId+'-'+frg_len;
	fragment[frg_count].setId(frgId);
	fragment[frg_count].setX1(pt.x.toFixed(2));
	fragment[frg_count].setX2(pt.x.toFixed(2));
	fragment[frg_count].setY1(pt.y.toFixed(2));
	fragment[frg_count].setY2(pt.y.toFixed(2));
	fragment[frg_count].setTitle(frg[0].getAttribute("title"));
	fragment[frg_count].setType(frg[0].getAttribute("type"));
	fragment[frg_count].setFormula(frg[0].getAttribute("symbol"));
	fragment[frg_count].setOrientation(degree);
	var smiles = 'C1';
	for(i=1;i<len;i++)
		smiles=smiles+'C';
	smiles=smiles+'1';
	fragment[frg_count].setSmiles(smiles);
		
	for(i=0;i<len;i++)
	{
		var atm_len = fragment[frg_count].getAtomVector().length;
		var elementAtom = atomList[i];
		atom[count] = new Atom();
		var id=frgId+'-a'+atm_len;
		atom[count].setId(id);
		g.push(drawAtom(pt,i+1));
		atom[count].setX(pt.x.toFixed(2));
		atom[count].setY(pt.y.toFixed(2));
		atom[count].setTitle(elementAtom.getAttribute("title"));
		atom[count].setSymbol(elementAtom.getAttribute("symbol"));
		atom[count].setPosition(elementAtom.getAttribute("position"));
		atom[count].setIsotopeLabel(elementAtom.getAttribute("isotopeLabel"));
		atom[count].setElectroNegativity(elementAtom.getAttribute("electroNegativity"));
		atom[count].setHybridization(elementAtom.getAttribute("hybridization"));
		atom[count].setBlock('p');
		atom[count].setPartCharge(0);
		atom[count].setPartChargeVal(0);
		d_adjust=Number(elementAtom.getAttribute("orientation"));
		var orbList = elementAtom.getElementsByTagName("electronLink");
			
		for (k = 0; k < orbList.length; k++) 
		{
			var elementOrb =orbList[k];
			elink = new ElectronLink();
			var eid=id+'e'+k;
			elink.setId(eid);  
			elink.setX1(pt.x.toFixed(2));
			elink.setX2(pt.x.toFixed(2));
			elink.setY1(pt.y.toFixed(2));
			elink.setY2(pt.y.toFixed(2));
			elink.setTitle(elementOrb.getAttribute("title"));
			elink.setType(elementOrb.getAttribute("type"));
			elink.setElectronStatus("uPair");
			elink.setCharge(elementOrb.getAttribute("charge"));
			elink.setChargeCount(elementOrb.getAttribute("chargeCount"));
			elink.setBond('sigma');
			elink.setPartCharge(0);
			elink.setPartChargeVal(0);
			elink.setOrder(elementOrb.getAttribute("order"));
			elink.setTarget(elementOrb.getAttribute("target"));
			elink.setLinkStatus(elementOrb.getAttribute("linkStatus"));
			elink.setPriority(elementOrb.getAttribute("priority"));
			elink.setGcCode(elementOrb.getAttribute("gcCode"));
			atom[count].setElectronLink(elink);
		}
		fragment[frg_count].setAtom(atom[count++]);
		var point={x:pt.x,y:pt.y,atm_id:count-1,xml_id:''};
		return_pt.push(point);
		degree = (degree+d_adjust)%360;		
		pt.x=pt.x-bondDistance*Math.cos(degree*Math.PI/180);
		pt.y=pt.y-bondDistance*Math.sin(degree*Math.PI/180);
	}
	frg_count++;
	return {fragment:fragment[frg_count-1],pt:return_pt,g:g,frg_id:frg_count-1};
}
function createSkeletonFragment(strId,pt,pt2,len,atm_orient)
{
	var frg;var d_adjust;var spiro_flag = false;var g_pt2;var skl_len;
	if(pt2==0)
	{
		spiro_flag=true;		
	}
	else
	{
		var line_col = returnLineId(pt.g_id,pt2.g_id);
		if(line_col.toReverse==false)
		{
			var copiedObject = jQuery.extend(true, {}, pt);
			pt = pt2;
			pt2 = jQuery.extend(true, {}, copiedObject);
		}
		var copy_pt2 = jQuery.extend(true, {}, pt2);
		g_pt2 = document.getElementById(pt2.g_id);		
	}
	var copy_pt = jQuery.extend(true, {}, pt);
	if(spiro_flag==true)
	{
		frg = skeleton[len-2].getElementsByTagName('fragment');
		skl_len = len-2;
	}		
	else
	{
		frg = skeleton[len-3].getElementsByTagName('fragment');
		skl_len = len-3;
	}		
	fragment[frg_count]=new Fragment();
	return_pt = new Array();skip_pt = new Array();
	var atomList = frg[0].getElementsByTagName("atom");
	var g=new Array();
	g.push(document.getElementById(pt.g_id));
	return_pt.push(copy_pt);
	skip_pt.push(true);
	var len=atomList.length;
	if(spiro_flag==true)
		d_adjust = 360/(len+1);
	else
		d_adjust = 360/(len+2);
	var angle_adjust = (Math.abs(d_adjust-180))/2;
	pt.x = Number(pt.x);
	pt.y = Number(pt.y);
	var index = strId.slice(1);
	var frg_len = structure[index].getFragmentVector().length;
	var frgId=strId+'-'+frg_len;
	fragment[frg_count].setId(frgId);
	fragment[frg_count].setX1(pt.x.toFixed(2));
	fragment[frg_count].setX2(pt.x.toFixed(2));
	fragment[frg_count].setY1(pt.y.toFixed(2));
	fragment[frg_count].setY2(pt.y.toFixed(2));
	
	if(spiro_flag==true)
	{
		var atm_degree = atom[pt.atm_id].getElectronLinkVector();
		var pt1 = {x:Number(atm_degree[0].getX1()),y:Number(atm_degree[0].getY1())};
		var pt2 = {x:Number(atm_degree[0].getX2()),y:Number(atm_degree[0].getY2())};
		if(pt1.x==pt.x.toFixed(2)&&pt1.y==pt.y.toFixed(2))
			var orient1 = Math.round(degree(pt2,pt1));
		else
			var orient1 = Math.round(degree(pt1,pt2));
		var pt1 = {x:Number(atm_degree[1].getX1()),y:Number(atm_degree[1].getY1())};
		var pt2 = {x:Number(atm_degree[1].getX2()),y:Number(atm_degree[1].getY2())};
		if(pt1.x==pt.x.toFixed(2)&&pt1.y==pt.y.toFixed(2))
			var orient2 = Math.round(degree(pt2,pt1));
		else
			var orient2 = Math.round(degree(pt1,pt2));
		var diff = (orient2-orient1)/2;
		var deg = orient1 + diff;
		if(orient1<0&&orient2>=0)
			deg += 180;
		deg -= angle_adjust;	
	}
	else
	{
		var pt1 = {x:Number(pt.x),y:Number(pt.y)};
		var pt2 = {x:Number(pt2.x),y:Number(pt2.y)};
		var orient = Math.round(degree(pt2,pt1));
		if(orient<0)
			orient += 360;
		var deg = d_adjust + orient;
	}
	pt.x=pt.x-bondDistance*Math.cos(deg*Math.PI/180);
	pt.y=pt.y-bondDistance*Math.sin(deg*Math.PI/180);
	var coll_atms = 0;	var atm_pos = 0;
	for(i=0;i<frg_len;i++)
	{
		var title1 = structure[index].getFragmentVector()[i].getTitle();
		if((title1.indexOf('Ring')!=-1||title1.indexOf('Skeleton')!=-1))
			atm_pos+=structure[index].getFragmentVector()[i].getAtomVector().length;
	}
	for(i=0;i<len;i++)
	{
		var atm_len = fragment[frg_count].getAtomVector().length;
		var elementAtom = atomList[i];
		atom[count] = new Atom();
		var id=frgId+'-a'+atm_len;
		atom[count].setId(id);var coll_id;
		if((coll_id=collisionDetect(pt.x,pt.y))!=-1&&spiro_flag==false)
		{
			var id='g['+coll_id+']';
			var elem=document.getElementById(id);
			var atm_id = collisionDetectAtomIndex(pt.x,pt.y);
			g.push(elem);
			var point={x:pt.x,y:pt.y,atm_id:atm_id,xml_id:''};
			if(uPairCount(point)<1)
			{
				return "error";
			}
			return_pt.push(point);
			skip_pt.push(true);coll_atms++;
			deg = (deg+d_adjust)%360;		
			pt.x=pt.x-bondDistance*Math.cos(deg*Math.PI/180);
			pt.y=pt.y-bondDistance*Math.sin(deg*Math.PI/180);
			continue;
		}
		else
			g.push(drawAtom(pt,++atm_pos));
		atom[count].setX(pt.x.toFixed(2));
		atom[count].setY(pt.y.toFixed(2));
		atom[count].setTitle(elementAtom.getAttribute("title"));
		atom[count].setSymbol(elementAtom.getAttribute("symbol"));
		atom[count].setPosition(elementAtom.getAttribute("position"));
		atom[count].setIsotopeLabel(elementAtom.getAttribute("isotopeLabel"));
		atom[count].setElectroNegativity(elementAtom.getAttribute("electroNegativity"));
		atom[count].setHybridization(elementAtom.getAttribute("hybridization"));
		atom[count].setBlock('p');
		atom[count].setPartCharge(0);
		atom[count].setPartChargeVal(0);
		var orbList = elementAtom.getElementsByTagName("electronLink");
			
		for (k = 0; k < orbList.length; k++) 
		{
			var elementOrb =orbList[k];
			elink = new ElectronLink();
			var eid=id+'e'+k;
			elink.setId(eid);  
			elink.setX1(pt.x.toFixed(2));
			elink.setX2(pt.x.toFixed(2));
			elink.setY1(pt.y.toFixed(2));
			elink.setY2(pt.y.toFixed(2));
			elink.setTitle(elementOrb.getAttribute("title"));
			elink.setType(elementOrb.getAttribute("type"));
			elink.setElectronStatus("uPair");
			elink.setCharge(elementOrb.getAttribute("charge"));
			elink.setChargeCount(elementOrb.getAttribute("chargeCount"));
			elink.setBond('sigma');
			elink.setPartCharge(0);
			elink.setPartChargeVal(0);
			elink.setOrder(elementOrb.getAttribute("order"));
			elink.setTarget(elementOrb.getAttribute("target"));
			elink.setLinkStatus(elementOrb.getAttribute("linkStatus"));
			elink.setPriority(elementOrb.getAttribute("priority"));
			elink.setGcCode(elementOrb.getAttribute("gcCode"));
			atom[count].setElectronLink(elink);
		}
		fragment[frg_count].setAtom(atom[count++]);
		var point={x:pt.x,y:pt.y,atm_id:count-1,xml_id:''};
		return_pt.push(point);
		skip_pt.push(false);
		deg = (deg+d_adjust)%360;		
		pt.x=pt.x-bondDistance*Math.cos(deg*Math.PI/180);
		pt.y=pt.y-bondDistance*Math.sin(deg*Math.PI/180);
	}	
	if(spiro_flag==false)
	{
		g.push(g_pt2);
		return_pt.push(copy_pt2);
		skip_pt.push(true);
		var x = Number(fragment[frg_count].getAtomVector()[0].getX());
		var y = Number(fragment[frg_count].getAtomVector()[0].getY());
		fragment[frg_count].setX1(x.toFixed(2));
		fragment[frg_count].setX2(x.toFixed(2));
		fragment[frg_count].setY1(y.toFixed(2));
		fragment[frg_count].setY2(y.toFixed(2));
	}
	fragment[frg_count].setTitle(skeleton[skl_len-coll_atms].getElementsByTagName('fragment')[0].getAttribute("title"));
	fragment[frg_count].setType(skeleton[skl_len-coll_atms].getElementsByTagName('fragment')[0].getAttribute("type"));
	fragment[frg_count].setFormula(skeleton[skl_len-coll_atms].getElementsByTagName('fragment')[0].getAttribute("symbol"));
	fragment[frg_count].setSmiles(skeleton[skl_len-coll_atms].getElementsByTagName('fragment')[0].getAttribute("smiles"));
	frg_count++;
	return {fragment:fragment[frg_count-1],pt:return_pt,g:g,frg_id:frg_count-1,skip_pt:skip_pt};
}
function createBridgeFragment(bridgeAtom)
{
	var frg=skeletonFragmentXML.getElementsByTagName('fragment');
	var return_pt=new Array();
	for(var i=0;i<deleteCount;i++)
	{
		atom.pop();
		var temp=fragment.pop();
		var arr=temp.getId().split('-');
		var str_id=arr[0].slice(1);
		var len=structure[Number(str_id)].getFragmentVector().length;
		structure[Number(str_id)].removeFragment(len-1);
		
		count--;frg_count--;
	}
	fragment[frg_count]=new Fragment();var pt=bridgeAtom[0];
	var atomList = frg[0].getElementsByTagName("atom");
	var len = atomList.length;
	var index = pt.str_id.slice(1);
	var frg_len = structure[index].getFragmentVector().length;
	var frgId=pt.str_id+'-'+frg_len;
	fragment[frg_count].setId(frgId);
	fragment[frg_count].setX1(pt.x.toFixed(2));
	fragment[frg_count].setX2(pt.x.toFixed(2));
	fragment[frg_count].setY1(pt.y.toFixed(2));
	fragment[frg_count].setY2(pt.y.toFixed(2));
	fragment[frg_count].setTitle(frg[0].getAttribute("title"));
	fragment[frg_count].setType(frg[0].getAttribute("type"));
	fragment[frg_count].setFormula(frg[0].getAttribute("symbol"));
	fragment[frg_count].setSmiles(frg[0].getAttribute("smiles"));
		
	for(i=0;i<len;i++)
	{
		var elementAtom = atomList[i];
		var atm_len = fragment[frg_count].getAtomVector().length;
		pt=bridgeAtom[i];
		return_pt.push(pt);
		atom[count] = new Atom();
		var id=frgId+'-a'+atm_len;
		atom[count].setId(id);
		atom[count].setX(pt.x.toFixed(2));
		atom[count].setY(pt.y.toFixed(2));
		atom[count].setTitle(elementAtom.getAttribute("title"));
		atom[count].setSymbol(elementAtom.getAttribute("symbol"));
		atom[count].setPosition(elementAtom.getAttribute("position"));
		atom[count].setIsotopeLabel(elementAtom.getAttribute("isotopeLabel"));
		atom[count].setElectroNegativity(elementAtom.getAttribute("electroNegativity"));
		atom[count].setHybridization(elementAtom.getAttribute("hybridization"));
		atom[count].setBlock('p');
		atom[count].setPartCharge(0);
		atom[count].setPartChargeVal(0);

		var orbList = elementAtom.getElementsByTagName("electronLink");
			
		for (k = 0; k < orbList.length; k++) 
		{
			var elementOrb =orbList[k];
			elink = new ElectronLink();
			var eid=id+'e'+k;
			elink.setId(eid);  
			elink.setX1(pt.x.toFixed(2));
			elink.setX2(pt.x.toFixed(2));
			elink.setY1(pt.y.toFixed(2));
			elink.setY2(pt.y.toFixed(2));
			elink.setTitle(elementOrb.getAttribute("title"));
			elink.setElectronStatus("uPair");
			elink.setCharge(elementOrb.getAttribute("charge"));
			elink.setChargeCount(elementOrb.getAttribute("chargeCount"));
			elink.setPartCharge(0);
			elink.setPartChargeVal(0);
			elink.setBond('sigma');
			elink.setOrder(elementOrb.getAttribute("order"));
			elink.setTarget(elementOrb.getAttribute("target"));
			elink.setLinkStatus(elementOrb.getAttribute("linkStatus"));
			elink.setPriority(elementOrb.getAttribute("priority"));
			elink.setGcCode(elementOrb.getAttribute("gcCode"));
			atom[count].setElectronLink(elink);
		}
		fragment[frg_count].setAtom(atom[count++]);
	}
	structure[str_id].setFragment(fragment[frg_count]);
	frg_count++;	
	return {fragment:fragment[frg_count-1],pt:return_pt,frg_id:frg_count-1};
}
function collisionDetect(x,y)
{
	for(var  i=0;i<count;i++)
	{
		var id='t['+i+']';
		var elem=document.getElementById(id);
		if(elem==null)
			continue;
		var x1=round(Number(elem.getAttribute('x')).toFixed(2));
		var y1=round(Number(elem.getAttribute('y')).toFixed(2));
		x=round(Number(x).toFixed(2));
		y=round(Number(y).toFixed(2));
		if(x1==x&&y1==y)
			return i;
	}
	return -1;
}
function collisionDetectAtomIndex(x,y)
{
	for(var  i=0;i<count;i++)
	{
		var x1=round(atom[i].getX());
		var y1=round(atom[i].getY());
		x=round(Number(x).toFixed(2));
		y=round(Number(y).toFixed(2));
		if(x1==x&&y1==y)
			return i;
	}
	return -1;
}
function collisionDetectFragmentIndex(x,y)
{
	for(var  i=0;i<frg_count;i++)
	{
		var x1=round(fragment[i].getX2());
		var y1=round(fragment[i].getY2());
		x=round(Number(x).toFixed(2));
		y=round(Number(y).toFixed(2));
		if(x1==x&&y1==y)
			return i;
	}
	return -1;
}
function deleteBridge()
{
	for(var i=0;i<deleteCount;i++)
	{
		atom.pop();
		var temp=fragment.pop();
		var arr=temp.getId().split('-');
		var str_id=arr[0].slice(1);
		var len=structure[Number(str_id)].getFragmentVector().length;
		structure[Number(str_id)].removeFragment(len-1);
		
		count--;l_count--;frg_count--;
		
		var id='g['+count+']';
		svg.removeChild(document.getElementById(id));
		var id='l['+l_count+']';
		svg.removeChild(document.getElementById(id));
	}
	bridgeAtom=new Array();
	bridge_stack_arr=new Array();
	bridgeCount=bridgeCount+deleteCount;
	deleteCount=0;
}
function copyStructure()
{
	var toPush = new Array();
	for(var i=0;i<structure.length;i++)
	{
		if(typeof(structure[i].getFragmentVector)=='function')
		{
			var frgVector=structure[i].getFragmentVector().slice();
			var objStr = jQuery.extend(true, {}, structure[i]);
			for(var j=0;j<frgVector.length;j++)
			{			
				var frgStr = jQuery.extend(true, {}, frgVector[j]);
				frgVector[j] = frgStr;
				var atmVector=frgVector[j].getAtomVector().slice();
				for(var k=0;k<atmVector.length;k++)
				{
					var atm = jQuery.extend(true, {}, atmVector[k]);
					atmVector[k]=atm;
					var elecVector = atmVector[k].getElectronLinkVector().slice();
					for(var l=0;l<elecVector.length;l++)
					{
						var elec = jQuery.extend(true, {}, elecVector[l]);
						elecVector[l]=elec;					
					}			
					atmVector[k].setElectronLinkVector(elecVector);
				}
				frgVector[j].setAtomVector(atmVector);
			}
			objStr.setFragmentVector(frgVector);
			toPush.push(objStr);
		}
		else
		{
			var objItr = jQuery.extend(true, {}, structure[i]);
			toPush.push(objItr);
		}
	}
	return toPush;
}
function createNewFragments()
{
	fragment= new Array();
	atom = new Array();
	for(var i=0;i<structure.length;i++)
	{
		if(typeof(structure[i].getFragmentVector)=='function')
		{
			var frgVector=structure[i].getFragmentVector();
			for(var j=0;j<frgVector.length;j++)
			{
				fragment.push(frgVector[j]);
				atmVector = frgVector[j].getAtomVector();			
				for(var k=0;k<atmVector.length;k++)
				{
					atom.push(atmVector[k]);
					var len=atom.length-1;
					var title = atmVector[k].getTitle();
					var visibility='hidden';
					var x=atmVector[k].getX();
					var y=atmVector[k].getY();
						var id='g['+collisionDetect(x,y)+']';
					var obj=document.getElementById(id);
					elecVector=atmVector[k].getElectronLinkVector();
					for(var l=0;l<elecVector.length;l++)
					{
						if(elecVector[l].getElectronStatus()=='uPair'||elecVector[l].getElectronStatus()=='lPair'||elecVector[l].getElectronStatus()=='vacant')
							visibility='visible';					
					}
					if(obj!=null)
					{
						if(title=='Carbon')
						{
						obj.childNodes[1].setAttribute('fill','red');
						obj.style.visibility = visibility;	
						}										
						if(visibility=='visible')
							obj.childNodes[1].setAttribute('fill','red');
						else
							obj.childNodes[1].setAttribute('fill','black');
					}				
				}
			}
		}
	}
	frg_count=fragment.length;
	count = atom.length;
}
function stack_check()
{
	if(undo_stack.length==undo_stack_jsobj.length&&undo_stack.length==50)
	{
		undo_stack.splice(0,1);		
		initial_state = undo_stack_jsobj[0];
		undo_stack_jsobj.splice(0,1);
	}
	if(undo_redo_flag==true)
	{
		redo_stack = new Array();
		redo_stack_jsobj = new Array();
		undo_stack = new Array();
		undo_stack_jsobj = new Array();
		bridge_stack_arr = new Array();
		undo_redo_flag=false;
		initial_state = copyStructure();
	}
}
function  lineCollisionDetect(g_id1,g_id2,toBreak)
{
	var cnt = 0;
	for(var i=0;i<l_count;i++)
	{
		var id ="l["+i+"]";
		var obj = document.getElementById(id);
		if(obj==null)
			continue;
		var id1 = obj.getAttribute("id1");
		var id2 = obj.getAttribute("id2");
		if((id1==g_id1&&id2==g_id2)||(id1==g_id2&&id2==g_id1))
		{
			cnt++;
			if(toBreak==true)
				return cnt;
		}			
	}
	return cnt;
}
function  returnLineId(g_id1,g_id2)
{
	for(var i=0;i<l_count;i++)
	{
		var id ="l["+i+"]";
		var obj = document.getElementById(id);
		if(obj==null)
			continue;
		var id1 = obj.getAttribute("id1");
		var id2 = obj.getAttribute("id2");
		if(id1==g_id1&&id2==g_id2)
		{
			return {line_id:id,toReverse:true};
		}
		else if(id1==g_id2&&id2==g_id1)
		{
			return {line_id:id,toReverse:false};
		}
	}
	return -1;
}
function  lineConnectedNumber(g_id)
{
	var cnt = 0;
	for(var i=0;i<l_count;i++)
	{
		var id ="l["+i+"]";
		var obj = document.getElementById(id);
		if(obj==null)
			continue;
		var id1 = obj.getAttribute("id1");
		var id2 = obj.getAttribute("id2");
		if((id1==g_id)||(id2==g_id))
		{
			cnt++;
		}			
	}
	return cnt;
}
function projection_set(x1,y1,x2,y2,proj)
{
	var atm_id = collisionDetectAtomIndex(x1,y1);
	var elec_vector = atom[atm_id].getElectronLinkVector();
	for(var j=0;j<elec_vector.length;j++)
	{
		new_x1 = Number(elec_vector[j].getX1()).toFixed(2);
		new_x2 = Number(elec_vector[j].getX2()).toFixed(2);
		new_y1 = Number(elec_vector[j].getY1()).toFixed(2);
		new_y2 = Number(elec_vector[j].getY2()).toFixed(2);
		if((new_x1==x1&&new_x2==x2&&new_y1==y1&&new_y2==y2)||(new_x1==x2&&new_x2==x1&&new_y1==y2&&new_y2==y1))
		{
			elec_vector[j].setProjection(proj);
		}
	}
}
function copy_atom_state(temp_atom,atm_id)
{
	var elec_vector  = atom[atm_id].getElectronLinkVector();
	var len = elec_vector.length;
	var bpair_count = 0;
	for(var i=0;i<len;i++)
	{
		if(elec_vector[i].getElectronStatus()=='bPair')
			bpair_count++;
	}
	var elec_vector  = temp_atom.getElectronLinkVector();
	var len = elec_vector.length;
	for(var i=0;i<len;i++)
	{
		if(bpair_count==0)
			break;
		if(elec_vector[i].getElectronStatus()=='uPair')
		{
			elec_vector[i].setElectronStatus('bPair');
			bpair_count--;
		}			
	}
	for(var i=0;i<len;i++)
	{
		if(bpair_count==0)
			break;
		if(elec_vector[i].getElectronStatus()=='lPair')
		{
			elec_vector[i].setElectronStatus('bPair');
			elec_vector[i].setCharge('+');
			elec_vector[i].setChargeCount(1);
			bpair_count--;
		}			
	}
	return temp_atom;
}
function uPairCount(pt)
{
	var elec_vector = atom[pt.atm_id].getElectronLinkVector();var upair_count=0;
	for(var i=0;i<elec_vector.length;i++)
	{
		if(elec_vector[i].getElectronStatus()=='uPair')
			upair_count++;
	}
	return upair_count;
}
function lPairCount(pt)
{
	var elec_vector = atom[pt.atm_id].getElectronLinkVector();var lpair_count=0;
	for(var i=0;i<elec_vector.length;i++)
	{
		if(elec_vector[i].getElectronStatus()=='lPair')
			lpair_count++;
	}
	return lpair_count;
}
function vacantCount(pt)
{
	var elec_vector = atom[pt.atm_id].getElectronLinkVector();var vacant_count=0;
	for(var i=0;i<elec_vector.length;i++)
	{
		if(elec_vector[i].getElectronStatus()=='vacant')
			vacant_count++;
	}
	return vacant_count;
}
function vacantdCount(pt)
{
	var elec_vector = atom[pt.atm_id].getElectronLinkVector();var vacant_dcount=0;
	for(var i=0;i<elec_vector.length;i++)
	{
		if(elec_vector[i].getElectronStatus()=='vacant'&&elec_vector[i].getTitle().indexOf('d')!=-1)
			vacant_dcount++;
	}
	return vacant_dcount;
}
function vacantpCount(pt)
{
	var elec_vector = atom[pt.atm_id].getElectronLinkVector();var vacant_pcount=0;
	for(var i=0;i<elec_vector.length;i++)
	{
		if(elec_vector[i].getElectronStatus()=='vacant'&&elec_vector[i].getTitle().indexOf('p')!=-1)
			vacant_pcount++;
	}
	return vacant_pcount;
}
function clearBond(elink)
{
	elink.setX2(elink.getX1());
	elink.setY2(elink.getY1());
	elink.setPartCharge(0);
	elink.setPartChargeVal(0);
	elink.setElectronStatus('uPair');
	elink.setCharge(0);
	elink.setChargeCount(0);
	elink.setBond('');
	elink.setBondType('');
	elink.setOrder('');
	elink.setTarget('');
	elink.setOrientation('');
	elink.setPriority('');
	elink.setProjection('');
	elink.setGcCode('');
	elink.setLinkStatus('');
}