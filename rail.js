let Rail = class {
    constructor(gl, pos) {
        this.pos = pos;

        const url = './Textures/rail.jpg';
        this.texture = loadTexture(gl, url);

        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.

        // Create a buffer for the cube's vertex positions.
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        const width = 0.5;
        const height = 0.5;
        const length = 100.0;
        const gauge = 3.5;

        this.positions = [];
        this.faceColors = [];
        this.indices = [];
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

         this.textureCoordinates = [
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

        this.indices = [
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

        const textureCoordinates_2 = [
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

        // Gauges making
        var len = 10;
        const side = 0.3;
        const space = 5.0;
        var count = 1;
        for(len = 10; len<length; len+=space){
            count++;
            var positions = [
                // Front face
                -gauge/2 * 1.25, -side/2,  len + side/2,
                 gauge/2 * 1.25, -side/2,  len + side/2,
                 gauge/2 * 1.25,  side/2,  len + side/2,
                -gauge/2 * 1.25,  side/2,  len + side/2,
                // Back face
                 gauge/2 * 1.25,  side/2,  len - side/2,
                -gauge/2 * 1.25,  side/2,  len - side/2,
                -gauge/2 * 1.25, -side/2,  len - side/2,
                 gauge/2 * 1.25, -side/2,  len - side/2,
                // Top face
                -gauge/2 * 1.25, -side/2,  len + side/2,
                 gauge/2 * 1.25, -side/2,  len + side/2,
                 gauge/2 * 1.25, -side/2,  len - side/2,
                -gauge/2 * 1.25, -side/2,  len - side/2,
                // Bottom face
                -gauge/2 * 1.25,  side/2,  len + side/2,
                 gauge/2 * 1.25,  side/2,  len + side/2,
                 gauge/2 * 1.25,  side/2,  len - side/2,
                -gauge/2 * 1.25,  side/2,  len - side/2,
                //Left face
                -gauge/2 * 1.25,  side/2,  len - side/2,
                -gauge/2 * 1.25,  side/2,  len + side/2,
                -gauge/2 * 1.25, -side/2,  len + side/2,
                -gauge/2 * 1.25, -side/2,  len - side/2,
                 //Right face
                 gauge/2 * 1.25,  side/2,  len - side/2,
                 gauge/2 * 1.25,  side/2,  len + side/2,
                 gauge/2 * 1.25, -side/2,  len + side/2,
                 gauge/2 * 1.25, -side/2,  len - side/2,
             ]
             this.positions.push(...positions);
             this.textureCoordinates.push(...textureCoordinates_2);
             let indices_2 = [
                 0 + count*24,  1 + count*24,  2 + count * 24,      0 + count*24,  2 + count*24,  3+count*24,    // front
                 7 + count*24,  4 + count*24,  5 + count * 24,      7 + count*24,  5 + count*24,  6+count*24,    // back
                11 + count*24,  8 + count*24,  9 + count * 24,     11 + count*24,  9 + count*24, 10+count*24,    // top
                15 + count*24, 12 + count*24, 13 + count * 24,     15 + count*24, 13 + count*24, 14+count*24,    // bottom
                19 + count*24, 16 + count*24, 17 + count * 24,     19 + count*24, 17 + count*24, 18+count*24,    // left
                23 + count*24, 20 + count*24, 21 + count * 24,     23 + count*24, 21 + count*24, 22+count*24,    // right
            ]

             this.indices.push(...indices_2);
             // console.log(this.positions.length, this.faceColors.length, this.indices.length)
         }

         // Now pass the list of positions into WebGL to build the
         // shape. We do this by creating a Float32Array from the
         // JavaScript array, then use it to fill the current buffer.

         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
         // // Convert the array of colors into a table for all the vertices.
         // var colors = [];
         //
         // for (var j = 0; j < this.faceColors.length; ++j) {
         //     const c = this.faceColors[j];
         //     // Repeat each color four times for the four vertices of the face
         //     colors = colors.concat(c, c, c, c);
         // }

         // const colorBuffer = gl.createBuffer();
         // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
         // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

         // Now set up the texture coordinates for the faces.
          const textureCoordBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates), gl.STATIC_DRAW);

         // Build the element array buffer; this specifies the indices
         // into the vertex arrays for each face's vertices.
         const indexBuffer = gl.createBuffer();
         gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

         // This array defines each face as two triangles, using the
         // indices into the vertex array to specify each triangle's position.
         // Now send the element array to
         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.indices), gl.STATIC_DRAW);

            this.buffer = {
                position: this.positionBuffer,
                textureCoord: textureCoordBuffer,
                indices: indexBuffer,
                number: count,
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

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);

             // Tell WebGL we want to affect texture unit 0
              gl.activeTexture(gl.TEXTURE0);

              // Bind the texture to texture unit 0
              gl.bindTexture(gl.TEXTURE_2D, this.texture);

              // Tell the shader we bound the texture to texture unit 0
              gl.uniform1i(programInfo.uniformLocations.uSampler, 0);


        {
            const vertexCount = this.buffer.number * 36 + 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
    }
};
