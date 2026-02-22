// src/game/entities/Room.js
import { MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";

export class Room {
  constructor(scene) {
    this.scene = scene;
    this.createLayout();
  }

  createLayout() {
    // 1. 바닥
    const floor = MeshBuilder.CreateBox(
      "floor",
      { width: 10, height: 0.2, depth: 10 },
      this.scene,
    );
    floor.position.y = -0.1;

    const floorMat = new StandardMaterial("floorMat", this.scene);
    floorMat.diffuseColor = new Color3(0.5, 0.5, 0.5); // 회색 바닥
    floor.material = floorMat;
    floor.receiveShadows = true;

    // 2. 벽 (예시로 뒤쪽 벽 하나만)
    const backWall = MeshBuilder.CreateBox(
      "backWall",
      { width: 10, height: 4, depth: 0.2 },
      this.scene,
    );
    backWall.position.z = 5;
    backWall.position.y = 2;

    const wallMat = new StandardMaterial("wallMat", this.scene);
    wallMat.diffuseColor = new Color3(0.9, 0.9, 0.9); // 연한 흰색 벽
    backWall.material = wallMat;

    // 3. 천장
    const ceiling = MeshBuilder.CreateBox(
      "ceiling",
      { width: 10, height: 0.2, depth: 10 },
      this.scene,
    );
    ceiling.position.y = 4;
    ceiling.material = wallMat;
    ceiling.receiveShadows = true;

    // 왼쪽 벽
    const leftWall = MeshBuilder.CreateBox(
      "leftWall",
      { width: 0.2, height: 4, depth: 10 },
      this.scene,
    );
    leftWall.position.x = -5;
    leftWall.position.y = 2;
    leftWall.material = wallMat;
    leftWall.receiveShadows = true;
    leftWall.checkCollisions = true;

    // 오른쪽 벽
    const rightWall = MeshBuilder.CreateBox(
      "rightWall",
      { width: 0.2, height: 4, depth: 10 },
      this.scene,
    );
    rightWall.position.x = 5;
    rightWall.position.y = 2;
    rightWall.material = wallMat;
    rightWall.receiveShadows = true;
    rightWall.checkCollisions = true;

    // 앞쪽 벽
    const frontWall = MeshBuilder.CreateBox(
      "frontWall",
      { width: 10, height: 4, depth: 0.2 },
      this.scene,
    );
    frontWall.position.z = -5;
    frontWall.position.y = 2;
    frontWall.material = wallMat;
    frontWall.receiveShadows = true;
    frontWall.checkCollisions = true;

    // 충돌 설정
    floor.checkCollisions = true;
    backWall.checkCollisions = true;
    ceiling.checkCollisions = true;
    leftWall.checkCollisions = true;
    rightWall.checkCollisions = true;
    frontWall.checkCollisions = true;
  }
}
