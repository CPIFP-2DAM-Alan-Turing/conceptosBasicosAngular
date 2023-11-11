import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

export const PICTURE_SELECTABLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImageSelectableComponent),
  multi: true
};

@Component({
  selector: 'app-image-selectable',
  templateUrl: './image-selectable.component.html',
  styleUrls: ['./image-selectable.component.scss'],
  providers: [PICTURE_SELECTABLE_VALUE_ACCESSOR]
})
export class ImageSelectableComponent implements ControlValueAccessor, OnDestroy {
  private _image = new BehaviorSubject("");
  public image$ = this._image.asObservable();
  isDisabled: boolean = false;
  hasValue: boolean = false;

  propagateChange = (obj: any) => { }

  constructor(
    private imageModal: ModalController
  ) { }

  // ControlValueAccessor inteface methods //
  writeValue(obj: any): void {
    if (obj) {
      this.hasValue = true;
      this._image.next(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
  ///////////////////////////////////////////

  private changeImage(image: string) {
    this.hasValue = image != '';
    this._image.next(image);
    this.propagateChange(image);
  }


  public onChangeImage(event: Event, fileLoader: HTMLInputElement) {
    event.stopPropagation();
    fileLoader.onchange = () => {
      if (fileLoader.files && fileLoader.files?.length > 0) {
        let file = fileLoader.files[0];
        let reader = new FileReader();
        reader.onload = () => {
          this.changeImage(reader.result as string);
        };
        reader.onerror = (error) => {
          console.log(error);
        }
        reader.readAsDataURL(file);
      }
    }
    fileLoader.click();
  }

  onDeleteImage(event: Event) {
    event.stopPropagation();
    this.changeImage('');
  }

  close() {
    this.imageModal?.dismiss();
  }

  ngOnDestroy(): void {
    this._image.complete();
  }

}
