import { OverlayRef, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private overlayRef: OverlayRef = this.createOverlay();
  private templatePortal: TemplatePortal<any>;

  indeterminate: Subject<boolean> = new Subject()
  determinate: Subject<number> = new Subject()


  constructor(private overlay: Overlay) {

    this.indeterminate.subscribe(
      show => {
        if (show && !this.overlayRef.hasAttached()){
        this.showSpinner()
      }else if(!show && this.overlayRef.hasAttached()){
        this.hideSpinner()
       }
      }
    )
    this.determinate.subscribe(
      number => {
        if (number <= 100 && !this.overlayRef.hasAttached()) {
          this.showSpinner()
        } else if (number >= 100 && this.overlayRef.hasAttached()) {
          this.hideSpinner()
        }
      }
    )
  }

  createOverlay(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'custom-backdrop',
      positionStrategy: this.overlay.position()
      .global()
      .centerVertically()
      .centerHorizontally()
    })
  }

  showSpinner(){
    this.overlayRef.attach(this.templatePortal)
  }

  private hideSpinner(){
    this.overlayRef.detach()
  }


  attach(templatePortalContent: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    this.templatePortal = new TemplatePortal(templatePortalContent, viewContainerRef)
  }
}