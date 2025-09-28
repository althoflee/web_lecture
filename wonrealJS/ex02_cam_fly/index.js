import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js';


export default async function main() {

    console.log(THREE.REVISION);

    // 1. 3D 창으로 사용할 컨테이너와 크기 가져오기
    const container = document.querySelector('#main3DWindow');
    const width = 640;
    const height = 480;
        
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

    camera.position.y = 2.5;
    camera.position.z = 5;

    camera.lookAt(0,0,0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    renderer.setAnimationLoop( animate );
    container.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 ,wireframe: true} );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    // grid helper
    const gridHelper = new THREE.GridHelper(100, 100, 0xff0000, 0x00ff00);
    scene.add(gridHelper);

    const clock = new THREE.Clock();

    // fly controls
    const controls = new FlyControls(camera, renderer.domElement);
    controls.movementSpeed = 10;
    controls.rollSpeed = Math.PI / 24;
    controls.autoForward = false;
    controls.dragToLook = true;

    function animate() {

        const delta = clock.getDelta();

        cube.rotation.x += (THREE.MathUtils.degToRad(90)) * delta;
        cube.rotation.y += (THREE.MathUtils.degToRad(90)) * delta;

        controls.update(delta);

        renderer.render( scene, camera );

    }
}