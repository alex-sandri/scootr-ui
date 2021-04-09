import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements AfterViewInit
{
  public hasCamera = true;

  constructor()
  {}

  public ngAfterViewInit()
  {
    navigator
      .mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
        },
      })
      .then(stream =>
      {
        // TODO
      })
      .catch(() =>
      {
        this.hasCamera = false;
      });
  }
}
