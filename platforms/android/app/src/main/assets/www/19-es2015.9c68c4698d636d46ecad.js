(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"3I1i":function(l,n,e){"use strict";e.r(n),e.d(n,"GalleryPageModuleNgFactory",(function(){return b}));var t=e("8Y7J");class u{}var o=e("pMnS"),i=e("MKJQ"),a=e("sZkV"),d=e("SVse");class r{constructor(l){this.router=l,this.imgDetails=[]}ngOnInit(){this.router.routerState.root.queryParams.subscribe(l=>{this.cameraData=JSON.parse(l.camera),this.getImgDetails(this.cameraData)})}getImgDetails(l){let n=null;try{n=JSON.parse(window.localStorage.getItem("gallery"))}catch(e){}if(n){let e=n.length;l.imageName="img-"+(e+1)+"_"+l.date,l.id=e+1,this.imgDetails=n,this.imgDetails.push(l)}else l.imageName="img-1_"+l.date,l.id=1,this.imgDetails.push(l);window.localStorage.setItem("gallery",JSON.stringify(this.imgDetails))}backToTakePhoto(){this.router.navigate(["/takePhoto"])}}var c=e("iInd"),m=t["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function g(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,9,"ion-col",[["size","12"],["size-md","12"],["size-sm","12"]],null,null,null,i.H,i.i)),t["\u0275did"](1,49152,null,0,a.s,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],{size:[0,"size"]},null),(l()(),t["\u0275eld"](2,0,null,0,7,"ion-card",[],null,null,null,i.G,i.d)),t["\u0275did"](3,49152,null,0,a.l,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](4,0,null,0,0,"img",[["style","width: 100%;"]],[[8,"src",4]],null,null,null,null)),(l()(),t["\u0275eld"](5,0,null,0,4,"ion-card-header",[],null,null,null,i.D,i.f)),t["\u0275did"](6,49152,null,0,a.n,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](7,0,null,0,2,"ion-card-subtitle",[],null,null,null,i.E,i.g)),t["\u0275did"](8,49152,null,0,a.o,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](9,0,["",""]))],(function(l,n){l(n,1,0,"12")}),(function(l,n){l(n,4,0,n.context.$implicit.imageData),l(n,9,0,n.context.$implicit.imageName)}))}function s(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,11,"ion-header",[],null,null,null,i.K,i.l)),t["\u0275did"](1,49152,null,0,a.A,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](2,0,null,0,9,"ion-toolbar",[],null,null,null,i.X,i.y)),t["\u0275did"](3,49152,null,0,a.yb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](4,0,null,0,2,"ion-title",[],null,null,null,i.V,i.w)),t["\u0275did"](5,49152,null,0,a.wb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["gallery"])),(l()(),t["\u0275eld"](7,0,null,0,4,"ion-buttons",[["slot","end"]],null,null,null,i.B,i.c)),t["\u0275did"](8,49152,null,0,a.k,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](9,0,null,0,2,"ion-button",[],null,[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.backToTakePhoto()&&t),t}),i.A,i.b)),t["\u0275did"](10,49152,null,0,a.j,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275ted"](-1,0,["back"])),(l()(),t["\u0275eld"](12,0,null,null,7,"ion-content",[["padding",""]],null,null,null,i.I,i.j)),t["\u0275did"](13,49152,null,0,a.t,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](14,0,null,0,5,"ion-grid",[],null,null,null,i.J,i.k)),t["\u0275did"](15,49152,null,0,a.z,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275eld"](16,0,null,0,3,"ion-row",[],null,null,null,i.P,i.q)),t["\u0275did"](17,49152,null,0,a.fb,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(l()(),t["\u0275and"](16777216,null,0,1,null,g)),t["\u0275did"](19,278528,null,0,d.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){l(n,19,0,n.component.imgDetails)}),null)}function f(l){return t["\u0275vid"](0,[(l()(),t["\u0275eld"](0,0,null,null,1,"app-gallery",[],null,null,null,s,m)),t["\u0275did"](1,114688,null,0,r,[c.m],null,null)],(function(l,n){l(n,1,0)}),null)}var p=t["\u0275ccf"]("app-gallery",r,f,{},{},[]),h=e("s7LF");class R{}var b=t["\u0275cmf"](u,[],(function(l){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,p]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,d.NgLocalization,d.NgLocaleLocalization,[t.LOCALE_ID]),t["\u0275mpd"](4608,h.i,h.i,[]),t["\u0275mpd"](4608,a.b,a.b,[t.NgZone,t.ApplicationRef]),t["\u0275mpd"](4608,a.Db,a.Db,[a.b,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](4608,a.Gb,a.Gb,[a.b,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](1073742336,d.CommonModule,d.CommonModule,[]),t["\u0275mpd"](1073742336,h.h,h.h,[]),t["\u0275mpd"](1073742336,h.b,h.b,[]),t["\u0275mpd"](1073742336,a.Ab,a.Ab,[]),t["\u0275mpd"](1073742336,c.n,c.n,[[2,c.s],[2,c.m]]),t["\u0275mpd"](1073742336,R,R,[]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,c.k,(function(){return[[{path:"",component:r}]]}),[])])}))}}]);