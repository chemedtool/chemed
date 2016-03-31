function Fragment(){
		this.id = "";
		this.title = "";
		this.type = "";
		this.formula = "";
		this.revFormula = "";
		this.smiles = "";
		this.linkType = "";
		this.skeletonTarget1 = "";
		this.skeletonTarget2 = "";
		this.sklCode = "";
		this.sklPattern = "";
		this.template = "";
		this.orientation = "";
		this.projection  = "";
		this.status = "";
		this.frgNo = "";
		this.x1 = this.x2 = 0;
		this.y1 = this.y2 = 0;
		this.atomVector = new Array();
	}
	
	
Fragment.prototype.setAtom = function(atom){
		if(atom != null){
			this.atomVector.push(atom);
		}
	};
	
Fragment.prototype.getAtom = function(i){
		return this.atomVector[i];
	};
Fragment.prototype.setAtomVector = function(atomVector) {
		this.atomVector = atomVector;
	};
	
Fragment.prototype.getAtomVector = function(){
		return this.atomVector;
	};

Fragment.prototype.getId = function() {
		return this.id;
	};

Fragment.prototype.setId = function(id) {
		this.id = id;
	};
Fragment.prototype.getTitle = function() {
		return this.title;
	};
Fragment.prototype.setTitle = function(title) {
		this.title = title;
	};
Fragment.prototype.getType = function() {
		return this.type;
	};
Fragment.prototype.setType = function(type) {
		this.type = type;
	};
Fragment.prototype.getFormula = function() {
		return this.formula;
	};
Fragment.prototype.setFormula = function(formula) {
		this.formula = formula;
	};
Fragment.prototype.getRevFormula = function() {
		return this.revFormula;
	};
Fragment.prototype.setRevFormula = function(revFormula) {
		this.revFormula = revFormula;
	};
Fragment.prototype.getSmiles = function() {
		return this.smiles;
	};
Fragment.prototype.setSmiles = function(smiles) {
		this.smiles = smiles;
	};
Fragment.prototype.getLinkType = function() {
		return this.linkType;
	};
Fragment.prototype.setLinkType = function(linkType) {
		this.linkType = linkType;
	};
Fragment.prototype.getSkeletonTarget1 = function() {
		return this.skeletonTarget1;
	};
Fragment.prototype.setSkeletonTarget1 = function(skeletonTarget1) {
		this.skeletonTarget1 = skeletonTarget1;
	};
Fragment.prototype.getSkeletonTarget2 = function() {
		return this.skeletonTarget2;
	};
Fragment.prototype.setSkeletonTarget2 = function(skeletonTarget2) {
		this.skeletonTarget2 = skeletonTarget2;
	};
Fragment.prototype.getSklCode = function() {
		return this.sklCode;
	};
Fragment.prototype.setSklCode = function(sklCode) {
		this.sklCode = sklCode;
	};
Fragment.prototype.getSklPattern = function() {
		return this.sklPattern;
	};
Fragment.prototype.setSklPattern = function(sklPattern) {
		this.sklPattern = sklPattern;
	};
Fragment.prototype.getTemplate = function() {
		return this.template;
	};
Fragment.prototype.setTemplate = function(template) {
		this.template = template;
	};
Fragment.prototype.getOrientation = function() {
		return this.orientation;
	};
Fragment.prototype.setOrientation = function(orientation) {
		this.orientation = orientation;
	};
Fragment.prototype.getProjection = function() {
		return this.projection;
	};
Fragment.prototype.setProjection = function(projection) {
		this.projection = projection;
	};
Fragment.prototype.getStatus = function() {
		return this.status;
	};
Fragment.prototype.setStatus = function(status) {
		this.status = status;
	};
Fragment.prototype.getRingNo = function() {
		return this.frgNo;
	};

Fragment.prototype.setRingNo = function(frgno) {
		this.frgNo = frgno;
	};

Fragment.prototype.getX1 = function() {
		return this.x1;
	};
Fragment.prototype.setX1 = function(x1) {
		this.x1 = x1;
	};
Fragment.prototype.getY1 = function() {
		return this.y1;
	};
Fragment.prototype.setY1 = function(y1) {
		this.y1 = y1;
	};
Fragment.prototype.getX2 = function() {
		return this.x2;
	};
Fragment.prototype.setX2 = function(x2) {
		this.x2 = x2;
	};
Fragment.prototype.getY2 = function() {
		return this.y2;
	};
Fragment.prototype.setY2 = function(y2) {
		this.y2 = y2;
	};
