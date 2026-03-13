package org.hartford.songrestapi.controller;

import org.hartford.songrestapi.entity.Song;
import org.hartford.songrestapi.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/songs")
@CrossOrigin("*")
public class SongController {

    @Autowired
    private SongService songService;

    @PostMapping
    public ResponseEntity<Song> addSong(@RequestBody Song song) {
        return ResponseEntity.status(HttpStatus.CREATED).body(songService.addSong(song));
    }

    @GetMapping
    public List<Song> getAllSongs() {
        return songService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable Long id) {
        Song song = songService.getById(id);
        if(song!=null){
            return ResponseEntity.ok(song);
        }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
        if(songService.deleteById(id)){
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/{id}")
    public Song updateSong(@PathVariable Long id, @RequestBody Song song) {
        return songService.updateById(id, song);
    }

    @GetMapping("/search")
    public List<Song> searchByArtistAndGenre(@RequestParam String artist, @RequestParam String genre) {
        return songService.getByArtistAndGenre(artist, genre);
    }

    @GetMapping("/name/{name}")
    public List<Song> getSongsByName(@PathVariable String name) {
        return songService.getByName(name);
    }

    @GetMapping("/artist/{artist}")
    public ResponseEntity<List<Song>> getSongsByArtist(@PathVariable String artist) {
        return ResponseEntity.ok(songService.getByArtist(artist));
    }

    @GetMapping("/genre/{genre}")
    public List<Song> getSongsByGenre(@PathVariable String genre) {
        return songService.getByGenre(genre);
    }
}
