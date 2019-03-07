let Rail = class {
    constructor(gl, pos) {

        this.pos = pos;
        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.

        // Create a buffer for the cube's vertex positions.
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        const width = 0.5;
        const height = 0.5;
        const length = 100.0;
        const gauge = 4.0;
        const gaps = 5.0;

         this.positions = [
        // left track
             // Front face
             -width/2 - gauge/2, -height/2,  length,
              width/2 - gauge/2, -height/2,  length,
              width/2 - gauge/2,  height/2,  length,
             -width/2 - gauge/2,  height/2,  length,
             // Back face
              width/2 - gauge/2,  height/2,     0.0,
             -width/2 - gauge/2,  height/2,     0.0,
             -width/2 - gauge/2, -height/2,     0.0,
              width/2 - gauge/2, -height/2,     0.0,
             // Top face
             -width/2 - gauge/2, -height/2,  length,
              width/2 - gauge/2, -height/2,  length,
              width/2 - gauge/2, -height/2,     0.0,
             -width/2 - gauge/2, -height/2,     0.0,
             // Bottom face
             -width/2 - gauge/2,  height/2,  length,
              width/2 - gauge/2,  height/2,  length,
              width/2 - gauge/2,  height/2,     0.0,
             -width/2 - gauge/2,  height/2,     0.0,
             //Left face
             -width/2 - gauge/2,  height/2,     0.0,
             -width/2 - gauge/2,  height/2,  length,
             -width/2 - gauge/2, -height/2,  length,
             -width/2 - gauge/2, -height/2,     0.0,
              //Right face
              width/2 - gauge/2,  height/2,     0.0,
              width/2 - gauge/2,  height/2,  length,
              width/2 - gauge/2, -height/2,  length,
              width/2 - gauge/2, -height/2,     0.0,

        // Right track
           // Front face
           -width/2 + gauge/2, -height/2,  length,
            width/2 + gauge/2, -height/2,  length,
            width/2 + gauge/2,  height/2,  length,
           -width/2 + gauge/2,  height/2,  length,
           // Back face
            width/2 + gauge/2,  height/2,     0.0,
           -width/2 + gauge/2,  height/2,     0.0,
           -width/2 + gauge/2, -height/2,     0.0,
            width/2 + gauge/2, -height/2,     0.0,
           // Top face
           -width/2 + gauge/2, -height/2,  length,
            width/2 + gauge/2, -height/2,  length,
            width/2 + gauge/2, -height/2,     0.0,
           -width/2 + gauge/2, -height/2,     0.0,
           // Bottom face
           -width/2 + gauge/2,  height/2,  length,
            width/2 + gauge/2,  height/2,  length,
            width/2 + gauge/2,  height/2,     0.0,
           -width/2 + gauge/2,  height/2,     0.0,
           //Left face
           -width/2 + gauge/2,  height/2,     0.0,
           -width/2 + gauge/2,  height/2,  length,
           -width/2 + gauge/2, -height/2,  length,
           -width/2 + gauge/2, -height/2,     0.0,
            //Right face
            width/2 + gauge/2,  height/2,     0.0,
            width/2 + gauge/2,  height/2,  length,
            width/2 + gauge/2, -height/2,  length,
            width/2 + gauge/2, -height/2,     0.0,
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

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        // This array defines each face as two triangles, using the
        // indices into the vertex array to specify each triangle's position.

        const indices = [
            0,  1,  2,      0,  2,  3,    // front
            7,  4,  5,      7,  5,  6,    // back
           11,  8,  9,     11,  9, 10,    // top
           15, 12, 13,     15, 13, 14,    // bottom
           19, 16, 17,     19, 17, 18,    // left
           23, 20, 21,     23, 21, 22,    // right

           0+24,  1+24,  2+24,  0+24,  2+24,  3+24,    // front
           7+24,  4+24,  5+24,  7+24,  5+24,  6+24,    // back
          11+24,  8+24,  9+24, 11+24,  9+24, 10+24,    // top
          15+24, 12+24, 13+24, 15+24, 13+24, 14+24,    // bottom
          19+24, 16+24, 17+24, 19+24, 17+24, 18+24,    // left
          23+24, 20+24, 21+24, 23+24, 21+24, 22+24,    // right
        ];

        // Now send the element array to GL

        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices), gl.STATIC_DRAW);

        this.buffer = {
            position: this.positionBuffer,
            color: colorBuffer,
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

        // Tell WebGL how to pull out the colors from the color buffer
        // into the vertexColor attribute.
        {
            const numComponents = 4;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.color);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexColor,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexColor);
        }

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        // Tell WebGL to use our program when drawing

        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

        {
            const vertexCount = 2 * 6 * 6;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
    }
};
