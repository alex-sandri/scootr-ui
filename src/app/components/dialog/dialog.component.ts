import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  public buttons: {
    text: string,
    classes: string[],
    onClick: () => void,
  }[] = [];

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
