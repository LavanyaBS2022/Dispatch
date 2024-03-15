import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private token: string | string[] | null = null;
  private name = null;
  private number = null;
  constructor() { }

  public setName(name: any) {
    this.name = name;
    sessionStorage.setItem("name", name);
  }
  public getName() {
    return sessionStorage.getItem("name");
  }
  public setNumber(number: any) {
    this.number = number;
    sessionStorage.setItem("mobile", number);
  }
  public getNumber() {
    return sessionStorage.getItem("mobile");
  }
  public setToken(token: any) {
    this.token = token;
    sessionStorage.setItem("token", token);
  }
  public getToken() {
    return sessionStorage.getItem("token");
  }

}
