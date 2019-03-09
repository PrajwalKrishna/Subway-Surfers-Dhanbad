let OverheadLine = class {
    constructor(gl, pos) {

        this.pos = pos;
        // Select the positionBuffer as the one to apply buffer
        // operations to from here out.

        // Create a buffer for the cube's vertex positions.
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

        const width = 0.05;
        const height = 0.05;
        const length = 100.0;
        const gauge = 10;

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

        // left track
             // Front face
             -width/2, -height/2,  length,
              width/2, -height/2,  length,
              width/2,  height/2,  length,
             -width/2,  height/2,  length,
             // Back face
              width/2,  height/2,     0.0,
             -width/2,  height/2,     0.0,
             -width/2, -height/2,     0.0,
              width/2, -height/2,     0.0,
             // Top face
             -width/2, -height/2,  length,
              width/2, -height/2,  length,
              width/2, -height/2,     0.0,
             -width/2, -height/2,     0.0,
             // Bottom face
             -width/2,  height/2,  length,
              width/2,  height/2,  length,
              width/2,  height/2,     0.0,
             -width/2,  height/2,     0.0,
             //Left face
             -width/2,  height/2,     0.0,
             -width/2,  height/2,  length,
             -width/2, -height/2,  length,
             -width/2, -height/2,     0.0,
              //Right face
              width/2,  height/2,     0.0,
              width/2,  height/2,  length,
              width/2, -height/2,  length,
              width/2, -height/2,     0.0,
        ];
        // Now set up the colors for the faces. We'll use solid colors for each face.
        this.faceColors = [
            [0.0,  1.0,  1.0,  1.0],    // Front face: cyan
            [1.0,  0.0,  0.0,  1.0],    // Back face: red
            [0.0,  0.0,  0.0,  1.0],    // Top face: Green
            [0.0,  0.0,  1.0,  1.0],    // Bottom face: Blue
            [1.0,  1.0,  0.0,  1.0],    // Left face: purple
            [1.0,  1.0,  1.0,  1.0],    // Right face: white

            [0.0,  1.0,  1.0,  1.0],    // Front face: cyan
            [1.0,  0.0,  0.0,  1.0],    // Back face: red
            [0.0,  0.0,  0.0,  1.0],    // Top face: Green
            [0.0,  0.0,  1.0,  1.0],    // Bottom face: Blue
            [1.0,  1.0,  0.0,  1.0],    // Left face: purple
            [1.0,  1.0,  1.0,  1.0],    // Right face: white

            [0.0,  1.0,  1.0,  1.0],    // Front face: cyan
            [1.0,  0.0,  0.0,  1.0],    // Back face: red
            [0.0,  0.0,  0.0,  1.0],    // Top face: Green
            [0.0,  0.0,  1.0,  1.0],    // Bottom face: Blue
            [1.0,  1.0,  0.0,  1.0],    // Left face: purple
            [1.0,  1.0,  1.0,  1.0],    // Right face: white
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

          0+48,  1+48,  2+48,  0+48,  2+48,  3+48,    // front
          7+48,  4+48,  5+48,  7+48,  5+48,  6+48,    // back
         11+48,  8+48,  9+48, 11+48,  9+48, 10+48,    // top
         15+48, 12+48, 13+48, 15+48, 13+48, 14+48,    // bottom
         19+48, 16+48, 17+48, 19+48, 17+48, 18+48,    // left
         23+48, 20+48, 21+48, 23+48, 21+48, 22+48,    // right
        ];

        const faceColors_2 = [
            [0.0,  1.0,  1.0,  1.0],    // Front face: cyan
            [0.0,  0.0,  0.0,  0.8],    // Back face: red
            [0.0,  1.0,  0.0,  1.0],    // Top face: Green
            [0.0,  0.0,  1.0,  1.0],    // Bottom face: Blue
            [1.0,  1.0,  0.0,  1.0],    // Left face: purple
            [1.0,  1.0,  1.0,  1.0],    // Right face: white
        ]

        // Gauges making
        var len = 10;
        const side = 0.1;
        const space = 10.0;
        const breadth = 9.0;
        var count = 2;
        for(len = 10; len<length; len+=space){
            count++;
            var positions = [
                // Front face
                -breadth, -side/2,  len + side/2,
                 breadth, -side/2,  len + side/2,
                 breadth,  side/2,  len + side/2,
                -breadth,  side/2,  len + side/2,
                // Back face
                 breadth,  side/2,  len - side/2,
                -breadth,  side/2,  len - side/2,
                -breadth, -side/2,  len - side/2,
                 breadth, -side/2,  len - side/2,
                // Top face
                -breadth, -side/2,  len + side/2,
                 breadth, -side/2,  len + side/2,
                 breadth, -side/2,  len - side/2,
                -breadth, -side/2,  len - side/2,
                // Bottom face
                -breadth,  side/2,  len + side/2,
                 breadth,  side/2,  len + side/2,
                 breadth,  side/2,  len - side/2,
                -breadth,  side/2,  len - side/2,
                //Left face
                -breadth,  side/2,  len - side/2,
                -breadth,  side/2,  len + side/2,
                -breadth, -side/2,  len + side/2,
                -breadth, -side/2,  len - side/2,
                 //Right face
                 breadth,  side/2,  len - side/2,
                 breadth,  side/2,  len + side/2,
                 breadth, -side/2,  len + side/2,
                 breadth, -side/2,  len - side/2,
             ]
             this.positions.push(...positions);
             this.faceColors.push(...faceColors_2);
             let indices_2 = [
                 0 + count*24,  1 + count*24,  2 + count * 24,      0 + count*24,  2 + count*24,  3+count*24,    // front
                 7 + count*24,  4 + count*24,  5 + count * 24,      7 + count*24,  5 + count*24,  6+count*24,    // back
                11 + count*24,  8 + count*24,  9 + count * 24,     11 + count*24,  9 + count*24, 10+count*24,    // top
                15 + count*24, 12 + count*24, 13 + count * 24,     15 + count*24, 13 + count*24, 14+count*24,    // bottom
                19 + count*24, 16 + count*24, 17 + count * 24,     19 + count*24, 17 + count*24, 18+count*24,    // left
                23 + count*24, 20 + count*24, 21 + count * 24,     23 + count*24, 21 + count*24, 22+count*24,    // right
            ]

             this.indices.push(...indices_2);
             console.log(this.positions.length, this.faceColors.length, this.indices.length)
         }

         // Now pass the list of positions into WebGL to build the
         // shape. We do this by creating a Float32Array from the
         // JavaScript array, then use it to fill the current buffer.

         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
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
         // Now send the element array to
         gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.indices), gl.STATIC_DRAW);

            this.buffer = {
                position: this.positionBuffer,
                color: colorBuffer,
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
            const vertexCount = this.buffer.number * 36 + 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
    }
};
