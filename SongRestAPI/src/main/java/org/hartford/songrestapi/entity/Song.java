package org.hartford.songrestapi.entity;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String artist;
    @Column(nullable = false)
    private String genre;
    @Column(nullable = false)
    private int duration;
    @Column(nullable = false)
    private Date releaseDate;

    public Song() {
    }

    public Song(String name, String artist, String genre, int duration, Date releaseDate) {
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.duration = duration;
        this.releaseDate = releaseDate;
    }

    public Song(Long id, String name, String artist, String genre, int duration, Date releaseDate) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.genre = genre;
        this.duration = duration;
        this.releaseDate = releaseDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }
}
