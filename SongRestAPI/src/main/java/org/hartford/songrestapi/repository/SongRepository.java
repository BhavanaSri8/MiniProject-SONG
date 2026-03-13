package org.hartford.songrestapi.repository;

import org.hartford.songrestapi.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SongRepository extends JpaRepository<Song,Long> {
    List<Song> findByArtistAndGenre(String artist,String genre);
    List<Song> findByName(String name);
    List<Song> findByArtist(String artist);
    List<Song> findByGenre(String genre);
}
