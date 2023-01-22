import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  constructor() { }

  ngOnInit(): void {

  }
  //To hold value from the parent
  @Input() item:string | undefined ;  //To hold value from the parent

  @Output() onCancel = new EventEmitter(); //to generate an event
  @Output() onDelete = new EventEmitter();

  cancel(){
    this.onCancel.emit();
  }
  delete(){
    this.onDelete.emit(this.item)
    //alert('Delete')
  }
}
