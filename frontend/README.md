## 📂 Project Structure (프로젝트 구조)

본 프로젝트는 **React(UI/State)**와 **Babylon.js(Engine/Logic)**의 역할을 명확히 분리하여 설계되었습니다.

```text
src/
├── assets/                 # 정적 리소스 관리
│   ├── models/             # .glb, .gltf (가구, 캐릭터 등 3D 모델)
│   ├── textures/           # .jpg, .png (PBR 재질, 환경 맵)
│   └── splats/             # .splat, .ply (Gaussian Splatting 데이터)
│
├── components/             # React UI 레이어
│   └── HUD, 메뉴, 상호작용 버튼 등 게임 오버레이 컴포넌트
│
├── game/                   # Babylon.js Core 로직 (Engine Level)
│   ├── core/               # Engine 초기화, Scene 생성, Render Loop 관리
│   ├── entities/           # 게임 객체(Player, Room, Object) 클래스 정의
│   ├── managers/           # Input, Asset, Sound 등 전역 시스템 관리
│   └── shaders/            # 커스텀 시각 효과를 위한 GLSL 셰이더 파일
│
├── utils/                  # Utility 함수
│   └── 수학 계산(Vector, Math), 좌표 변환, 데이터 포맷터
│
├── hooks/                  # React Custom Hooks
│   ├── useBabylon.ts       # Canvas 참조 및 Scene 인스턴스 접근
│   └── useInput.ts         # 키보드/마우스 입력 상태 React 바인딩
│
└── App.tsx                 # Entry Point (Canvas 컨테이너 및 전체 레이아웃)


## 🚀 Optimization Strategy (최적화 전략)

웹 환경에서의 부드러운 3D 경험을 위해 다음과 같은 최적화 기법을 적용합니다.

### 1. 자산 관리 및 로딩 (Asset Management)
* **Babylon AssetsManager:** 모든 3D 모델, 텍스처, 사운드를 `AssetsManager`를 통해 로드하여 리소스 로딩 상태를 중앙 제어하고, 사용자에게 로딩 바(Loading Bar)를 제공합니다.
* **KTX2 / Basis 텍스처:** 텍스처 메모리 점유율을 줄이기 위해 압축된 GPU 텍스처 포맷을 우선적으로 사용합니다.

### 2. 렌더링 성능 향상 (Rendering Performance)
* **Mesh Freezing:** 움직임이 없는 정적 오브젝트(벽, 가구 등)는 `mesh.freezeWorldMatrix()`를 호출하여 매 프레임 발생하는 행렬 연산을 방지합니다.
* **Instances vs Clones:** 동일한 메쉬(의자, 조명 등)가 반복될 경우 `CreateInstance`를 사용하여 드로우 콜(Draw Call)을 최소화합니다.
* **Octree 활용:** 씬 내부의 오브젝트가 많아질 경우 `scene.createOrUpdateSelectionOctree()`를 통해 카메라 시야(Frustum) 외부에 있는 객체 연산을 최적화합니다.

### 3. 고사양 기술 최적화 (Splatting & Effects)
* **Splatting LOD:** Gaussian Splatting 모델 사용 시, 시야 거리에 따른 디테일 조절 또는 가시성 테스트를 통해 GPU 부하를 관리합니다.
* **Post-Process 관리:** 안티앨리어싱(MSAA)이나 Bloom 효과는 저사양 기기에서 선택적으로 비활성화할 수 있도록 옵션을 제공합니다.

---

## 🏗️ Architecture: Utility & Logic Separation

React의 선언적 UI와 Babylon.js의 명령형 엔진을 효율적으로 분리하여 유지보수성을 높입니다.

### 1. Game Logic (Core Engine)
* **역할:** 물리 연산, 카메라 제어, 메쉬 생성 및 조작.
* **구현:** `src/game/` 폴더 내의 순수 JavaScript/TypeScript 클래스로 관리합니다.
* **특징:** React의 리렌더링 사이클(State 변경)에 영향을 받지 않도록 독립적인 `renderLoop`에서 실행됩니다.

### 2. React View (UI/UX Layer)
* **역할:** 체력 바, 인벤토리, 상호작용 버튼, 설정 메뉴 등.
* **구현:** `src/components/` 내의 React Functional Component로 작성합니다.
* **통신:** * **Engine → UI:** 이벤트 에미터(Event Emitter) 또는 전역 상태 관리(Zustand 등)를 통해 특정 시점에만 상태를 업데이트합니다.
    * **UI → Engine:** 사용자 입력(버튼 클릭 등) 시 엔진 인스턴스의 메서드를 직접 호출합니다.

### 3. Utilities (Helper Functions)
* **위치:** `src/utils/`
* **내용:** * **Math Utils:** 좌표 변환(World to Screen), 벡터 계산 등.
    * **Formatter:** 단위 변환 또는 커스텀 데이터 파싱.
    * **Constants:** 물리 상수, 레이어 마스크 값, 설정값 관리.
```
