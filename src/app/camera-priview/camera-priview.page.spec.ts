import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CameraPriviewPage } from './camera-priview.page';

describe('CameraPriviewPage', () => {
  let component: CameraPriviewPage;
  let fixture: ComponentFixture<CameraPriviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraPriviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CameraPriviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
