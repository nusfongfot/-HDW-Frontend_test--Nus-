
import { AfterViewInit, Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements  AfterViewInit {

  @ViewChild('templatePortalContent') templatePortalContent: TemplateRef<any>;

  @Input()color: ThemePalette;
  @Input()strokeWidth: number;
  @Input()diameter: number = 100;
  @Input() mode: ProgressSpinnerMode;
  @Input()value: number;


  constructor(
    private loadingService: LoadingService,
    private _viewContainerRef: ViewContainerRef ) { 

      loadingService.indeterminate.subscribe(
        _ => {
          this.mode = 'indeterminate'
        }
      )
      loadingService.determinate.subscribe(
        value => {
          this.value = value
          this.mode = 'determinate'
        }
      )
    }
 
  ngAfterViewInit() {
    this.loadingService.attach(this.templatePortalContent, this._viewContainerRef)        
  }

}
