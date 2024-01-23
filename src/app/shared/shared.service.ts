import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // private token: string | string[] | null = null;
  Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6eyJpZCI6NTQsIm5hbWUiOiJIZWVuYSBTaGltb2dhIiwiZW1haWwiOiJoZWVuYS5rb3VzYXJAY2FyaXRvcnNvbHV0aW9ucy5pbiIsIm1vYmlsZSI6MTIzNDU2Nzg5MCwicm9sZUlkIjoyfSwiaWF0IjoxNzA1OTgzNzAyLCJleHAiOjE3MDYwNzAxMDJ9.YXMEWro2U4_-7mA51WMrxWDx7dTEU01eMovxftt6knc";
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
