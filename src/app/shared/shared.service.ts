import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // private token: string | string[] | null = null;
  Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6eyJpZCI6NTQsIm5hbWUiOiJIZWVuYSBTaGltb2dhIiwiZW1haWwiOiJoZWVuYS5rb3VzYXJAY2FyaXRvcnNvbHV0aW9ucy5pbiIsIm1vYmlsZSI6MTIzNDU2Nzg5MCwicm9sZUlkIjoyfSwiaWF0IjoxNzA2MDczNzQyLCJleHAiOjE3MDYxNjAxNDJ9.BU1xeb97w7IXERz7_d5gIFan7VmRFQ5cNBv2_ozPX_s";
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
