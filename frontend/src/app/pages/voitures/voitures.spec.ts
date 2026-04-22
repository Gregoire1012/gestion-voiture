import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoituresComponent } from './voitures.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from '../../services/api.service';


describe('VoituresComponent', () => {
  let component: VoituresComponent;
  let fixture: ComponentFixture<VoituresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VoituresComponent,
        HttpClientTestingModule
      ],
      providers: [ApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(VoituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty voitures list initially', () => {
    expect(component.voitures).toEqual([]);
  });

  it('should initialize voiture object correctly', () => {
    expect(component.voiture).toBeDefined();
    expect(component.voiture.matricule).toBe('');
  });
});