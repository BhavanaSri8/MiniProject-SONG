package org.hartford.songrestapi.service;

import org.hartford.songrestapi.entity.Song;
import org.hartford.songrestapi.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SongService implements SongServiceInterface {
    @Autowired
    SongRepository songRepository;

    public Song addSong(Song song){
        return songRepository.save(song);
    }

    public List<Song> getAll(){
        return songRepository.findAll();
    }

    public Song getById(Long id){
        return songRepository.findById(id).orElse(null);
    }

    public boolean deleteById(Long id){
        if(songRepository.existsById(id)){
            songRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Song> getByArtistAndGenre(String artist,String genre){
        return songRepository.findByArtistAndGenre(artist,genre);
    }

    public Song updateById(Long id,Song song){
        Song s=getById(id);
        if(id==null){
            return null;
        }
        s.setArtist(song.getArtist());
        s.setGenre(song.getGenre());
        songRepository.save(s);
        return s;
    }

    public List<Song> getByName(String name){
        return songRepository.findByName(name);
    }

    public List<Song> getByArtist(String artist){
        return songRepository.findByArtist(artist);
    }

    public List<Song> getByGenre(String genre){
        return songRepository.findByGenre(genre);
    }

}
