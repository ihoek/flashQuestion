import { LoadAssetContainerAsync, Vector3 } from "@babylonjs/core";
import wallModelUrl from "../../assets/models/glb/wall.glb?url";
import floorModelUrl from "../../assets/models/glb/floorFull.glb?url";

// 전역 변수
const ROOM_SIZE = 10;

export class Room {
  constructor(scene) {
    this.scene = scene;
    this.createLayout();
  }

  createLayout() {
    // 바닥
    this.loadFloor(new Vector3(0, 0, 0));

    // 뒤쪽 벽
    this.loadWall(new Vector3(-ROOM_SIZE, 0, 0), new Vector3(0, 0, 0));

    // 앞쪽 벽
    this.loadWall(
      new Vector3(-ROOM_SIZE, 0, ROOM_SIZE),
      new Vector3(0, Math.PI / 2, 0),
    );

    // 오른쪽 벽
    this.loadWall(new Vector3(0, 0, 0), new Vector3(0, -Math.PI / 2, 0));
    // 뒤쪽 벽
    this.loadWall(new Vector3(0, 0, ROOM_SIZE), new Vector3(0, Math.PI, 0));
  }

  async loadFloor(position) {
    const container = await LoadAssetContainerAsync(floorModelUrl, this.scene);
    container.addAllToScene();

    const root = container.meshes[0];
    root.position = position;

    // 방 크기에 맞춰 스케일 조정이 필요할 수 있음
    root.scaling = new Vector3(ROOM_SIZE, 1, ROOM_SIZE);

    container.meshes.forEach((mesh) => {
      mesh.checkCollisions = false; // 바닥은 충돌 처리 안함
      mesh.receiveShadows = true; // 그림자 받기
    });
  }

  async loadWall(position, rotation) {
    const container = await LoadAssetContainerAsync(wallModelUrl, this.scene);
    container.addAllToScene();

    const root = container.meshes[0];
    root.position = position;
    root.rotation = rotation;

    // 방 크기에 맞춰 스케일 조정이 필요할 수 있음
    root.scaling = new Vector3(10, 3, 1);

    container.meshes.forEach((mesh) => {
      mesh.checkCollisions = false;
      mesh.receiveShadows = true;
    });
  }
}
