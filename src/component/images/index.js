import React, {useEffect, useState} from 'react';
import fetchImages from '../../services/fetchImages/fetchImages';

const Images =(props) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(false);
    
    useEffect(() => 
        {
        (async () => {
            const response = await fetchImages('cat');

            if(typeof response === 'object') {
                setImages(response)
            } else {
                setError(response)
            }
        })();
    }, []);
    
    return (
        <div className='images' data-test='imageComponent'>
            {images.length ?
                images.map(image => {
                    const {id, alt_description, urls: {thumb}, likes} = image;

                    return (
                        <div key={id} className='images-container'>
                            <img src={thumb} alt={alt_description} />
                            <p>Likes: {likes}</p>
                        </div>
                    );
                }) : ''
            }
            {error &&
                <h3>Erro: {error}</h3>
            }
        </div>
    )
}

export default Images;