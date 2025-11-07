import {
    SpotLight,
    SpotLightHelper
} from "three";

function createLights(color) {
    // const light = new DirectionalLight(color, Math.PI * 2);
    // const lightHelper = new DirectionalLightHelper(light, 0);
    const light = new SpotLight(color, Math.PI * 30);
    const lightHelper = new SpotLightHelper(light);
    // spotLight.position.set(0, 0, 0)
    light.position.set(-2, 0, 4);
    light.tick = (delta) => {};
    // spotLight.tick = (delta) => {};
    
    return { light, lightHelper };
}

export { createLights };
