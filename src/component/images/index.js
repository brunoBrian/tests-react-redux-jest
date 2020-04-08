import React, {useEffect, useState} from 'react';
import fetchImages from '../../services/fetchImages/fetchImages';

const Images =(props) => {
    const [images, setImages] = useState([]);
    
    useEffect(() => 
        {
        (async () => {
            const response = await fetchImages('cat');

            setImages(response)
        })();
    }, []);
    
    return (
        <div className='images' data-test='imageComponent'>
            {images.length && images.map(image => {
                const {id, alt_description, urls: {thumb}, likes} = image;

                return (
                    <div key={id} className='images-container'>
                        <img src={thumb} alt={alt_description} />
                        <p>Likes: {likes}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Images;