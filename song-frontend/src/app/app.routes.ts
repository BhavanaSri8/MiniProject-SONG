import { Routes } from '@angular/router';

export const routes: Routes = [
    {"path":"","loadComponent":()=>import("./song/components/get-songs/get-songs").then(m=>m.GetSongs)},
    {"path":"get-songs","loadComponent":()=>import("./song/components/get-songs/get-songs").then(m=>m.GetSongs)},
    {"path":"add-song","loadComponent":()=>import("./song/components/add-song/add-song").then(m=>m.AddSong)},
    {"path":"update-song/:id","loadComponent":()=>import("./song/components/update-song/update-song").then(m=>m.UpdateSong)},
    {"path":"delete-song/:id","loadComponent":()=>import("./song/components/delete-song/delete-song").then(m=>m.DeleteSong)}
];
