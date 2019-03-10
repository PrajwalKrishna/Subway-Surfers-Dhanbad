let Train = class {
    constructor(gl, pos) {
        this.pos = pos;

        var url = '';
        if(randInt(2) % 2)
            url = './Textures/wallTexture.jpg';
        else
            url = './Textures/duranto.jpg';
        this.texture = loadTexture(gl, url);

        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.

        // Create a buffer for the cube's vertex positions.
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        const width = 4.0;
        const height = 7.5;
        const length = 30.0;
        this.length = length;
        this.width = width;
        this.height = height;
    
        // Now create an array of positions for the cube.
         this.positions = [
           // Front face
           -width/2,     0.0,  length/2,
            width/2,     0.0,  length/2,
            width/2,  height,  length/2,
           -width/2,  height,  length/2,
           // Back face
            width/2,  height, -length/2,
           -width/2,  height, -length/2,
           -width/2,     0.0, -length/2,
            width/2,     0.0, -length/2,
           // Top face
           -width/2,     0.0,  length/2,
            width/2,     0.0,  length/2,
            width/2,     0.0, -length/2,
           -width/2,     0.0, -length/2,
           // Bottom face
           -width/2,  height,  length/2,
            width/2,  height,  length/2,
            width/2,  height, -length/2,
           -width/2,  height, -length/2,
           //Left face
           -width/2,  height, -length/2,
           -width/2,  height,  length/2,
           -width/2,     0.0,  length/2,
           -width/2,     0.0, -length/2,
            //Right face
            width/2,  height, -length/2,
            width/2,  height,  length/2,
            width/2,     0.0,  length/2,
            width/2,     0.0, -length/2,
        ];


        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        // Now set up the colors for the faces. We'll use solid colors for each face.
        this.faceColors = [
            [0.0,  1.0,  1.0,  1.0],    // Front face: cyan
            [1.0,  0.0,  0.0,  1.0],    // Back face: red
            [0.0,  1.0,  0.0,  1.0],    // Top face: Green
            [0.0,  0.0,  1.0,  1.0],    // Bottom face: Blue
            [1.0,  1.0,  0.0,  1.0],    // Left face: purple
            [1.0,  1.0,  1.0,  1.0],    // Right face: white
        ];

        // Convert the array of colors into a table for all the vertices.
        var colors = [];

        for (var j = 0; j < this.faceColors.length; ++j) {
            const c = this.faceColors[j];
            // Repeat each color four times for the four vertices of the face
            colors = colors.concat(c, c, c, c);
        }

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

        // Build the element array buffer; this specifies the indices
        // into the vertex arrays for each face's vertices.
        // Now set up the texture coordinates for the faces.
         const textureCoordBuffer = gl.createBuffer();
         gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

         const textureCoordinates = [
           // Front
           0.0,  0.0,
           1.0,  0.0,
           1.0,  1.0,
           0.0,  1.0,
           // Back
           0.0,  0.0,
           1.0,  0.0,
           1.0,  1.0,
           0.0,  1.0,
           // Top
           0.0,  0.0,
           1.0,  0.0,
           1.0,  1.0,
           0.0,  1.0,
           // Bottom
           0.0,  0.0,
           1.0,  0.0,
           1.0,  1.0,
           0.0,  1.0,
           // Right
           0.0,  0.0,
           1.0,  0.0,
           1.0,  1.0,
           0.0,  1.0,
           // Left
           0.0,  0.0,
           1.0,  0.0,
           1.0,  1.0,
           0.0,  1.0,
         ];

         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),gl.STATIC_DRAW);


        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's
        // position.

        const indices = [
            0,  1,  2,      0,  2,  3,    // front
            7,  4,  5,      7,  5,  6,    // back
           11,  8,  9,     11,  9, 10,    // top
           15, 12, 13,     15, 13, 14,    // bottom
           19, 16, 17,     19, 17, 18,    // left
           23, 20, 21,     23, 21, 22,    // right
        ];

        // Now send the element array to GL

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            textureCoord: textureCoordBuffer,
            indices: indexBuffer,
        }

    }

    drawCube(gl, projectionMatrix, programInfo, deltaTime) {
        // Set the drawing position to the "identity" point, which is
        // the center of the scene.
        const modelViewMatrix = mat4.create();

        // Now move the drawing position a bit to where we want to
        // start drawing the square.

        mat4.translate(modelViewMatrix,     // destination matrix
                       modelViewMatrix,     // matrix to translate
                       this.pos);  // amount to translate

      // Tell WebGL how to pull out the positions from the position
      // buffer into the vertexPosition attribute
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexPosition);
        }

        // tell webgl how to pull out the texture coordinates from buffer
        {
            const num = 2; // every coordinate composed of 2 values
            const type = gl.FLOAT; // the data in the buffer is 32 bit float
            const normalize = false; // don't normalize
            const stride = 0; // how many bytes to get from one set to the next
            const offset = 0; // how many bytes inside the buffer to start from
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
            gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset);
            gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
        }

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms
        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        {
            const vertexCount = 6 * 6;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
    }
};
