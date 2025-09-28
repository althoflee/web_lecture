import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export default async function main() {

    console.log(THREE.REVISION);

    // 1. 3D 창으로 사용할 컨테이너와 크기 가져오기
    const container = document.querySelector('#main3DWindow');
    const width = 640;
    const height = 480;

    // 2. 기본 3요소: 씬/카메라/렌더러
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x202225);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animate);
    container.appendChild(renderer.domElement);

    // 3. 학습용 오브젝트: 와이어프레임 큐브 + 그리드 + 축
    const cube = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
    );
    cube.position.set(0, 0.5, 0);
    scene.add(cube);

    const gridHelper = new THREE.GridHelper(200, 200, 0xff0000, 0x00ff00);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(2);
    scene.add(axesHelper);

    

    // 5. FPS 카메라: PointerLockControls
    const controls = new PointerLockControls(camera, renderer.domElement);
    scene.add(controls.object);

    // 클릭 시 포인터락 진입
    renderer.domElement.addEventListener('click', () => {
        if (!document.pointerLockElement) controls.lock();
    });

    // 6. 이동 상태/물리 파라미터
    const move = { f: false, b: false, l: false, r: false, u: false, d: false };
    let canJump = false;

    const velocity = new THREE.Vector3();   // 현재 속도
    const SPEED = 5.0;                     // 기본 이동 속도(초당 5미터)

    // 7. 키보드 입력
    function onKey(e, down) {
        switch (e.code) {
            case 'KeyW':
            case 'ArrowUp': move.f = down; break;
            case 'KeyS':
            case 'ArrowDown': move.b = down; break;
            case 'KeyA':
            case 'ArrowLeft': move.l = down; break;
            case 'KeyD':
            case 'ArrowRight': move.r = down; break;
            case 'KeyQ': move.d = down; break;
            case 'KeyE': move.u = down; break;

        }
    }
    document.addEventListener('keydown', (e) => onKey(e, true));
    document.addEventListener('keyup', (e) => onKey(e, false));

    // 8. 카메라 초기 시선
    camera.lookAt(0, 0.5, 0);

    // 9. 시간 관리
    const clock = new THREE.Clock();

    // 10. 애니메이션 루프
    function animate() {
        const delta = clock.getDelta();

        // 데모 큐브 회전(기존 유지)
        cube.rotation.x += THREE.MathUtils.degToRad(90) * delta;
        cube.rotation.y += THREE.MathUtils.degToRad(90) * delta;

        if (controls.isLocked) {
            // 입력 부호
            const forwardSign = (move.f ? 1 : 0) - (move.b ? 1 : 0); // W: +1, S: -1
            const strafeSign = (move.r ? 1 : 0) - (move.l ? 1 : 0); // D: +1, A: -1
            const step = SPEED * delta;

            // 카메라 "정면(피치 포함)"과 "우측" 벡터
            const dir = new THREE.Vector3();
            camera.getWorldDirection(dir).normalize(); // 바라보는 방향

            const right = new THREE.Vector3().crossVectors(dir, camera.up).normalize();

            const obj = controls.object;

            // ✅ 정면/후진: 정확히 시선 방향으로 정속 이동
            if (forwardSign !== 0) obj.position.addScaledVector(dir, forwardSign * step);

            // ✅ 좌/우 스트레이프: 시선에 수직인 우측 벡터로 정속 이동
            if (strafeSign !== 0) obj.position.addScaledVector(right, strafeSign * step);

            // 수직 이동
            if (move.u) obj.position.y += step;
            if (move.d) obj.position.y -= step;
        }

        renderer.render(scene, camera);
    }
}
