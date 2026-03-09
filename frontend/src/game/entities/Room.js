import { MeshBuilder, PBRMaterial, Color3, Vector3, SceneLoader } from "@babylonjs/core";

const ROOM_WIDTH = 10;
const ROOM_DEPTH = 10;
const WALL_HEIGHT = 4;
const FLOOR_HEIGHT = 0.1;
const WALL_THICKNESS = 0.2;

export class Room {
  constructor(scene) {
    this.scene = scene;
    this.createLayout();
  }

  createLayout() {
    // 1. 벽 재질 (이미지의 부드러운 베이지-그레이)
    const wallMat = new PBRMaterial("wallMat", this.scene);
    wallMat.albedoColor = Color3.FromHexString("#E5E0D8");
    wallMat.roughness = 0.7; // 너무 매트하지 않게 조절
    wallMat.metallic = 0;

    // 2. 바닥 재질 (따뜻한 우드톤)
    const floorMat = new PBRMaterial("floorMat", this.scene);
    floorMat.albedoColor = Color3.FromHexString("#9A8473"); // 채도를 살짝 낮춘 우드
    floorMat.roughness = 0.6;
    floorMat.metallic = 0;

    // 3. 메쉬 생성 (Plane 대신 Box 권장 - 두께감이 있어야 그림자가 예쁩니다)
    const floor = MeshBuilder.CreateBox(
      "floor",
      { width: ROOM_WIDTH, height: FLOOR_HEIGHT, depth: ROOM_DEPTH },
      this.scene,
    );
    floor.position.y = -FLOOR_HEIGHT / 2;
    floor.material = floorMat;
    floor.receiveShadows = true;

    const backWall = MeshBuilder.CreateBox(
      "backWall",
      { width: ROOM_WIDTH, height: WALL_HEIGHT, depth: WALL_THICKNESS },
      this.scene,
    );
    backWall.position = new Vector3(
      0,
      WALL_HEIGHT / 2,
      ROOM_DEPTH / 2 - WALL_THICKNESS / 2,
    );
    backWall.material = wallMat;
    backWall.checkCollisions = true;

    const leftWall = MeshBuilder.CreateBox(
      "leftWall",
      { width: WALL_THICKNESS, height: WALL_HEIGHT, depth: ROOM_DEPTH },
      this.scene,
    );
    leftWall.position = new Vector3(
      -ROOM_WIDTH / 2 + WALL_THICKNESS / 2,
      WALL_HEIGHT / 2,
      0,
    );
    leftWall.material = wallMat;
    leftWall.checkCollisions = true;

    // 4~5. 아치형 창문/스포트라이트 연출 (왼쪽 벽 반원 홀처럼 보여 임시 비활성화)
    // const windowGlow = MeshBuilder.CreateDisc(
    //   "windowGlow",
    //   { radius: 1.8, arc: 0.5, sideOrientation: 2 },
    //   this.scene,
    // );
    // windowGlow.position = new Vector3(-4.85, 2.5, 0); // 왼쪽 벽에 밀착
    // windowGlow.rotation.y = -Math.PI / 2;
    // windowGlow.rotation.z = Math.PI;
    //
    // const windowGlowMat = new PBRMaterial("windowGlowMat", this.scene);
    // windowGlowMat.emissiveColor = Color3.FromHexString("#FFF4D1");
    // windowGlowMat.disableLighting = true;
    // windowGlow.material = windowGlowMat;
    //
    // const windowLight = new SpotLight(
    //   "windowLight",
    //   new Vector3(-4.5, 3.5, 0),
    //   new Vector3(1, -0.8, 0),
    //   Math.PI / 2,
    //   15,
    //   this.scene,
    // );
    // windowLight.intensity = 2.0;
    // windowLight.diffuse = Color3.FromHexString("#FFE8A3");
  }

  // 가구는 아직 배치하지 않고, 배치 가능한 로더 유틸만 제공합니다.
  importFurniture(
    modelPath,
    position,
    rotation,
    scaling = new Vector3(1, 1, 1),
  ) {
    SceneLoader.ImportMesh("", "", modelPath, this.scene, (meshes) => {
      const root = meshes[0];
      root.position = position;
      root.rotation = rotation;
      root.scaling = scaling;

      meshes.forEach((mesh) => {
        mesh.receiveShadows = true;
      });
    });
  }

  // 특정 벽 라인(start~end)을 따라 균등 간격으로 가구 좌표를 계산합니다.
  // 사용 예시:
  // const slots = this.getWallPlacementSlots(new Vector3(-5, 0, -3), new Vector3(-5, 0, 3), 4);
  getWallPlacementSlots(start, end, count, inset = 0.4) {
    if (count <= 0) return [];

    const direction = end.subtract(start).normalize();
    const length = Vector3.Distance(start, end);
    const usable = Math.max(0, length - inset * 2);
    const step = count === 1 ? 0 : usable / (count - 1);
    const begin = start.add(direction.scale(inset));
    const yaw = Math.atan2(direction.x, direction.z);

    return Array.from({ length: count }, (_, i) => {
      const position = begin.add(direction.scale(step * i));
      return {
        position,
        rotation: new Vector3(0, yaw, 0),
      };
    });
  }
}
