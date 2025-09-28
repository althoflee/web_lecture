import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default async function main() {

    console.log(THREE.REVISION);

    // 1. 3D 창으로 사용할 컨테이너와 크기 가져오기
    const container = document.querySelector('#main3DWindow');
    const width = 640;
    const height = 480;
        
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

    camera.position.set( 0, 2, 5 );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    renderer.setAnimationLoop( animate );
    container.appendChild( renderer.domElement );

    // OrbitControls 설정
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 부드러운 움직임
    controls.dampingFactor = 0.05;

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 ,wireframe: true} );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    // grid helper
    const gridHelper = new THREE.GridHelper(100, 100, 0xff0000, 0x00ff00);
    scene.add(gridHelper);

    const clock = new THREE.Clock();

    function animate() {

        const delta = clock.getDelta();

        cube.rotation.x += (THREE.MathUtils.degToRad(90)) * delta;
        cube.rotation.y += (THREE.MathUtils.degToRad(90)) * delta;

        renderer.render( scene, camera );

    }
}