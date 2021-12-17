import { Model } from "../models/model"
import { View } from "../view/view";
import { ChosenToy, MAX_CHOSEN_TOYS } from './../models/types';

export class ControllerToys {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
  }

  handleClickOnToy(num: string): ChosenToy {
    if (this.model.isToyChosen(num)) {
      this.model.removeToyFromChosen(num);
      const numChosenToys = this.model.getChosenToys().length;
      this.view.viewToys?.showNumChosenToys(numChosenToys);
      return ChosenToy.Remove;
    } else if (this.model.getNumberChosenToys() >= MAX_CHOSEN_TOYS) {
      return ChosenToy.Error;
    } else {
      this.model.addToyToChosen(num);
      const numChosenToys = this.model.getChosenToys().length;
      this.view.viewToys?.showNumChosenToys(numChosenToys);
      return ChosenToy.Add;
    }
  }
}