import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

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


  public nomeUsuario: string = "Charles Franca do Codigo";
	
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private movieProvider: MoovieProvider) 
  {
	  
  }
	
  public somaDoisNumeros(num1:number, num2:number): void
  {
	  alert(num1 + num2);	
  }

  ionViewDidLoad() 
  {
    this.movieProvider.getLatestMovies().subscribe(data=>
    {
      const response = (data as any);
      const objetoRetorno = JSON.parse(response._body);
      this.listaFilmes = objetoRetorno.results;
      console.log(objetoRetorno);
    },
    error => 
    {
      console.log(error);
    });
  }

}
