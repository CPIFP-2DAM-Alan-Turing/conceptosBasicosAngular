import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonAbout } from 'src/app/core/models/person-about';

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
    public persons: PersonAbout[];

    constructor(private router: Router) {
        this.persons = [
            {
                id: 1,
                firstName: "Marina",
                lastName: "Ruiz Artacho",
                jobPosition: "Frontend Developer Jr.",
                image: "assets/images/about/marina-ruiz-avatar.jpg",
                imageAlt: "Fotografía de Marina Ruiz",
                githubUrl: "https://github.com/marruiart",
                linkedinUrl: "https://www.linkedin.com/in/marruiart/",
                description: "Me desenvuelvo bien en Java, HTML, CSS, JavaScript y SQL. Tengo conocimientos de PHP, Python y C. He utilizado tecnologias como Android, AWS, mongoDB, Node.js y Angular."
            }
            // TODO: añadir datos de Juanma
        ]
    }

    ngOnInit() {
    }

    /**
     * Navigate to home page
     */
    home() {
        this.router.navigate(['/home']);
    }
}
