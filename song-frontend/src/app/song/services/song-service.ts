import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

export interface Song {
  id?: number;
  name: string;
  artist: string;
  genre: string;
  duration: number;
  releaseDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private httpClient: HttpClient = inject(HttpClient);
  private songsSubject: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>([]);
  public songs$ = this.songsSubject.asObservable();

  constructor() {
    this.loadSongs();
  }

  loadSongs(): void {
    this.httpClient.get<Song[]>('http://localhost:8080/songs').subscribe({
      next: (songs) => {
        this.songsSubject.next(songs);
      },
      error: (error) => {
        console.error('Error fetching songs:', error);
        this.songsSubject.next([]);
      }
    });
  }

  addSong(song: { id?: number; name: string; artist: string; genre: string; duration: number; releaseDate: string }): void {
    this.httpClient.post<Song>('http://localhost:8080/songs', song).subscribe({
      next: (s) => {
        console.log('Song added successfully:', s);
        setTimeout(() => {
          this.loadSongs();
        }, 100);
      },
      error: (error) => {
        console.error('Failed to add song', error);
      },
      complete: () => {
        console.log('Add song request completed');
      }
    });
  }

  updateSong(id: number, song: { id?: number; name: string; artist: string; genre: string; duration: number; releaseDate: string }): void {
    this.httpClient.put<Song>(`http://localhost:8080/songs/${id}`, song).subscribe({
      next: (s) => {
        console.log('Song updated successfully:', s);
        setTimeout(() => {
          this.loadSongs();
        }, 100);
      },
      error: (error) => {
        console.error('Failed to update song', error);
      },
      complete: () => {
        console.log('Update song request completed');
      }
    });
  }

  deleteSong(id: number): void {
    this.httpClient.delete<void>(`http://localhost:8080/songs/${id}`).subscribe({
      next: () => {
        console.log(`Song with id ${id} removed successfully.`);
        setTimeout(() => {
          this.loadSongs();
        }, 100);
      },
      error: (error) => {
        console.error('Error removing song:', error);
      }
    });
  }

  getSongById(id: number): Observable<Song> {
    return this.httpClient.get<Song>(`http://localhost:8080/songs/${id}`);
  }
}
