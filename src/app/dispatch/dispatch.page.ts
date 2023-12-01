import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HostListener } from '@angular/core';
import { Dialog } from '@capacitor/dialog';
import { FolderPage } from '../folder/folder.page';



@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.page.html',
  styleUrls: ['./dispatch.page.scss'],
})
export class DispatchPage {

  showDatePicker = false;
  selectedDate: string | null = null; 
  showSecondAndThirdCards = false;
  selectedRoute: string | null = null;
  selectedDespatcherIncharge: string | null = null;
  focusedRowIndex: number | null = null;
focusedColIndex: number | null = null;

  @ViewChild('datetimePicker') datetimePicker: any;

 tableHeaders: string[] = ['Packet Name ', 'Weight', 'Crates', 'FGS Qty','FGS Crates','Edit'];

 tableData: string[][] = [
   ['TM -1000', '145.00', '13', '145.00', '13',''],
   ['TM 510ML', '180.54', '15', '180.54', '15',''],
   ['SHUBAM-1000', '96.00', '8', '96.00', '8',''],
   ['SHUBAM 510ML', '23.46', '2', '23.46', '2',''],
   ['H S M-1000', '765.00', '64', '765.00', '64',''],
 ];

 routeOptions: string[] = ['BHADRAVATHI-1-101', 'SHIMOGA-1-103', 'CHITRADURGA-2-113'];
 despatcherOptions: string[] = ['MANJAPPA KADEMANE', 'MANJUNATH.G', 'RAJU MAHADEVAPPA SAHUKAR'];

  constructor(private alertController:AlertController,private modalController: ModalController) {
    this.selectedDate = new Date().toISOString();
  }

  saveData() {
    console.log('Save button clicked!'); 
  }

  openDatePicker() {
    this.showDatePicker = true;
    setTimeout(() => {
      this.datetimePicker.open();
    }, 0);  }
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

    // onInputFocus(rowIndex: number, colIndex: number) {
    //   this.focusedRowIndex = rowIndex;
    //   this.focusedColIndex = colIndex;
    // }
    
    // onInputBlur() {
    //   this.focusedRowIndex = null;
    //   this.focusedColIndex = null;
    // }
    
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (this.focusedRowIndex !== null && this.focusedColIndex !== null) {
        // Handle keyboard events only if an input is focused
        // You can use this.focusedRowIndex and this.focusedColIndex here
      }
    }  
  
    async editRow(rowIndex: number) {
      const modal = await this.modalController.create({
        component: FolderPage, // Replace with the actual component for your edit popup
        componentProps: {
          rowData: this.tableData[rowIndex], // Pass the data of the clicked row to the popup
        },
      });
  
      await modal.present();
    }

}
