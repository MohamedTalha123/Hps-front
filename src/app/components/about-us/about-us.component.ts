import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  features = [
    { title: 'Quality', description: 'We offer only the finest watches.' },
    { title: 'Experience', description: 'Over a decade of expertise in watches.' },
    { title: 'Service', description: 'Exceptional customer service, always.' },
    { title: 'Selection', description: 'Wide range of brands and styles.' }
  ];
  brands = [
    
      { 
        name: 'CASIO', 
        logo: '../../../assets/images/brands/casio.png',
        description: 'Known for their durability and innovation, Casio watches blend functionality with style. From digital to analog, they offer a wide range of timepieces suitable for every occasion.'
      },
      { 
        name: 'OMEGA', 
        logo: '../../../assets/images/brands/omega.png',
        description: 'Omega is synonymous with luxury and precision. Their watches have been worn on the moon and in James Bond films, embodying both adventure and sophistication.'
      },
      { 
        name: 'ROLEX', 
        logo: '../../../assets/images/brands/rolex.png',
        description: 'Rolex stands at the pinnacle of luxury watchmaking. Each timepiece is a masterpiece of engineering and design, symbolizing success and excellence.'
      },
      { 
        name: 'FESTINA', 
        logo: '../../../assets/images/brands/festina.png',
        description: 'Festina combines Swiss precision with contemporary design. Their watches are perfect for those who appreciate both style and functionality in their timepieces.'
      },
      { 
        name: 'DANIEL HECHTER', 
        logo: '../../../assets/images/brands/daniel_hechter.png',
        description: 'Daniel Hechter watches embody Parisian chic. With elegant designs and attention to detail, they offer sophisticated timepieces for the modern individual.'
      },
      { 
        name: 'YONGER & BRESSON', 
        logo: '../../../assets/images/brands/yonger_bresson.png',
        description: 'Yonger & Bresson brings French creativity to watchmaking. Their timepieces blend traditional craftsmanship with contemporary aesthetics, offering unique and stylish options.'
      },
      { 
        name: 'MORGAN', 
        logo: '../../../assets/images/brands/morgan.png',
        description: 'Morgan watches capture the essence of French fashion. With trendy designs and affordable luxury, they cater to those who want to make a statement with their timepiece.'
      },
      { 
        name: 'PACO RABANNE', 
        logo: '../../../assets/images/brands/paco_rabanne.png',
        description: 'Paco Rabanne watches are as avant-garde as the fashion house itself. These timepieces are perfect for those who dare to be different and appreciate bold, innovative designs.'
      },
      { 
        name: 'YEMA', 
        logo: '../../../assets/images/brands/yema.png',
        description: 'YEMA, a French watchmaking pioneer, is known for its robust and adventurous timepieces. Their watches have accompanied explorers and astronauts, embodying a spirit of discovery.'
      },
      { 
        name: 'RHYTHM', 
        logo: '../../../assets/images/brands/rhythm.png',
        description: 'Rhythm combines Japanese precision with global design influences. Their watches offer reliable timekeeping with a touch of artistic flair, suitable for everyday wear and special occasions.'
      },
    
  ];
  constructor() {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}

