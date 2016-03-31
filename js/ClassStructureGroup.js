function StructureGroup(){
		this.id = "";
		this.title = "";
		this.type = "";
		this.structureVector = new Array();
		this.interactVector = new Array();
		this.captionVector = new Array();
	}
StructureGroup.prototype.getStructureVector = function() {
		return this.structureVector;
	}
StructureGroup.prototype.setStructureVector = function(structureVector) {
		this.structureVector = structureVector;
	}
StructureGroup.prototype.getInteractVector = function() {
		return this.interactVector;
	}
StructureGroup.prototype.setInteractVector = function(interactVector) {
		this.interactVector = interactVector;
	}
StructureGroup.prototype.setStructure = function(structure){
		if(structure != null){
			this.structureVector.push(structure);
		}
	}
StructureGroup.prototype.getStructure = function(i){
		return this.structureVector[i];
	}
StructureGroup.prototype.setInteract = function(interact){
		if(interact != null){
			this.interactVector.push(interact);
		}
	}
StructureGroup.prototype.getInteract = function(i){
		return this.interactVector[i];
	}
StructureGroup.prototype.getCaptionVector = function() {
		return this.captionVector;
	}
StructureGroup.prototype.setCaptionVector = function(captionVector) {
		this.captionVector = captionVector;
	}
StructureGroup.prototype.setCaption = function(caption){
		if(caption != null){
			this.captionVector.push(caption);
		}
	}
StructureGroup.prototype.getCaption = function(i){
		return this.captionVector[i];
	}
StructureGroup.prototype.getId = function() {
		return this.id;
	}
StructureGroup.prototype.setId = function(id) {
		this.id = id;
	}
StructureGroup.prototype.getTitle = function() {
		return this.title;
	}
StructureGroup.prototype.setTitle = function(title) {
		this.title = title;
	}
StructureGroup.prototype.getType = function() {
		return this.type;
	}
StructureGroup.prototype.setType = function(type) {
		this.type = type;
	}