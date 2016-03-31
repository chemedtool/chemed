<!doctype html>
<head>
	<meta content="text/html;charset=utf-8" http-equiv="Content-Type">
<link rel="stylesheet" href="css/jquery-ui.css">
<link rel="stylesheet" href="css/new_style.css">
<link rel="stylesheet" href="css/new_dialog.css">
<!-- 
<script src="js/chemed.js"></script>
 -->
<script src="js/jquery.js"></script>
<script src="js/jquery-ui.js"></script>
<script src="js/dialog.js"></script>
<script src='js/ClassAtom.js'></script>
<script src='js/ClassElectronLink.js'></script>
<script src='js/ClassFragment.js'></script>
<script src='js/ClassStructure.js'></script>
<script src='js/ClassInteract.js'></script>
<script src='js/ClassStructureGroup.js'></script>
<script src="js/buttons.js"></script>
<script src="js/mathFunctions.js"></script>
<script src="js/eventHandler.js"></script>
<script src="js/draw.js"></script>
<script src="js/xmlFunctions.js"></script>
<script src="js/jsObjFunctions.js"></script>
<script src="js/animations.js"></script>
<script type="text/javascript" src="js/html2canvas.js"></script>
<script type="text/javascript" src="js/rgbcolor.js"></script> 
<script type="text/javascript" src="js/StackBlur.js"></script>
<script type="text/javascript" src="js/canvg.js"></script>
<title>ChemEd</title>
	</head>
	<?php
error_reporting(0);
session_start();
 if(isset($_SESSION['myusername'])&& isset($_SESSION['mypassword']))
 {echo "<body onload='st(true);' onresize='resize();'>";}
 else 
 {echo "<body onload='st(false);' onresize='resize();'>";}
 ?>
	<table id='t_file' class='menu' onmouseover="display_menu('#t_file')" onmouseleave='hide_menu()'>
		<tr>
            <td onclick="new_structure(false);">New</td>
		</tr>
		<tr>
            <td onclick="open_structure();">Open</td>
		</tr>
		<tr>
            <td onclick="open_template();">Open Template</td>
		</tr>
		<tr>
            <td onclick="save_xml('save');">Save</td>
		</tr>
		<tr>
			<td onclick="save_image();">Save as Image</td>
		</tr>
		<tr>
			<td onclick="save_xml('save_template');">Save as template</td>	
		</tr>
	</table >
	<table id='t_caption' class='menu' onmouseover="display_menu('#t_caption')" onmouseleave='hide_menu()'>
		<tr>
            <td onclick="add_caption();">Add Caption</td>
		</tr>
		<tr>
            <td onclick="move_caption();">Move Caption</td>
		</tr>
		<tr>
            <td onclick="delete_caption();">Delete Caption</td>
		</tr>
	</table>
	<table id='t_template' class='menu' onmouseover="display_menu('#t_template')" onmouseleave='hide_menu()'>
		<tr>
            <td onclick="template_library();">Show Library</td>
		</tr>
		<tr>
            <td onclick="update_library();">Update Library</td>
		</tr>
	</table>
	<table id='t_ligand' class='menu' onmouseover="display_menu('#t_ligand')" onmouseleave='hide_menu()'>
		<tr>
            <td onclick="ligand_library();">Show Ligand Library</td>
		</tr>
		<tr>
            <td onclick="update_ligand_library();">Update Ligand Library</td>
		</tr>
	</table>
	<table id='t_login' class='menu_login'>
		<tr>
            <td style='border:none;'>Username:<input id='username' style='width:93%;' type='text'></input></td>
		</tr>
		<tr>
            <td>Password:<input id='password' style='width:93%;' type='password'></input><div id='txthnt' style='color:red;'></div></td>
		</tr>
		<tr>
            <td id='login_submit' onclick='loginShow()'>Login</td>
		</tr>
	</table>
	<table id='t_logged' class='menu_login'>
		<tr>
            <td id='logged_username'>Username:<?php
			session_start();
			if(isset($_SESSION['myusername'])&& isset($_SESSION['mypassword']))
			{echo $_SESSION['myusername'];}
			?></td>
		</tr>
		<tr>
            <td id='login_submit' onclick='logOut()'>Sign Out</td>
		</tr>
	</table>
	<table class='table' border='0' width='100%' height='100%'>
		<tr height='2%' class="row">
			<td id='file' style='font-family:arial;' class='cell' width='2%' onmouseover="display_menu('#t_file')" onmouseleave='hide_menu()'>
				<button class='splbutton'>File</button>
			</td>
			<td id='caption' style='font-family:arial;' class='cell' width='2%' onmouseover="display_menu('#t_caption')" onmouseleave='hide_menu()'>
				<button class='splbutton'>Caption</button>
			</td>
			<td id='template' style='font-family:arial;' class='cell' width='2%' onmouseover="display_menu('#t_template')" onmouseleave='hide_menu()'>
				<button class='splbutton'>Template</button>
			</td>
			<td id='ligand' style='font-family:arial;' class='cell' width='2%' onmouseover="display_menu('#t_ligand')" onmouseleave='hide_menu()'>
				<button class='splbutton'>Ligand</button>
			</td>
			<td style='font-family:arial;' class='cell' width='2%'>
				<a href='chemed_doc.pdf' target='_blank'><button class='splbutton'>Help</button></a>
			</td>
			<td style='font-family:arial;' class='cell' width='2%'>
				<button class='splbutton' onclick='aboutAlert.render()'>About</button>
			</td>
			<td width='auto' style='font-family:arial;padding:0px;'><button class='splbutton' style='background:transparent;cursor:default;position:relative;left:35%;'>ChemEd v.Beta</button></td>
			<?php
			session_start();
			if(isset($_SESSION['myusername'])&& isset($_SESSION['mypassword']))
			{echo "<td id='login' class='cell' width='5%' onclick=\"display_menu('#t_logged')\">
					<button id='login_btn' class='splbutton'>Welcome&#x25BC</button>
				</td>";}
			else 
			{echo "<td id='login' class='cell' width='5%' onclick=\"display_menu('#t_login')\">
					<button id='login_btn' class='splbutton'>Login&#x25BC</button>
				</td>";}?>
			
			
		</tr>
		<tr height='3%' class="row">
			<td colspan=8>
				<button href='#' onclick="grid();"><span><img src="icon/grid.png"></span></button>
				<button href='#' title='Show/Hide Implicit Carbon' onclick="implicit_carbon();"><span><img src="icon/carbon.png"></span></button>
				<button href='#' title='Undo' onclick="undo();"><span><img src="icon/Undonew.png" ></span></button>
   				<button href='#' title='Redo' onclick="redo();"><span><img src="icon/Redonew.png" ></span></button>
   				<button href='#' id='delete_structure' title='Delete Structure' onclick="delete_structure();"><span><img src="icon/erasor2.PNG" ></span></button>
   				<button href='#' id='del_arr_sign' title='Erase Arrow/Sign' onclick="del_arr_sign();"><span><img src="icon/erasor3.PNG" ></span></button>
   				<button href='#' id='move_structure_group' title='Move Structure Group' onclick="move('move_structure_group');"><span><img src="icon/strGpMove4.PNG" ></span></button>
   				<button href='#' id='move_structure' title='Move Structure' onclick="move('move_structure');"><span><img src="icon/strMove6.PNG" ></span></button>
   				<button href='#' id='move_atom' title='Move Atom' onclick="move('move_atom');"><span><img src="icon/atomMove7.PNG" ></span></button>
   				<button href='#' id='above_plane_projection' title='Above Plane Projection' onclick="plane_projection('above_plane_projection');"><span><img src="icon/above1.PNG" ></span></button>
   				<button href='#' id='below_plane_projection' title='Below Plane Projection' onclick="plane_projection('below_plane_projection');"><span><img src="icon/below.png" ></span></button>
   				<button href='#' id='in_plane_projection' title='In Plane Projection' onclick="plane_projection('in_plane_projection');"><span><img src="icon/in1.PNG" ></span></button>
   				<button href='#' id='Change_orientation' title='Change Orientation' onclick="orientation('');"><span><img src="icon/atomXY8.PNG" ></span></button>
   				<button href='#' title='Show/Hide Lone Pair Electrons' onclick="lpair_electrons(true);"><span><img src="icon/lpair3.PNG" ></span></button>
   				<button href='#' title='Show/Hide Unpaired Electrons' onclick="upair_electrons(true);"><span><img src="icon/upair3.PNG" ></span></button>
   				<button href='#' title='Show/Hide Vacant Orbitals' onclick="vacant_electrons(true);"><span><img src="icon/empty3.PNG" ></span></button>
   				<button href='#' id='atom_position' title='Atom Position Numbering' onclick="atom_position();"><span><img src="icon/position5.PNG" ></span></button>
   				<button href='#' id='isotope_label' title='Isotope Labelling' onclick="isotope_label();"><span><img src="icon/label1.png" ></span></button>
   				<button href='#' id='add_plus_charge' title='Add + Charge' onclick="add_plus_charge();"><span><img src="icon/plus.PNG" ></span></button>
				<button href='#' id='add_minus_charge' title='Add - Charge' onclick="add_minus_charge();"><span><img src="icon/minus.PNG" ></span></button>
   				<button href='#' id='ion_ion' title='Ion-Ion Interaction' onclick="interaction('ion_ion');"><span><img src="icon/ionion5.PNG" ></span></button>
   				<button href='#' id='ion_dipole' title='Ion-Dipole Interaction' onclick="interaction('ion_dipole');"><span><img src="icon/iondi1.PNG" ></span></button>
   				<button href='#' id='dipole_dipole' title='Dipole-Dipole Interaction' onclick="interaction('dipole_dipole');"><span><img src="icon/dipoledipole3.PNG" ></span></button>
   				<button href='#' id='h_bond' title='Hydrogen Bonding Interaction' onclick="interaction('h_bond');"><span><img src="icon/Hbond2.PNG" ></span></button>
				<button href='#' id='arrow' title='Draw Arrow' onclick="draw_arrow('arrow');"><span><img src="icon/arrow_right.png" ></span></button>				
				<button href='#' id='arrow_rev' title='Draw Reversible Arrow' onclick="draw_rev_arrow('arrow_rev');"><span><img src="icon/arrow_rev.png" ></span></button>	
				<button href='#' id='minus_sign' title='Draw Minus Sign' onclick="draw_sign('minus_sign','_','draw_minus');"><span><img src="icon/minus_sign.png" ></span></button>	
				<button href='#' id='plus_sign' title='Draw Plus Sign' onclick="draw_sign('plus_sign','+','draw_plus');"><span><img src="icon/plus_sign.png" ></span></button>	
				<button href='#' onclick="writeXML('screen');" title='Display XML'><span><img src="icon/xmllogo.png" ></span></button>
			</td>
		</tr>
		<tr height='3%' class="row">
			<td colspan=8>
				<button href="#" id='single_bond_skeleton' title='Single Bond Skeleton' onclick="bondSkeletonButton('single_bond_skeleton','C',1);"><img src="icon/single.png" ></button>
				<button href="#" id='double_bond_skeleton' title='Double Bond Skeleton' onclick="bondSkeletonButton('double_bond_skeleton','C',2);"><img src="icon/double.png" ></button>
				<button href="#" id='triple_bond_skeleton' title='Triple Bond Skeleton' onclick="bondSkeletonButton('triple_bond_skeleton','C',3);"><img src="icon/triple.png" ></button>
				<button href="#" id='zero_membered_bridge' title='Zero Membered Bridge' onclick="bridgeButton('zero_membered_bridge','C','zero',0);"><img src="icon/zerobg1.PNG" ></button>
				<button href="#" id='one_membered_bridge' title='One Membered Bridge' onclick="bridgeButton('one_membered_bridge','C',oneMemberSkeleton,1);"><img src="icon/bg1.png" ></button>
				<button href="#" id='two_membered_bridge' title='Two Membered Bridge' onclick="bridgeButton('two_membered_bridge','C',twoMemberSkeleton,2);"><img src="icon/bg2.png" ></button>
				<button href="#" id='three_membered_bridge' title='Three Membered Bridge' onclick="bridgeButton('three_membered_bridge','C',threeMemberSkeleton,3);"><img src="icon/bg3.png" ></button>
				<button href="#" id='three_membered_ring' title='Three Membered Ring' onclick="ringButton('three_membered_ring','C',threeMemberedRing);"><img src="icon/ring3.png" ></button>
				<button href="#" id='four_membered_ring' title='Four Membered Ring' onclick="ringButton('four_membered_ring','C',fourMemberedRing);"><img src="icon/ring4.PNG"></button>
				<button href="#" id='five_membered_ring' title='Five Membered Ring' onclick="ringButton('five_membered_ring','C',fiveMemberedRing);"><img src="icon/ring5.PNG"></button>
				<button href="#" id='six_membered_ring' title='Six Membered Ring' onclick="ringButton('six_membered_ring','C',sixMemberedRing);"><img src="icon/ring6.PNG"></button>
				<button href="#" id='seven_membered_ring' title='Seven Membered Ring' onclick="ringButton('seven_membered_ring','C',sevenMemberedRing);"><img src="icon/ring7.PNG"></button>
				<button href="#" id='eight_membered_ring' title='Eight Membered Ring' onclick="ringButton('eight_membered_ring','C',eightMemberedRing);"><img src="icon/ring8.PNG"></button>
				<button href="#" id='benzene_ring' title='Benzene Ring' onclick="ringButton('benzene_ring','C',benzeneRing);"><img src="icon/bzring.PNG"></button>
				<button href="#" id='carbon' title='Carbon' onclick="atomButton('carbon','C',true);"><img src="icon/icon_c.png"></button>
				<button href="#" id='hydrogen' title='Hydrogen' onclick="atomButton('hydrogen','H',true);"><img src="icon/icon_h.png"></button>
				<button href="#" id='nitrogen' title='Nitrogen' onclick="atomButton('nitrogen','N',true);"><img src="icon/icon_n.png"></button>
				<button href="#" id='oxygen' title='Oxygen' onclick="atomButton('oxygen','O',true);"><img src="icon/icon_o.png"></button>
				<button href="#" id='sulfur' title='Sulphur' onclick="atomButton('sulfur','S',true);"><img src="icon/icon_s.png"></button>
				<button href="#" id='phosphorous' title='Phosphorous' onclick="atomButton('phosphorous','P',true);"><img src="icon/icon_p.png"></button>
				<button href="#" id='fluorine' title='Fluorine' onclick="atomButton('fluorine','F',true);"><img src="icon/icon_f.png"></button>
				<button href="#" id='chlorine' title='Chlorine' onclick="atomButton('chlorine','Cl',true);"><img src="icon/icon_cl.png"></button>
				<button href="#" id='bromine' title='Bromine' onclick="atomButton('bromine','Br',true);"><img src="icon/icon_br.png"></button>
				<button href="#" id='iodine' title='Iodine' onclick="atomButton('iodine','I',true);"><img src="icon/icon_i.png"></button>
				<button href="#" id='boron' title='Boron' onclick="atomButton('boron','B',true);"><img src="icon/icon_b.png"></button>
				<button href="#" id='aluminium' title='Aluminium' onclick="atomButton('aluminium','Al',true);"><img src="icon/icon_al.png"></button>
				<button href="#" id='silicon' title='Silicon' onclick="atomButton('silicon','Si',true);"><img src="icon/icon_si.png"></button>
				<button href="#" id='lithium' title='Lithium' onclick="atomButton('lithium','Li',true);"><img src="icon/icon_li.png"></button>
				<button href="#" id='sodium' title='Sodium' onclick="atomButton('sodium','Na',true);"><img src="icon/icon_na.png"></button>
				<button href="#" id='potassium' title='Potassiun' onclick="atomButton('potassium','K',true);"><img src="icon/icon_k.png"></button>
				<button href='#' onclick="ptable_prompt.render();"><img src="icon/ptable6.png"></button>
			</td>
		</tr>
		<tr width='100%' height='92%'>
			<td id ='s_content' onmouseleave='clr();' colspan=7></td>
		</tr>
	</table>
		<div id="dialogoverlay"></div>
<table id="dialogbox">
  <tr id="dialogboxhead">
	 </tr>
	 <tr id="dialogboxbody">
    </tr>
	 <tr id="dialogboxfoot">
  </tr>
</table>
<canvas id='canvas'>
</canvas>
<div id='about' style='display:none;'>
<p align='justify' style='font-size:11px;'>
ChemEd:<br>
&nbsp;&nbsp;&nbsp;&nbsp;This paragraph one.This paragraph one.This paragraph one.This paragraph one.This paragraph one.This paragraph one.This paragraph one.
This paragraph one.This paragraph one.This paragraph one.This paragraph one.This paragraph one.This paragraph one.This paragraph one.
This paragraph one.This paragraph one.This paragraph one.This paragraph one.This paragraph one.This paragraph one.This paragraph one.
This paragraph one.This paragraph one.
</p>
<p align='justify' style='font-size:11px;'>
&nbsp;&nbsp;&nbsp;&nbsp;This paragraph two.This paragraph two.This paragraph two.This paragraph two.This paragraph two.This paragraph two.This paragraph two.
This paragraph two.This paragraph two.This paragraph two.This paragraph two.This paragraph two.This paragraph two.This paragraph two.
This paragraph two.This paragraph two.This paragraph two.This paragraph two.This paragraph two.This paragraph two.This paragraph two.
This paragraph two.This paragraph two.
</p>

<p style='font-size:11px;'>
Credits:<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name, Name, Name, Name, Name, Name, Name, Name, Name, Name.
</p>
</div>
<div id='ptable' style='display:none;'>
	<table id="periodic-table">
        <tr class="pt_row">
          <td class="element_nonmetal"><a  id='hydrogen' title='Hydrogen' onclick="ptable_prompt.ok('hydrogen','H',true);">H</a></td>
          <td style="background:transparent;border:none;"></td>
		  <td colspan="15" style="background:transparent;border:none;"></td>
          <td class="element_NG"><a  id='helium' title='Helium' onclick="ptable_prompt.ok('helium','He',false);">He</a></td>
        </tr>
        <tr class="pt_row">
          <td class="element_AM"><a  id='lithium' title='Lithium' onclick="ptable_prompt.ok('lithium','Li',false);">Li</a></td>
          <td class="element_AEM" ><a  id='beryllium' title='Beryllium' onclick="ptable_prompt.ok('beryllium','Be',false);">Be</a></td>
          <td colspan="10" style="background:transparent;border:none;"></td>
          <td class="element_BM" ><a  id='boron' title='Boron' onclick="ptable_prompt.ok('boron','B',false);">B</a></td>
          <td class="element_nonmetal"><a  id='carbon' title='Carbon' onclick="ptable_prompt.ok('carbon','C',true);">C</a></td>
          <td class="element_nonmetal"><a  id='nitrogen' title='Nitrogen' onclick="ptable_prompt.ok('nitrogen','N',true);">N</a></td>
          <td class="element_nonmetal"><a  id='oxygen' title='Oxygen' onclick="ptable_prompt.ok('oxygen','O',true);">O</a></td>
          <td class="element_halogens"><a  id='fluorine' title='Fluorine' onclick="ptable_prompt.ok('fluorine','F',true);">F</a></td>
          <td class="element_NG"><a  id='neon' title='Neon' onclick="ptable_prompt.ok('neon','Ne',false);">Ne</a></td>
        </tr>
        <tr class="pt_row">
          <td class="element_AM"><a  id='sodium' title='Sodium' onclick="ptable_prompt.ok('sodium','Na',false);">Na</a></td>
          <td class="element_AEM"><a  id='magnesium' title='Magnesium' onclick="ptable_prompt.ok('magnesium','Mg',false);">Mg</a></td>
          <td colspan="10" style="background:transparent;border:none;"></td>
          <td class="element_semimetals"><a  id='aluminum' title='Aluminum' onclick="ptable_prompt.ok('aluminum','Al',false);">Al</a></td>
          <td class="element_BM"><a  id='silicon' title='Silicon' onclick="ptable_prompt.ok('silicon','Si',false);">Si</a></td>
          <td class="element_nonmetal"><a  id='phosphorus' title='Phosphorus' onclick="ptable_prompt.ok('phosphorus','P',true);">P</a></td>
          <td class="element_nonmetal"><a  id='sulfur' title='Sulfur' onclick="ptable_prompt.ok('sulfur','S',true);">S</a></td>
          <td class="element_halogens"><a  id='chlorine' title='Chlorine' onclick="ptable_prompt.ok('chlorine','Cl',true);">Cl</a></td>
          <td class="element_NG"><a  id='argon' title='Argon' onclick="ptable_prompt.ok('Argon','Ar',false);">Ar</a></td>
        </tr>
        <tr class="pt_row">
          <td class="element_AM"><a  id='potassium' title='Potassium' onclick="ptable_prompt.ok('potassium','K',false);">K</a></td>
          <td class="element_AEM"><a  id='calcium' title='Calcium' onclick="ptable_prompt.ok('calcium','Ca',false);">Ca</a></td>
          <td class="element_TM"><a  id='scandium' title='Scandium' onclick="ptable_prompt.ok('scandium','Sc',false);">Sc</a></td>
          <td class="element_TM"><a  id='titanium' title='Titanium' onclick="ptable_prompt.ok('titanium','Ti',false);">Ti</a></td>
          <td class="element_TM"><a  id='vanadium' title='Vanadium' onclick="ptable_prompt.ok('vanadium','V',false);">V</a></td>
          <td class="element_TM"><a  id='chromium' title='Chromium' onclick="ptable_prompt.ok('chromium','Cr',false);">Cr</a></td>
          <td class="element_TM"><a  id='manganese' title='Manganese' onclick="ptable_prompt.ok('manganese','Mn',false);">Mn</a></td>
          <td class="element_TM"><a  id='iron' title='Iron' onclick="ptable_prompt.ok('iron','Fe',false);">Fe</a></td>
          <td class="element_TM"><a  id='cobalt' title='Cobalt' onclick="ptable_prompt.ok('cobalt','Co',false);">Co</a></td>
          <td class="element_TM"><a  id='nickel' title='Nickel' onclick="ptable_prompt.ok('nickel','Ni',false);">Ni</a></td>
          <td class="element_TM"><a  id='copper' title='Copper' onclick="ptable_prompt.ok('copper','Cu',false);">Cu</a></td>
          <td class="element_TM"><a  id='zinc' title='Zinc' onclick="ptable_prompt.ok('zinc','Zn',false);">Zn</a></td>
          <td class="element_semimetals"><a  id='gallium' title='Gallium' onclick="ptable_prompt.ok('gallium','Ga',false);">Ga</a></td>
          <td class="element_BM"><a  id='germanium' title='Germanium' onclick="ptable_prompt.ok('germanium','Ge',false);">Ge</a></td>
          <td class="element_BM"><a  id='arsenic' title='Arsenic' onclick="ptable_prompt.ok('arsenic','As',false);">As</a></td>
          <td class="element_nonmetal"><a  id='selenium' title='Selenium' onclick="ptable_prompt.ok('selenium','Se',false);">Se</a></td>
          <td class="element_halogens"><a  id='bromine' title='Bromine' onclick="ptable_prompt.ok('bromine','Br',true);">Br</a></td>
          <td class="element_NG"><a  id='krypton' title='Krypton' onclick="ptable_prompt.ok('krypton','Kr',false);">Kr</a></td>
        </tr>
        <tr class="pt_row">
          <td class="element_AM"><a  id='rubidium' title='Rubidium' onclick="ptable_prompt.ok('rubidium','Rb',false);">Rb</a></td>
          <td class="element_AEM"><a  id='strontium' title='Strontium' onclick="ptable_prompt.ok('strontium','Sr',false);">Sr</a></td>
          <td class="element_TM"><a  id='yttrium' title='Yttrium' onclick="ptable_prompt.ok('yttrium','Y',false);">Y</a></td>
          <td class="element_TM"><a  id='zirconium' title='Zirconium' onclick="ptable_prompt.ok('zirconium','Zr',false);">Zr</a></td>
          <td class="element_TM"><a  id='niobium' title='Niobium' onclick="ptable_prompt.ok('niobium','Nb',false);">Nb</a></td>
          <td class="element_TM"><a  id='molybdenum' title='Molybdenum' onclick="ptable_prompt.ok('molybdenum','Mo',false);">Mo</a></td>
          <td class="element_TM"><a  id='technetium' title='Technetium' onclick="ptable_prompt.ok('technetium','Tc',false);">Tc</a></td>
          <td class="element_TM"><a  id='ruthenium' title='Ruthenium' onclick="ptable_prompt.ok('ruthenium','Ru',false);">Ru</a></td>
          <td class="element_TM"><a  id='rhodium' title='Rhodium' onclick="ptable_prompt.ok('rhodium','Rh',false);">Rh</a></td>
          <td class="element_TM"><a  id='palladium' title='Palladium' onclick="ptable_prompt.ok('palladium','Pd',false);">Pd</a></td>
          <td class="element_TM"><a  id='silver' title='Silver' onclick="ptable_prompt.ok('silver','Ag',false);">Ag</a></td>
          <td class="element_TM"><a  id='cadmium' title='Cadmium' onclick="ptable_prompt.ok('cadmium','Cd',false);">Cd</a></td>
          <td class="element_semimetals"><a  id='indium' title='Indium' onclick="ptable_prompt.ok('indium','In',false);">In</a></td>
          <td class="element_semimetals"><a  id='tin' title='Tin' onclick="ptable_prompt.ok('tin','Sn',false);">Sn</a></td>
          <td class="element_BM"><a  id='antimony' title='Antimony' onclick="ptable_prompt.ok('antimony','Sb',false);">Sb</a></td>
          <td class="element_BM"><a  id='tellurium' title='Tellurium' onclick="ptable_prompt.ok('tellurium','Te',false);">Te</a></td>
          <td class="element_halogens"><a  id='iodine' title='Iodine' onclick="ptable_prompt.ok('iodine','I',true);">I</a></td>
          <td class="element_NG"><a  id='xenon' title='Xenon' onclick="ptable_prompt.ok('xenon','Xe',false);">Xe</a></td>
        </tr>
        <tr class="pt_row">
          <td class="element_AM"><a  id='cesium' title='Cesium' onclick="ptable_prompt.ok('cesium','Cs',false);">Cs</a></td>
          <td class="element_AEM"><a  id='barium' title='Barium' onclick="ptable_prompt.ok('barium','Ba',false);">Ba</a></td>
          <td class="element_Lanthanoids" style='background:linear-gradient(to top, #febbbb 24%,#ff5c5c 44%,#fe9090 86%);'><a>57-71</a></td>
          <td class="element_TM"><a  id='hafnium' title='Hafnium' onclick="ptable_prompt.ok('hafnium','Hf',false);">Hf</a></td>
          <td class="element_TM"><a  id='tantalum' title='Tantalum' onclick="ptable_prompt.ok('tantalum','Hf',false);">Ta</a></td>
          <td class="element_TM"><a  id='tungsten' title='Tungsten' onclick="ptable_prompt.ok('tungsten','W',false);">W</a></td>
          <td class="element_TM"><a  id='rhenium' title='Rhenium' onclick="ptable_prompt.ok('rhenium','Re',false);">Re</a></td>
          <td class="element_TM"><a  id='osmium' title='Osmium' onclick="ptable_prompt.ok('osmium','Os',false);">Os</a></td>
          <td class="element_TM"><a  id='iridium' title='Iridium' onclick="ptable_prompt.ok('iridium','Ir',false);">Ir</a></td>
          <td class="element_TM"><a  id='platinum' title='Platinum' onclick="ptable_prompt.ok('platinum','Pt',false);">Pt</a></td>
          <td class="element_TM"><a  id='gold' title='Gold' onclick="ptable_prompt.ok('gold','Au',false);">Au</a></td>
          <td class="element_TM"><a  id='mercury' title='Mercury' onclick="ptable_prompt.ok('mercury','Hg',false);">Hg</a></td>
          <td class="element_semimetals"><a  id='thallium' title='Thallium' onclick="ptable_prompt.ok('thallium','Ti',false);">Ti</a></td>
          <td class="element_semimetals"><a  id='lead' title='Lead' onclick="ptable_prompt.ok('lead','Pb',false);">Pb</a></td>
          <td class="element_semimetals"><a  id='bismuth' title='Bismuth' onclick="ptable_prompt.ok('bismuth','Bi',false);">Bi</a></td>
          <td class="element_BM"><a  id='polonium' title='Polonium' onclick="ptable_prompt.ok('polonium','Po',false);">Po</a></td>
          <td class="element_halogens"><a  id='astatine' title='Astatine' onclick="ptable_prompt.ok('astatine','At',false);">At</a></td>
          <td class="element_NG"><a  id='radon' title='Radon' onclick="ptable_prompt.ok('radon','Rn',false);">Rn</a></td>
        </tr>
        <tr class="pt_row">
          <td class="element_AM"><a  id='francium' title='Francium' onclick="ptable_prompt.ok('francium','Fr',false);">Fr</a></td>
          <td class="element_AEM"><a  id='radium' title='Radium' onclick="ptable_prompt.ok('radium','Ra',false);">Ra</a></td>
          <td class="element_active" style='background:linear-gradient(to top, #d2ff52 28%,#91e842 60%);'><a>89-103</a></td>
          <td class="element_TM"><a  id='rutherfordium' title='Rutherfordium' onclick="ptable_prompt.ok('rutherfordium','Rf',false);">Rf</a></td>
          <td class="element_TM"><a  id='dubnium' title='Dubnium' onclick="ptable_prompt.ok('dubnium','Db',false);">Db</a></td>
          <td class="element_TM"><a  id='seaborgium' title='Seaborgium' onclick="ptable_prompt.ok('seaborgium','Sg',false);">Sg</a></td>
          <td class="element_TM"><a  id='bohrium' title='Bohrium' onclick="ptable_prompt.ok('bohrium','Bh',false);">Bh</a></td>
          <td class="element_TM"><a  id='hassium' title='Hassium' onclick="ptable_prompt.ok('hassium','Hs',false);">Hs</a></td>
          <td class="element_TM"><a  id='meitnerium' title='Meitnerium' onclick="ptable_prompt.ok('meitnerium','Mt',false);">Mt</a></td>
          <td class="element_TM"><a  id='darmstadtium' title='Darmstadtium' onclick="ptable_prompt.ok('darmstadtium','Ds',false);">Ds</a></td>
          <td class="element_TM"><a  id='roentgenium' title='Roentgenium' onclick="ptable_prompt.ok('roentgenium','Rg',false);">Rg</a></td>
          <td class="element_TM"><a  id='copernicium' title='Copernicium' onclick="ptable_prompt.ok('copernicium','Cn',false);">Cn</a></td>
          <td class="element_semimetals"><a  id='ununtrium' title='Ununtrium' onclick="ptable_prompt.ok('ununtrium','Uut',false);">Uut</a></td>
          <td class="element_semimetals"><a  id='flerovium' title='Flerovium' onclick="ptable_prompt.ok('flerovium','Fl',false);">Fl</a></td>
          <td class="element_semimetals"><a  id='ununpentium' title='Ununpentium' onclick="ptable_prompt.ok('ununpentium','Uup',false);">Uup</a></td>
          <td class="element_semimetals"><a  id='livermorium' title='Livermorium' onclick="ptable_prompt.ok('livermorium','Lv',false);">Lv</a></td>
          <td class="element_halogens"><a  id='ununseptium' title='Ununseptium' onclick="ptable_prompt.ok('ununseptium','Uus',false);">Uus</a></td>
          <td class="element_NG"><a  id='ununoctium' title='Ununoctium' onclick="ptable_prompt.ok('ununoctium','Uuo',false);">Uuo</a></td>
        </tr>
      </table><br>
      <table id="f-block">
        <tr class="pt_row">
          <td class="element_Lanthanoids"><a  id='lutetium' title='Lutetium' onclick="ptable_prompt.ok('lutetium','Lu',false);">Lu</a></td>
          <td class="element_Lanthanoids"><a  id='ytterbium' title='Ytterbium' onclick="ptable_prompt.ok('ytterbium','Yb',false);">Yb</a></td>
          <td class="element_Lanthanoids"><a  id='thulium' title='Thulium' onclick="ptable_prompt.ok('thulium','Tm',false);">Tm</a></td>
          <td class="element_Lanthanoids"><a  id='erbium' title='Erbium' onclick="ptable_prompt.ok('erbium','Er',false);">Er</a></td>
          <td class="element_Lanthanoids"><a  id='holmium' title='Holmium' onclick="ptable_prompt.ok('holmium','Ho',false);">Ho</a></td>
          <td class="element_Lanthanoids"><a  id='dysprosium' title='Dysprosium' onclick="ptable_prompt.ok('dysprosium','Dy',false);">Dy</a></td>
          <td class="element_Lanthanoids"><a  id='terbium' title='Terbium' onclick="ptable_prompt.ok('terbium','Tb',false);">Tb</a></td>
          <td class="element_Lanthanoids"><a  id='gadolinium' title='Gadolinium' onclick="ptable_prompt.ok('gadolinium','Gd',false);">Gd</a></td>
          <td class="element_Lanthanoids"><a  id='europium' title='Europium' onclick="ptable_prompt.ok('europium','Eu',false);">Eu</a></td>
          <td class="element_Lanthanoids"><a  id='samarium' title='Samarium' onclick="ptable_prompt.ok('samarium','Sm',false);">Sm</a></td>
          <td class="element_Lanthanoids"><a  id='promethium' title='Promethium' onclick="ptable_prompt.ok('promethium','Pm',false);">Pm</a></td>
          <td class="element_Lanthanoids"><a  id='neodymium' title='Neodymium' onclick="ptable_prompt.ok('neodymium','Nd',false);">Nd</a></td>
          <td class="element_Lanthanoids"><a  id='praseodymium' title='Praseodymium' onclick="ptable_prompt.ok('praseodymium','Pr',false);">Pr</a></td>
		  <td class="element_Lanthanoids"><a  id='cerium' title='Cerium' onclick="ptable_prompt.ok('cerium','Ce',false);">Ce</a></td>
		  <td class="element_Lanthanoids"><a  id='lanthanum' title='Lanthanum' onclick="ptable_prompt.ok('lanthanum','La',false);">La</a></td>
        </tr>
        <tr class="pt_row">
          <td class="element_active"><a  id='lawrencium' title='Lawrencium' onclick="ptable_prompt.ok('lawrencium','Lr',false);">Lr</a></td>
          <td class="element_active"><a  id='nobelium' title='Nobelium' onclick="ptable_prompt.ok('nobelium','No',false);">No</a></td>
          <td class="element_active"><a  id='mendelevium' title='Mendelevium' onclick="ptable_prompt.ok('mendelevium','Md',false);">Md</a></td>
          <td class="element_active"><a  id='fermium' title='Fermium' onclick="ptable_prompt.ok('fermium','Fm',false);">Fm</a></td>
          <td class="element_active"><a  id='einsteinium' title='Einsteinium' onclick="ptable_prompt.ok('einsteinium','Es',false);">Es</a></td>
          <td class="element_active"><a  id='californium' title='Californium' onclick="ptable_prompt.ok('californium','Cf',false);">Cf</a></td>
          <td class="element_active"><a  id='berkelium' title='Berkelium' onclick="ptable_prompt.ok('berkelium','Bk',false);">Bk</a></td>
          <td class="element_active"><a  id='curium' title='Curium' onclick="ptable_prompt.ok('curium','Cm',false);" >Cm</a></td>
          <td class="element_active"><a  id='americium' title='Americium' onclick="ptable_prompt.ok('americium','Am',false);">Am</a></td>
          <td class="element_active"><a  id='plutonium' title='Plutonium' onclick="ptable_prompt.ok('plutonium','Pu',false);">Pu</a></td>
          <td class="element_active"><a  id='neptunium' title='Neptunium' onclick="ptable_prompt.ok('neptunium','Np',false);">Np</a></td>
          <td class="element_active"><a  id='uranium' title='Uranium' onclick="ptable_prompt.ok('uranium','U',false);">U</a></td>
          <td class="element_active"><a  id='protactinium' title='Protactinium' onclick="ptable_prompt.ok('protactinium','Pa',false);">Pa</a></td>
		  <td class="element_active"><a  id='thorium' title='Thorium' onclick="ptable_prompt.ok('thorium','Th',false);">Th</a></td>
		  <td class="element_active"><a  id='actinium' title='Actinium' onclick="ptable_prompt.ok('actinium','Ac',false);">Ac</a></td>		  
        </tr>
      </table>
</div>
</body>
</html>