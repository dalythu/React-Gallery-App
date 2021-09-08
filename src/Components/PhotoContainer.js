import React from 'react';
import Photo from './Photo';

const PhotoContainer = (props) => {

        let photos;
        if(props.photos.length > 0){
          photos = props.photos.map(photo => (
            <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`} 
            key={photo.id} />
          ))
        } else {
          photos = <p>There were no results. Please try again.</p>
        }

        return(
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {photos}
            </ul>
        </div>
      )
  }

export default PhotoContainer;