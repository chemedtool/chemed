function Structure(){
		this.id = "";
		this.title = "";
		this.type = "";
		this.formula = "";
		this.molarmass = "";
		this.state = "";
		this.role = "";
		this.mp = "";
		this.bp = "";
		this.smiles = "";
		this.fragmentVector = new Array();
		this.captionVector = new Array();
	}
	
Structure.prototype.setFragment = function(fragment){
		if(fragment != null){
			this.fragmentVector.push(fragment);
		}
	};
Structure.prototype.removeFragment = function(i){
		this.fragmentVector.splice(i,1);
	};	
Structure.prototype.getFragment = function(i){
		return this.fragmentVector[i];
	};
	
Structure.prototype.getFragmentVector = function(){
		return this.fragmentVector;
	};
Structure.prototype.setFragmentVector = function(frgVector){
		this.fragmentVector = new Array();
		fragmentVector=frgVector.slice();
	};	
Structure.prototype.setCaption = function(caption){
		if(caption != null){
			this.captionVector.push(caption);
		}
	};
	
Structure.prototype.getCaption = function(i){
		return this.captionVector[i];
	};
	
Structure.prototype.getCaptionVector = function(){
		return this.captionVector;
	};
Structure.prototype.getId = function() {
		return this.id;
	};
Structure.prototype.setId = function(id) {
		this.id = id;
	};
Structure.prototype.getTitle = function() {
		return this.title;
	};
Structure.prototype.setTitle = function(title) {
		this.title = title;
	};
Structure.prototype.getType = function() {
		return this.type;
	};
Structure.prototype.setType = function(type) {
		this.type = type;
	};
Structure.prototype.getFormula = function() {
		return this.formula;
	};
Structure.prototype.setFormula = function(formula) {
		this.formula = formula;
	};
Structure.prototype.getmolarMass = function() {
		return this.molarmass;
	};
Structure.prototype.setmolarMass = function(molarmass) {
		this.molarmass = molarmass;
	};
Structure.prototype.getState = function() {
		return this.state;
	};
Structure.prototype.setState = function(state) {
		this.state = state;
	};
Structure.prototype.getRole = function() {
		return this.role;
	};
Structure.prototype.setRole = function(role) {
		this.role = role;
	};
Structure.prototype.getMp = function() {
		return this.mp;
	};
Structure.prototype.setMp = function(mp) {
		this.mp = mp;
	};
Structure.prototype.getBp = function() {
		return this.bp;
	};
Structure.prototype.setBp = function(bp) {
		this.bp = bp;
	};
Structure.prototype.getSmiles = function() {
		return this.smiles;
	};
Structure.prototype.setSmiles = function(smiles) {
		this.smiles = smiles;
	};
Structure.prototype.setFragmentVector = function(fragmentVector) {
		this.fragmentVector = fragmentVector;
	};
Structure.prototype.setCaptionVector = function(captionVector) {
		this.captionVector = captionVector;
	};