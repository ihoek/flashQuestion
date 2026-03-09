// models
import deskModelUrl from "../../assets/models/glb/desk.glb?url";
import computerScreenModelUrl from "../../assets/models/glb/computerScreen.glb?url";
import mouseModelUrl from "../../assets/models/glb/computerMouse.glb?url";
import kitchenStoveModelUrl from "../../assets/models/glb/kitchenStove.glb?url";
import kitchenFridgeModelUrl from "../../assets/models/glb/kitchenFridgeLarge.glb?url";

// 위치/회전/스케일은 이 파일에서만 관리
export const FURNITURE_LAYOUT = [
  {
    id: "desk-main",
    modelUrl: deskModelUrl,
    position: { x: 4.5, y: 0, z: 2.8 },
    rotation: { x: 0, y: Math.PI, z: 0 },
    scaling: { x: 4.7, y: 4.7, z: 4.7 },
    interactive: true,
  },
  {
    id: "notebook",
    modelUrl: computerScreenModelUrl,
    position: { x: 3.7, y: 1.8, z: 3.6 },
    rotation: { x: 0, y: Math.PI, z: 0 },
    scaling: { x: 4.7, y: 4.7, z: 4.7 },
    interactive: true,
  },
  {
    id: "mouse",
    modelUrl: mouseModelUrl,
    position: { x: 3.7, y: 1.8, z: 3.5 },
    rotation: { x: 0, y: Math.PI, z: 0 },
    scaling: { x: 4.7, y: 4.7, z: 4.7 },
    interactive: true,
  },
  {
    id: "kitchen-stove",
    modelUrl: kitchenStoveModelUrl,
    position: { x: -2.6, y: 0, z: -0.4 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    scaling: { x: 4.7, y: 4.7, z: 4.7 },
    interactive: true,
  },
  {
    id: "kitchen-fridge",
    modelUrl: kitchenFridgeModelUrl,
    position: { x: -3.3, y: 0, z: -2.5 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    scaling: { x: 4.2, y: 4.2, z: 4.2 },
    interactive: true,
  },
];
