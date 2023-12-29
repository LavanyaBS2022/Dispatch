import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // private token: string | string[] | null = null;
 Token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6eyJpZCI6NTQsIm5hbWUiOiJIZWVuYSBTaGltb2dhIiwiZW1haWwiOiJoZWVuYS5rb3VzYXJAY2FyaXRvcnNvbHV0aW9ucy5pbiIsIm1vYmlsZSI6MTIzNDU2Nzg5MCwicm9sZUlkIjoyfSwiaWF0IjoxNzAzNzQ2MTgzLCJleHAiOjE3MDM4MzI1ODN9.x-l2l4qa5oJCBu5hdQXbDYGdb6zZXDz7XJ4ajgT1Jrc";
 private token = null;
  constructor() {}

  public setToken(token:any) {
    this.token = token;
    sessionStorage.setItem("token", token);
  }
  public getToken() {
    return sessionStorage.getItem("token");
  }

}
