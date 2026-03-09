import {
  Engine,
  Scene,
  Vector3,
  Color3,
  HemisphericLight,
  DirectionalLight,
  ArcRotateCamera,
  ShadowGenerator,
  DefaultRenderingPipeline,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

// entities
import { Room } from "../entities/Room";

const CAMERA_TARGET = new Vector3(-2, 1.8, 2);
const CAMERA_ALPHA = -0.7358774;
const CAMERA_BETA = 1.3207498;
const CAMERA_RADIUS = 10;
const CAMERA_POSITION = new Vector3(2.1608635, 9.346957, -3.1814455);

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
    // 1. ArcRotateCamera: 쿼터뷰(아이소메트릭 느낌)로 고정
    const camera = new ArcRotateCamera(
      "mainCamera",
      CAMERA_ALPHA,
      CAMERA_BETA,
      CAMERA_RADIUS,
      CAMERA_TARGET,
      this.scene,
    );
    // ArcRotateCamera는 alpha/beta/radius를 쓰지만, 초기 월드 좌표를 직접 줄 때는 setPosition을 사용합니다.
    camera.setPosition(CAMERA_POSITION);
    camera.attachControl(this.canvas, true);
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 18;

    // 회전 허용, 지나치게 위/아래로 꺾이지 않게만 제한
    camera.lowerBetaLimit = 0.35;
    camera.upperBetaLimit = 1.45;
    camera.panningSensibility = 0;
    camera.wheelPrecision = 40;
    this.initRightClickCameraLogger(camera);

    // 2. 환경광 (intensity를 0.4 정도로 낮추어 차분하게)
    const light = new HemisphericLight(
      "light",
      new Vector3(0, 1, 0),
      this.scene,
    );
    light.intensity = 0.4;
    light.groundColor = new Color3(0.2, 0.1, 0.1); // 바닥 반사광을 어둡게 설정

    // 3. 방향광 (이미지의 부드러운 그림자를 위해 각도 조절)
    const dirLight = new DirectionalLight(
      "dirLight",
      new Vector3(-0.5, -1, -0.5),
      this.scene,
    );
    dirLight.position = new Vector3(10, 15, 10);
    dirLight.intensity = 0.6; // 너무 밝지 않게 조절

    // 4. 배경색 (이미지의 차분한 웜그레이 톤)
    this.scene.clearColor = Color3.FromHexString("#D6CEC3").toColor4();

    // 5. 그림자 설정
    const shadowGenerator = new ShadowGenerator(1024, dirLight);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 64; // 더 부드러운 그림자
    shadowGenerator.setDarkness(0.3); // 그림자가 너무 검지 않게

    // 6. 방 생성
    this.room = new Room(this.scene);

    // 7. 모든 메쉬 그림자 적용
    this.scene.meshes.forEach((mesh) => {
      shadowGenerator.addShadowCaster(mesh);
    });

    // 8. 후처리 (중요: Bloom 수치를 대폭 낮춤)
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
      true,
      this.scene,
      [camera],
    );
    pipeline.samples = 4;
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.9; // 0.72에서 높여서 밝은 곳만 번지게 함
    pipeline.bloomWeight = 0.2; // 번짐 강도 약화

    pipeline.imageProcessingEnabled = true;
    pipeline.imageProcessing.exposure = 1.0;
    pipeline.imageProcessing.contrast = 1.1; // 대비를 주어 색감을 뚜렷하게
  }

  initRightClickCameraLogger(camera) {
    this.canvas.addEventListener("pointerdown", (e) => {
      if (e.button !== 2) return;

      e.preventDefault();
      const target = camera.getTarget();
      console.log("camera position:", {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      });
      console.log("camera target:", {
        x: target.x,
        y: target.y,
        z: target.z,
      });
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
