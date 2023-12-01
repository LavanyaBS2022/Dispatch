import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dispatch-details',
  templateUrl: './dispatch-details.page.html',
  styleUrls: ['./dispatch-details.page.scss'],
})
export class DispatchDetailsPage {
  showDatePicker = false;
  selectedDate: string | null = null;
  showSecondAndThirdCards = false;
  selectedRoute: string | null = null;
  selectedDespatcherIncharge: string | null = null;

  @ViewChild('datetimePicker') datetimePicker: any;
  tableHeaders: string[] = ['Packet Name ', 'Weight', 'Crates', 'FGS Qty', 'FGS Crates'];

  accordionItems = [
    { value: 'customer1', label: 'Customer 1', tableData: [['TM -1000', '145.00', '13', '145.00', '13']] },
    { value: 'customer2', label: 'Customer 2', tableData: [['SHUBAM-1000', '96.00', '8', '96.00', '8']] },
    { value: 'customer3', label: 'Customer 3', tableData: [['H S M-1000', '765.00', '64', '765.00', '64']] },
    // Add more accordion items as needed
  ];
  routeOptions: string[] = ['BHADRAVATHI-1-101', 'SHIMOGA-1-103', 'CHITRADURGA-2-113'];
  despatcherOptions: string[] = ['MANJAPPA KADEMANE', 'MANJUNATH.G', 'RAJU MAHADEVAPPA SAHUKAR'];

  constructor(private alertController: AlertController, private modalController: ModalController) { }

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
    // Handle the selected date here if needed
    console.log('Selected Date:', event.detail.value);
    this.selectedDate = event.detail.value;

    // Close the date picker
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
  }

  isAccordionItemOpen(index: number): boolean {
    return this.accordionItemStates[index];
  }

// Assuming the first accordion is initially open
// Assuming the first accordion is initially open
accordionItemStates: boolean[] = [true, false, false];

toggleAccordionItem(index: number) {
  // Close all accordions
  this.accordionItemStates = this.accordionItemStates.map(() => false);
  // Open the clicked accordion
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
      // Close the current accordion
      this.accordionItemStates[index] = false;
      break;
  }
}

isLastAccordionItem(index: number): boolean {
  return index === this.accordionItemStates.length - 1;
}


}