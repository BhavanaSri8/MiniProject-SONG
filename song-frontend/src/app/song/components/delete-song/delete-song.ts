import { Component, inject, OnInit } from '@angular/core';
import { SongService } from '../../services/song-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-song',
  template: '<p>Deleting...</p>'
})
export class DeleteSong implements OnInit {
  private songService = inject(SongService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id') || '0');
      if (confirm('Are you sure you want to delete this song?')) {
        this.songService.deleteSong(id);
        setTimeout(() => {
          this.router.navigate(['/get-songs']);
        }, 500);
      } else {
        this.router.navigate(['/get-songs']);
      }
    });
  }
}
