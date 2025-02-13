import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProgramsComponent } from './programs/programs.component';
import { StartWorkoutComponent } from './workout/start-workout/start-workout.component';

export const routes: Routes = [
    {
        path: '', component: StartWorkoutComponent
    },
    {
        path: 'workout', component: StartWorkoutComponent
    },
    {
        path: 'programs', component: ProgramsComponent
    },
    {
        path: 'user-profile', component: UserProfileComponent
    }
];
