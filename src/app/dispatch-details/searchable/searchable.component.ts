import { CommonModule } from '@angular/common';
import { Component,forwardRef , EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, SearchbarCustomEvent } from '@ionic/angular';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone:true,
  imports:[IonicModule,CommonModule,FormsModule],
  selector: 'app-searchable',
  templateUrl: './searchable.component.html',
  styleUrls: ['./searchable.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchableComponent),
      multi: true
    }
  ]
})
export class SearchableComponent  implements OnChanges,ControlValueAccessor {
  @Input() title='Search';
  @Input() data:any[]=[];
  @Input() multiple=false;
  @Input() itemTextField='Name';
  @Input() route_code='Name';
  @Input() selectedRoute: any[] = [];
  @Output() routeCodeSelected: EventEmitter<string> = new EventEmitter<string>();

  @Output() selectedChange:EventEmitter<any>=new EventEmitter();

isOpen=false;
filtered:any[]=[];
  constructor() { }
  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any) {
    // write value to component
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    // set disabled state
  }
ngOnChanges(changes: SimpleChanges): void {
  this.filtered=this.data;
}
  open(){
    this.isOpen=true;
  } 
  
  cancel(){
    this.isOpen=false;
  }

  select(){
    const selectedRoute=this.data.filter((route)=>route.selectedRoute);
    this.selectedRoute=selectedRoute;
    this.selectedChange.emit(selectedRoute)
    this.isOpen=false;
  }

  leaf=(obj:any)=>
  this.itemTextField.split('.').reduce((value ,el)=>value[el],obj);

  routeSelected(){
    if(!this.multiple){
      if(this.selectedRoute.length){
        this.selectedRoute[0].selectedRoute=false;
      }
      this.selectedRoute= this.data.filter((route)=>route.selectedRoute);
      this.selectedChange.emit(this.selectedRoute);
      this.isOpen=false;
      // this.data.map((item)=>(item.selected=false))
    }
  }

  filter(event:SearchbarCustomEvent){
const filter=event.detail.value?.toLowerCase();
this.filtered=this.data.filter(
  route=>this.leaf(route).toString().toLowerCase().indexOf(filter) > -1 );
  }

  emitRouteCode(routeCode: string) {
    debugger
    this.routeCodeSelected.emit(routeCode);
    console.log("routecode",routeCode)
  }
}
