import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take, startWith, switchMap, shareReplay } from 'rxjs/operators';

import { Channel } from '../../../common/generated-types';
import { DataService } from '../../../core/providers/data/data.service';

import { GET_CHANNELS } from './multicatalog.graphql';

@Component({
    selector: 'vsf-multicatalog-list',
    templateUrl: './multicatalog-list.component.html',
    styleUrls: ['./multicatalog-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class MulticatalogListComponent implements OnInit {

    channels$: Observable<Channel[]> | undefined;

    tiendas: Channel[] = [];

    constructor(
      private dataService: DataService,
      private router: Router
    ) { }

    ngOnInit() {
        this.channels$ = this.dataService.query(GET_CHANNELS).pipe(
          take(1),
          map(data => data.channels)
        );

        this.channels$.toPromise().then((data) => {
            this.tiendas = data;
        }).catch((e) => console.error("ops! No se pudo buscar los canales", e));
    }

    selectChannel(channel: Channel) {
      // TODO: refactor modo PoC 
      // crear un servicio injectable que gestione el canal seleccionado
      // ... o usar el state.service
      this.dataService.resetCache();
      localStorage.setItem("selectedChannelToken", channel.token);
      this.router.navigate(['/']);
    }

}
