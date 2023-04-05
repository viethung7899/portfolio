attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
varying vec2 vTextureCoord;
varying vec2 uv;

uniform vec4 inputSize;
uniform vec4 outputFrame;

uniform vec2 translate;
uniform float zoom;

vec4 filterVertexPosition(void)
{
  vec2 position=aVertexPosition*max(outputFrame.zw,vec2(0.))+outputFrame.xy;
  
  return vec4((projectionMatrix*vec3(position,1.)).xy,0.,1.);
}

vec2 filterTextureCoord(void)
{
  return aVertexPosition*(outputFrame.zw*inputSize.zw);
}

vec2 transform(in vec2 normalized) {
  vec2 p = normalized - vec2(0.5, 0.5);
  
  float ratio = inputSize.x / inputSize.y;
  if (ratio > 1.) {
    p.x *= ratio;
  } else {
    p.y /= ratio;
  }
  p.y = -p.y;
  p *= 3.;
  return p;
}

void main(void)
{
  gl_Position=filterVertexPosition();
  vTextureCoord=filterTextureCoord();
  uv = transform(vTextureCoord);
}