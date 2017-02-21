
function TPscene() {
    CGFscene.call(this);
}

TPscene.prototype = Object.create(CGFscene.prototype);
TPscene.prototype.constructor = TPscene;

TPscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras(); /* inicializa camaras */

    this.initLights(); /* inicializa luzes */


    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
    this.obj = new MyObject(this); /* inicializa objecto */
    this.obj2 = new MyObject(this); /* inicializa objecto 2 */


    // NOTE: OpenGL transformation matrices are transposed

	// Translate (5, 0, 2)
	
    this.tra = [  1.0, 0.0, 0.0, 0.0,
                  0.0, 1.0, 0.0, 0.0,
                  0.0, 0.0, 1.0, 0.0,
                  5.0, 0.0, 2.0, 1.0  ];

	// Rotate 30 degrees around Y
	// These constants would normally be pre-computed at initialization time
	// they are placed here just to simplify the example
	
	this.deg2rad=Math.PI/180.0;
	var a_rad = 30.0 * this.deg2rad;
	var cos_a = Math.cos(a_rad);
	var sin_a = Math.sin(a_rad);

    this.rot = [ cos_a,  0.0,  -sin_a,  0.0,
                0.0,    1.0,   0.0,    0.0,
                sin_a,  0.0,   cos_a,  0.0,
                0.0,    0.0,   0.0,    1.0 ];

	// Scaling by (5,2,1)

    this.sca = [ 5.0, 0.0, 0.0, 0.0,
                0.0, 2.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0  ];

};

TPscene.prototype.initLights = function () {

	this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].enable();
    this.lights[0].update();
 
};

TPscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

TPscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

TPscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Draw axis
	this.axis.display();

	this.setDefaultAppearance();
	
	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// Multiplication of the previous transformations
	//this.multMatrix(this.tra);     // GT = GT * tra /* desloca-se para a frente e direita */
	//this.multMatrix(this.rot);     // GT = GT * rot /* roda no sentido contrário aos ponteiros do relógio */
	//this.multMatrix(this.sca);     // GT = GT * sca /* faz um escalonamento */

	// ---- END Geometric transformation section

/* Funções WebCGF para transformações geométricas */
/* CGFscene basta fazer o this.funcao(x,y,z) */	
//3.1
	//this.translate(5, 0, 2);
	//this.rotate((Math.PI/6),0,1,0);
	//this.scale(5,2,1);

/* END */

	// ---- BEGIN Primitive drawing section
	
	this.pushMatrix();
	this.translate(0,5,0);
	this.scale(5,2,1);
	this.translate(5, 0, 2);
	this.obj.display();
	this.popMatrix();

	this.pushMatrix();
	this.scale(5,2,1);
	this.translate(5, 0, 2);
	this.obj2.display();
	this.popMatrix();
	
	// ---- END Primitive drawing section

};
