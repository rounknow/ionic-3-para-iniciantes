import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage 
{
  public objetoFeed = 
  {
    titulo: "Charles Franca",
    data: "November 5, 1995",
    descricao: "Estou criando um app incrivel...",
    quantLikes: 12,
    quantComments: 4,
    tempoComment: "11h ago teste"

  }

  public listaFilmes = new Array<any>();
  public page = 1;
  public nomeUsuario: string = "Charles Franca do Codigo";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;
	
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MoovieProvider, public loadingCtrl: LoadingController) 
  {
	  
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fechaCarregando()
  {
    this.loader.dismiss();
  }
	
  public somaDoisNumeros(num1:number, num2:number): void
  {
	  alert(num1 + num2);	
  }

  doRefresh(refresher) 
  {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }

  ionViewDidEnter() 
  {
    this.carregarFilmes();
  }

  carregarFilmes(newPage: boolean = false)
  {
    this.abreCarregando();
    this.movieProvider.getLatestMovies(this.page).subscribe(data=>
    {
      const response = (data as any);
      const objetoRetorno = JSON.parse(response._body);

      if(newPage)
      {
        this.listaFilmes = this.listaFilmes.concat(objetoRetorno.results);
        this.infiniteScroll.complete();
      }
      else
      {
        this.listaFilmes = objetoRetorno.results;
      }
      this.fechaCarregando();
      if(this.isRefreshing)
      {
        this.refresher.complete();
        this.isRefreshing = false;
      }
    },
    error => 
    {
      console.log(error);
      this.fechaCarregando();
    });
  }

  abrirDetalhes(filme)
  {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

  doInfinite(infiniteScroll) 
  {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

}
