import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createCamera } from "./camera.js";
import { createLights } from "./lights.js";
import { Loop } from "./loop.js";
import { createRenderer } from "./renderer.js";
import { Resizer } from "./resizer.js";
import { createScene } from "./scene.js";

// These variables are module-scoped: we cannot access them
// from outside the module.
let camera;
let renderer;
let scene;
let loop;
let model;

class World {
  constructor(container) {
    // Instances of camera, scene, and renderer
    camera = createCamera();
    scene = createScene("black");
    renderer = createRenderer(container.offsetWidth, container.offsetHeight);
    // Initialize Loop
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    // Light Instance, with optional light helper
    const { light, lightHelper } = createLights("azure");
    loop.updatables.push(light);
    scene.add(light);
    
    const loader = new GLTFLoader();
    loader.load( 'Mech.glb', function ( gltf ) {
      model = gltf.scene;
      model.scale.set(1.1, 1.1, 1.1)
      model.position.set(0, 0, 0);
      model.rotation.y -= Math.PI * 0.35;
      model.tick = (delta) => {model.rotation.y += Math.PI * 0.001;};
      loop.updatables.push(model);
      scene.add( gltf.scene );
    }, undefined, function ( error ) {
      console.error( error );
    });
    // console.log(lo);
    // loop.updatables.push(model);
    
    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = () => {
      this.render();
    };
  }
  
  render() {
    // Draw a single frame
    renderer.render(scene, camera);
  }
  // Animation handlers
  start() {
    loop.start();
  }
  stop() {
    loop.stop();
  }
}

export { World };
