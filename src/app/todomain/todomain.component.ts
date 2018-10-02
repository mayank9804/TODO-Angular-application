import { Component,ViewChild,AfterViewInit,ElementRef  } from "@angular/core";
import { trigger,state,transition,keyframes,style,animate} from "@angular/animations";


@Component({
    
    templateUrl : './todomain.component.html',
    styleUrls : ['./todomain.component.css'],
    animations: [
        trigger('focusPanel',[
            state('inactive',style({
                transform:'scale(1)'
            })),
            state('active',style({
                transform:'scale(1.05)'
            })),
            transition('inactive => active',animate('500ms ease-in')),
            transition('active => inactive',animate('500ms ease-out')),
        ]),
        trigger('note',[
            state('inactive',style({
                opacity:'0'
            })),
            state('active',style({
                opacity:'1'
            })),
            transition('inactive <=> active',animate('500ms ease-in-out'))
        ]),
        trigger('onItemEnter',[
            state('in',style({transform:'translateY(0)',opacity:1})),
            transition('void => *',[
                style({transform:'translateY(-100%)',opacity:0}),
                animate('300ms ease-in')
            ]),
            transition('* => void',animate('300ms ease-out',
            style({opacity:0,transform:'translateY(50%) scale(0)'})))
        ])
    ]
})
export class TodoComponent implements AfterViewInit{
    state:string = 'inactive';
    todoTasks:any[] = [];
    editMode:boolean = false;
    editIndex :string;
    @ViewChild('addTaskInput') addTaskInput:ElementRef;
    toggleFocus():void{
        this.state = (this.state=='inactive')?'active':'inactive';
    }
    submitItem(item){
        if(item.target.value.length>0){
            if(!this.editMode){
                this.todoTasks.push(item.target.value);
                item.target.value = '';
            }
            else{
                this.deleteMe(this.editIndex);
                this.editMode = !this.editMode;
                this.submitItem(item);
            }
        }
    }
    deleteMe(index){
        this.todoTasks = this.todoTasks.filter(e=>e!=index);
    }
    editMe(item){
        this.editMode = true;
        this.addTaskInput.nativeElement.value = item;
        // this.toggleFocus();
        // this.toggleFocus();
        this.editIndex = item;
    }
    canceledEdit(){
        this.editMode = !this.editMode;
        this.editIndex = '';
        this.addTaskInput.nativeElement.value ='';
    }
    ngAfterViewInit() {
        
    }
}