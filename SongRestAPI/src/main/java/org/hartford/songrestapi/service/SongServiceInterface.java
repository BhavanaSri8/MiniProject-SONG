package org.hartford.songrestapi.service;

import org.hartford.songrestapi.entity.Song;

import java.util.List;

public interface SongServiceInterface {
    Song addSong(Song song);
    List<Song> getAll();
    Song getById(Long id);
    boolean deleteById(Long id);
    List<Song> getByArtistAndGenre(String artist, String genre);
    Song updateById(Long id, Song song);
    List<Song> getByName(String name);
    List<Song> getByArtist(String artist);
    List<Song> getByGenre(String genre);
}
