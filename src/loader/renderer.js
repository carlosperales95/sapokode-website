import { WebGLRenderer } from "three";


function createRenderer(width, height) {
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(width, height, false);

    // Turn on the physically correct lighting model.
    renderer.physicallyCorrectLights = true;

    return renderer;
}

export { createRenderer };
