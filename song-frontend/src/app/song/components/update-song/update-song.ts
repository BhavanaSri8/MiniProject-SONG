import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { SongService } from '../../services/song-service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-update-song',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-song.html',
  styleUrl: './update-song.css'
})
export class UpdateSong implements OnInit {
  private songService = inject(SongService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  id: number = 0;
  name: string = '';
  artist: string = '';
  genre: string = '';
  duration: number | null = null;
  releaseDate: string = '';
  errors: { [key: string]: string } = {};
  isSubmitting: boolean = false;
  isSubmitButtonHovered: boolean = false;
  isCancelButtonHovered: boolean = false;
  focusedField: string | null = null;
  isLoading: boolean = true;
  successMessage: string = '';
  messageType: 'success' | 'error' = 'success';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id') || '0');
      this.loadSong();
      
      setTimeout(() => {
        if (this.isLoading) {
          console.warn('Loading timeout - hiding loading screen');
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      }, 10000);
    });
  }

  loadSong(): void {
    this.songService.getSongById(this.id).pipe(
      timeout(5000)
    ).subscribe({
      next: (song) => {
        this.name = song.name;
        this.artist = song.artist;
        this.genre = song.genre;
        this.duration = song.duration;
        this.releaseDate = song.releaseDate;
        this.isLoading = false;
        this.cdr.markForCheck(); 
      },
      error: (error) => {
        console.error('Error loading song:', error);
        const errorMessage = error.name === 'TimeoutError' 
          ? 'Connection timeout. Please ensure the backend server is running on http://localhost:8080'
          : 'Error loading song. Please ensure the backend server is running.';
        this.successMessage = errorMessage;
        this.messageType = 'error';
        this.isLoading = false;
        this.cdr.markForCheck(); 
      }
    });
  }

  validateForm(): boolean {
    this.errors = {};

    if (!this.name.trim()) {
      this.errors['name'] = 'Song name is required';
    }
    if (!this.artist.trim()) {
      this.errors['artist'] = 'Artist name is required';
    }
    if (!this.genre.trim()) {
      this.errors['genre'] = 'Genre is required';
    }
    if (!this.duration || this.duration <= 0) {
      this.errors['duration'] = 'Duration must be greater than 0';
    }
    if (!this.releaseDate) {
      this.errors['releaseDate'] = 'Release date is required';
    }

    return Object.keys(this.errors).length === 0;
  }

  submitForm(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    const updatedSong = {
      name: this.name,
      artist: this.artist,
      genre: this.genre,
      duration: this.duration!,
      releaseDate: this.releaseDate
    };

    this.songService.updateSong(this.id, updatedSong);
    this.successMessage = 'Song updated successfully!';
    this.messageType = 'success';
    
    setTimeout(() => {
      this.router.navigate(['/get-songs']);
    }, 2000);
  }

  navigateBack(): void {
    this.router.navigate(['/get-songs']);
  }
}
