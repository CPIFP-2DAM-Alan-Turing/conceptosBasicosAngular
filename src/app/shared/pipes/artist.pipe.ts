import { Pipe, PipeTransform } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { ArtistsService } from 'src/app/core/services/artists.service';

@Pipe({
  name: 'artist'
})
export class ArtistPipe implements PipeTransform {
  private _artist: any;

  constructor(
    private artistSvc: ArtistsService
  ) { }

  async transform(artist_id?: number): Promise<string> {
    if (artist_id) {
      this._artist = await lastValueFrom(this.artistSvc.getArtist(artist_id))
        .catch((error: any) => {
          console.error(error);
        });
    }
    return this._artist ? this._artist.name : "";
  }

}
