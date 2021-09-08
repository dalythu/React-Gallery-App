import React, { Component } from 'react';
import axios from 'axios';
import apiKey from './Components/Config';
import PhotoContainer from './Components/PhotoContainer';
import { 
  BrowserRouter,
  Switch, 
  Route 
} from 'react-router-dom';
import Search from './Components/Search';
import Nav from './Components/Nav';
import NotFound from './Components/NotFound';

class App extends Component {
  constructor() {
    super();
    this.state = {
      dogPhotos: [],
      catPhotos: [],
      computerPhotos: [],
      customPhotos: [],
    }
    this.getCustomPhotos = this.getCustomPhotos.bind(this);
  }

  componentDidMount(){
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=dogs&per_page=24&format=json&nojsoncallback=1&api_key=${apiKey}`)
    .then(response => 
      this.setState({
        dogPhotos: response.data.photos.photo,
      }))
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=cats&per_page=24&format=json&nojsoncallback=1&api_key=${apiKey}`)
    .then(response => 
      this.setState({
        catPhotos: response.data.photos.photo,
      }))
      .catch(error => {
        console.log('Loading data', error)
      })

      axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=computers&per_page=24&format=json&nojsoncallback=1&api_key=${apiKey}`)
    .then(response => 
      this.setState({
        computerPhotos: response.data.photos.photo,
      }))
  }

  getCustomPhotos = (query) => {
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&tags=${query}&per_page=24&format=json&nojsoncallback=1&api_key=${apiKey}`)
    .then(response => 
      this.setState({
        customPhotos: response.data.photos.photo,
      }))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Search getPhotos={ this.getCustomPhotos }/>
          <Nav/>
          <Switch>
            <Route exact path='/' render={() => <PhotoContainer photos={this.state.dogPhotos}/>}/>
            <Route path='/dogs' render={() => <PhotoContainer photos={this.state.dogPhotos}/>}/>
            <Route path='/cats' render={() => <PhotoContainer photos={this.state.catPhotos}/>}/>
            <Route path='/computers' render={() => <PhotoContainer photos={this.state.computerPhotos}/>}/>
            <Route path='/search/:query' render={() => <PhotoContainer photos={this.state.customPhotos}/>}/>
            <Route component={ NotFound }/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;