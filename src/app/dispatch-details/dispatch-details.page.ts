import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AlertController } from '@ionic/angular';  // Import AlertController from Ionic
import { Router } from '@angular/router';

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
  accordionItemStates: boolean[]=[];
  customerData: any[] = [];
  currentPanelIndex: number = -1; 
  showSaveButton: boolean = false; 
  savedPanels: Set<number> = new Set<number>();
  allPanelsSaved: boolean = false; 
  minDate: string;
  maxDate: string;
  @ViewChild('datetimePicker') datetimePicker: any;

  tableHeaders: string[] = ['Item', 'qty', 'Crates'];

  constructor(private router:Router,private apiService: ApiService,private spinner: NgxSpinnerService, private alertController: AlertController) {
    this.selectedDate = new Date().toISOString();
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    this.minDate = today.toISOString();
    this.maxDate = tomorrow.toISOString();
  }

  ngOnInit() {
  }

  // handleDateSelected() {
  //   this.getRoute();
  // }
  
  handleRouteCodeSelected(route_code: any) {
    this.selectedRoute = route_code;
    console.log('Selected Route:', this.selectedRoute);
  }

  handleRouteNameSelected(route_name: string) {
    console.log('Selected Route Name:', route_name);
  }
  
  updateCrates(packet: any) {
    const customerPacket = this.customerData.find((customer) => customer.packets.includes(packet));
    if (customerPacket) {
      const perCrateValue = packet.perCrateValue || 1; 
      packet.crates = packet.sent_qty / perCrateValue;
    }
  }

  truncateCrates(crates: number): number {
    return Math.trunc(crates);
  }
  
  getRoute() {
    const formattedDate = this.formatDate(this.selectedDate);
    this.apiService.getRoute('/master/route', formattedDate).subscribe((sResponse: any) => { 
      if (sResponse && sResponse.status && sResponse.data) {
        this.routeOptions = sResponse.data;
      } else {
        console.error('Invalid response format:', sResponse);
      }
    });
  }
  
saveData() {
  const gpNumbers = this.customerData.map(customer => customer.gp_number);
  const route_no = {
    gp_number: gpNumbers[0]
  };
  this.apiService.putRequest('/fgs/completeDispatch', route_no).subscribe((sResponse) => {
    console.log("response", sResponse);
  });
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
    this.getRoute();
  }

  allFieldsFilled(): boolean {
    return this.selectedDate !== null && this.selectedRoute !== null;
  }

  formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) || '';
  }

  setPanelIndex(index: number) {
    this.currentPanelIndex = index;
  }

  isAccordionItemOpen(index: number): boolean {
    return this.accordionItemStates[index];
  }

  toggleAccordionItem(index: number) {
    this.accordionItemStates = this.accordionItemStates.map(() => false);
    this.accordionItemStates[index] = true;
    this.currentPanelIndex = index;
  }

  handleAccordionAction(action: 'next' | 'prev' | 'end', index: number) {
    switch (action) {
      case 'next':
        if (index < this.accordionItemStates.length - 1) {
          this.toggleAccordionItem(index + 1);
          this.markAccordionHeaderAsClicked(index);
        }
        break;
      case 'prev':
        if (index > 0) {
          this.toggleAccordionItem(index - 1);
        }
        break;
      case 'end':
      if (index === this.accordionItemStates.length - 1) {
        this.closeAccordion(index); 
      }
        break;
    }
  }
  
  markAccordionHeaderAsClicked(index: number): void {
    this.savedPanels.add(index);
    this.checkAllPanelsSaved();
  }
  
  closeAccordion(index: number) {
      this.accordionItemStates[index] = false;  
    }

  isLastAccordionItem(index: number): boolean {
    return index === this.accordionItemStates.length - 1;
  }
  
  handleLoadButtonClick() {
    const formattedDate = (this.formatDate(this.selectedDate) || '')!;
    const routeCode = this.selectedRoute ? +this.selectedRoute : 0;
    this.loadData(formattedDate, routeCode);
  }

  loadData(pDate:string,route_code:number=0) {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
    this.showSecondAndThirdCards = true;
    this.apiService.getRequestbyParams('/fgs/routeDispatchDetails', pDate,route_code).subscribe((sResponse) => {
      this.customerData = sResponse.data;
      console.log("response", this.customerData);
      this.accordionItemStates = new Array(this.customerData.length).fill(false);
    });
   } 
 
   savePanelData(indentNumber: number, customer: any): void {
      const updatedData = {
      indent_number: indentNumber,
      packets: customer.packets.map((packet: any) => ({
        packet_code: packet.packet_code,
        sent_qty:Number(packet.sent_qty),  
        crates: Number(packet.crates),   
        ltrs_kgs: packet.ltrs_kgs
      }))
    };
    this.savedPanels.add(this.currentPanelIndex);
    this.checkAllPanelsSaved();
    this.apiService.putRequest('/fgs/dispatch',updatedData).subscribe((sResponse) => {
    });
    console.log(updatedData);
  }

  isPanelSaved(index: number): boolean {
    return this.savedPanels.has(index);
  }    
  
  checkAllPanelsSaved(): void {
    this.allPanelsSaved = this.customerData.every((_, index) => this.savedPanels.has(index));
  }
  
  async saveConfirmation(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Save',
      message: 'Are you sure you want to save the details?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Save',
          handler: () => {
            console.log('Save clicked');
            this.saveData();
           this.refreshPage();
          }
        }
      ]
    });
  
    await alert.present();
  }
  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }
  
  // filterRoutes(event: any) {
  //   const searchTerm = (this.searchTerm || '').toLowerCase();

  //   // Filter routeOptions based on the search term
  //   this.filteredRouteOptions = this.routeOptions.filter(route => route.route_name.toLowerCase().includes(searchTerm));
  // }
}
