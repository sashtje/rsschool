import Model from "../models/model";
import View from "../view/view";

export default class ControllerTree {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
  }

  getSoundSettings(): boolean {
    return this.model.getSoundSettings();
  }

  changeSoundSettings(value: boolean): void {
    this.model.changeSoundSettings(value);
  }
}
