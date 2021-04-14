import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import jsQR from 'jsqr';
import { Point } from 'jsqr/dist/locator';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements AfterViewInit
{
  @ViewChild("video")
  private videoElement?: ElementRef<HTMLVideoElement>;

  @ViewChild("canvas")
  private canvasElement?: ElementRef<HTMLCanvasElement>;

  private canvasContext?: CanvasRenderingContext2D;

  public hasCamera = true;

  constructor(private api: ApiService)
  {}

  public async ngAfterViewInit()
  {
    if (!this.videoElement || !this.canvasElement)
    {
      return;
    }

    this.canvasContext = this.canvasElement.nativeElement.getContext("2d") ?? undefined;

    const result = await navigator
      .mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
        },
      })
      .catch(() =>
      {
        this.hasCamera = false;
      });

    if (!result)
    {
      return;
    }

    this.videoElement.nativeElement.srcObject = result;

    // Required to tell iOS Safari we don't want fullscreen
    this.videoElement.nativeElement.setAttribute("playsinline", "true");

    this.videoElement.nativeElement.play();

    requestAnimationFrame(() => this.tick());
  }

  private drawLine(start: Point, end: Point, color: string)
  {
    if (!this.canvasContext)
    {
      return;
    }

    this.canvasContext.beginPath();
    this.canvasContext.moveTo(start.x, start.y);
    this.canvasContext.lineTo(end.x, end.y);
    this.canvasContext.lineWidth = 4;
    this.canvasContext.strokeStyle = color;
    this.canvasContext.stroke();
  }

  private tick()
  {
    if (!this.videoElement || !this.canvasElement || !this.canvasContext)
    {
      return;
    }

    if (this.videoElement.nativeElement.readyState === this.videoElement.nativeElement.HAVE_ENOUGH_DATA)
    {
      this.canvasElement.nativeElement.height = this.videoElement.nativeElement.videoHeight;
      this.canvasElement.nativeElement.width = this.videoElement.nativeElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement.nativeElement,
        0,
        0,
        this.canvasElement.nativeElement.width,
        this.canvasElement.nativeElement.height,
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.nativeElement.width,
        this.canvasElement.nativeElement.height,
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code)
      {
        this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
        this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
        this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
        this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");

        this.startRide(code.data);
      }
    }

    requestAnimationFrame(() => this.tick());
  }

  private async startRide(vehicle: string)
  {
    // TODO:
    // Show wallet picker

    const response = await this.api.startRide({
      vehicle,
      wallet: "TODO",
    });

    if (response.errors)
    {
      // TODO:
      // Show error messages

      return;
    }

    // TODO:
    // Redirect to map page and show ride UI and controls
  }
}
