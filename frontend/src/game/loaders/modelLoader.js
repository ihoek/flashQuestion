import { LoadAssetContainerAsync, Vector3 } from "@babylonjs/core";

export class ModelLoader {
  constructor(scene) {
    this.scene = scene;
  }

  async placeModel({
    id,
    modelUrl,
    position,
    rotation = { x: 0, y: 0, z: 0 },
    scaling = { x: 1, y: 1, z: 1 },
    interactive = true,
  }) {
    const container = await LoadAssetContainerAsync(modelUrl, this.scene);
    container.addAllToScene();

    const root =
      container.meshes.find((mesh) => mesh.name === "__root__") ||
      container.meshes[0];

    if (root) {
      root.position = new Vector3(position.x, position.y, position.z);
      root.rotation = new Vector3(rotation.x, rotation.y, rotation.z);
      root.scaling = new Vector3(scaling.x, scaling.y, scaling.z);
    }

    container.meshes.forEach((mesh) => {
      mesh.receiveShadows = true;
      mesh.isPickable = interactive;
      mesh.metadata = {
        ...(mesh.metadata || {}),
        furnitureId: id,
        interactive,
      };
    });

    return { id, root, meshes: container.meshes };
  }
}
