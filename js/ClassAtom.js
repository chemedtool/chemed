function Atom(){
		this.id = "";
		this.atNo = "";
		this.title = "";
		this.type = "";
		this.hybridization = "";
		this.geometry = "";
		this.symbol = "";
		this.position = "";
		this.isotopeLabel = "";
		this.charge = "";
		this.chargeCount = "";
		this.electroNegativity= "";
		this.atomicMass= "";
		this.oxdnState = "";
		this.group = "";
		this.block = "";
		this.gcCode = "";
		this.partCharge = "";
		this.partChargeVal = "";
		this.groupStatus = "";
		this.x = 0;
		this.y = 0;
		this.atomPoint = svg.createSVGPoint();
		this.linkAtomVector = new Array();
		this.electronLinkVector = new Array();
	};
Atom.prototype.getAtomicMass = function() {
		return this.atomicMass;
	};


Atom.prototype.setAtomicMass = function(atomicMass) {
		this.atomicMass = atomicMass;
	};


Atom.prototype.setElectronLink = function(eLink){
		if(eLink != null){
			this.electronLinkVector.push(eLink);
		}
	};
	
Atom.prototype.getElectronLink = function(i){
		return this.electronLinkVector[i];
	};
	
Atom.prototype.getElectronLinkVector = function(){
		return this.electronLinkVector;
	};

Atom.prototype.setElectronLinkVector = function(eLinkVector) {
		this.electronLinkVector = eLinkVector;
	};

Atom.prototype.getLinkAtomVector = function() {
		return this.linkAtomVector;
	};


Atom.prototype.setLinkAtomVector = function(linkAtomVector) {
		this.linkAtomVector = linkAtomVector;
	};

Atom.prototype.setLinkAtom = function(la){
		if(!la.equals(null)){
			this.linkAtomVector.push(la);
		}
	};
	
Atom.prototype.getLinkAtom = function(i){
		return this.linkAtomVector[i];
	};

Atom.prototype.getId = function() {
		return this.id;
	};


Atom.prototype.setId = function(id) {
		this.id = id;
	};


Atom.prototype.getAtNo = function() {
		return this.atNo;
	};


Atom.prototype.setAtNo = function(atNo) {
		this.atNo = atNo;
	};


Atom.prototype.getTitle = function() {
		return this.title;
	};


Atom.prototype.setTitle = function(title) {
		this.title = title;
	};


Atom.prototype.getType = function() {
		return this.type;
	};


Atom.prototype.setType = function(type) {
		this.type = type;
	};

Atom.prototype.getHybridization = function() {
		return this.hybridization;
	};

Atom.prototype.setHybridization = function(hybridization) {
		this.hybridization = hybridization;
	};
Atom.prototype.getGeometry = function() {
		return this.geometry;
	};

Atom.prototype.setGeometry = function(geometry) {
		this.geometry = geometry;
	};

Atom.prototype.getSymbol = function() {
		return this.symbol;
	};
Atom.prototype.setSymbol = function(symbol) {
		this.symbol = symbol;
	};

Atom.prototype.getPosition = function() {
		return this.position;
	};

Atom.prototype.setPosition = function(position) {
		this.position = position;
	};

Atom.prototype.getIsotopeLabel = function() {
		return this.isotopeLabel;
	};

Atom.prototype.setIsotopeLabel = function(isotopeLabel) {
		this.isotopeLabel = isotopeLabel;
	};

Atom.prototype.getCharge = function() {
		return this.charge;
	};

Atom.prototype.setCharge = function(charge) {
		this.charge = charge;
	};

Atom.prototype.getChargeCount = function() {
		return this.chargeCount;
	};
Atom.prototype.setChargeCount = function(chargeCount) {
		this.chargeCount = chargeCount;
	};

Atom.prototype.getElectroNegativity = function() {
		return this.electroNegativity;
	};
Atom.prototype.setElectroNegativity = function(electroNegativity) {
		this.electroNegativity = electroNegativity;
	};
Atom.prototype.getOxdnState = function() {
		return this.oxdnState;
	};

Atom.prototype.setOxdnState = function(oxdnState) {
		this.oxdnState = oxdnState;
	};
Atom.prototype.getGroup = function() {
		return this.group;
	};

Atom.prototype.setGroup = function(group) {
		this.group = group;
	};

Atom.prototype.getBlock = function() {
		return this.block;
	};

Atom.prototype.setBlock = function(block) {
		this.block = block;
	};
Atom.prototype.getGcCode = function() {
		return this.gcCode;
	};

Atom.prototype.setGcCode = function(gcCode) {
		this.gcCode = gcCode;
	};
Atom.prototype.getPartCharge = function() {
		return this.partCharge;
	};
Atom.prototype.setPartCharge = function(partCharge) {
		this.partCharge = partCharge;
	};
Atom.prototype.getPartChargeVal = function() {
		return this.partChargeVal;
	};
Atom.prototype.setPartChargeVal = function(partChargeVal) {
		this.partChargeVal = partChargeVal;
	};
Atom.prototype.getGroupStatus = function() {
		return this.groupStatus;
	};

Atom.prototype.setGroupStatus = function(groupStatus) {
		this.groupStatus = groupStatus;
	};

Atom.prototype.getX = function() {
		return this.x;
	};
Atom.prototype.setX = function(x) {
		this.x = x;
	};

Atom.prototype.getY = function() {
		return this.y;
	};

Atom.prototype.setY = function(y) {
		this.y = y;
	};

Atom.prototype.getAtomPoint = function() {
		return this.atomPoint;
	};
Atom.prototype.setAtomPoint = function(atomPoint) {
		this.atomPoint = atomPoint;
	};
Atom.prototype.setAtomPoint = function(x,y) {
		var pt = svg.createSVGPoint();
		pt.x = x;
		pt.y = y;
		this.atomPoint = pt;
	};
Atom.prototype.getInfo = function() {
	return this;
	};