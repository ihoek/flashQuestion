import {
  Engine,
  Scene,
  Vector3,
  Color3,
  HemisphericLight,
  DirectionalLight,
  FreeCamera,
  ShadowGenerator,
  DefaultRenderingPipeline,
  MeshBuilder,
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
    // 좌클릭(button 0)만 회전에 사용, 우클릭은 회전에서 제외
    camera.inputs.attached.mouse.buttons = [0];

    // [추가] 카메라 충돌 및 물리 설정
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.ellipsoid = new Vector3(0.5, 1, 0.5);

    // 우클릭 드래그로 카메라 상하 이동
    this.initRightClickVerticalMove(camera);

    // 2. 환경광 (어두운 곳이 없게 전체적으로 비춤)
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene,
    );
    light.intensity = 0.7;

    // 3. 방향광 (그림자를 만들어 입체감을 줌)
    const dirLight = new DirectionalLight(
      "dirLight",
      new Vector3(-1, -1, -1),
      this.scene,
    );
    dirLight.position = new Vector3(10, 20, 10);
    dirLight.intensity = 1.5;

    // 4. 씬 배경색
    // this.scene.clearColor = Color3.FromHexString("#FFFFFF").toColor4();

    // [추가] 조명이 너무 노랗거나 파랗다면 이미지 처리 장치에서 밝기 노출을 조정합니다.
    // this.scene.imageProcessingConfiguration.exposure = 1.0;

    // 5. 그림자 생성
    const shadowGenerator = new ShadowGenerator(1024, dirLight);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

    // 6. 보이지 않는 바닥 (카메라 충돌/중력용)
    const invisibleGround = MeshBuilder.CreateGround(
      "invisibleGround",
      { width: 100, height: 100 },
      this.scene,
    );
    invisibleGround.isVisible = false;
    invisibleGround.checkCollisions = true;

    // 7. 방 생성
    this.room = new Room(this.scene);

    // 7. Room 메쉬들을 그림자 caster로 등록
    this.room.scene.meshes.forEach((mesh) => {
      shadowGenerator.addShadowCaster(mesh);
    });

    // 8. 후처리(Post-process) 설정
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

  initRightClickVerticalMove(camera) {
    let isRightDown = false;
    let lastY = 0;
    const sensitivity = 0.01;

    this.canvas.addEventListener("pointerdown", (e) => {
      if (e.button === 2) {
        isRightDown = true;
        lastY = e.clientY;
      }
    });

    this.canvas.addEventListener("pointermove", (e) => {
      if (!isRightDown) return;
      const deltaY = e.clientY - lastY;
      camera.position.y -= deltaY * sensitivity;
      lastY = e.clientY;
    });

    this.canvas.addEventListener("pointerup", (e) => {
      if (e.button === 2) {
        isRightDown = false;
      }
    });

    this.canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
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
