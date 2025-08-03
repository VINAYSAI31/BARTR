import React, { useEffect, useRef } from 'react';

const GhostCursor = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    tX: 0,
    tY: 0,
    moving: false,
    controlsPadding: 0
  });
  
  const params = {
    size: 0.065,
    tail: {
      dotsNumber: 25,
      spring: 1.4,
      friction: 0.3,
      gravity: 0
    },
    smile: 1,
    mainColor: [0.98, 0.96, 0.96],
    borderColor: [0.2, 0.5, 0.7],
    isFlatColor: false
  };

  useEffect(() => {
    const canvasContainer = document.createElement('div');
    canvasContainer.style.position = 'fixed';
    canvasContainer.style.top = '0';
    canvasContainer.style.left = '0';
    canvasContainer.style.width = '100%';
    canvasContainer.style.height = '100%';
    canvasContainer.style.zIndex = '2147483647'; // Maximum z-index value
    canvasContainer.style.pointerEvents = 'none';
    document.body.appendChild(canvasContainer);

    const canvas = canvasRef.current;
    canvasContainer.appendChild(canvas);

    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    const mouseThreshold = 0.1;
    

    // Create texture canvas
    const textureEl = document.createElement('canvas');
    const textureCtx = textureEl.getContext('2d');

    // Initialize pointer trail
    const dotSize = (i) => params.size * window.innerHeight * (1 - 0.2 * Math.pow(3 * i / params.tail.dotsNumber - 1, 2));
    const pointerTrail = new Array(params.tail.dotsNumber).fill(null).map((_, i) => ({
      x: mouseRef.current.x,
      y: mouseRef.current.y,
      vx: 0,
      vy: 0,
      opacity: 0.04 + 0.3 * Math.pow(1 - i / params.tail.dotsNumber, 4),
      bordered: 0.6 * Math.pow(1 - i / params.tail.dotsNumber, 1),
      r: dotSize(i)
    }));

    // Shader source code
    const vertexShader = `
      precision mediump float;
      varying vec2 vUv;
      attribute vec2 a_position;
      
      void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform float u_size;
      uniform vec2 u_pointer;
      uniform float u_smile;
      uniform vec2 u_target_pointer;
      uniform vec3 u_main_color;
      uniform vec3 u_border_color;
      uniform float u_flat_color;
      uniform sampler2D u_texture;

      #define TWO_PI 6.28318530718
      #define PI 3.14159265358979323846

      vec2 rotate(vec2 v, float angle) {
        float r_sin = sin(angle);
        float r_cos = cos(angle);
        return vec2(v.x * r_cos - v.y * r_sin, v.x * r_sin + v.y * r_cos);
      }

      float eyes(vec2 uv) {
        uv.y -= .5;
        uv.x *= 1.;
        uv.y *= .8;
        uv.x = abs(uv.x);
        uv.y += u_smile * .3 * pow(uv.x, 1.3);
        uv.x -= (.6 + .2 * u_smile);
        float d = clamp(length(uv), 0., 1.);
        return 1. - pow(d, .08);
      }

      float mouth(vec2 uv) {
        uv.y += 1.5;
        uv.x *= (.5 + .5 * abs(1. - u_smile));
        uv.y *= (3. - 2. * abs(1. - u_smile));
        uv.y -= u_smile * 4. * pow(uv.x, 2.);
        float d = clamp(length(uv), 0., 1.);
        return 1. - pow(d, .07);
      }

      float face(vec2 uv, float rotation) {
        uv = rotate(uv, rotation);
        uv /= (.27 * u_size);
        float eyes_shape = 10. * eyes(uv);
        float mouth_shape = 20. * mouth(uv);
        float col = 0.;
        col = mix(col, 1., eyes_shape);
        col = mix(col, 1., mouth_shape);
        return col;
      }

      void main() {
        vec2 point = u_pointer;
        point.x *= u_ratio;
        vec2 uv = vUv;
        uv.x *= u_ratio;
        uv -= point;
        float texture = texture2D(u_texture, vec2(vUv.x, 1. - vUv.y)).r;
        float shape = texture;
        float face = face(uv, 5. * (u_target_pointer.x - u_pointer.x));
        shape -= face;
        vec3 border = (1. - u_border_color);
        border.g += .2 * sin(.005 * u_time);
        border *= .5;
        vec3 color = u_main_color;
        color -= (1. - u_flat_color) * border * smoothstep(.0, .01, shape);
        shape = u_flat_color * smoothstep(.8, 1., shape) + (1. - u_flat_color) * shape;
        color *= shape;
        gl_FragColor = vec4(color, shape);
      }
    `;

    // Initialize WebGL
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Create shader program
    const program = gl.createProgram();
    const vShader = gl.createShader(gl.VERTEX_SHADER);
    const fShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vShader, vertexShader);
    gl.shaderSource(fShader, fragmentShader);
    gl.compileShader(vShader);
    gl.compileShader(fShader);
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Create buffers and attributes
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const uniforms = {
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_ratio: gl.getUniformLocation(program, 'u_ratio'),
      u_size: gl.getUniformLocation(program, 'u_size'),
      u_pointer: gl.getUniformLocation(program, 'u_pointer'),
      u_smile: gl.getUniformLocation(program, 'u_smile'),
      u_target_pointer: gl.getUniformLocation(program, 'u_target_pointer'),
      u_main_color: gl.getUniformLocation(program, 'u_main_color'),
      u_border_color: gl.getUniformLocation(program, 'u_border_color'),
      u_flat_color: gl.getUniformLocation(program, 'u_flat_color'),
      u_texture: gl.getUniformLocation(program, 'u_texture')
    };

    // Set initial uniform values
    gl.uniform1f(uniforms.u_size, params.size);
    gl.uniform3f(uniforms.u_main_color, ...params.mainColor);
    gl.uniform3f(uniforms.u_border_color, ...params.borderColor);
    gl.uniform1f(uniforms.u_flat_color, params.isFlatColor ? 1 : 0);

    // Create texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Update texture function
    const updateTexture = () => {
      textureCtx.fillStyle = 'black';
      textureCtx.fillRect(0, 0, textureEl.width, textureEl.height);

      pointerTrail.forEach((p, pIdx) => {
        if (pIdx === 0) {
          p.x = mouseRef.current.x;
          p.y = mouseRef.current.y;
        } else {
          p.vx += (pointerTrail[pIdx - 1].x - p.x) * params.tail.spring;
          p.vx *= params.tail.friction;
          p.vy += (pointerTrail[pIdx - 1].y - p.y) * params.tail.spring;
          p.vy *= params.tail.friction;
          p.vy += params.tail.gravity;
          p.x += p.vx;
          p.y += p.vy;
        }

        const grd = textureCtx.createRadialGradient(p.x, p.y, p.r * p.bordered, p.x, p.y, p.r);
        grd.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
        grd.addColorStop(1, 'rgba(255, 255, 255, 0)');

        textureCtx.beginPath();
        textureCtx.fillStyle = grd;
        textureCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        textureCtx.fill();
      });

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureEl);
    };

    // Resize function
    const handleResize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      textureEl.width = window.innerWidth;
      textureEl.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uniforms.u_ratio, canvas.width / canvas.height);
      
      pointerTrail.forEach((p, i) => {
        p.r = dotSize(i);
      });
    };

    // Animation loop
    let movingTimer;
    const render = () => {
      const currentTime = performance.now();
      gl.uniform1f(uniforms.u_time, currentTime);

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      if (mouseRef.current.moving) {
        params.smile = Math.max(params.smile - 0.05, -0.1);
        params.tail.gravity = Math.max(params.tail.gravity - 10 * params.size, 0);
      } else {
        params.smile = Math.min(params.smile + 0.01, 1);
        if (params.tail.gravity > 25 * params.size) {
          params.tail.gravity = (25 + 5 * (1 + Math.sin(0.002 * currentTime))) * params.size;
        } else {
          params.tail.gravity += params.size;
        }
      }

      mouseRef.current.x += (mouseRef.current.tX - mouseRef.current.x) * mouseThreshold;
      mouseRef.current.y += (mouseRef.current.tY - mouseRef.current.y) * mouseThreshold;

      gl.uniform1f(uniforms.u_smile, params.smile);
      gl.uniform2f(
        uniforms.u_pointer,
        mouseRef.current.x / window.innerWidth,
        1 - mouseRef.current.y / window.innerHeight
      );
      gl.uniform2f(
        uniforms.u_target_pointer,
        mouseRef.current.tX / window.innerWidth,
        1 - mouseRef.current.tY / window.innerHeight
      );

      updateTexture();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(render);
    };

    // Event handlers
    const handleMouseMove = (e) => {
      mouseRef.current.moving = true;
      clearTimeout(movingTimer);
      movingTimer = setTimeout(() => {
        mouseRef.current.moving = false;
      }, 300);

      mouseRef.current.tX = e.clientX;
      const size = params.size * window.innerHeight;
      let targetY = e.clientY - 0.6 * size;
      mouseRef.current.tY = targetY > size ? targetY : size;
      mouseRef.current.tY -= mouseRef.current.controlsPadding;
    };

    // Initialize
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    render();

    // Cleanup
    return () => {
      if (canvasContainer && canvasContainer.parentNode) {
        canvasContainer.parentNode.removeChild(canvasContainer);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full fixed top-0 left-0 pointer-events-none"
      style={{ opacity: 2 }}
    />
  );
};

export default GhostCursor;