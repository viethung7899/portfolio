precision mediump float;

varying vec2 uv;
uniform float iterations;
uniform int displayMode;

const float MAX_ITERATION = 512.;

vec3 binary(in vec2 z, in float iter) {
  if (iter < iterations) return vec3(0.0);
  else return vec3(1.0);
}

vec3 grayscale(in vec2 z, in float iter) {
  return vec3(sqrt(iter / iterations));
}

vec3 hallow(in vec2 z, in float iter) {
  if (iter < iterations - 1.) return vec3(sqrt(iter / iterations));
  else return vec3(0.0);
}

vec3 smooth(in vec2 z, in float iter) {
  if (iter < iterations - 1.) {
    float v = log(iter + 1.5 - log(log2(length(z)))) / 3.4;
    if (v < 1.)
      return vec3(pow(v, 4.), pow(v, 2.5), v);
    v = max(1.0, 2.0 - v);
    return vec3(v, pow(v, 1.5), pow(v, 3.0));
  }
  return vec3(0.0);
}

void main() {
  vec2 z = vec2(0.0);
  float iter = 0.0;
  for (float i = 0.0; i < MAX_ITERATION; i++) {
    iter = i;
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + uv;
    if (length(z) > 2.0 || iter > iterations) {
      break;
    }
  }
  vec3 color;
  if (displayMode == 0) {
    color = binary(z, iter);
  } else if (displayMode == 1) {
    color = grayscale(z, iter);
  } else if (displayMode == 2) {
    color = hallow(z, iter);
  } else {
    color = smooth(z, iter);
  }
  gl_FragColor = vec4(color, 1.);
}