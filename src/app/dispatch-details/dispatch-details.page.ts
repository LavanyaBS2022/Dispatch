import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dispatch-details',
  templateUrl: './dispatch-details.page.html',
  styleUrls: ['./dispatch-details.page.scss'],
})
export class DispatchDetailsPage {
  routeOptions: string = '';
  despatcherOptions: string = '';
  showDatePicker = false;
  selectedDate: string | null = null;
  showSecondAndThirdCards = false;
  selectedRoute: string | null = null;
  selectedDespatcherIncharge: string | null = null;
  accordionItemStates: boolean[] = [true, false, false];
  customerData: any[] = [];
  currentPanelIndex: number = 0;
  showSaveButton: boolean = false; // New flag to control save button visibility

  @ViewChild('datetimePicker') datetimePicker: any;

  tableHeaders: string[] = ['Item', 'qty', 'Crates', 'Ltr/Kg'];
  accordionItems = [
    { value: 'customer1', label: 'Customer 1', tableData: [['TM -1000', '145.00', '13', '13']] },
    { value: 'customer2', label: 'Customer 2', tableData: [['SHUBAM-1000', '96.00', '8', '8']] },
    { value: 'customer3', label: 'Customer 3', tableData: [['H S M-1000', '765.00', '64', '64']] },
  ];

  constructor(private apiService: ApiService,private spinner: NgxSpinnerService) {
    this.selectedDate = new Date().toISOString();
  }

  ngOnInit() {
    this.getRoute();
    this.loadData1("26-01-24",1);
  }

  getRoute() {
    debugger
    this.apiService.getRequest('master/route').subscribe((sResponse) => {
      this.routeOptions = sResponse.data.map((item: string[]) => item[1]);
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

  loadData() {
    this.showSecondAndThirdCards = true;
    this.customerData = [
      { customer: 'Customer 1', data: [['Packet 1', '10 kg', '3'], ['Packet 2', '15 kg', '4']] },
      { customer: 'Customer 2', data: [['Packet 3', '8 kg', '1', '2'], ['Packet 4', '12 kg', '2', '3']] },
      { customer: 'Customer 3', data: [['Packet 3', '8 kg', '1', '2'], ['Packet 4', '12 kg', '2', '3']] },
      { customer: 'Customer 4', data: [['Packet 3', '8 kg', '1', '2'], ['Packet 4', '12 kg', '2', '3']] },
      { customer: 'Customer 5', data: [['Packet 3', '8 kg', '1', '2'], ['Packet 4', '12 kg', '2', '3']] },
    ];
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

  loadData1(pDate: string, route_code: number = 0) {
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
  
}
