import { Component, inject, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SongService } from '../../services/song-service';
import { Router } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-get-songs',
  imports: [AsyncPipe, CommonModule, FormsModule],
  templateUrl: './get-songs.html',
  styleUrl: './get-songs.css',
})
export class GetSongs implements OnInit, OnDestroy {
  public songService: SongService = inject(SongService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private subscription!: Subscription;
  public hoveredSongId: number | null = null;
  public addButtonHovered: boolean = false;
  public hoveredButtonId: string | null = null;
  public searchQuery: string = '';
  public isLoading: boolean = true;
  public sortBy: string = 'id';
  public sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit() {
    this.songService.loadSongs();
    
    this.subscription = this.songService.songs$.subscribe((songs) => {
      if (songs.length >= 0) {
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.markForCheck(); 
        }, 1000);
      }
    });

    setTimeout(() => {
      if (this.isLoading) {
        console.warn('Loading timeout - hiding loading screen');
        this.isLoading = false;
        this.cdr.markForCheck(); 
      }
    }, 10000);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onRowMouseEnter(id: number): void {
    this.hoveredSongId = id;
  }

  onRowMouseLeave(): void {
    this.hoveredSongId = null;
  }

  deleteSong(id: number): void {
    if (confirm('Are you sure you want to delete this song?')) {
      this.songService.deleteSong(id);
    }
  }

  updateSong(id: number): void {
    this.router.navigate(['/update-song', id]);
  }

  navigateToAddSong(): void {
    this.router.navigate(['/add-song']);
  }

  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  filterSongs(songs: any[]): any[] {
    let filtered = songs;
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(song =>
        song.name.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.genre.toLowerCase().includes(query) ||
        song.releaseDate.toString().includes(query)
      );
    }

    return filtered.sort((a, b) => {
      let aVal = a[this.sortBy];
      let bVal = b[this.sortBy];
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
        return this.sortDirection === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (this.sortDirection === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
      }
    });
  }

  sortBy$(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.cdr.markForCheck();
  }

  getSortIndicator(column: string): string {
    if (this.sortBy !== column) return '';
    return this.sortDirection === 'asc' ? ' ↑' : ' ↓';
  }
}
