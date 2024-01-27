import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // private token: string | string[] | null = null;
  Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6eyJpZCI6MTcyMCwibmFtZSI6IkFOQU5EIEtVTUFSIEcgKFMxNTk0KSIsIm1vYmlsZSI6NzQ4MzA5MjkyNSwicm9sZUlkIjoxLCJjb19jb2RlIjozfSwiaWF0IjoxNzA2Mjc3NjQyLCJleHAiOjE3MDYzNjQwNDJ9.8EPQ0h15qtsgVagzz7qAVODBFxLfBHvzwNWzpGWrCUw";
  private token = null;
  private name = null;
  constructor() { }

  public setName(name: any) {
    this.name = name;
    sessionStorage.setItem("name", name);
  }
  public getName() {
    return sessionStorage.getItem("name");
  }
  public setToken(token: any) {
    this.token = token;
    sessionStorage.setItem("token", token);
  }
  public getToken() {
    return sessionStorage.getItem("token");
  }

}
