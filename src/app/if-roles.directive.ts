import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './Service/auth.service';

@Directive({
  selector: '[appIfRoles]'
})
export class IfRolesDirective implements OnInit,OnDestroy {
  private subscription: Subscription[] = [];
  @Input() appHasRole!: string;
  // roles:Array<string>=["TEACHER","STUDENT","ADMIN"]


  

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authenticationService: AuthService) { }
  ngOnDestroy(): void {
    this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());  }
  ngOnInit(): void {
    console.log(this.appHasRole)

    this.subscription.push(
    
    this.authenticationService.currentUser.subscribe(res => {
      if(!res){
        if(this.appHasRole=="public"){
          this.viewContainerRef.createEmbeddedView(this.templateRef)
        }
      }else{
        const role =res.role
      

        role!=this.appHasRole?this.viewContainerRef.clear(): this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
      
   
      })
    );
  }

}
