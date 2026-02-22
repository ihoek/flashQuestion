import {
  Engine,
  Scene,
  Vector3,
  HemisphericLight,
  FreeCamera,
  DefaultRenderingPipeline, // 후처리를 위해 추가
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

// entities
import { Room } from "../entities/Room";

export class SceneController {
  constructor(canvas) {
    this.canvas = canvas;
    this.engine = new Engine(canvas, true);
    this.scene = new Scene(this.engine);

    // [추가] 씬의 충돌 기능을 활성화합니다.
    this.scene.collisionsEnabled = true;

    this.initScene();
    this.startRenderLoop();
  }

  initScene() {
    // 1. 카메라 설정
    // 0, 1.6, -5 위치에서 시작 (1.6은 사람의 눈높이와 유사)
    const camera = new FreeCamera(
      "mainCamera",
      new Vector3(0, 1.6, -5),
      this.scene,
    );
    camera.attachControl(this.canvas, true);

    // --- [WASD 키 맵핑 추가] ---
    camera.keysUp = [87]; // W (코드 87)
    camera.keysDown = [83]; // S (코드 83)
    camera.keysLeft = [65]; // A (코드 65)
    camera.keysRight = [68]; // D (코드 68)
    // -------------------------

    // 이동 속도 조절
    camera.speed = 0.2;
    // 마우스 회전 감도 조절
    camera.angularSensibility = 2000;

    // [추가] 카메라 충돌 및 물리 설정
    camera.checkCollisions = true;
    camera.applyGravity = true; // 바닥에 붙어있게 함
    camera.ellipsoid = new Vector3(0.5, 1, 0.5); // 카메라의 히트박스(사람 크기)

    // 2. 기본 조명
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene,
    );
    light.intensity = 0.7; // 조명 밝기 조절

    // 3. [추가] 방 생성
    // Room 클래스가 호출되면서 내부의 바닥과 벽이 생성됩니다.
    this.room = new Room(this.scene);

    // 4. [추가] Sketchfab 느낌을 위한 후처리(Post-process) 설정
    this.initPostProcess(camera);

    // 5. 윈도우 리사이즈 대응
    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  }

  // [추가] 고급스러운 화면을 위한 렌더링 파이프라인
  initPostProcess(camera) {
    const pipeline = new DefaultRenderingPipeline(
      "defaultPipeline",
      true, // HDR 사용
      this.scene,
      [camera],
    );

    pipeline.samples = 4; // 안티앨리어싱 (계단 현상 방지)
    pipeline.bloomEnabled = true; // 빛 번짐 효과
    pipeline.bloomThreshold = 0.8;
    pipeline.bloomWeight = 0.3;
    pipeline.imageProcessingEnabled = true;
    pipeline.imageProcessing.contrast = 1.2; // 색감 대비 향상
  }

  startRenderLoop() {
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  dispose() {
    this.scene.dispose();
    this.engine.dispose();
  }
}
