/*
이주석은 수정하지 마시오
author: gbox3d
date : 2025-9-3
file name : wonreal3d.js
*/

import * as THREE from 'three';

// Component의 기본 형태
class Component {
    constructor(actor) {
        this.actor = actor;
    }
    update(delta) {
        // 하위 클래스에서 이 메서드를 오버라이드하여 사용
    }
}

// Actor의 기본 형태
class Actor {
    constructor(scene) {
        this.components = [];
        this.rootObject = new THREE.Group();
        scene.add(this.rootObject);
    }

    // 컴포넌트를 액터에 추가하는 메서드
    addComponent(component) {
        this.components.push(component);
        component.actor = this;

        // ✅ 이 부분이 핵심적인 수정 사항입니다.
        // 컴포넌트에 _onAdded 라는 이름의 함수가 정의되어 있다면 호출해 줍니다.
        // 이를 통해 MeshComponent가 자신의 메쉬를 Actor에 추가할 수 있습니다.
        if (typeof component._onAdded === 'function') {
            component._onAdded();
        }
    }

    // 매 프레임마다 모든 컴포넌트의 update를 호출하는 메서드
    update(delta) {
        for (const component of this.components) {
            component.update(delta);
        }
    }
}

// 1. 외형을 담당할 MeshComponent
class MeshComponent extends Component {
    constructor(geometry, material) {
        super();
        this.mesh = new THREE.Mesh(geometry, material);
    }
    
    // 이 메서드가 addComponent에 의해 호출되면서 메쉬가 씬에 추가됩니다.
    _onAdded() {
        this.actor.rootObject.add(this.mesh);
    }
}

// 2. 회전을 담당할 RotatorComponent
class RotatorComponent extends Component {
    constructor() {
        super();
    }
    update(delta) {
        this.actor.rootObject.rotation.x += THREE.MathUtils.degToRad(90) * delta;
        this.actor.rootObject.rotation.y += THREE.MathUtils.degToRad(90) * delta;
    }
}

export { Actor, Component, MeshComponent, RotatorComponent };