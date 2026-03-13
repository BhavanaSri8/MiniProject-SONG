import { Component, inject } from '@angular/core';
import { SongService } from '../../services/song-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-song',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-song.html',
  styleUrl: './add-song.css'
})
export class AddSong {
  private songService = inject(SongService);
  private router = inject(Router);

  name: string = '';
  artist: string = '';
  genre: string = '';
  duration: number | null = null;
  releaseDate: string = '';
  errors: { [key: string]: string } = {};
  successMessage: string = '';
  messageType: 'success' | 'error' = 'success';
  isSubmitting: boolean = false;
  isSubmitButtonHovered: boolean = false;
  isCancelButtonHovered: boolean = false;
  focusedField: string | null = null;

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
    const newSong = {
      name: this.name,
      artist: this.artist,
      genre: this.genre,
      duration: this.duration!,
      releaseDate: this.releaseDate
    };

    this.songService.addSong(newSong);
    this.successMessage = 'Song added successfully!';
    this.messageType = 'success';
    
    setTimeout(() => {
      this.router.navigate(['/get-songs']);
    }, 2000);
  }

  navigateBack(): void {
    this.router.navigate(['/get-songs']);
  }
}
