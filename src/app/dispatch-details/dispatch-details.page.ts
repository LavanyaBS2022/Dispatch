import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-dispatch-details',
  templateUrl: './dispatch-details.page.html',
  styleUrls: ['./dispatch-details.page.scss'],
})
export class DispatchDetailsPage {
  routeOptions: string = ''
  despatcherOptions: string = ''
  showDatePicker = false;
  selectedDate: string | null = null;
  showSecondAndThirdCards = false;
  selectedRoute: string | null = null;
  selectedDespatcherIncharge: string | null = null;
  accordionItemStates: boolean[] = [true, false, false];
  customerData: any[] = [];
  currentPanelIndex: number = 0;


  @ViewChild('datetimePicker') datetimePicker: any;

  tableHeaders: string[] = ['Item', 'qty', 'Crates','Ltr/Kg'];
  accordionItems = [
    { value: 'customer1', label: 'Customer 1', tableData: [['TM -1000', '145.00', '13', '13']] },
    { value: 'customer2', label: 'Customer 2', tableData: [['SHUBAM-1000', '96.00', '8', '8']] },
    { value: 'customer3', label: 'Customer 3', tableData: [['H S M-1000', '765.00', '64', '64']] },
  ];

  
  constructor(private apiService: ApiService) {
    this.selectedDate = new Date().toISOString();
  }

  ngOnInit() {
    this.getRoute();
    this.getRouteIncharger();
  }

  getRoute() {
    this.apiService.getRequest('/indent/getRoute').subscribe((sResponse) => {
      this.routeOptions = sResponse.data.map((item: string[]) => item[1]);
    });
  }

  getRouteIncharger() {
    this.apiService.getRequest('/fgs/getShiftIncharge').subscribe((sResponse) => {
      this.despatcherOptions = sResponse.data.map((item: string[]) => item[1]);
    });
  }

  saveData() {
    console.log('Save button clicked!');
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
    return (
      this.selectedDate !== null &&
      this.selectedRoute !== null &&
      this.selectedDespatcherIncharge !== null
    );
  }

  loadData() {
    this.showSecondAndThirdCards = true;
    this.customerData = [
      {
        customer: 'Customer 1',
        data: [
          ['Packet 1', '10 kg', '3'],
          ['Packet 2', '15 kg', '4']
        ]
      },
      {
        customer: 'Customer 2',
        data: [
          ['Packet 3', '8 kg', '1', '2'],
          ['Packet 4', '12 kg', '2', '3']
        ]
      },
      {
        customer: 'Customer 3',
        data: [
          ['Packet 3', '8 kg', '1', '2'],
          ['Packet 4', '12 kg', '2', '3']
        ]
      },
      {
        customer: 'Customer 4',
        data: [
          ['Packet 3', '8 kg', '1', '2'],
          ['Packet 4', '12 kg', '2', '3']
        ]
      },{
        customer: 'Customer 5',
        data: [
          ['Packet 3', '8 kg', '1', '2'],
          ['Packet 4', '12 kg', '2', '3']
        ]
      },
    ];
  }

  isAccordionItemOpen(index: number): boolean {
    return this.accordionItemStates[index];
  }

  toggleAccordionItem(index: number) {
    this.accordionItemStates = this.accordionItemStates.map(() => false);
    this.accordionItemStates[index] = true;
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
        this.accordionItemStates[index] = false;
        break;
    }
  }

  isLastAccordionItem(index: number): boolean {
    return index === this.accordionItemStates.length - 1;
  }
  setPanelIndex(index: number) {
    this.currentPanelIndex = index;
  }

  nextPanel() {
    if (this.currentPanelIndex < this.customerData.length) {
      this.currentPanelIndex++;
    }
  }

  prevPanel() {
    if (this.currentPanelIndex > 0) {
      this.currentPanelIndex--;
    }
  } 

  navigateEnd() {
    this.currentPanelIndex = -1;
  }
}