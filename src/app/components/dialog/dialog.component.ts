import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface IDialogButton
{
  text: string,
  classes: string[],
  onClick: () => void,
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent
{
  @Input()
  public message: string = "";

  @Input()
  public buttons: IDialogButton[] = [];

  @Output()
  public hide = new EventEmitter<void>();

  constructor()
  {}

  public onDialogContainerClick(e: Event)
  {
    const target = e.target as HTMLElement;

    if (target.className === "dialog-container")
    {
      this.hide.emit();
    }
  }

}
