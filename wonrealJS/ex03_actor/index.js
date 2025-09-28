import * as THREE from 'three';
// ✅ wonreal3d.js 파일에서 Actor와 Component 클래스들을 가져옵니다.
import { Actor, MeshComponent, RotatorComponent } from '../libs/wonreal.js';

export default async function main() {

    console.log(THREE.REVISION);

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

    // grid helper
    const gridHelper = new THREE.GridHelper(100, 100, 0xff0000, 0x00ff00);
    scene.add(gridHelper);

    // ✅ 씬에 있는 모든 액터를 관리할 배열을 만듭니다.
    const actors = [];

    // --- 액터와 컴포넌트를 사용하여 큐브 생성 ---
    // 1. 빈 액터를 씬에 생성합니다.
    const cubeActor = new Actor(scene);

    // 2. 액터에 부착할 컴포넌트에 필요한 재료(geometry, material)를 준비합니다.
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 ,wireframe: true} );
    
    // 3. 준비된 재료로 컴포넌트를 만들어 액터에 부착합니다.
    cubeActor.addComponent(new MeshComponent(geometry, material)); // 외형 담당
    cubeActor.addComponent(new RotatorComponent());             // 회전 담당

    // 4. 관리 배열에 생성된 액터를 추가합니다.
    actors.push(cubeActor);
    // --- 생성 끝 ---

    const clock = new THREE.Clock();

    function animate() {
        const delta = clock.getDelta();

        // ✅ 관리 배열에 있는 모든 액터의 update 함수를 호출합니다.
        // 이 한 줄이 모든 액터에 연결된 모든 컴포넌트(회전, 이동 등)를 동작시킵니다.
        for (const actor of actors) {
            actor.update(delta);
        }

        renderer.render( scene, camera );
    }
}