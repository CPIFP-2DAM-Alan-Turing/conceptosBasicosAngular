import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput, IonPopover } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { Artist } from 'src/app/core/models/artist.model';
import { ArtistsService } from 'src/app/core/services/artists.service';

export const USER_SELECTABLE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ArtistSelectableComponent),
    multi: true
};

@Component({
    selector: 'app-artist-selectable',
    templateUrl: './artist-selectable.component.html',
    styleUrls: ['./artist-selectable.component.scss'],
    providers: [USER_SELECTABLE_VALUE_ACCESSOR]
})
export class ArtistSelectableComponent implements OnInit, ControlValueAccessor {
    artistSelected: Artist | undefined;
    disabled: boolean = true;
    artists: Artist[] = [];

    constructor(
        public artistsService: ArtistsService
    ) { }

    ngOnInit() { }

    private async filter(value: string) {
        const query = value;
        const artists = await lastValueFrom(this.artistsService.query(query))
        this.artists = artists.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));
    }

    onFilter(event: any) {
        this.filter(event.detail.value);
    }

    async onLoadartists() {
        this.artists = await lastValueFrom(this.artistsService.getAll());
    }

    writeValue(obj: any): void {
        this.selectArtist(obj);
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
    clearSearch(input: IonInput) { }

    deselect(popover: IonPopover | null = null) { }

    onArtistClicked(popover: IonPopover, artist: any) {
        this.selectArtist(artist.id);
        popover.dismiss();
    }

    private async selectArtist(id: number | undefined, propagate: boolean = false) {
        if (id) {
            this.artistSelected = await lastValueFrom(this.artistsService.getArtist(id));
        }
        else
            this.artistSelected = undefined;
        if (propagate)
            this.propagateChange(this.artistSelected);
    }

    propagateChange = (obj: any) => { }

}
