function ElectronLink(){
		this.id = "";
		this.tmpId = "";
		this.title = "";
		this.type="";
		this.electronStatus = "";
		this.spin = "";
		this.charge = "";
		this.chargeCount = "";
		this.affinity = "";
		this.bond = "";
		this.bondType = "";
		this.order = "";
		this.linkStatus = "";
		this.target = "";
		this.orientation = "";
		this.projection = "";
		this.priority = "";
		this.gcCode = "";
		this.partCharge = "";
		this.partChargeVal = "";
		this.checkStatus = "";
		this.x1 = x2 = 0;
		this.y1 = y2 = 0;
		this.linkPoint1 = svg.createSVGPoint();
		this.linkPoint2 = svg.createSVGPoint();
		this.quatPoint = svg.createSVGPoint();
		this.midPoint = svg.createSVGPoint();
		this.arrowPoint = svg.createSVGPoint();
		this.linkAtom = new Array();
	}

ElectronLink.prototype.getId = function() {
		return this.id;
	};


ElectronLink.prototype.setId = function(id) {
		this.id = id;
	};


ElectronLink.prototype.getTmpId = function() {
		return this.tmpId;
	};

ElectronLink.prototype.setTmpId = function(tmpId) {
		this.tmpId = tmpId;
	};

ElectronLink.prototype.getTitle = function() {
		return this.title;
	};
ElectronLink.prototype.setTitle = function(title) {
		this.title = title;
	};

ElectronLink.prototype.getType = function() {
		return this.type;
	};
ElectronLink.prototype.setType = function(type) {
		this.type = type;
	};
ElectronLink.prototype.getElectronStatus = function() {
		return this.electronStatus;
	};
ElectronLink.prototype.setElectronStatus = function(electronStatus) {
		this.electronStatus = electronStatus;
	};
ElectronLink.prototype.getSpin = function() {
		return this.spin;
	};
ElectronLink.prototype.setSpin = function(spin) {
		this.spin = spin;
	};

ElectronLink.prototype.getCharge = function() {
		return this.charge;
	};
ElectronLink.prototype.setCharge = function(charge) {
		this.charge = charge;
	};

ElectronLink.prototype.getChargeCount = function() {
		return this.chargeCount;
	};

ElectronLink.prototype.setChargeCount = function(chargeCount) {
		this.chargeCount = chargeCount;
	};
ElectronLink.prototype.getAffinity = function() {
		return this.affinity;
	};

ElectronLink.prototype.setAffinity = function(affinity) {
		this.affinity = affinity;
	};

ElectronLink.prototype.getBond = function() {
		return this.bond;
	};

ElectronLink.prototype.setBond = function(bond) {
		this.bond = bond;
	};

ElectronLink.prototype.getBondType = function() {
		return this.bondType;
	};

ElectronLink.prototype.setBondType = function(bondType) {
		this.bondType = bondType;
	};

ElectronLink.prototype.getOrder = function() {
		return this.order;
	};

ElectronLink.prototype.setOrder = function(order) {
		this.order = order;
	};
ElectronLink.prototype.getLinkStatus = function() {
		return this.linkStatus;
	};
ElectronLink.prototype.setLinkStatus = function(linkStatus) {
		this.linkStatus = linkStatus;
	};
ElectronLink.prototype.getTarget = function() {
		return this.target;
	};

ElectronLink.prototype.setTarget = function(target) {
		this.target = target;
	};
ElectronLink.prototype.getOrientation = function() {
		return this.orientation;
	};

ElectronLink.prototype.setOrientation = function(orientation) {
		this.orientation = orientation;
	};

ElectronLink.prototype.getProjection = function() {
		return this.projection;
	};

ElectronLink.prototype.setProjection = function(projection) {
		this.projection = projection;
	};
ElectronLink.prototype.getPriority = function() {
		return this.priority;
	};

ElectronLink.prototype.setPriority = function(priority) {
		this.priority = priority;
	};
ElectronLink.prototype.getGcCode = function() {
		return this.gcCode;
	};
ElectronLink.prototype.setGcCode = function(gcCode) {
		this.gcCode = gcCode;
	};
ElectronLink.prototype.getPartCharge = function() {
		return this.partCharge;
	};
ElectronLink.prototype.setPartCharge = function(partCharge) {
		this.partCharge = partCharge;
	};
ElectronLink.prototype.getPartChargeVal = function() {
		return this.partChargeVal;
	};
ElectronLink.prototype.setPartChargeVal = function(partChargeVal) {
		this.partChargeVal = partChargeVal;
	};
ElectronLink.prototype.getCheckStatus = function() {
		return this.checkStatus;
	};
ElectronLink.prototype.setCheckStatus = function(checkStatus) {
		this.checkStatus = checkStatus;
	};
ElectronLink.prototype.getX1 = function() {
		return this.x1;
	};
ElectronLink.prototype.setX1 = function(x1) {
		this.x1 = x1;
	};

ElectronLink.prototype.getY1 = function() {
		return this.y1;
	};
ElectronLink.prototype.setY1 = function(y1) {
		this.y1 = y1;
	};
ElectronLink.prototype.getX2 = function() {
		return this.x2;
	};
ElectronLink.prototype.setX2 = function(x2) {
		this.x2 = x2;
	};
ElectronLink.prototype.getY2 = function() {
		return this.y2;
	};
ElectronLink.prototype.setY2 = function(y2) {
		this.y2 = y2;
	};
ElectronLink.prototype.getLinkPoint1 = function() {
		return this.linkPoint1;
	};
ElectronLink.prototype.setLinkPoint1 = function(linkPoint1) {
		this.linkPoint1 = linkPoint1;
	};
ElectronLink.prototype.setLinkPoint1 = function(x, y) {
		var pt = svg.createSVGPoint();
		pt.x = x;
		pt.y = y;
		this.linkPoint1 = pt;
	};
ElectronLink.prototype.getLinkPoint2 = function() {
		return this.linkPoint2;
	};
ElectronLink.prototype.setLinkPoint2 = function(linkPoint2) {
		this.linkPoint2 = linkPoint2;
	};
ElectronLink.prototype.setLinkPoint2 = function(x, y) {
		var pt = svg.createSVGPoint();
		pt.x = x;
		pt.y = y;
		this.linkPoint2 = pt;
	};
ElectronLink.prototype.getQuatPoint = function() {
		return this.quatPoint;
	};
ElectronLink.prototype.setQuatPoint = function(quatPoint) {
		this.quatPoint = quatPoint;
	};
ElectronLink.prototype.setQuatPoint = function(x, y) {
		var pt = svg.createSVGPoint();
		pt.x = x;
		pt.y = y;
		this.quatPoint = pt;
	};
ElectronLink.prototype.getMidPoint = function() {
		return this.midPoint;
	};
ElectronLink.prototype.setMidPoint = function(midPoint) {
		this.midPoint = midPoint;
	};
ElectronLink.prototype.setMidPoint = function(x,y) {
		var pt = svg.createSVGPoint();
		pt.x = x;
		pt.y = y;
		this.midPoint = pt;
	};
	
ElectronLink.prototype.getArrowPoint = function() {
		return this.arrowPoint;
	};

ElectronLink.prototype.setArrowPoint = function(arrowPoint) {
		this.arrowPoint = arrowPoint;
	};
ElectronLink.prototype.setArrowPoint = function(x,y) {
		var pt = svg.createSVGPoint();
		pt.x = x;
		pt.y = y;
		this.arrowPoint = pt;
	};
ElectronLink.prototype.getLinkAtom = function() {
		return this.linkAtom;
	};
ElectronLink.prototype.setLinkAtom = function(linkAtom) {
		this.linkAtom = linkAtom;
	};