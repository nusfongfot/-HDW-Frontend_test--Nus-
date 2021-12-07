import { MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{ 
  mobileQueryMax: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryMax = media.matchMedia('(max-width: 700ppx)');
    this.mobileQueryMax.addListener(this._mobileQueryListener);


  }
  ngOnDestroy(): void {
    this.mobileQueryMax.removeListener(this._mobileQueryListener);
  }
  

  onSayHi(text:String){
    //alert(text)
  }
}


