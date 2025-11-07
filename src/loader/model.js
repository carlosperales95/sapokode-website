import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function createLoader() {
    const loader = new GLTFLoader();
    
    let model = loader.load(
        'Mech.glb',
        function ( gltf ) {
            return gltf.scene;
        }, undefined, function ( error ) {
            console.error( error );
        });

    model.position.set(0, 0, 0);
    model.rotation.x -= Math.PI * 0.35;
    
    let frame = 0;
    model.tick = (delta) => {
        model.rotation.x -= Math.PI * 0.1;
    };
    
    return model;
}