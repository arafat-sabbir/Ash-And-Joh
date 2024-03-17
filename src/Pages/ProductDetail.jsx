import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { useLocation, useParams } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams();
    const { state } = useLocation();

    return (
        <div>
            From Product Detail {state.productName}
            {
                state &&
                <Carousel>
                    {state.productImages.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt={`Image ${index + 1}`} />
                        </div>
                    ))}
                </Carousel>
            }
        </div>
    );
};

export default ProductDetail;
