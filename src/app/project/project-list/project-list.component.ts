import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewProjectComponent} from '../new-project/new-project.component';
import {InviteComponent} from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {routerAnim} from '../../animations/router.anim';
import {listAnim} from '../../animations/list.anim';
import {ProjectModal} from '../../domain';
import {ProjectService} from '../../services/project.service';
import * as _ from 'lodash';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs-compat';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    routerAnim,
    listAnim,
  ],

//  TODO: change detection produces some mouse enter problem on Project
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {

  /*projects = [
    {
      id: 1,
      name: 'business platform',
      desc: 'one description',
      coverImg: 'assets/img/covers/0.jpg'
    },
    {
      id: 2,
      name: 'business platform',
      desc: 'one description',
      coverImg: 'assets/img/covers/1.jpg'
    },
    {
      id: 3,
      name: 'business platform',
      desc: 'one description',
      coverImg: 'assets/img/covers/2.jpg'
    },
  ];*/

  // TODO: [@list]="projects.length" has some warning when not loading projects form server
  projects!: ProjectModal[];

  sub!: Subscription;

  @HostBinding('@route') state: any;

  // if use dialog must use like this
  constructor(
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private service: ProjectService
  ) { }

  ngOnInit(): void {
    this.sub = this.service.get('BkkDvwee-').subscribe(projects => {
      this.projects = projects;
      console.log('projects: ', projects);
      //  check dirty value
      this.cd.markForCheck();
    });
    console.log(this.projects)
  }

  ngOnDestroy() {
    if (this.sub)  {
      this.sub.unsubscribe();
    }
  }

  launchNewProjectDialog() {
    // the properly open dialog way
    // const newProjectRef = this.dialog.open(NewProjectComponent,
    //   // TODO: 'dark' need to be switched automatically
    //   {width: '20rem', height: '20rem', data: {dark: true} /*position: {left: '0', top: '0'}*/});
    // // here has to match with the newProject data sent back

    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;

    const newProjectRef = this.dialog.open(NewProjectComponent,
      // TODO: 'dark' need to be switched automatically
      {width: '30rem', height: '36rem',
        data: {thumbnails: this.getThumbnails(), img: selectedImg} /*position: {left: '0', top: '0'}*/});

    newProjectRef.afterClosed()
      .take(1)  // similar as unsubscribe() after once
      .filter(n => n)  // to deal with the un null or un undefined
      .map(val => ({...val, coverImg: this.getbuildImgSrc(val.coverImg)}))
      .switchMap(p => this.service.add(p))
      .subscribe(project => {
        console.log(project);
        this.projects = [...this.projects, project];

        // match with 'changeDetection: ChangeDetectionStrategy.OnPush'
        this.cd.markForCheck();

      // TODO: match the projectModal pattern
      /*this.projects = [...this.projects,
        {id: '4', name: 'new Project 1', desc: 'new project desc 1', coverImg: 'assets/img/covers/6.jpg'},
        {id: '5', name: 'new Project 2', desc: 'new project desc 2', coverImg: 'assets/img/covers/6.jpg'}
      ];*/
    });


  }

  // TODO: need to set theme switch
  launchInviteDialog() {
    // const inviteDialogRef = this.dialog.open(InviteComponent,  {width: '20rem', height: '20rem'});
    const inviteDialogRef = this.dialog.open(InviteComponent,
      {data: {members: []}});
  }

  launchEditProjectDialog(project: ProjectModal) {

    const newProjectRef = this.dialog.open(NewProjectComponent,
      // TODO: 'dark' need to be switched automatically
      {width: '30rem', height: '36rem',
        data: {thumbnails: this.getThumbnails(), project: project} /*position: {left: '0', top: '0'}*/});

    newProjectRef.afterClosed()
      .take(1)  // similar as unsubscribe() after once
      .filter(n => n)
      .map(val => ({...val, id: project.id,  coverImg: this.getbuildImgSrc(val.coverImg)}))
      .switchMap(p => this.service.update(p))
      .subscribe(project => {
        console.log(project);
        const index = this.projects.map(p => p.id).indexOf(project.id);
        this.projects =[...this.projects.slice(0,index), project, ...this.projects.slice(index  + 1 )]

        // match with 'changeDetection: ChangeDetectionStrategy.OnPush'
        this.cd.markForCheck();

        // TODO: match the projectModal pattern
        /*this.projects = [...this.projects,
          {id: '4', name: 'new Project 1', desc: 'new project desc 1', coverImg: 'assets/img/covers/6.jpg'},
          {id: '5', name: 'new Project 2', desc: 'new project desc 2', coverImg: 'assets/img/covers/6.jpg'}
        ];*/
      });
  }

  //  TODO: cannot change image when edit or create project
  launchConfirmDialog(project: ProjectModal) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {data: {title: 'Delete Project', content: 'Are you sure to delete project'}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .switchMap(_ => this.service.delete(project))
      .subscribe(proj => {
      console.log(proj);
      this.projects = this.projects?.filter(p => p.id !== proj.id);
    });

    // match with 'changeDetection: ChangeDetectionStrategy.OnPush'
    this.cd.markForCheck();
  }

  // get thumb image
  private getThumbnails(): string[] {
    return _.range(0, 40)
      .map((i: number) => `/assets/img/covers/${i}_tn.jpg`)
  }

  // get the big pic
  private getbuildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ?
      img.split('_')[0] + '.jpg' :
      img;
  }

}
