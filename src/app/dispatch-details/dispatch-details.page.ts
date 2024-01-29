import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
interface Route {
  route_code: string;
  route_name: string;
}

@Component({
  selector: 'app-dispatch-details',
  templateUrl: './dispatch-details.page.html',
  styleUrls: ['./dispatch-details.page.scss'],
})
export class DispatchDetailsPage {
  routeOptions: Route[] = [];
  despatcherOptions: string = '';
  showDatePicker = false;
  selectedDate: string ='';
  showSecondAndThirdCards = false;
  selectedRoute: string | null = null;
  selectedDespatcherIncharge: string | null = null;
  accordionItemStates: boolean[] = [true, false, false];
  customerData: any[] = [];
  currentPanelIndex: number = 0;
  showSaveButton: boolean = false; // New flag to control save button visibility

  @ViewChild('datetimePicker') datetimePicker: any;

  tableHeaders: string[] = ['Item', 'qty', 'Crates', 'Ltr/Kg'];
  constructor(private apiService: ApiService,private spinner: NgxSpinnerService) {
    this.selectedDate = new Date().toISOString();
  }

  ngOnInit() {
    this.getRoute();
  }

getRoute() {
  this.apiService.getRequest('/master/route').subscribe((sResponse) => {
    this.routeOptions = sResponse.data.map((item: any) => {
      return {
        route_code: item.route_code,
        route_name: item.route_name,
      };
    });
  });
}


  saveData() {
    console.log('Save button clicked!');
    // Add logic to save data here
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

  onDateSelected(event: any) {
    console.log('Selected Date:', event.detail.value);
    this.selectedDate = event.detail.value;
    this.closeDatePicker();
  }

  allFieldsFilled(): boolean {
    return this.selectedDate !== null && this.selectedRoute !== null;
  }

  // loadData() {
  //   this.showSecondAndThirdCards = true;
  //   this.customerData = [
  //     { customer: 'Customer 1', data: [['Packet 1', '10 kg', '3'], ['Packet 2', '15 kg', '4']] },
  //     { customer: 'Customer 2', data: [['Packet 3', '8 kg', '1', '2'], ['Packet 4', '12 kg', '2', '3']] },
  //     { customer: 'Customer 3', data: [['Packet 3', '8 kg', '1', '2'], ['Packet 4', '12 kg', '2', '3']] },
  //     { customer: 'Customer 4', data: [['Packet 3', '8 kg', '1', '2'], ['Packet 4', '12 kg', '2', '3']] },
  //     { customer: 'Customer 5', data: [['Packet 3', '8 kg', '1', '2'], ['Packet 4', '12 kg', '2', '3']] },
  //   ];
  // }
  formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) || '';
  }

  savePanelData(event: Event, customer: any) {
    event.stopPropagation();
    console.log('Save button clicked for customer:', customer.customer);
  }


  setPanelIndex(index: number) {
    this.currentPanelIndex = index;
  }
  isAccordionItemOpen(index: number): boolean {
    return this.accordionItemStates[index];
  }

  toggleAccordionItem(index: number) {
    // Reset all accordionItemStates to false
    this.accordionItemStates = this.accordionItemStates.map(() => false);
    // Set the clicked accordion item state to true
    this.accordionItemStates[index] = true;
    // Set the currentPanelIndex to the clicked index
    this.currentPanelIndex = index;
    // Show the Save button
    this.showSaveButton = true;
  }

  closeAccordion(index: number) {
    if (this.currentPanelIndex === index) {
      this.currentPanelIndex = -1; // Set to a value that indicates no panel is open
    }
  }

  handleAccordionAction(action: 'next' | 'prev' | 'end', index: number) {
    switch (action) {
      case 'next':
        if (index < this.accordionItemStates.length - 1) {
          this.toggleAccordionItem(index + 1);
        }
        break;
      case 'prev':
        if (index > 0) {
          this.toggleAccordionItem(index - 1);
        }
        break;
      case 'end':
        this.closeAccordion(index);
        break;
    }
  }

  isLastAccordionItem(index: number): boolean {
    return index === this.accordionItemStates.length - 1;
  }

  loadData1(pDate:string,route_code:number=0) {
    debugger
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.showSecondAndThirdCards = true;
    this.apiService.getRequestbyParams('/fgs/routeDispatchDetails', pDate, route_code).subscribe((sResponse) => {
      this.customerData = sResponse.data;
      console.log("response", sResponse);
    });
  }
  
  loadData(pDate: string | null, route_code: number = 0) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  
    // Handle null value for selectedDate
    const formattedDate = pDate || '';
  
    this.showSecondAndThirdCards = true;
    this.apiService.getRequestbyParams('/fgs/routeDispatchDetails', formattedDate, route_code).subscribe((sResponse) => {
      this.customerData = sResponse.data;
      console.log("response", sResponse);
    });
  }
  
  handleLoadButtonClick() {
    debugger

    const formattedDate = (this.formatDate(this.selectedDate) || '')!;
    const routeCode = this.selectedRoute ? +this.selectedRoute : 0;
  
    this.loadData1(formattedDate, routeCode);
  }
  
  
}
