(function () {
  'use strict';

  class _vec3 {
    constructor(x, y, z) {
      if (x == undefined) (this.x = 0), (this.y = 0), (this.z = 0);
      else if (typeof x == "object")
        if (x.lenght == 3) (this.x = x[0]), (this.y = x[1]), (this.z = x[2]);
        else (this.x = x.x), (this.y = x.y), (this.z = x.z);
      else if (y == undefined || z == undefined)
        (this.x = x), (this.y = x), (this.z = x);
      else (this.x = x), (this.y = y), (this.z = z);
    } // End of 'constructor' function

    add(v) {
      if (typeof v == "number") {
        return vec3(this.x + v, this.y + v, this.z + v);
      }
      return vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    } // End of 'add' function

    sub(v) {
      if (typeof v == "number") {
        return vec3(this.x - v, this.y - v, this.z - v);
      }
      return vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    } // End of 'sub' function

    dot(v) {
      if (typeof v == "number") {
        return vec3(this.x * v, this.y * v, this.z * v);
      }
      return this.x * v.x + this.y * v.y + this.z * v.z;
    } // End of 'dot' function

    divNum(v) {
      return vec3(this.x / v, this.y / v, this.z / v);
    } // End of 'divNum' function

    len() {
      let v = vec3(this.x, this.y, this.z);
      let len = this.dot(v, v); 

      if (len == 1 || len == 0) {
        return len;
      }
      return Math.sqrt(len);
    } // End of 'len' function

    len2() {
      let v = vec3(this.x, this.y, this.z);

      return this.dot(v, v);
    } // End of 'len' function

    neg() {
      return vec3(-this.x, -this.y, -this.z);
    } // End of 'neg' function

    normalize() {
      let len = this.dot(this);

      if (len == 0 || len == 1)
        return this;
      
      len = Math.sqrt(len);
      return this.divNum(len);
    } // End of 'normalize' function

    transform(m) {
      return vec3(
        this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0],
        this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1],
        this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2]
      );
    } // End of 'transform' function

    MulMatr(m) {
      let w =
        this.x * m.m[0][3] +
        this.y * m.m[1][3] +
        this.z * m.m[2][3] +
        this.m[3][3];

      return vec3(
        (this.x * m.m[0][0] +
          this.y * m.m[1][0] +
          this.z * m.m[2][0] +
          m.m[3][0]) /
          w,
        (this.x * m.m[0][1] +
          this.y * m.m[1][1] +
          this.z * m.m[2][1] +
          m.m[3][1]) /
          w,
        (this.x * m.m[0][2] +
          this.y * m.m[1][2] +
          this.z * m.m[2][2] +
          m.m[3][2]) /
          w
      );
    } // End of 'vecMulMatr' function

    cross(v) {
      return vec3(this.y * v.z - this.z * v.y,
        this.z * v.x - this.x * v.z,
        this.x * v.y - this.y * v.x);
    } // End of 'vecCrossVec' function

    pointTransform(m) {
      vec3Set(
        this.x * m.m[0][0] + this.y * m.m[1][0] + this.z * m.m[2][0] + m.m[3][0],
        this.x * m.m[0][1] + this.y * m.m[1][1] + this.z * m.m[2][1] + m.m[3][1],
        this.x * m.m[0][2] + this.y * m.m[1][2] + this.z * m.m[2][2] + m.m[3][2]
      );
    } // End of 'pointTransfrom' function
  } // End of '_vec3' class function

  function vec3(...args) {
    return new _vec3(...args);
  } // End of 'vec3' function

  class _mat4 {
    constructor(m = null) {
      if (m == null) {
        this.m = [
          [1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1],
        ];
      } else if (typeof m == "object" && m.length == 4) {
        this.m = m;
      } else {
        this.m = m.m;
      }
    } // End of 'constructor' function

      toArray() {
        return [].concat(...this.m);
      }

    matrSet(a00, a01, a02, a03, 
            a10, a11, a12, a13,
            a20, a21, a22, a23,
            a30, a31, a32, a33,) {
      let m = mat4();

      m.m = [
        [a00, a01, a02, a03],
        [a10, a11, a12, a13],
        [a20, a21, a22, a23],
        [a30, a31, a32, a33],
      ];

      return m;
    } // End of 'matrSet' function

    determ3x3(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
      return (
        a11 * a22 * a33 +
        a12 * a23 * a31 +
        a13 * a21 * a32 -
        a11 * a23 * a32 -
        a12 * a21 * a33 -
        a13 * a22 * a31
      );
    } // End of 'determ3x3' function

    determ() {
      return (
        +this.m[0][0] *
          this.determ3x3(
            this.m[1][1],
            this.m[1][2],
            this.m[1][3],
            this.m[2][1],
            this.m[2][2],
            this.m[2][3],
            this.m[3][1],
            this.m[3][2],
            this.m[3][3],
          ) +
        -this.m[0][1] *
          this.determ3x3(
            this.m[1][0],
            this.m[1][2],
            this.m[1][3],
            this.m[2][0],
            this.m[2][2],
            this.m[2][3],
            this.m[3][0],
            this.m[3][2],
            this.m[3][3],
          ) +
        +this.m[0][2] *
          this.determ3x3(
            this.m[1][0],
            this.m[1][1],
            this.m[1][3],
            this.m[2][0],
            this.m[2][1],
            this.m[2][3],
            this.m[3][0],
            this.m[3][1],
            this.m[3][3],
          ) +
        -this.m[0][3] *
          this.determ3x3(
            this.m[1][0],
            this.m[1][1],
            this.m[1][2],
            this.m[2][0],
            this.m[2][1],
            this.m[2][2],
            this.m[3][0],
            this.m[3][1],
            this.m[3][2],
          )
      );
    } // End of 'determ' function

    matrTranslate(v) {
      this.m[3][0] = v.x;
      this.m[3][1] = v.y;
      this.m[3][2] = v.z;
      return this.m;
    } // End of 'matrTranslate' function

    matrMulMatr(m1) {
      let r = mat4();

      r.m[0][0] = this.m[0][0] * m1.m[0][0] + this.m[0][1] * m1.m[1][0] + this.m[0][2] * m1.m[2][0] +
      this.m[0][3] * m1.m[3][0];

      r.m[0][1] = this.m[0][0] * m1.m[0][1] + this.m[0][1] * m1.m[1][1] + this.m[0][2] * m1.m[2][1] +
        this.m[0][3] * m1.m[3][1];

      r.m[0][2] = this.m[0][0] * m1.m[0][2] + this.m[0][1] * m1.m[1][2] + this.m[0][2] * m1.m[2][2] +
        this.m[0][3] * m1.m[3][2];

      r.m[0][3] = this.m[0][0] * m1.m[0][3] + this.m[0][1] * m1.m[1][3] + this.m[0][2] * m1.m[2][3] +
        this.m[0][3] * m1.m[3][3];


      r.m[1][0] = this.m[1][0] * m1.m[0][0] + this.m[1][1] * m1.m[1][0] + this.m[1][2] * m1.m[2][0] +
        this.m[1][3] * m1.m[3][0];

      r.m[1][1] = this.m[1][0] * m1.m[0][1] + this.m[1][1] * m1.m[1][1] + this.m[1][2] * m1.m[2][1] +
        this.m[1][3] * m1.m[3][1];

      r.m[1][2] = this.m[1][0] * m1.m[0][2] + this.m[1][1] * m1.m[1][2] + this.m[1][2] * m1.m[2][2] +
        this.m[1][3] * m1.m[3][2];

      r.m[1][3] = this.m[1][0] * m1.m[0][3] + this.m[1][1] * m1.m[1][3] + this.m[1][2] * m1.m[2][3] +
        this.m[1][3] * m1.m[3][3];


      r.m[2][0] = this.m[2][0] * m1.m[0][0] + this.m[2][1] * m1.m[1][0] + this.m[2][2] * m1.m[2][0] +
        this.m[2][3] * m1.m[3][0];

      r.m[2][1] = this.m[2][0] * m1.m[0][1] + this.m[2][1] * m1.m[1][1] + this.m[2][2] * m1.m[2][1] +
        this.m[2][3] * m1.m[3][1];

        
      r.m[2][2] = this.m[2][0] * m1.m[0][2] + this.m[2][1] * m1.m[1][2] + this.m[2][2] * m1.m[2][2] +
        this.m[2][3] * m1.m[3][2];

      r.m[2][3] = this.m[2][0] * m1.m[0][3] + this.m[2][1] * m1.m[1][3] + this.m[2][2] * m1.m[2][3] +
        this.m[2][3] * m1.m[3][3];


      r.m[3][0] = this.m[3][0] * m1.m[0][0] + this.m[3][1] * m1.m[1][0] + this.m[3][2] * m1.m[2][0] +
        this.m[3][3] * m1.m[3][0];

      r.m[3][1] = this.m[3][0] * m1.m[0][1] + this.m[3][1] * m1.m[1][1] + this.m[3][2] * m1.m[2][1] +
        this.m[3][3] * m1.m[3][1];

      r.m[3][2] = this.m[3][0] * m1.m[0][2] + this.m[3][1] * m1.m[1][2] + this.m[3][2] * m1.m[2][2] +
        this.m[3][3] * m1.m[3][2];

      r.m[3][3] = this.m[3][0] * m1.m[0][3] + this.m[3][1] * m1.m[1][3] + this.m[3][2] * m1.m[2][3] +
        this.m[3][3] * m1.m[3][3];

      return r;
    } // End of 'MatrMulMatr' function

    inverse() {
      let r = mat4();
      let det = this.determ();

      if (det == 0) return r;

      r.m[0][0] =
        +this.determ3x3(
          this.m[1][1],
          this.m[1][2],
          this.m[1][3],
          this.m[2][1],
          this.m[2][2],
          this.m[2][3],
          this.m[3][1],
          this.m[3][2],
          this.m[3][3],
        ) / det;

      r.m[1][0] =
        -this.determ3x3(
          this.m[1][0],
          this.m[1][2],
          this.m[1][3],
          this.m[2][0],
          this.m[2][2],
          this.m[2][3],
          this.m[3][0],
          this.m[3][2],
          this.m[3][3],
        ) / det;

      r.m[2][0] =
        +this.determ3x3(
          this.m[1][0],
          this.m[1][1],
          this.m[1][3],
          this.m[2][0],
          this.m[2][1],
          this.m[2][3],
          this.m[3][0],
          this.m[3][1],
          this.m[3][3],
        ) / det;

      r.m[3][0] =
        -this.determ3x3(
          this.m[1][0],
          this.m[1][1],
          this.m[1][2],
          this.m[2][0],
          this.m[2][1],
          this.m[2][2],
          this.m[3][0],
          this.m[3][1],
          this.m[3][2],
        ) / det;

      r.m[0][1] =
        -this.determ3x3(
          this.m[0][1],
          this.m[0][2],
          this.m[0][3],
          this.m[2][1],
          this.m[2][2],
          this.m[2][3],
          this.m[3][1],
          this.m[3][2],
          this.m[3][3],
        ) / det;

      r.m[1][1] =
        +this.determ3x3(
          this.m[0][0],
          this.m[0][2],
          this.m[0][3],
          this.m[2][0],
          this.m[2][2],
          this.m[2][3],
          this.m[3][0],
          this.m[3][2],
          this.m[3][3],
        ) / det;

      r.m[2][1] =
        -this.determ3x3(
          this.m[0][0],
          this.m[0][1],
          this.m[0][3],
          this.m[2][0],
          this.m[2][1],
          this.m[2][3],
          this.m[3][0],
          this.m[3][1],
          this.m[3][3],
        ) / det;

      r.m[3][1] =
        +this.determ3x3(
          this.m[0][0],
          this.m[0][1],
          this.m[0][2],
          this.m[2][0],
          this.m[2][1],
          this.m[2][2],
          this.m[3][0],
          this.m[3][1],
          this.m[3][2],
        ) / det;

      r.m[0][2] =
        +this.determ3x3(
          this.m[0][1],
          this.m[0][2],
          this.m[0][3],
          this.m[1][1],
          this.m[1][2],
          this.m[1][3],
          this.m[3][1],
          this.m[3][2],
          this.m[3][3],
        ) / det;

      r.m[1][2] =
        -this.determ3x3(
          this.m[0][0],
          this.m[0][2],
          this.m[0][3],
          this.m[1][0],
          this.m[1][2],
          this.m[1][3],
          this.m[3][0],
          this.m[3][2],
          this.m[3][3],
        ) / det;

      r.m[2][2] =
        +this.determ3x3(
          this.m[0][0],
          this.m[0][1],
          this.m[0][3],
          this.m[1][0],
          this.m[1][1],
          this.m[1][3],
          this.m[3][0],
          this.m[3][1],
          this.m[3][3],
        ) / det;

      r.m[3][2] =
        -this.determ3x3(
          this.m[0][0],
          this.m[0][1],
          this.m[0][2],
          this.m[1][0],
          this.m[1][1],
          this.m[1][2],
          this.m[3][0],
          this.m[3][1],
          this.m[3][2],
        ) / det;

      r.m[0][3] =
        -this.determ3x3(
          this.m[0][1],
          this.m[0][2],
          this.m[0][3],
          this.m[1][1],
          this.m[1][2],
          this.m[1][3],
          this.m[2][1],
          this.m[2][2],
          this.m[2][3],
        ) / det;

      r.m[1][3] =
        +this.determ3x3(
          this.m[0][0],
          this.m[0][2],
          this.m[0][3],
          this.m[1][0],
          this.m[1][2],
          this.m[1][3],
          this.m[2][0],
          this.m[2][2],
          this.m[2][3],
        ) / det;

      r.m[2][3] =
        -this.determ3x3(
          this.m[0][0],
          this.m[0][1],
          this.m[0][3],
          this.m[1][0],
          this.m[1][1],
          this.m[1][3],
          this.m[2][0],
          this.m[2][1],
          this.m[2][3],
        ) / det;

      r.m[3][3] =
        +this.determ3x3(
          this.m[0][0],
          this.m[0][1],
          this.m[0][2],
          this.m[1][0],
          this.m[1][1],
          this.m[1][2],
          this.m[2][0],
          this.m[2][1],
          this.m[2][2],
        ) / det;

      return r;
    } // End of 'inverse' function

    rotate(Angle, v) {
      let a = (Angle * Math.PI) / 180,
        s = Math.sin(a),
        c = Math.cos(a);

      return this.matrSet(
        c + v.x * v.x * (1 - c),
        v.y * v.x * (1 - c) - v.z * s,
        v.z * v.x * (1 - c) + v.y * s,
        0,
        v.x * v.y * (1 - c) + v.z * s,
        c + v.y * v.y * (1 - c),
        v.z * v.y * (1 - c) - v.x * s,
        0,
        v.x * v.z * (1 - c) - v.y * s,
        v.y * v.z * (1 - c) + v.x * s,
        c + v.z * v.z * (1 - c),
        0,
        0,
        0,
        0,
        1,
      );
    } // End of 'rotate' function

    view(loc, at, up1) {
      let 
        dir = at.sub(loc).normalize(),
        right = dir.cross(up1).normalize(),
        up = right.cross(dir).normalize();
      let m = mat4();

      m.m = 
        [
          [right.x, up.x, -dir.x, 0],
          [right.y, up.y, -dir.y, 0],
          [right.z, up.z, -dir.z, 0],
          [-loc.dot(right), -loc.dot(up), loc.dot(dir), 1],
        ];

      return m;
    } // End of 'view' function

    frustum(l, r, b, t, n, f) {
      return this.matrSet(
        (2 * n) / (r - l),
        0,
        0,
        0,
        0,
        (2 * n) / (t - b),
        0,
        0,
        (r + l) / (r - l),
        (t + b) / (t - b),
        -((f + n) / (f - n)),
        -1,
        0,
        0,
        -((2 * n * f) / (f - n)),
        0,
      );
    } // End of 'frustum' function

    transpose() {
      return this.matrSet(
        this.m[0][0],
        this.m[1][0],
        this.m[2][0],
        this.m[3][0],
        this.m[0][1],
        this.m[1][1],
        this.m[2][1],
        this.m[3][1],
        this.m[0][2],
        this.m[1][2],
        this.m[2][2],
        this.m[3][2],
        this.m[0][3],
        this.m[1][3],
        this.m[2][3],
        this.m[3][3],
      );
    } // End of 'transpose' function

    rotateX(Angle) {
      let a = (Angle * Math.PI) / 180,
        si = Math.sin(a),
        co = Math.cos(a);

      return this.matrSet(1, 0, 0, 0, 0, co, si, 0, 0, -si, co, 0, 0, 0, 0, 1);
    } // End of 'rotateX' function

    rotateY(Angle) {
      let a = (Angle * Math.PI) / 180,
        si = Math.sin(a),
        co = Math.cos(a);

      return this.matrSet(co, 0, -si, 0, 0, 1, 0, 0, si, 0, co, 0, 0, 0, 0, 1);
    } // End of 'rotateY

    rotateZ(Angle) {
      let a = (Angle * Math.PI) / 180,
        si = Math.sin(a),
        co = Math.cos(a);

      return this.matrSet(co, si, 0, 0, -si, co, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    } // End of 'rotateZ

    scale(v) {
      return this.matrSet(v.x, 0, 0, 0, 0, v.y, 0, 0, 0, 0, v.z, 0, 0, 0, 0, 1);
    } // End of 'scale'

    ortho(l, r, b, t, n, f) {
      return this.matrSet(
        2 / (r - l),
        0,
        0,
        0,
        0,
        2 / (t - b),
        0,
        0,
        0,
        0,
        -2 / (f - n),
        0,
        -(r + l) / (r - l),
        -(t + b) / (t - b),
        -(f + n) / (f - n),
        1,
      );
    } // End of 'ortho' function

  } // End of '_mat4' function

  function mat4(...args) {
    return new _mat4(...args);
  } // End of 'mat4' function

  // Shader class
  class _shader {
    async _init(name) {
      this.name = name;
      this.id = null;
      this.shaders =
      [
         {
           id: null,
           type: gl.VERTEX_SHADER,
           name: "vert",
           src: "",
         },
         {
          id: null,
          type: gl.FRAGMENT_SHADER,
          name: "frag",
          src: "",
        }
      ];
      for (const s of this.shaders) {
        let response = await fetch(`bin/shaders/${name}/${s.name}.glsl`);
        let src = await response.text();
        if (typeof src == "string" && src != "")
          s.src = src;
      }
      // recompile shaders
      this.updateShadersSource();
    }
    staticInit(name) {
      this.name = name;
      this.id = null;
      this.shaders =
      [
         {
           id: null,
           type: gl.VERTEX_SHADER,
           name: "vert",
           src: "",
         },
         {
          id: null,
          type: gl.FRAGMENT_SHADER,
          name: "frag",
          src: "",
        }
      ];
      let vs_txt =
      `#version 300 es
    precision highp float;
    in vec3 InPosition;
    in vec3 InNormal;

    uniform mat4 MatrWVP;
    uniform mat4 MatrWInv;

    out vec2 DrawPos;
    out vec3 DrawNormal;
    
    void main( void )
    {
      gl_Position = MatrWVP * vec4(InPosition, 1);
      //gl_Position = vec4(InPosition, 1);
      DrawNormal = normalize(mat3(MatrWInv) * InNormal);
      DrawPos = InPosition.xy;
    }
    `;
      let fs_txt =
      `#version 300 es
    precision highp float;
    
    in vec3 DrawNormal;
    in vec2 DrawPos;
    
    uniform float Time;
    uniform mat4 MatrWVP;

    out vec4 OutColor;
    
    void main( void )
    {
      vec3 L = vec3(0, 0, 2);
      vec3 N = normalize(faceforward(DrawNormal, -L, DrawNormal));
      vec3 col = vec3(0.1, 0.1, 0.30) * dot(N, L);
      vec2 vec = sin(Time * 2.0) * DrawPos; // * vec2(DrawNormal);
      OutColor = vec4(vec, cos(Time * 3.0), 1.0);
    }
    `;
      this.shaders[0].src = vs_txt;
      this.shaders[1].src = fs_txt;
      // recompile shaders
      this.updateShadersSource();
    }                     
    updateShadersSource() { 
      this.shaders[0].id = null;
      this.shaders[1].id = null;
      this.id = null;
      if (this.shaders[0].src == "" || this.shaders[1].src == "")
        return;
      this.shaders.forEach(s => {
        s.id = gl.createShader(s.type);
        gl.shaderSource(s.id, s.src);
        gl.compileShader(s.id);
        if (!gl.getShaderParameter(s.id, gl.COMPILE_STATUS)) {
          let buf = gl.getShaderInfoLog(s.id);
          console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
        }                                            
      });             
      this.id = gl.createProgram();
      this.shaders.forEach(s => {
        if (s.id != null)
          gl.attachShader(this.id, s.id);
      });
      gl.linkProgram(this.id);
      if (!gl.getProgramParameter(this.id, gl.LINK_STATUS)) {
        let buf = gl.getProgramInfoLog(this.id);
        console.log(`Shader program ${this.name} link fail: ${buf}`);
      }                                            
      this.updateShaderData();    
    } 
    updateShaderData() {
      // Shader attributes
      this.attrs = {};
      const countAttrs = gl.getProgramParameter(this.id, gl.ACTIVE_ATTRIBUTES);
      for (let i = 0; i < countAttrs; i++) {
        const info = gl.getActiveAttrib(this.id, i);
        this.attrs[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: gl.getAttribLocation(this.id, info.name),
        };
      }
   
      // Shader uniforms
      this.uniforms = {};
      const countUniforms = gl.getProgramParameter(this.id, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < countUniforms; i++) {
        const info = gl.getActiveUniform(this.id, i);
        this.uniforms[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: gl.getUniformLocation(this.id, info.name),
        };
      }
   
      // Shader uniform blocks
      this.uniformBlocks = {};
      const countUniformBlocks = gl.getProgramParameter(this.id, gl.ACTIVE_UNIFORM_BLOCKS);
      for (let i = 0; i < countUniformBlocks; i++) {
        const block_name = gl.getActiveUniformBlockName(this.id, i);
        const index = gl.getActiveUniformBlockIndex(this.id, block_name);
        this.uniformBlocks[block_name] = {
          name: block_name,
          index: index,
          size: gl.getActiveUniformBlockParameter(this.id, idx, gl.UNIFORM_BLOCK_DATA_SIZE),
          bind: gl.getActiveUniformBlockParameter(this.id, idx, gl.UNIFORM_BLOCK_BINDING),
        };
      }
      
    }
    constructor(name) {
      /// this._init(name);
      this.staticInit(name);
    }
    apply() {
      if (this.id != null)
        gl.useProgram(this.id);
    }
  }
  function shader(name) {
    return new _shader(name);
  }

  class _camera {
    loc = vec3();
    at = vec3();
    dir = vec3();
    right = vec3();
    up = vec3();
    matrView = mat4(); 
    matrProj = mat4(); 
    matrVP = mat4();
    frameW;
    frameH;
    wp;
    hp;
    projSize;
    projDist;
    projFarClip;

    camSet(loc, at, up) {
      this.matrView = mat4().view(loc, at, up);

      this.right = vec3(this.matrView.m[0][0],
                        this.matrView.m[1][0],
                        this.matrView.m[2][0]);

      this.up = vec3(this.matrView.m[0][1],
                     this.matrView.m[1][1],
                     this.matrView.m[2][1]);
                    
      this.dir = vec3(-this.matrView.m[0][2],
                      -this.matrView.m[1][2],
                      -this.matrView.m[2][2]);
                      

      this.loc = vec3(loc);
      this.at = vec3(at);
      this.matrVP = this.matrView.matrMulMatr(this.matrProj);
    } // End of 'camSet' function

    camSetProj(projSize, projDist, projFarClip) {
      let rx, ry;

      this.projDist = projDist;
      this.projFarClip = projFarClip;
      rx = ry = this.projSize = projSize;

      /* Correct aspect ratio */
      if (this.frameW >= this.frameH)
        rx *= this.frameW / this.frameH;
      else
        ry *= this.frameH / this.frameW;

      this.wp = rx;
      this.hp = ry;
      this.matrProj =
        mat4().frustum(-rx / 2, rx / 2, -ry / 2, ry / 2,
          this.projDist, this.projFarClip);
      this.matrVP = this.matrView.matrMulMatr(this.matrProj);
    } // End of 'camSetProj' function
    camSetSize(frameW, frameH) {
      this.frameW = frameW;
      this.frameH = frameH;
      this.setProj(this.projSize, this.projDist, this.projFarClip);
    } // End of 'camSetSize' function
  } 

  function camera(...args) {
    return new _camera(...args);
  }

  // or different way
  class _vertex {
    pos = vec3();
    norm = vec3();

    constructor(x, y, z) {
      if (typeof (x) == "object") {
        this.pos = vec3(x);
      } else {
        this.pos = vec3(x, y, z);
      }
      
      // if (pos == "number") {
      //   this.pos = vec3(pos, pos, pos);
      //   this.norm = vec3(norm, norm, norm);
      // } else {
      //   this.pos = pos;
      //   this.norm = norm;
      // }
    }
  }

  function vertex(...args) {
    return new _vertex(...args);
  } // End of 'vertex' function 

  class _prim {
    shd;
    vertArray;
    vertBuffer;
    indBuffer;
    numOfElements;

    constructor(shd, vert, ind) {
      let vertexes = [], i = 0;

      this.shd = shd;
      autoNormal(vert, ind);

      for (let v of vert) {
        vertexes[i++] = v.pos.x;
        vertexes[i++] = v.pos.y;
        vertexes[i++] = v.pos.z;
        
        vertexes[i++] = v.norm.x;
        vertexes[i++] = v.norm.y;
        vertexes[i++] = v.norm.z;
      }
      this.numOfElem = vert.length;

      const posLoc = gl.getAttribLocation(shd.id, "InPosition");
      const normLoc = gl.getAttribLocation(shd.id, "InNormal");
      this.vertArray = gl.createVertexArray();
      gl.bindVertexArray(this.vertArray);
      this.vertBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);

      if (posLoc != -1) {
        gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24, 0);
        gl.enableVertexAttribArray(posLoc);
      }
      if (normLoc != -1) {
        gl.vertexAttribPointer(normLoc, 3, gl.FLOAT, false, 24, 12);
        gl.enableVertexAttribArray(normLoc);
      }

      if (ind != undefined) {
        this.numOfElem = ind.length;
        
        this.indBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(ind), gl.STATIC_DRAW);  
      } 
    }

    render(world, cam) {
      const date = new Date();
      let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;

      let wvp = world.matrMulMatr(cam.matrVP);
      let winv = world.inverse().transpose();

      if (this.shd.uniforms['MatrWVP'] != undefined)
        gl.uniformMatrix4fv(this.shd.uniforms['MatrWVP'].loc, false, new Float32Array(wvp.toArray()));
      if (this.shd.uniforms['MatrWInv'] != undefined)
        gl.uniformMatrix4fv(this.shd.uniforms['MatrWInv'].loc, false, new Float32Array(winv.toArray()));
      if (this.shd.uniforms['Time'] != undefined)
        gl.uniform1f(this.shd.uniforms['Time'].loc, t);
      
      if (this.shd.id != null) {
        gl.bindVertexArray(this.vertArray);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuffer);

        if (this.indBuffer == undefined)
          gl.drawArrays(gl.TRIANGLES, 0, this.numOfElem);
        else {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indBuffer);
          gl.drawElements(gl.TRIANGLES, this.numOfElem, gl.UNSIGNED_INT, 0);
        }
      }
    }
  }

  function autoNormal(vertexes, indexes) {
    if (indexes == undefined) {
      for (let i = 0; i < vertexes.length; i += 3) {
        let norm = (vertexes[i + 1].pos.sub(vertexes[i].pos)).cross(vertexes[i + 2].pos.sub(vertexes[i].pos)).normalize();

        vertexes[i].norm = vertexes[i].norm.add(norm);
        vertexes[i + 1].norm = vertexes[i + 1].norm.add(norm);
        vertexes[i + 2].norm = vertexes[i + 2].norm.add(norm);
      }
    } else {
      for (let i = 0; i < indexes.length; i += 3) {
        let
          n0 = indexes[i], n1 = indexes[i + 1], n2 = indexes[i + 2];
        let p0 = vec3(), p1 = vec3(), p2 = vec3(), norm = vec3();

        p0 = vertexes[n0].pos;
        p1 = vertexes[n1].pos;
        p2 = vertexes[n2].pos;
        
        norm = p1.sub(p0).cross(p2.sub(p0)).normalize();
    
        vertexes[n0].norm = vertexes[n0].norm.add(norm);
        vertexes[n1].norm = vertexes[n1].norm.add(norm);
        vertexes[n2].norm = vertexes[n2].norm.add(norm);
      }
      
      for (let i in vertexes) {
        vertexes[i].norm = vertexes[i].norm.normalize();
      }
    }

  } // End of 'autoNormal' function

  function prim(...args) {
    return new _prim(...args);
  } // End of 'prim' function

  function setCube() {
    let ind = [
      0, 1, 2, 
      1, 2, 4, 
      1, 4, 7, 
      1, 7, 5, 
      7, 5, 3, 
      7, 3, 6,
      0, 1, 3,
      3, 1, 5,
      6, 3, 0,
      6, 0, 2,
      2, 6, 7,
      2, 7, 4
    ];  

    let vert = [
      vertex(0), vertex(1, 0, 0), vertex(0, 1, 0), vertex(0, 0, 1), vertex(1, 1, 0), vertex(1, 0, 1), vertex(0, 1, 1), vertex(1)
    ];

    const verts = [];
    for (let i of ind) {
      let vrtx = vertex(vert[i].pos);
      verts.push(vrtx);
    }

    return verts;
  }

  function setTetrahedron() {
    const vert = [
      vertex(0, 0, 1), vertex(1, 0, 0), vertex(0, 1, 0), vertex(1)
    ];
    const ind = [
      0, 1, 2,
      0, 1, 3,
      0, 2, 3,
      1, 2, 3
    ];

    const verts = [];

    for (let i of ind) {
      let vrtx = vertex(vert[i].pos);
      verts.push(vrtx);
    }

    return verts;
  }

  function main() {
    const canvas = document.querySelector("#myCan");
    const gl = canvas.getContext("webgl2");

    if (gl === null) {
      alert("WebGL2 not supported");
      return;
    }

    if (window.gl == undefined) {
      window.gl = gl;
    }

    gl.enable(gl.DEPTH_TEST);
    
    gl.clearColor(0.30, 0.47, 0.8, 1.0);
    let shd  = shader("default");

    const cam = camera();
    
    cam.frameW = canvas.clientWidth;
    cam.frameH = canvas.clientHeight;
    cam.projDist = 0.1;
    cam.projSize = 0.1;
    cam.projFarClip = 300;

    cam.camSet(vec3(0, 0, 4), vec3(0), vec3(0, 1, 0));
    cam.camSetProj(0.1, 0.1, 300);
    
    let prims = prim(shd, setCube());
    let prims0 = prim(shd, setTetrahedron());

    shd.apply();

    const anim = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.clear(gl.DEPTH_BUFFER_BIT);

      const date = new Date();
      let t = date.getMinutes() * 60 +
            date.getSeconds() +
            date.getMilliseconds() / 1000;

      prims0.render(mat4().rotateY(30 * t).matrMulMatr(mat4().rotateX(30 * t)), cam);
      prims.render(mat4().rotateZ(t * 60).matrMulMatr(mat4().rotateY(60 * t)), cam);

      window.requestAnimationFrame(anim);
    };

    anim();
  }

  console.log("CGSG forever!!!");

  window.addEventListener("load", () => {
    main();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbXRoL3ZlYzMuanMiLCIuLi9tdGgvbWF0NC5qcyIsIi4uL3NyYy9hbmltL3JuZC9zaGFkZXJfY2xhc3NfcGF0dGVybi5qcyIsIi4uL210aC9jYW0uanMiLCIuLi9zcmMvYW5pbS9ybmQvcm5kcHJpbS5qcyIsIi4uL3NyYy9maWd1cmUvZmlndXJlcy5qcyIsIi4uL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgX3ZlYzMge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XG4gICAgaWYgKHggPT0gdW5kZWZpbmVkKSAodGhpcy54ID0gMCksICh0aGlzLnkgPSAwKSwgKHRoaXMueiA9IDApO1xuICAgIGVsc2UgaWYgKHR5cGVvZiB4ID09IFwib2JqZWN0XCIpXG4gICAgICBpZiAoeC5sZW5naHQgPT0gMykgKHRoaXMueCA9IHhbMF0pLCAodGhpcy55ID0geFsxXSksICh0aGlzLnogPSB4WzJdKTtcbiAgICAgIGVsc2UgKHRoaXMueCA9IHgueCksICh0aGlzLnkgPSB4LnkpLCAodGhpcy56ID0geC56KTtcbiAgICBlbHNlIGlmICh5ID09IHVuZGVmaW5lZCB8fCB6ID09IHVuZGVmaW5lZClcbiAgICAgICh0aGlzLnggPSB4KSwgKHRoaXMueSA9IHgpLCAodGhpcy56ID0geCk7XG4gICAgZWxzZSAodGhpcy54ID0geCksICh0aGlzLnkgPSB5KSwgKHRoaXMueiA9IHopO1xuICB9IC8vIEVuZCBvZiAnY29uc3RydWN0b3InIGZ1bmN0aW9uXG5cbiAgYWRkKHYpIHtcbiAgICBpZiAodHlwZW9mIHYgPT0gXCJudW1iZXJcIikge1xuICAgICAgcmV0dXJuIHZlYzModGhpcy54ICsgdiwgdGhpcy55ICsgdiwgdGhpcy56ICsgdik7XG4gICAgfVxuICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopO1xuICB9IC8vIEVuZCBvZiAnYWRkJyBmdW5jdGlvblxuXG4gIHN1Yih2KSB7XG4gICAgaWYgKHR5cGVvZiB2ID09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiB2ZWMzKHRoaXMueCAtIHYsIHRoaXMueSAtIHYsIHRoaXMueiAtIHYpO1xuICAgIH1cbiAgICByZXR1cm4gdmVjMyh0aGlzLnggLSB2LngsIHRoaXMueSAtIHYueSwgdGhpcy56IC0gdi56KTtcbiAgfSAvLyBFbmQgb2YgJ3N1YicgZnVuY3Rpb25cblxuICBkb3Qodikge1xuICAgIGlmICh0eXBlb2YgdiA9PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gdmVjMyh0aGlzLnggKiB2LCB0aGlzLnkgKiB2LCB0aGlzLnogKiB2KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMueCAqIHYueCArIHRoaXMueSAqIHYueSArIHRoaXMueiAqIHYuejtcbiAgfSAvLyBFbmQgb2YgJ2RvdCcgZnVuY3Rpb25cblxuICBkaXZOdW0odikge1xuICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIHYsIHRoaXMueSAvIHYsIHRoaXMueiAvIHYpO1xuICB9IC8vIEVuZCBvZiAnZGl2TnVtJyBmdW5jdGlvblxuXG4gIGxlbigpIHtcbiAgICBsZXQgdiA9IHZlYzModGhpcy54LCB0aGlzLnksIHRoaXMueik7XG4gICAgbGV0IGxlbiA9IHRoaXMuZG90KHYsIHYpOyBcblxuICAgIGlmIChsZW4gPT0gMSB8fCBsZW4gPT0gMCkge1xuICAgICAgcmV0dXJuIGxlbjtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguc3FydChsZW4pO1xuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxuXG4gIGxlbjIoKSB7XG4gICAgbGV0IHYgPSB2ZWMzKHRoaXMueCwgdGhpcy55LCB0aGlzLnopO1xuXG4gICAgcmV0dXJuIHRoaXMuZG90KHYsIHYpO1xuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxuXG4gIG5lZygpIHtcbiAgICByZXR1cm4gdmVjMygtdGhpcy54LCAtdGhpcy55LCAtdGhpcy56KTtcbiAgfSAvLyBFbmQgb2YgJ25lZycgZnVuY3Rpb25cblxuICBub3JtYWxpemUoKSB7XG4gICAgbGV0IGxlbiA9IHRoaXMuZG90KHRoaXMpO1xuXG4gICAgaWYgKGxlbiA9PSAwIHx8IGxlbiA9PSAxKVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgXG4gICAgbGVuID0gTWF0aC5zcXJ0KGxlbik7XG4gICAgcmV0dXJuIHRoaXMuZGl2TnVtKGxlbik7XG4gIH0gLy8gRW5kIG9mICdub3JtYWxpemUnIGZ1bmN0aW9uXG5cbiAgdHJhbnNmb3JtKG0pIHtcbiAgICByZXR1cm4gdmVjMyhcbiAgICAgIHRoaXMueCAqIG0ubVswXVswXSArIHRoaXMueSAqIG0ubVsxXVswXSArIHRoaXMueiAqIG0ubVsyXVswXSxcbiAgICAgIHRoaXMueCAqIG0ubVswXVsxXSArIHRoaXMueSAqIG0ubVsxXVsxXSArIHRoaXMueiAqIG0ubVsyXVsxXSxcbiAgICAgIHRoaXMueCAqIG0ubVswXVsyXSArIHRoaXMueSAqIG0ubVsxXVsyXSArIHRoaXMueiAqIG0ubVsyXVsyXVxuICAgICk7XG4gIH0gLy8gRW5kIG9mICd0cmFuc2Zvcm0nIGZ1bmN0aW9uXG5cbiAgTXVsTWF0cihtKSB7XG4gICAgbGV0IHcgPVxuICAgICAgdGhpcy54ICogbS5tWzBdWzNdICtcbiAgICAgIHRoaXMueSAqIG0ubVsxXVszXSArXG4gICAgICB0aGlzLnogKiBtLm1bMl1bM10gK1xuICAgICAgdGhpcy5tWzNdWzNdO1xuXG4gICAgcmV0dXJuIHZlYzMoXG4gICAgICAodGhpcy54ICogbS5tWzBdWzBdICtcbiAgICAgICAgdGhpcy55ICogbS5tWzFdWzBdICtcbiAgICAgICAgdGhpcy56ICogbS5tWzJdWzBdICtcbiAgICAgICAgbS5tWzNdWzBdKSAvXG4gICAgICAgIHcsXG4gICAgICAodGhpcy54ICogbS5tWzBdWzFdICtcbiAgICAgICAgdGhpcy55ICogbS5tWzFdWzFdICtcbiAgICAgICAgdGhpcy56ICogbS5tWzJdWzFdICtcbiAgICAgICAgbS5tWzNdWzFdKSAvXG4gICAgICAgIHcsXG4gICAgICAodGhpcy54ICogbS5tWzBdWzJdICtcbiAgICAgICAgdGhpcy55ICogbS5tWzFdWzJdICtcbiAgICAgICAgdGhpcy56ICogbS5tWzJdWzJdICtcbiAgICAgICAgbS5tWzNdWzJdKSAvXG4gICAgICAgIHdcbiAgICApO1xuICB9IC8vIEVuZCBvZiAndmVjTXVsTWF0cicgZnVuY3Rpb25cblxuICBjcm9zcyh2KSB7XG4gICAgcmV0dXJuIHZlYzModGhpcy55ICogdi56IC0gdGhpcy56ICogdi55LFxuICAgICAgdGhpcy56ICogdi54IC0gdGhpcy54ICogdi56LFxuICAgICAgdGhpcy54ICogdi55IC0gdGhpcy55ICogdi54KTtcbiAgfSAvLyBFbmQgb2YgJ3ZlY0Nyb3NzVmVjJyBmdW5jdGlvblxuXG4gIHBvaW50VHJhbnNmb3JtKG0pIHtcbiAgICB2ZWMzU2V0KFxuICAgICAgdGhpcy54ICogbS5tWzBdWzBdICsgdGhpcy55ICogbS5tWzFdWzBdICsgdGhpcy56ICogbS5tWzJdWzBdICsgbS5tWzNdWzBdLFxuICAgICAgdGhpcy54ICogbS5tWzBdWzFdICsgdGhpcy55ICogbS5tWzFdWzFdICsgdGhpcy56ICogbS5tWzJdWzFdICsgbS5tWzNdWzFdLFxuICAgICAgdGhpcy54ICogbS5tWzBdWzJdICsgdGhpcy55ICogbS5tWzFdWzJdICsgdGhpcy56ICogbS5tWzJdWzJdICsgbS5tWzNdWzJdXG4gICAgKTtcbiAgfSAvLyBFbmQgb2YgJ3BvaW50VHJhbnNmcm9tJyBmdW5jdGlvblxufSAvLyBFbmQgb2YgJ192ZWMzJyBjbGFzcyBmdW5jdGlvblxuXG5leHBvcnQgZnVuY3Rpb24gdmVjMyguLi5hcmdzKSB7XG4gIHJldHVybiBuZXcgX3ZlYzMoLi4uYXJncyk7XG59IC8vIEVuZCBvZiAndmVjMycgZnVuY3Rpb25cbiIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi92ZWMzLmpzXCI7XG5cbmNsYXNzIF9tYXQ0IHtcbiAgY29uc3RydWN0b3IobSA9IG51bGwpIHtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICB0aGlzLm0gPSBbXG4gICAgICAgIFsxLCAwLCAwLCAwXSxcbiAgICAgICAgWzAsIDEsIDAsIDBdLFxuICAgICAgICBbMCwgMCwgMSwgMF0sXG4gICAgICAgIFswLCAwLCAwLCAxXSxcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbSA9PSBcIm9iamVjdFwiICYmIG0ubGVuZ3RoID09IDQpIHtcbiAgICAgIHRoaXMubSA9IG07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubSA9IG0ubTtcbiAgICB9XG4gIH0gLy8gRW5kIG9mICdjb25zdHJ1Y3RvcicgZnVuY3Rpb25cblxuICAgIHRvQXJyYXkoKSB7XG4gICAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMubSk7XG4gICAgfVxuXG4gIG1hdHJTZXQoYTAwLCBhMDEsIGEwMiwgYTAzLCBcbiAgICAgICAgICBhMTAsIGExMSwgYTEyLCBhMTMsXG4gICAgICAgICAgYTIwLCBhMjEsIGEyMiwgYTIzLFxuICAgICAgICAgIGEzMCwgYTMxLCBhMzIsIGEzMywpIHtcbiAgICBsZXQgbSA9IG1hdDQoKTtcblxuICAgIG0ubSA9IFtcbiAgICAgIFthMDAsIGEwMSwgYTAyLCBhMDNdLFxuICAgICAgW2ExMCwgYTExLCBhMTIsIGExM10sXG4gICAgICBbYTIwLCBhMjEsIGEyMiwgYTIzXSxcbiAgICAgIFthMzAsIGEzMSwgYTMyLCBhMzNdLFxuICAgIF07XG5cbiAgICByZXR1cm4gbTtcbiAgfSAvLyBFbmQgb2YgJ21hdHJTZXQnIGZ1bmN0aW9uXG5cbiAgZGV0ZXJtM3gzKGExMSwgYTEyLCBhMTMsIGEyMSwgYTIyLCBhMjMsIGEzMSwgYTMyLCBhMzMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgYTExICogYTIyICogYTMzICtcbiAgICAgIGExMiAqIGEyMyAqIGEzMSArXG4gICAgICBhMTMgKiBhMjEgKiBhMzIgLVxuICAgICAgYTExICogYTIzICogYTMyIC1cbiAgICAgIGExMiAqIGEyMSAqIGEzMyAtXG4gICAgICBhMTMgKiBhMjIgKiBhMzFcbiAgICApO1xuICB9IC8vIEVuZCBvZiAnZGV0ZXJtM3gzJyBmdW5jdGlvblxuXG4gIGRldGVybSgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgK3RoaXMubVswXVswXSAqXG4gICAgICAgIHRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgICB0aGlzLm1bMl1bMl0sXG4gICAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgICApICtcbiAgICAgIC10aGlzLm1bMF1bMV0gKlxuICAgICAgICB0aGlzLmRldGVybTN4MyhcbiAgICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICAgKSArXG4gICAgICArdGhpcy5tWzBdWzJdICpcbiAgICAgICAgdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICAgICkgK1xuICAgICAgLXRoaXMubVswXVszXSAqXG4gICAgICAgIHRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgICApXG4gICAgKTtcbiAgfSAvLyBFbmQgb2YgJ2RldGVybScgZnVuY3Rpb25cblxuICBtYXRyVHJhbnNsYXRlKHYpIHtcbiAgICB0aGlzLm1bM11bMF0gPSB2Lng7XG4gICAgdGhpcy5tWzNdWzFdID0gdi55O1xuICAgIHRoaXMubVszXVsyXSA9IHYuejtcbiAgICByZXR1cm4gdGhpcy5tO1xuICB9IC8vIEVuZCBvZiAnbWF0clRyYW5zbGF0ZScgZnVuY3Rpb25cblxuICBtYXRyTXVsTWF0cihtMSkge1xuICAgIGxldCByID0gbWF0NCgpO1xuXG4gICAgci5tWzBdWzBdID0gdGhpcy5tWzBdWzBdICogbTEubVswXVswXSArIHRoaXMubVswXVsxXSAqIG0xLm1bMV1bMF0gKyB0aGlzLm1bMF1bMl0gKiBtMS5tWzJdWzBdICtcbiAgICB0aGlzLm1bMF1bM10gKiBtMS5tWzNdWzBdO1xuXG4gICAgci5tWzBdWzFdID0gdGhpcy5tWzBdWzBdICogbTEubVswXVsxXSArIHRoaXMubVswXVsxXSAqIG0xLm1bMV1bMV0gKyB0aGlzLm1bMF1bMl0gKiBtMS5tWzJdWzFdICtcbiAgICAgIHRoaXMubVswXVszXSAqIG0xLm1bM11bMV07XG5cbiAgICByLm1bMF1bMl0gPSB0aGlzLm1bMF1bMF0gKiBtMS5tWzBdWzJdICsgdGhpcy5tWzBdWzFdICogbTEubVsxXVsyXSArIHRoaXMubVswXVsyXSAqIG0xLm1bMl1bMl0gK1xuICAgICAgdGhpcy5tWzBdWzNdICogbTEubVszXVsyXTtcblxuICAgIHIubVswXVszXSA9IHRoaXMubVswXVswXSAqIG0xLm1bMF1bM10gKyB0aGlzLm1bMF1bMV0gKiBtMS5tWzFdWzNdICsgdGhpcy5tWzBdWzJdICogbTEubVsyXVszXSArXG4gICAgICB0aGlzLm1bMF1bM10gKiBtMS5tWzNdWzNdO1xuXG5cbiAgICByLm1bMV1bMF0gPSB0aGlzLm1bMV1bMF0gKiBtMS5tWzBdWzBdICsgdGhpcy5tWzFdWzFdICogbTEubVsxXVswXSArIHRoaXMubVsxXVsyXSAqIG0xLm1bMl1bMF0gK1xuICAgICAgdGhpcy5tWzFdWzNdICogbTEubVszXVswXTtcblxuICAgIHIubVsxXVsxXSA9IHRoaXMubVsxXVswXSAqIG0xLm1bMF1bMV0gKyB0aGlzLm1bMV1bMV0gKiBtMS5tWzFdWzFdICsgdGhpcy5tWzFdWzJdICogbTEubVsyXVsxXSArXG4gICAgICB0aGlzLm1bMV1bM10gKiBtMS5tWzNdWzFdO1xuXG4gICAgci5tWzFdWzJdID0gdGhpcy5tWzFdWzBdICogbTEubVswXVsyXSArIHRoaXMubVsxXVsxXSAqIG0xLm1bMV1bMl0gKyB0aGlzLm1bMV1bMl0gKiBtMS5tWzJdWzJdICtcbiAgICAgIHRoaXMubVsxXVszXSAqIG0xLm1bM11bMl07XG5cbiAgICByLm1bMV1bM10gPSB0aGlzLm1bMV1bMF0gKiBtMS5tWzBdWzNdICsgdGhpcy5tWzFdWzFdICogbTEubVsxXVszXSArIHRoaXMubVsxXVsyXSAqIG0xLm1bMl1bM10gK1xuICAgICAgdGhpcy5tWzFdWzNdICogbTEubVszXVszXTtcblxuXG4gICAgci5tWzJdWzBdID0gdGhpcy5tWzJdWzBdICogbTEubVswXVswXSArIHRoaXMubVsyXVsxXSAqIG0xLm1bMV1bMF0gKyB0aGlzLm1bMl1bMl0gKiBtMS5tWzJdWzBdICtcbiAgICAgIHRoaXMubVsyXVszXSAqIG0xLm1bM11bMF07XG5cbiAgICByLm1bMl1bMV0gPSB0aGlzLm1bMl1bMF0gKiBtMS5tWzBdWzFdICsgdGhpcy5tWzJdWzFdICogbTEubVsxXVsxXSArIHRoaXMubVsyXVsyXSAqIG0xLm1bMl1bMV0gK1xuICAgICAgdGhpcy5tWzJdWzNdICogbTEubVszXVsxXTtcblxuICAgICAgXG4gICAgci5tWzJdWzJdID0gdGhpcy5tWzJdWzBdICogbTEubVswXVsyXSArIHRoaXMubVsyXVsxXSAqIG0xLm1bMV1bMl0gKyB0aGlzLm1bMl1bMl0gKiBtMS5tWzJdWzJdICtcbiAgICAgIHRoaXMubVsyXVszXSAqIG0xLm1bM11bMl07XG5cbiAgICByLm1bMl1bM10gPSB0aGlzLm1bMl1bMF0gKiBtMS5tWzBdWzNdICsgdGhpcy5tWzJdWzFdICogbTEubVsxXVszXSArIHRoaXMubVsyXVsyXSAqIG0xLm1bMl1bM10gK1xuICAgICAgdGhpcy5tWzJdWzNdICogbTEubVszXVszXTtcblxuXG4gICAgci5tWzNdWzBdID0gdGhpcy5tWzNdWzBdICogbTEubVswXVswXSArIHRoaXMubVszXVsxXSAqIG0xLm1bMV1bMF0gKyB0aGlzLm1bM11bMl0gKiBtMS5tWzJdWzBdICtcbiAgICAgIHRoaXMubVszXVszXSAqIG0xLm1bM11bMF07XG5cbiAgICByLm1bM11bMV0gPSB0aGlzLm1bM11bMF0gKiBtMS5tWzBdWzFdICsgdGhpcy5tWzNdWzFdICogbTEubVsxXVsxXSArIHRoaXMubVszXVsyXSAqIG0xLm1bMl1bMV0gK1xuICAgICAgdGhpcy5tWzNdWzNdICogbTEubVszXVsxXTtcblxuICAgIHIubVszXVsyXSA9IHRoaXMubVszXVswXSAqIG0xLm1bMF1bMl0gKyB0aGlzLm1bM11bMV0gKiBtMS5tWzFdWzJdICsgdGhpcy5tWzNdWzJdICogbTEubVsyXVsyXSArXG4gICAgICB0aGlzLm1bM11bM10gKiBtMS5tWzNdWzJdO1xuXG4gICAgci5tWzNdWzNdID0gdGhpcy5tWzNdWzBdICogbTEubVswXVszXSArIHRoaXMubVszXVsxXSAqIG0xLm1bMV1bM10gKyB0aGlzLm1bM11bMl0gKiBtMS5tWzJdWzNdICtcbiAgICAgIHRoaXMubVszXVszXSAqIG0xLm1bM11bM107XG5cbiAgICByZXR1cm4gcjtcbiAgfSAvLyBFbmQgb2YgJ01hdHJNdWxNYXRyJyBmdW5jdGlvblxuXG4gIGludmVyc2UoKSB7XG4gICAgbGV0IHIgPSBtYXQ0KCk7XG4gICAgbGV0IGRldCA9IHRoaXMuZGV0ZXJtKCk7XG5cbiAgICBpZiAoZGV0ID09IDApIHJldHVybiByO1xuXG4gICAgci5tWzBdWzBdID1cbiAgICAgICt0aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICB0aGlzLm1bMl1bMl0sXG4gICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMV1bMF0gPVxuICAgICAgLXRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgIHRoaXMubVszXVsyXSxcbiAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVsyXVswXSA9XG4gICAgICArdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzNdWzBdID1cbiAgICAgIC10aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgIHRoaXMubVszXVsyXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMF1bMV0gPVxuICAgICAgLXRoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMV0sXG4gICAgICAgIHRoaXMubVswXVsyXSxcbiAgICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgIHRoaXMubVszXVsyXSxcbiAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVsxXVsxXSA9XG4gICAgICArdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVswXSxcbiAgICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgICB0aGlzLm1bMF1bM10sXG4gICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzJdWzFdID1cbiAgICAgIC10aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgICB0aGlzLm1bMF1bMV0sXG4gICAgICAgIHRoaXMubVswXVszXSxcbiAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICB0aGlzLm1bM11bMV0sXG4gICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bM11bMV0gPVxuICAgICAgK3RoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMF0sXG4gICAgICAgIHRoaXMubVswXVsxXSxcbiAgICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgIHRoaXMubVsyXVsxXSxcbiAgICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVswXVsyXSA9XG4gICAgICArdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVsxXSxcbiAgICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgICB0aGlzLm1bMF1bM10sXG4gICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgICB0aGlzLm1bM11bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzFdWzJdID1cbiAgICAgIC10aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgICB0aGlzLm1bMF1bMl0sXG4gICAgICAgIHRoaXMubVswXVszXSxcbiAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICAgIHRoaXMubVszXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMl1bMl0gPVxuICAgICAgK3RoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMF0sXG4gICAgICAgIHRoaXMubVswXVsxXSxcbiAgICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgIHRoaXMubVsxXVsxXSxcbiAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICB0aGlzLm1bM11bMF0sXG4gICAgICAgIHRoaXMubVszXVsxXSxcbiAgICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVszXVsyXSA9XG4gICAgICAtdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVswXSxcbiAgICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgICB0aGlzLm1bMF1bMl0sXG4gICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgIHRoaXMubVszXVswXSxcbiAgICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgICB0aGlzLm1bM11bMl0sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzBdWzNdID1cbiAgICAgIC10aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgICB0aGlzLm1bMF1bMl0sXG4gICAgICAgIHRoaXMubVswXVszXSxcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bMl0sXG4gICAgICAgIHRoaXMubVsxXVszXSxcbiAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICB0aGlzLm1bMl1bMl0sXG4gICAgICAgIHRoaXMubVsyXVszXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByLm1bMV1bM10gPVxuICAgICAgK3RoaXMuZGV0ZXJtM3gzKFxuICAgICAgICB0aGlzLm1bMF1bMF0sXG4gICAgICAgIHRoaXMubVswXVsyXSxcbiAgICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgICB0aGlzLm1bMV1bMF0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgICB0aGlzLm1bMl1bMF0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgKSAvIGRldDtcblxuICAgIHIubVsyXVszXSA9XG4gICAgICAtdGhpcy5kZXRlcm0zeDMoXG4gICAgICAgIHRoaXMubVswXVswXSxcbiAgICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgICB0aGlzLm1bMF1bM10sXG4gICAgICAgIHRoaXMubVsxXVswXSxcbiAgICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgICB0aGlzLm1bMV1bM10sXG4gICAgICAgIHRoaXMubVsyXVswXSxcbiAgICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgICB0aGlzLm1bMl1bM10sXG4gICAgICApIC8gZGV0O1xuXG4gICAgci5tWzNdWzNdID1cbiAgICAgICt0aGlzLmRldGVybTN4MyhcbiAgICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgICB0aGlzLm1bMF1bMV0sXG4gICAgICAgIHRoaXMubVswXVsyXSxcbiAgICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgICB0aGlzLm1bMV1bMV0sXG4gICAgICAgIHRoaXMubVsxXVsyXSxcbiAgICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgICB0aGlzLm1bMl1bMV0sXG4gICAgICAgIHRoaXMubVsyXVsyXSxcbiAgICAgICkgLyBkZXQ7XG5cbiAgICByZXR1cm4gcjtcbiAgfSAvLyBFbmQgb2YgJ2ludmVyc2UnIGZ1bmN0aW9uXG5cbiAgcm90YXRlKEFuZ2xlLCB2KSB7XG4gICAgbGV0IGEgPSAoQW5nbGUgKiBNYXRoLlBJKSAvIDE4MCxcbiAgICAgIHMgPSBNYXRoLnNpbihhKSxcbiAgICAgIGMgPSBNYXRoLmNvcyhhKTtcblxuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoXG4gICAgICBjICsgdi54ICogdi54ICogKDEgLSBjKSxcbiAgICAgIHYueSAqIHYueCAqICgxIC0gYykgLSB2LnogKiBzLFxuICAgICAgdi56ICogdi54ICogKDEgLSBjKSArIHYueSAqIHMsXG4gICAgICAwLFxuICAgICAgdi54ICogdi55ICogKDEgLSBjKSArIHYueiAqIHMsXG4gICAgICBjICsgdi55ICogdi55ICogKDEgLSBjKSxcbiAgICAgIHYueiAqIHYueSAqICgxIC0gYykgLSB2LnggKiBzLFxuICAgICAgMCxcbiAgICAgIHYueCAqIHYueiAqICgxIC0gYykgLSB2LnkgKiBzLFxuICAgICAgdi55ICogdi56ICogKDEgLSBjKSArIHYueCAqIHMsXG4gICAgICBjICsgdi56ICogdi56ICogKDEgLSBjKSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAxLFxuICAgICk7XG4gIH0gLy8gRW5kIG9mICdyb3RhdGUnIGZ1bmN0aW9uXG5cbiAgdmlldyhsb2MsIGF0LCB1cDEpIHtcbiAgICBsZXQgXG4gICAgICBkaXIgPSBhdC5zdWIobG9jKS5ub3JtYWxpemUoKSxcbiAgICAgIHJpZ2h0ID0gZGlyLmNyb3NzKHVwMSkubm9ybWFsaXplKCksXG4gICAgICB1cCA9IHJpZ2h0LmNyb3NzKGRpcikubm9ybWFsaXplKCk7XG4gICAgbGV0IG0gPSBtYXQ0KCk7XG5cbiAgICBtLm0gPSBcbiAgICAgIFtcbiAgICAgICAgW3JpZ2h0LngsIHVwLngsIC1kaXIueCwgMF0sXG4gICAgICAgIFtyaWdodC55LCB1cC55LCAtZGlyLnksIDBdLFxuICAgICAgICBbcmlnaHQueiwgdXAueiwgLWRpci56LCAwXSxcbiAgICAgICAgWy1sb2MuZG90KHJpZ2h0KSwgLWxvYy5kb3QodXApLCBsb2MuZG90KGRpciksIDFdLFxuICAgICAgXTtcblxuICAgIHJldHVybiBtO1xuICB9IC8vIEVuZCBvZiAndmlldycgZnVuY3Rpb25cblxuICBmcnVzdHVtKGwsIHIsIGIsIHQsIG4sIGYpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyU2V0KFxuICAgICAgKDIgKiBuKSAvIChyIC0gbCksXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgKDIgKiBuKSAvICh0IC0gYiksXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIChyICsgbCkgLyAociAtIGwpLFxuICAgICAgKHQgKyBiKSAvICh0IC0gYiksXG4gICAgICAtKChmICsgbikgLyAoZiAtIG4pKSxcbiAgICAgIC0xLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAtKCgyICogbiAqIGYpIC8gKGYgLSBuKSksXG4gICAgICAwLFxuICAgICk7XG4gIH0gLy8gRW5kIG9mICdmcnVzdHVtJyBmdW5jdGlvblxuXG4gIHRyYW5zcG9zZSgpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyU2V0KFxuICAgICAgdGhpcy5tWzBdWzBdLFxuICAgICAgdGhpcy5tWzFdWzBdLFxuICAgICAgdGhpcy5tWzJdWzBdLFxuICAgICAgdGhpcy5tWzNdWzBdLFxuICAgICAgdGhpcy5tWzBdWzFdLFxuICAgICAgdGhpcy5tWzFdWzFdLFxuICAgICAgdGhpcy5tWzJdWzFdLFxuICAgICAgdGhpcy5tWzNdWzFdLFxuICAgICAgdGhpcy5tWzBdWzJdLFxuICAgICAgdGhpcy5tWzFdWzJdLFxuICAgICAgdGhpcy5tWzJdWzJdLFxuICAgICAgdGhpcy5tWzNdWzJdLFxuICAgICAgdGhpcy5tWzBdWzNdLFxuICAgICAgdGhpcy5tWzFdWzNdLFxuICAgICAgdGhpcy5tWzJdWzNdLFxuICAgICAgdGhpcy5tWzNdWzNdLFxuICAgICk7XG4gIH0gLy8gRW5kIG9mICd0cmFuc3Bvc2UnIGZ1bmN0aW9uXG5cbiAgcm90YXRlWChBbmdsZSkge1xuICAgIGxldCBhID0gKEFuZ2xlICogTWF0aC5QSSkgLyAxODAsXG4gICAgICBzaSA9IE1hdGguc2luKGEpLFxuICAgICAgY28gPSBNYXRoLmNvcyhhKTtcblxuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoMSwgMCwgMCwgMCwgMCwgY28sIHNpLCAwLCAwLCAtc2ksIGNvLCAwLCAwLCAwLCAwLCAxKTtcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZVgnIGZ1bmN0aW9uXG5cbiAgcm90YXRlWShBbmdsZSkge1xuICAgIGxldCBhID0gKEFuZ2xlICogTWF0aC5QSSkgLyAxODAsXG4gICAgICBzaSA9IE1hdGguc2luKGEpLFxuICAgICAgY28gPSBNYXRoLmNvcyhhKTtcblxuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoY28sIDAsIC1zaSwgMCwgMCwgMSwgMCwgMCwgc2ksIDAsIGNvLCAwLCAwLCAwLCAwLCAxKTtcbiAgfSAvLyBFbmQgb2YgJ3JvdGF0ZVlcblxuICByb3RhdGVaKEFuZ2xlKSB7XG4gICAgbGV0IGEgPSAoQW5nbGUgKiBNYXRoLlBJKSAvIDE4MCxcbiAgICAgIHNpID0gTWF0aC5zaW4oYSksXG4gICAgICBjbyA9IE1hdGguY29zKGEpO1xuXG4gICAgcmV0dXJuIHRoaXMubWF0clNldChjbywgc2ksIDAsIDAsIC1zaSwgY28sIDAsIDAsIDAsIDAsIDEsIDAsIDAsIDAsIDAsIDEpO1xuICB9IC8vIEVuZCBvZiAncm90YXRlWlxuXG4gIHNjYWxlKHYpIHtcbiAgICByZXR1cm4gdGhpcy5tYXRyU2V0KHYueCwgMCwgMCwgMCwgMCwgdi55LCAwLCAwLCAwLCAwLCB2LnosIDAsIDAsIDAsIDAsIDEpO1xuICB9IC8vIEVuZCBvZiAnc2NhbGUnXG5cbiAgb3J0aG8obCwgciwgYiwgdCwgbiwgZikge1xuICAgIHJldHVybiB0aGlzLm1hdHJTZXQoXG4gICAgICAyIC8gKHIgLSBsKSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAyIC8gKHQgLSBiKSxcbiAgICAgIDAsXG4gICAgICAwLFxuICAgICAgMCxcbiAgICAgIDAsXG4gICAgICAtMiAvIChmIC0gbiksXG4gICAgICAwLFxuICAgICAgLShyICsgbCkgLyAociAtIGwpLFxuICAgICAgLSh0ICsgYikgLyAodCAtIGIpLFxuICAgICAgLShmICsgbikgLyAoZiAtIG4pLFxuICAgICAgMSxcbiAgICApO1xuICB9IC8vIEVuZCBvZiAnb3J0aG8nIGZ1bmN0aW9uXG5cbn0gLy8gRW5kIG9mICdfbWF0NCcgZnVuY3Rpb25cblxuZXhwb3J0IGZ1bmN0aW9uIG1hdDQoLi4uYXJncykge1xuICByZXR1cm4gbmV3IF9tYXQ0KC4uLmFyZ3MpO1xufSAvLyBFbmQgb2YgJ21hdDQnIGZ1bmN0aW9uXG4iLCIvLyBTaGFkZXIgY2xhc3NcbmNsYXNzIF9zaGFkZXIge1xuICBhc3luYyBfaW5pdChuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgICB0aGlzLnNoYWRlcnMgPVxuICAgIFtcbiAgICAgICB7XG4gICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgIHR5cGU6IGdsLlZFUlRFWF9TSEFERVIsXG4gICAgICAgICBuYW1lOiBcInZlcnRcIixcbiAgICAgICAgIHNyYzogXCJcIixcbiAgICAgICB9LFxuICAgICAgIHtcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGdsLkZSQUdNRU5UX1NIQURFUixcbiAgICAgICAgbmFtZTogXCJmcmFnXCIsXG4gICAgICAgIHNyYzogXCJcIixcbiAgICAgIH1cbiAgICBdO1xuICAgIGZvciAoY29uc3QgcyBvZiB0aGlzLnNoYWRlcnMpIHtcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBiaW4vc2hhZGVycy8ke25hbWV9LyR7cy5uYW1lfS5nbHNsYCk7XG4gICAgICBsZXQgc3JjID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gXCJzdHJpbmdcIiAmJiBzcmMgIT0gXCJcIilcbiAgICAgICAgcy5zcmMgPSBzcmM7XG4gICAgfVxuICAgIC8vIHJlY29tcGlsZSBzaGFkZXJzXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XG4gIH1cbiAgc3RhdGljSW5pdChuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgICB0aGlzLnNoYWRlcnMgPVxuICAgIFtcbiAgICAgICB7XG4gICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgIHR5cGU6IGdsLlZFUlRFWF9TSEFERVIsXG4gICAgICAgICBuYW1lOiBcInZlcnRcIixcbiAgICAgICAgIHNyYzogXCJcIixcbiAgICAgICB9LFxuICAgICAgIHtcbiAgICAgICAgaWQ6IG51bGwsXG4gICAgICAgIHR5cGU6IGdsLkZSQUdNRU5UX1NIQURFUixcbiAgICAgICAgbmFtZTogXCJmcmFnXCIsXG4gICAgICAgIHNyYzogXCJcIixcbiAgICAgIH1cbiAgICBdO1xuICAgIGxldCB2c190eHQgPVxuICAgIGAjdmVyc2lvbiAzMDAgZXNcbiAgICBwcmVjaXNpb24gaGlnaHAgZmxvYXQ7XG4gICAgaW4gdmVjMyBJblBvc2l0aW9uO1xuICAgIGluIHZlYzMgSW5Ob3JtYWw7XG5cbiAgICB1bmlmb3JtIG1hdDQgTWF0cldWUDtcbiAgICB1bmlmb3JtIG1hdDQgTWF0cldJbnY7XG5cbiAgICBvdXQgdmVjMiBEcmF3UG9zO1xuICAgIG91dCB2ZWMzIERyYXdOb3JtYWw7XG4gICAgXG4gICAgdm9pZCBtYWluKCB2b2lkIClcbiAgICB7XG4gICAgICBnbF9Qb3NpdGlvbiA9IE1hdHJXVlAgKiB2ZWM0KEluUG9zaXRpb24sIDEpO1xuICAgICAgLy9nbF9Qb3NpdGlvbiA9IHZlYzQoSW5Qb3NpdGlvbiwgMSk7XG4gICAgICBEcmF3Tm9ybWFsID0gbm9ybWFsaXplKG1hdDMoTWF0cldJbnYpICogSW5Ob3JtYWwpO1xuICAgICAgRHJhd1BvcyA9IEluUG9zaXRpb24ueHk7XG4gICAgfVxuICAgIGA7XG4gICAgbGV0IGZzX3R4dCA9XG4gICAgYCN2ZXJzaW9uIDMwMCBlc1xuICAgIHByZWNpc2lvbiBoaWdocCBmbG9hdDtcbiAgICBcbiAgICBpbiB2ZWMzIERyYXdOb3JtYWw7XG4gICAgaW4gdmVjMiBEcmF3UG9zO1xuICAgIFxuICAgIHVuaWZvcm0gZmxvYXQgVGltZTtcbiAgICB1bmlmb3JtIG1hdDQgTWF0cldWUDtcblxuICAgIG91dCB2ZWM0IE91dENvbG9yO1xuICAgIFxuICAgIHZvaWQgbWFpbiggdm9pZCApXG4gICAge1xuICAgICAgdmVjMyBMID0gdmVjMygwLCAwLCAyKTtcbiAgICAgIHZlYzMgTiA9IG5vcm1hbGl6ZShmYWNlZm9yd2FyZChEcmF3Tm9ybWFsLCAtTCwgRHJhd05vcm1hbCkpO1xuICAgICAgdmVjMyBjb2wgPSB2ZWMzKDAuMSwgMC4xLCAwLjMwKSAqIGRvdChOLCBMKTtcbiAgICAgIHZlYzIgdmVjID0gc2luKFRpbWUgKiAyLjApICogRHJhd1BvczsgLy8gKiB2ZWMyKERyYXdOb3JtYWwpO1xuICAgICAgT3V0Q29sb3IgPSB2ZWM0KHZlYywgY29zKFRpbWUgKiAzLjApLCAxLjApO1xuICAgIH1cbiAgICBgO1xuICAgIHRoaXMuc2hhZGVyc1swXS5zcmMgPSB2c190eHQ7XG4gICAgdGhpcy5zaGFkZXJzWzFdLnNyYyA9IGZzX3R4dDtcbiAgICAvLyByZWNvbXBpbGUgc2hhZGVyc1xuICAgIHRoaXMudXBkYXRlU2hhZGVyc1NvdXJjZSgpO1xuICB9ICAgICAgICAgICAgICAgICAgICAgXG4gIHVwZGF0ZVNoYWRlcnNTb3VyY2UoKSB7IFxuICAgIHRoaXMuc2hhZGVyc1swXS5pZCA9IG51bGw7XG4gICAgdGhpcy5zaGFkZXJzWzFdLmlkID0gbnVsbDtcbiAgICB0aGlzLmlkID0gbnVsbDtcbiAgICBpZiAodGhpcy5zaGFkZXJzWzBdLnNyYyA9PSBcIlwiIHx8IHRoaXMuc2hhZGVyc1sxXS5zcmMgPT0gXCJcIilcbiAgICAgIHJldHVybjtcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcbiAgICAgIHMuaWQgPSBnbC5jcmVhdGVTaGFkZXIocy50eXBlKTtcbiAgICAgIGdsLnNoYWRlclNvdXJjZShzLmlkLCBzLnNyYyk7XG4gICAgICBnbC5jb21waWxlU2hhZGVyKHMuaWQpO1xuICAgICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIocy5pZCwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgIGxldCBidWYgPSBnbC5nZXRTaGFkZXJJbmZvTG9nKHMuaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhgU2hhZGVyICR7dGhpcy5uYW1lfS8ke3MubmFtZX0gY29tcGlsZSBmYWlsOiAke2J1Zn1gKTtcbiAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIH0pOyAgICAgICAgICAgICBcbiAgICB0aGlzLmlkID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKHMgPT4ge1xuICAgICAgaWYgKHMuaWQgIT0gbnVsbClcbiAgICAgICAgZ2wuYXR0YWNoU2hhZGVyKHRoaXMuaWQsIHMuaWQpO1xuICAgIH0pO1xuICAgIGdsLmxpbmtQcm9ncmFtKHRoaXMuaWQpO1xuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgIGxldCBidWYgPSBnbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLmlkKTtcbiAgICAgIGNvbnNvbGUubG9nKGBTaGFkZXIgcHJvZ3JhbSAke3RoaXMubmFtZX0gbGluayBmYWlsOiAke2J1Zn1gKTtcbiAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB0aGlzLnVwZGF0ZVNoYWRlckRhdGEoKTsgICAgXG4gIH0gXG4gIHVwZGF0ZVNoYWRlckRhdGEoKSB7XG4gICAgLy8gU2hhZGVyIGF0dHJpYnV0ZXNcbiAgICB0aGlzLmF0dHJzID0ge307XG4gICAgY29uc3QgY291bnRBdHRycyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgZ2wuQUNUSVZFX0FUVFJJQlVURVMpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRBdHRyczsgaSsrKSB7XG4gICAgICBjb25zdCBpbmZvID0gZ2wuZ2V0QWN0aXZlQXR0cmliKHRoaXMuaWQsIGkpO1xuICAgICAgdGhpcy5hdHRyc1tpbmZvLm5hbWVdID0ge1xuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXG4gICAgICAgIHR5cGU6IGluZm8udHlwZSxcbiAgICAgICAgc2l6ZTogaW5mby5zaXplLFxuICAgICAgICBsb2M6IGdsLmdldEF0dHJpYkxvY2F0aW9uKHRoaXMuaWQsIGluZm8ubmFtZSksXG4gICAgICB9O1xuICAgIH1cbiBcbiAgICAvLyBTaGFkZXIgdW5pZm9ybXNcbiAgICB0aGlzLnVuaWZvcm1zID0ge307XG4gICAgY29uc3QgY291bnRVbmlmb3JtcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5pZCwgZ2wuQUNUSVZFX1VOSUZPUk1TKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50VW5pZm9ybXM7IGkrKykge1xuICAgICAgY29uc3QgaW5mbyA9IGdsLmdldEFjdGl2ZVVuaWZvcm0odGhpcy5pZCwgaSk7XG4gICAgICB0aGlzLnVuaWZvcm1zW2luZm8ubmFtZV0gPSB7XG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxuICAgICAgICBzaXplOiBpbmZvLnNpemUsXG4gICAgICAgIGxvYzogZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuaWQsIGluZm8ubmFtZSksXG4gICAgICB9O1xuICAgIH1cbiBcbiAgICAvLyBTaGFkZXIgdW5pZm9ybSBibG9ja3NcbiAgICB0aGlzLnVuaWZvcm1CbG9ja3MgPSB7fTtcbiAgICBjb25zdCBjb3VudFVuaWZvcm1CbG9ja3MgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIGdsLkFDVElWRV9VTklGT1JNX0JMT0NLUyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudFVuaWZvcm1CbG9ja3M7IGkrKykge1xuICAgICAgY29uc3QgYmxvY2tfbmFtZSA9IGdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja05hbWUodGhpcy5pZCwgaSk7XG4gICAgICBjb25zdCBpbmRleCA9IGdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja0luZGV4KHRoaXMuaWQsIGJsb2NrX25hbWUpO1xuICAgICAgdGhpcy51bmlmb3JtQmxvY2tzW2Jsb2NrX25hbWVdID0ge1xuICAgICAgICBuYW1lOiBibG9ja19uYW1lLFxuICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgIHNpemU6IGdsLmdldEFjdGl2ZVVuaWZvcm1CbG9ja1BhcmFtZXRlcih0aGlzLmlkLCBpZHgsIGdsLlVOSUZPUk1fQkxPQ0tfREFUQV9TSVpFKSxcbiAgICAgICAgYmluZDogZ2wuZ2V0QWN0aXZlVW5pZm9ybUJsb2NrUGFyYW1ldGVyKHRoaXMuaWQsIGlkeCwgZ2wuVU5JRk9STV9CTE9DS19CSU5ESU5HKSxcbiAgICAgIH07XG4gICAgfVxuICAgIFxuICB9XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAvLy8gdGhpcy5faW5pdChuYW1lKTtcbiAgICB0aGlzLnN0YXRpY0luaXQobmFtZSk7XG4gIH1cbiAgYXBwbHkoKSB7XG4gICAgaWYgKHRoaXMuaWQgIT0gbnVsbClcbiAgICAgIGdsLnVzZVByb2dyYW0odGhpcy5pZCk7XG4gIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzaGFkZXIobmFtZSkge1xuICByZXR1cm4gbmV3IF9zaGFkZXIobmFtZSk7XG59IiwiaW1wb3J0IHsgbWF0NCB9IGZyb20gXCIuL21hdDQuanNcIjtcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi92ZWMzLmpzXCI7XG5cbmNsYXNzIF9jYW1lcmEge1xuICBsb2MgPSB2ZWMzKCk7XG4gIGF0ID0gdmVjMygpO1xuICBkaXIgPSB2ZWMzKCk7XG4gIHJpZ2h0ID0gdmVjMygpO1xuICB1cCA9IHZlYzMoKTtcbiAgbWF0clZpZXcgPSBtYXQ0KCk7IFxuICBtYXRyUHJvaiA9IG1hdDQoKTsgXG4gIG1hdHJWUCA9IG1hdDQoKTtcbiAgZnJhbWVXO1xuICBmcmFtZUg7XG4gIHdwO1xuICBocDtcbiAgcHJvalNpemU7XG4gIHByb2pEaXN0O1xuICBwcm9qRmFyQ2xpcDtcblxuICBjYW1TZXQobG9jLCBhdCwgdXApIHtcbiAgICB0aGlzLm1hdHJWaWV3ID0gbWF0NCgpLnZpZXcobG9jLCBhdCwgdXApO1xuXG4gICAgdGhpcy5yaWdodCA9IHZlYzModGhpcy5tYXRyVmlldy5tWzBdWzBdLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsxXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMl1bMF0pO1xuXG4gICAgdGhpcy51cCA9IHZlYzModGhpcy5tYXRyVmlldy5tWzBdWzFdLFxuICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsxXVsxXSxcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMl1bMV0pO1xuICAgICAgICAgICAgICAgICAgXG4gICAgdGhpcy5kaXIgPSB2ZWMzKC10aGlzLm1hdHJWaWV3Lm1bMF1bMl0sXG4gICAgICAgICAgICAgICAgICAgIC10aGlzLm1hdHJWaWV3Lm1bMV1bMl0sXG4gICAgICAgICAgICAgICAgICAgIC10aGlzLm1hdHJWaWV3Lm1bMl1bMl0pO1xuICAgICAgICAgICAgICAgICAgICBcblxuICAgIHRoaXMubG9jID0gdmVjMyhsb2MpO1xuICAgIHRoaXMuYXQgPSB2ZWMzKGF0KTtcbiAgICB0aGlzLm1hdHJWUCA9IHRoaXMubWF0clZpZXcubWF0ck11bE1hdHIodGhpcy5tYXRyUHJvaik7XG4gIH0gLy8gRW5kIG9mICdjYW1TZXQnIGZ1bmN0aW9uXG5cbiAgY2FtU2V0UHJvaihwcm9qU2l6ZSwgcHJvakRpc3QsIHByb2pGYXJDbGlwKSB7XG4gICAgbGV0IHJ4LCByeTtcblxuICAgIHRoaXMucHJvakRpc3QgPSBwcm9qRGlzdDtcbiAgICB0aGlzLnByb2pGYXJDbGlwID0gcHJvakZhckNsaXA7XG4gICAgcnggPSByeSA9IHRoaXMucHJvalNpemUgPSBwcm9qU2l6ZTtcblxuICAgIC8qIENvcnJlY3QgYXNwZWN0IHJhdGlvICovXG4gICAgaWYgKHRoaXMuZnJhbWVXID49IHRoaXMuZnJhbWVIKVxuICAgICAgcnggKj0gdGhpcy5mcmFtZVcgLyB0aGlzLmZyYW1lSDtcbiAgICBlbHNlXG4gICAgICByeSAqPSB0aGlzLmZyYW1lSCAvIHRoaXMuZnJhbWVXO1xuXG4gICAgdGhpcy53cCA9IHJ4O1xuICAgIHRoaXMuaHAgPSByeTtcbiAgICB0aGlzLm1hdHJQcm9qID1cbiAgICAgIG1hdDQoKS5mcnVzdHVtKC1yeCAvIDIsIHJ4IC8gMiwgLXJ5IC8gMiwgcnkgLyAyLFxuICAgICAgICB0aGlzLnByb2pEaXN0LCB0aGlzLnByb2pGYXJDbGlwKTtcbiAgICB0aGlzLm1hdHJWUCA9IHRoaXMubWF0clZpZXcubWF0ck11bE1hdHIodGhpcy5tYXRyUHJvaik7XG4gIH0gLy8gRW5kIG9mICdjYW1TZXRQcm9qJyBmdW5jdGlvblxuICBjYW1TZXRTaXplKGZyYW1lVywgZnJhbWVIKSB7XG4gICAgdGhpcy5mcmFtZVcgPSBmcmFtZVc7XG4gICAgdGhpcy5mcmFtZUggPSBmcmFtZUg7XG4gICAgdGhpcy5zZXRQcm9qKHRoaXMucHJvalNpemUsIHRoaXMucHJvakRpc3QsIHRoaXMucHJvakZhckNsaXApO1xuICB9IC8vIEVuZCBvZiAnY2FtU2V0U2l6ZScgZnVuY3Rpb25cbn0gXG5cbmV4cG9ydCBmdW5jdGlvbiBjYW1lcmEoLi4uYXJncykge1xuICByZXR1cm4gbmV3IF9jYW1lcmEoLi4uYXJncyk7XG59XG5cbiIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vLi4vLi4vbXRoL3ZlYzMuanNcIjtcblxuLy8gb3IgZGlmZmVyZW50IHdheVxuY2xhc3MgX3ZlcnRleCB7XG4gIHBvcyA9IHZlYzMoKTtcbiAgbm9ybSA9IHZlYzMoKTtcblxuICBjb25zdHJ1Y3Rvcih4LCB5LCB6KSB7XG4gICAgaWYgKHR5cGVvZiAoeCkgPT0gXCJvYmplY3RcIikge1xuICAgICAgdGhpcy5wb3MgPSB2ZWMzKHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBvcyA9IHZlYzMoeCwgeSwgeik7XG4gICAgfVxuICAgIFxuICAgIC8vIGlmIChwb3MgPT0gXCJudW1iZXJcIikge1xuICAgIC8vICAgdGhpcy5wb3MgPSB2ZWMzKHBvcywgcG9zLCBwb3MpO1xuICAgIC8vICAgdGhpcy5ub3JtID0gdmVjMyhub3JtLCBub3JtLCBub3JtKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgdGhpcy5wb3MgPSBwb3M7XG4gICAgLy8gICB0aGlzLm5vcm0gPSBub3JtO1xuICAgIC8vIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmVydGV4KC4uLmFyZ3MpIHtcbiAgcmV0dXJuIG5ldyBfdmVydGV4KC4uLmFyZ3MpO1xufSAvLyBFbmQgb2YgJ3ZlcnRleCcgZnVuY3Rpb24gXG5cbmNsYXNzIF9wcmltIHtcbiAgc2hkO1xuICB2ZXJ0QXJyYXk7XG4gIHZlcnRCdWZmZXI7XG4gIGluZEJ1ZmZlcjtcbiAgbnVtT2ZFbGVtZW50cztcblxuICBjb25zdHJ1Y3RvcihzaGQsIHZlcnQsIGluZCkge1xuICAgIGxldCB2ZXJ0ZXhlcyA9IFtdLCBpID0gMDtcblxuICAgIHRoaXMuc2hkID0gc2hkO1xuICAgIGF1dG9Ob3JtYWwodmVydCwgaW5kKTtcblxuICAgIGZvciAobGV0IHYgb2YgdmVydCkge1xuICAgICAgdmVydGV4ZXNbaSsrXSA9IHYucG9zLng7XG4gICAgICB2ZXJ0ZXhlc1tpKytdID0gdi5wb3MueTtcbiAgICAgIHZlcnRleGVzW2krK10gPSB2LnBvcy56O1xuICAgICAgXG4gICAgICB2ZXJ0ZXhlc1tpKytdID0gdi5ub3JtLng7XG4gICAgICB2ZXJ0ZXhlc1tpKytdID0gdi5ub3JtLnk7XG4gICAgICB2ZXJ0ZXhlc1tpKytdID0gdi5ub3JtLno7XG4gICAgfVxuICAgIHRoaXMubnVtT2ZFbGVtID0gdmVydC5sZW5ndGg7XG5cbiAgICBjb25zdCBwb3NMb2MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGQuaWQsIFwiSW5Qb3NpdGlvblwiKTtcbiAgICBjb25zdCBub3JtTG9jID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hkLmlkLCBcIkluTm9ybWFsXCIpO1xuICAgIHRoaXMudmVydEFycmF5ID0gZ2wuY3JlYXRlVmVydGV4QXJyYXkoKTtcbiAgICBnbC5iaW5kVmVydGV4QXJyYXkodGhpcy52ZXJ0QXJyYXkpO1xuICAgIHRoaXMudmVydEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHZlcnRleGVzKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgaWYgKHBvc0xvYyAhPSAtMSkge1xuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihwb3NMb2MsIDMsIGdsLkZMT0FULCBmYWxzZSwgMjQsIDApO1xuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zTG9jKTtcbiAgICB9XG4gICAgaWYgKG5vcm1Mb2MgIT0gLTEpIHtcbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIobm9ybUxvYywgMywgZ2wuRkxPQVQsIGZhbHNlLCAyNCwgMTIpO1xuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobm9ybUxvYyk7XG4gICAgfVxuXG4gICAgaWYgKGluZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMubnVtT2ZFbGVtID0gaW5kLmxlbmd0aDtcbiAgICAgIFxuICAgICAgdGhpcy5pbmRCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuaW5kQnVmZmVyKTtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShpbmQpLCBnbC5TVEFUSUNfRFJBVyk7ICBcbiAgICB9IFxuICB9XG5cbiAgcmVuZGVyKHdvcmxkLCBjYW0pIHtcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgdCA9IGRhdGUuZ2V0TWludXRlcygpICogNjAgK1xuICAgICAgICAgIGRhdGUuZ2V0U2Vjb25kcygpICtcbiAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcblxuICAgIGxldCB3dnAgPSB3b3JsZC5tYXRyTXVsTWF0cihjYW0ubWF0clZQKTtcbiAgICBsZXQgd2ludiA9IHdvcmxkLmludmVyc2UoKS50cmFuc3Bvc2UoKTtcblxuICAgIGlmICh0aGlzLnNoZC51bmlmb3Jtc1snTWF0cldWUCddICE9IHVuZGVmaW5lZClcbiAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5zaGQudW5pZm9ybXNbJ01hdHJXVlAnXS5sb2MsIGZhbHNlLCBuZXcgRmxvYXQzMkFycmF5KHd2cC50b0FycmF5KCkpKTtcbiAgICBpZiAodGhpcy5zaGQudW5pZm9ybXNbJ01hdHJXSW52J10gIT0gdW5kZWZpbmVkKVxuICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnNoZC51bmlmb3Jtc1snTWF0cldJbnYnXS5sb2MsIGZhbHNlLCBuZXcgRmxvYXQzMkFycmF5KHdpbnYudG9BcnJheSgpKSk7XG4gICAgaWYgKHRoaXMuc2hkLnVuaWZvcm1zWydUaW1lJ10gIT0gdW5kZWZpbmVkKVxuICAgICAgZ2wudW5pZm9ybTFmKHRoaXMuc2hkLnVuaWZvcm1zWydUaW1lJ10ubG9jLCB0KTtcbiAgICBcbiAgICBpZiAodGhpcy5zaGQuaWQgIT0gbnVsbCkge1xuICAgICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydEFycmF5KTtcbiAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRCdWZmZXIpO1xuXG4gICAgICBpZiAodGhpcy5pbmRCdWZmZXIgPT0gdW5kZWZpbmVkKVxuICAgICAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgdGhpcy5udW1PZkVsZW0pO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMuaW5kQnVmZmVyKTtcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFUywgdGhpcy5udW1PZkVsZW0sIGdsLlVOU0lHTkVEX0lOVCwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGF1dG9Ob3JtYWwodmVydGV4ZXMsIGluZGV4ZXMpIHtcbiAgaWYgKGluZGV4ZXMgPT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2ZXJ0ZXhlcy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgbGV0IG5vcm0gPSAodmVydGV4ZXNbaSArIDFdLnBvcy5zdWIodmVydGV4ZXNbaV0ucG9zKSkuY3Jvc3ModmVydGV4ZXNbaSArIDJdLnBvcy5zdWIodmVydGV4ZXNbaV0ucG9zKSkubm9ybWFsaXplKCk7XG5cbiAgICAgIHZlcnRleGVzW2ldLm5vcm0gPSB2ZXJ0ZXhlc1tpXS5ub3JtLmFkZChub3JtKTtcbiAgICAgIHZlcnRleGVzW2kgKyAxXS5ub3JtID0gdmVydGV4ZXNbaSArIDFdLm5vcm0uYWRkKG5vcm0pO1xuICAgICAgdmVydGV4ZXNbaSArIDJdLm5vcm0gPSB2ZXJ0ZXhlc1tpICsgMl0ubm9ybS5hZGQobm9ybSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgbGV0XG4gICAgICAgIG4wID0gaW5kZXhlc1tpXSwgbjEgPSBpbmRleGVzW2kgKyAxXSwgbjIgPSBpbmRleGVzW2kgKyAyXTtcbiAgICAgIGxldCBwMCA9IHZlYzMoKSwgcDEgPSB2ZWMzKCksIHAyID0gdmVjMygpLCBub3JtID0gdmVjMygpO1xuXG4gICAgICBwMCA9IHZlcnRleGVzW24wXS5wb3M7XG4gICAgICBwMSA9IHZlcnRleGVzW24xXS5wb3M7XG4gICAgICBwMiA9IHZlcnRleGVzW24yXS5wb3M7XG4gICAgICBcbiAgICAgIG5vcm0gPSBwMS5zdWIocDApLmNyb3NzKHAyLnN1YihwMCkpLm5vcm1hbGl6ZSgpO1xuICBcbiAgICAgIHZlcnRleGVzW24wXS5ub3JtID0gdmVydGV4ZXNbbjBdLm5vcm0uYWRkKG5vcm0pO1xuICAgICAgdmVydGV4ZXNbbjFdLm5vcm0gPSB2ZXJ0ZXhlc1tuMV0ubm9ybS5hZGQobm9ybSk7XG4gICAgICB2ZXJ0ZXhlc1tuMl0ubm9ybSA9IHZlcnRleGVzW24yXS5ub3JtLmFkZChub3JtKTtcbiAgICB9XG4gICAgXG4gICAgZm9yIChsZXQgaSBpbiB2ZXJ0ZXhlcykge1xuICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlcnRleGVzW2ldLm5vcm0ubm9ybWFsaXplKCk7XG4gICAgfVxuICB9XG5cbn0gLy8gRW5kIG9mICdhdXRvTm9ybWFsJyBmdW5jdGlvblxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbSguLi5hcmdzKSB7XG4gIHJldHVybiBuZXcgX3ByaW0oLi4uYXJncyk7XG59IC8vIEVuZCBvZiAncHJpbScgZnVuY3Rpb24iLCJpbXBvcnQgeyB2ZXJ0ZXggfSBmcm9tIFwiLi4vYW5pbS9ybmQvcm5kcHJpbS5qc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEN1YmUoKSB7XHJcbiAgbGV0IGluZCA9IFtcclxuICAgIDAsIDEsIDIsIFxyXG4gICAgMSwgMiwgNCwgXHJcbiAgICAxLCA0LCA3LCBcclxuICAgIDEsIDcsIDUsIFxyXG4gICAgNywgNSwgMywgXHJcbiAgICA3LCAzLCA2LFxyXG4gICAgMCwgMSwgMyxcclxuICAgIDMsIDEsIDUsXHJcbiAgICA2LCAzLCAwLFxyXG4gICAgNiwgMCwgMixcclxuICAgIDIsIDYsIDcsXHJcbiAgICAyLCA3LCA0XHJcbiAgXTsgIFxyXG5cclxuICBsZXQgdmVydCA9IFtcclxuICAgIHZlcnRleCgwKSwgdmVydGV4KDEsIDAsIDApLCB2ZXJ0ZXgoMCwgMSwgMCksIHZlcnRleCgwLCAwLCAxKSwgdmVydGV4KDEsIDEsIDApLCB2ZXJ0ZXgoMSwgMCwgMSksIHZlcnRleCgwLCAxLCAxKSwgdmVydGV4KDEpXHJcbiAgXTtcclxuXHJcbiAgY29uc3QgdmVydHMgPSBbXTtcclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb3MpO1xyXG4gICAgdmVydHMucHVzaCh2cnR4KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB2ZXJ0cztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFRldHJhaGVkcm9uKCkge1xyXG4gIGNvbnN0IHZlcnQgPSBbXHJcbiAgICB2ZXJ0ZXgoMCwgMCwgMSksIHZlcnRleCgxLCAwLCAwKSwgdmVydGV4KDAsIDEsIDApLCB2ZXJ0ZXgoMSlcclxuICBdO1xyXG4gIGNvbnN0IGluZCA9IFtcclxuICAgIDAsIDEsIDIsXHJcbiAgICAwLCAxLCAzLFxyXG4gICAgMCwgMiwgMyxcclxuICAgIDEsIDIsIDNcclxuICBdO1xyXG5cclxuICBjb25zdCB2ZXJ0cyA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpIG9mIGluZCkge1xyXG4gICAgbGV0IHZydHggPSB2ZXJ0ZXgodmVydFtpXS5wb3MpO1xyXG4gICAgdmVydHMucHVzaCh2cnR4KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB2ZXJ0cztcclxufSIsImltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi9tdGgvdmVjMy5qc1wiO1xuaW1wb3J0IHsgbWF0NCB9IGZyb20gXCIuL210aC9tYXQ0LmpzXCI7XG5pbXBvcnQgeyBzaGFkZXIgfSBmcm9tIFwiLi9zcmMvYW5pbS9ybmQvc2hhZGVyX2NsYXNzX3BhdHRlcm4uanNcIjtcbmltcG9ydCB7IGNhbWVyYSB9IGZyb20gXCIuL210aC9jYW0uanNcIjtcbmltcG9ydCB7IHJlbmRlciwgaW5pdEdMIH0gZnJvbSBcIi4vc3JjL2FuaW0vcm5kL3JlbmRlci5qc1wiO1xuaW1wb3J0IHsgc2V0Q3ViZSwgc2V0VGV0cmFoZWRyb24gfSBmcm9tIFwiLi9zcmMvZmlndXJlL2ZpZ3VyZXMuanNcIjtcbmltcG9ydCB7IHByaW0gfSBmcm9tIFwiLi9zcmMvYW5pbS9ybmQvcm5kcHJpbS5qc1wiO1xuaW1wb3J0IHsgdmVydGV4IH0gZnJvbSBcIi4vc3JjL2FuaW0vcm5kL3JuZHByaW0uanNcIjtcblxuZnVuY3Rpb24gbWFpbigpIHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNteUNhblwiKTtcbiAgY29uc3QgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChcIndlYmdsMlwiKTtcblxuICBpZiAoZ2wgPT09IG51bGwpIHtcbiAgICBhbGVydChcIldlYkdMMiBub3Qgc3VwcG9ydGVkXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh3aW5kb3cuZ2wgPT0gdW5kZWZpbmVkKSB7XG4gICAgd2luZG93LmdsID0gZ2w7XG4gIH1cblxuICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG4gIFxuICBnbC5jbGVhckNvbG9yKDAuMzAsIDAuNDcsIDAuOCwgMS4wKTtcbiAgbGV0IHNoZCAgPSBzaGFkZXIoXCJkZWZhdWx0XCIpO1xuXG4gIGNvbnN0IGNhbSA9IGNhbWVyYSgpO1xuICBcbiAgY2FtLmZyYW1lVyA9IGNhbnZhcy5jbGllbnRXaWR0aDtcbiAgY2FtLmZyYW1lSCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gIGNhbS5wcm9qRGlzdCA9IDAuMTtcbiAgY2FtLnByb2pTaXplID0gMC4xO1xuICBjYW0ucHJvakZhckNsaXAgPSAzMDA7XG5cbiAgY2FtLmNhbVNldCh2ZWMzKDAsIDAsIDQpLCB2ZWMzKDApLCB2ZWMzKDAsIDEsIDApKTtcbiAgY2FtLmNhbVNldFByb2ooMC4xLCAwLjEsIDMwMCk7XG4gIFxuICBsZXQgcHJpbXMgPSBwcmltKHNoZCwgc2V0Q3ViZSgpKTtcbiAgbGV0IHByaW1zMCA9IHByaW0oc2hkLCBzZXRUZXRyYWhlZHJvbigpKTtcblxuICBzaGQuYXBwbHkoKTtcblxuICBjb25zdCBhbmltID0gKCkgPT4ge1xuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xuICAgIGdsLmNsZWFyKGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IHQgPSBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwICtcbiAgICAgICAgICBkYXRlLmdldFNlY29uZHMoKSArXG4gICAgICAgICAgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvIDEwMDA7XG5cbiAgICBwcmltczAucmVuZGVyKG1hdDQoKS5yb3RhdGVZKDMwICogdCkubWF0ck11bE1hdHIobWF0NCgpLnJvdGF0ZVgoMzAgKiB0KSksIGNhbSk7XG4gICAgcHJpbXMucmVuZGVyKG1hdDQoKS5yb3RhdGVaKHQgKiA2MCkubWF0ck11bE1hdHIobWF0NCgpLnJvdGF0ZVkoNjAgKiB0KSksIGNhbSk7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW0pO1xuICB9O1xuXG4gIGFuaW0oKTtcbn1cblxuY29uc29sZS5sb2coXCJDR1NHIGZvcmV2ZXIhISFcIik7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XG4gIG1haW4oKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztFQUFBLE1BQU0sS0FBSyxDQUFDO0VBQ1osRUFBRSxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2pFLFNBQVMsSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRO0VBQ2pDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0UsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsU0FBUyxJQUFJLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxJQUFJLFNBQVM7RUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDL0MsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDbEQsR0FBRztBQUNIO0VBQ0EsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ1QsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVEsRUFBRTtFQUM5QixNQUFNLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDdEQsS0FBSztFQUNMLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxRCxHQUFHO0FBQ0g7RUFDQSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUU7RUFDVCxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFO0VBQzlCLE1BQU0sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN0RCxLQUFLO0VBQ0wsSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFELEdBQUc7QUFDSDtFQUNBLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtFQUNULElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDOUIsTUFBTSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3RELEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEQsR0FBRztBQUNIO0VBQ0EsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFO0VBQ1osSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3BELEdBQUc7QUFDSDtFQUNBLEVBQUUsR0FBRyxHQUFHO0VBQ1IsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN6QyxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdCO0VBQ0EsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtFQUM5QixNQUFNLE9BQU8sR0FBRyxDQUFDO0VBQ2pCLEtBQUs7RUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUMxQixHQUFHO0FBQ0g7RUFDQSxFQUFFLElBQUksR0FBRztFQUNULElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekM7RUFDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDMUIsR0FBRztBQUNIO0VBQ0EsRUFBRSxHQUFHLEdBQUc7RUFDUixJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDM0MsR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLEdBQUc7RUFDZCxJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0I7RUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztFQUM1QixNQUFNLE9BQU8sSUFBSSxDQUFDO0VBQ2xCO0VBQ0EsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN6QixJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM1QixHQUFHO0FBQ0g7RUFDQSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUU7RUFDZixJQUFJLE9BQU8sSUFBSTtFQUNmLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xFLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xFLE1BQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FB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QU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUUsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RSxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlFLEtBQUssQ0FBQztFQUNOLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDTyxTQUFTLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRTtFQUM5QixFQUFFLE9BQU8sSUFBSSxLQUFLLENBQUMsR0FB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Q3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixTQUFTO0VBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ25CLFFBQVEsSUFBSSxDQUFDLFNBQVM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsU0FBUztFQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuQixRQUFRLElBQUksQ0FBQyxTQUFTO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFNBQVM7RUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkIsUUFBUSxJQUFJLENBQUMsU0FBUztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0QixTQUFTO0VBQ1QsTUFBTTtFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsYUFBYSxDQUFDLENBQUMsRUFBRTtFQUNuQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2QixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN2QixJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNsQixHQUFHO0FBQ0g7RUFDQSxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUU7RUFDbEIsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztBQUNuQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQztFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEM7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEM7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQztFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEM7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEM7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQztBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQztFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakcsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEM7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hDO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQztFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sR0FBRztFQUNaLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDNUI7RUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMzQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztFQUNyQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2Q7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO0VBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDZDtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7RUFDckIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQixRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEIsT0FBTyxHQUFHLEdBQUcsQ0FBQztBQUNkO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUU7RUFDbkIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLEdBQUc7RUFDbkMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDckIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QjtFQUNBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTztFQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ25DLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDbkMsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM3QixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0VBQ25DLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7RUFDbkMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztFQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM3QixNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxLQUFLLENBQUM7RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtFQUNyQixJQUFJO0VBQ0osTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUU7RUFDbkMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUU7RUFDeEMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztFQUN4QyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ25CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNQLE1BQU07RUFDTixRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN4RCxPQUFPLENBQUM7QUFDUjtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUM1QixJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU87RUFDdkIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN2QixNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUM7RUFDUCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3ZCLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDdkIsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUN2QixNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMxQixNQUFNLENBQUMsQ0FBQztFQUNSLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUM5QixNQUFNLENBQUM7RUFDUCxLQUFLLENBQUM7RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLFNBQVMsR0FBRztFQUNkLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTztFQUN2QixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEIsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsQixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xCLEtBQUssQ0FBQztFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRTtFQUNqQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLElBQUksR0FBRztFQUNuQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN0QixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCO0VBQ0EsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUM3RSxHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUU7RUFDakIsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLEdBQUc7RUFDbkMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDdEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QjtFQUNBLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDN0UsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFO0VBQ2pCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxHQUFHO0VBQ25DLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3RCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkI7RUFDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzdFLEdBQUc7QUFDSDtFQUNBLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtFQUNYLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzlFLEdBQUc7QUFDSDtFQUNBLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQzFCLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTztFQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pCLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQztFQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakIsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDO0VBQ1AsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sQ0FBQztFQUNQLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFD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QUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDN0M7RUFDQSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzQyxzQkFBc0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNDLHNCQUFzQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdDO0VBQ0EsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEMsbUJBQW1CLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4QyxtQkFBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMxQztFQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUM7QUFDQTtFQUNBLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7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Q0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDcEcsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFNBQVM7RUFDbEQsTUFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3RHLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTO0VBQzlDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDckQ7RUFDQSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksSUFBSSxFQUFFO0VBQzdCLE1BQU0sRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7RUFDekMsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3REO0VBQ0EsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUztFQUNyQyxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBQ3ZELFdBQVc7RUFDWCxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztFQUMvRCxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDMUUsT0FBTztFQUNQLEtBQUs7RUFDTCxHQUFHO0VBQ0gsQ0FBQztBQUNEO0VBQ0EsU0FBUyxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRTtFQUN2QyxFQUFFLElBQUksT0FBTyxJQUFJLFNBQVMsRUFBRTtFQUM1QixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDakQsTUFBTSxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUN4SDtFQUNBLE1BQU0sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNwRCxNQUFNLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUM1RCxNQUFNLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FB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
