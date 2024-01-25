import { Component, ViewChild } from '@angular/core';
import { DatetimeCustomEvent, ModalController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditComponent } from './edit/edit.component';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.page.html',
  styleUrls: ['./dispatch.page.scss'],
})
export class DispatchPage {
  routeOptions:string=''
  despatcherOptions: string=''
  showDatePicker = false;
  selectedDate: string = '';
  showSecondAndThirdCards = false;
  selectedRoute: { route: string, index: number } | null = null;
  selectedDespatcherIncharge: string | null = null;
  focusedRowIndex: number | null = null;
  focusedColIndex: number | null = null;
  packetsData: any[] = [];

  @ViewChild('datetimePicker') datetimePicker: any;

  tableHeaders: string[] = ['Packet Name','Weight','Crates','FGS Qty','FGS Crates','Edit'];

 constructor(private modalController: ModalController,private apiService:ApiService,private spinner: NgxSpinnerService) {
    this.selectedDate = new Date().toISOString();
  }
  
  ngOnInit() {
    this.getRoute();
    this.getRouteIncharger();
  }

  getRoute() {
    this.apiService.getRequest('/indent/getRoute').subscribe((sResponse) => {
      this.routeOptions = sResponse.data.map((item: any[]) => item[1]);
    });
  }

  getRouteIncharger() {
    this.apiService.getRequest('/fgs/getShiftIncharge').subscribe((sResponse) => {
      this.despatcherOptions = sResponse.data.map((item: any[]) => item[1]);
    });
  }
 
  
  formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) || '';
  }

  onDateSelected(event: any) {
    console.log('Selected Date:', event.detail.value);
    this.selectedDate = event.detail.value;
    this.closeDatePicker();
  }

  openDatePicker() {
    this.showDatePicker = true;
    setTimeout(() => {
      this.datetimePicker.open();
    }, 0);
  }
  
  closeDatePicker() {
    this.showDatePicker = false;
  }
       
  async openEditModal(rowData: any,tableHeaders:any) {
    const modal = await this.modalController.create({
      component: EditComponent,
      componentProps: {
        rowData: rowData,
        tableHeaders:tableHeaders
      },
    });
    console.log('rowData', rowData)
    await modal.present();
  }

  saveData() {
    console.log('Save button clicked!');
  }
                                                                                                                                                                                                                                                                                                             
  allFieldsFilled(): boolean {
    return (
      this.selectedDate !== null &&
      this.selectedRoute !== null &&
      this.selectedDespatcherIncharge !== null
    );
  }

  getTableHeaders(data: any[]): string[] {
    return data.length > 0 ? Object.keys(data[0]) : [];
  }

  getDisplayedKeys(): string[] {
    return ['packetName', 'totalWeight', 'totalCrates', 'fgsTotalQty', 'fgsTotalCrates'];
    // return ['packetName', 'totalWeight', 'totalCrates', 'fgsTotalQty', 'fgsTotalCrates', 'editStatus'];

  }
  
  loadData(routeCode:number=0,gpDate:string) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000); 
    this.showSecondAndThirdCards = true;
    this.apiService.getRouteDispatchItems('/fgs/getRouteDispatchItemsNew',routeCode,gpDate).subscribe((sResponse) => {
      this.packetsData = sResponse.data[0].packets;
    });
  }
            
}