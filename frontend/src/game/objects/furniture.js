import { FURNITURE_LAYOUT } from "../config/furnitureLayout";
import { ModelLoader } from "../loaders/modelLoader";

export class FurnitureManager {
  constructor(scene) {
    this.scene = scene;
    this.loader = new ModelLoader(scene);
    this.instances = new Map();
  }

  async placeAll() {
    const placed = await Promise.all(
      FURNITURE_LAYOUT.map((item) => this.loader.placeModel(item)),
    );

    placed.forEach((instance) => {
      this.instances.set(instance.id, instance);
    });

    return placed;
  }

  getById(id) {
    return this.instances.get(id);
  }
}
