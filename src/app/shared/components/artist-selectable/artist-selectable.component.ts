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

    /**
     * Filters the list of artists based on the given query string.
     * @param value The query string.
     */
    private async filter(value: string) {
        const query = value;
        const artists = await lastValueFrom(this.artistsService.query(query))
        this.artists = artists.filter(a => a.name.toLowerCase().includes(query.toLowerCase()));
    }

    /**
    * Filter the event.
    * @param event The filter event.
    */
    onFilter(event: any) {
        this.filter(event.detail.value);
    }

    /**
    * Loads the list of artists from the server.
    * @returns A promise that resolves with the list of artists.
    */
    async onLoadartists() {
        this.artists = await lastValueFrom(this.artistsService.getAll());
    }

    /**
    * Writes the value of the given object to the component.
    * @param obj The object to write the value.
    */
    writeValue(obj: any): void {
        this.selectArtist(obj);
    }

    /** Registers a callback function that will be called when the value of this directive changes.
    * @param fn The callback function to be called.
    */
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    /**
     * Not implemented.
     * @param fn
     */
    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }

    /**
     * Not implemented.
     * @param isDisabled 
     */
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
    * Clears the search input value and the filter.
    * @param input The input element to clear.
     */
    clearSearch(input: IonInput) {
        input.value = "";
        this.filter("");
    }

    /**
    * Deselects the currently selected artist.
    * @param popover (optional) The popover that is currently open.
    */
    deselect(popover: IonPopover | null = null) {
        this.selectArtist(undefined, true);
        if (popover)
            popover.dismiss();
    }

    /**
    * Select the artist and dismiss the popover.
    * @param popover The popover that was clicked.
    * @param artist The artist that was clicked.
    */
    onArtistClicked(popover: IonPopover, artist: any) {
        this.selectArtist(artist.id);
        popover.dismiss();
    }

    /**
    * Selects an artist by ID.
    * @param id The ID of the artist to select.
    * @param propagate Whether to propagate the change to the parent component.
    * @return A Promise that resolves to the selected artist.
    */
    private async selectArtist(id: number | undefined, propagate: boolean = false) {
        if (id) {
            this.artistSelected = await lastValueFrom(this.artistsService.getArtist(id));
        }
        else
            this.artistSelected = undefined;
        if (propagate)
            this.propagateChange(this.artistSelected);
    }

    /**
    * Propagates a change of an object.
    * @param obj The object.
    */
    propagateChange = (obj: any) => { }

}
