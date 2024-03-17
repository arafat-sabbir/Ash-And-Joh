import { useLocation, useParams } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams()
    const location = useLocation()
    console.log("id", id, "location", location);
    return (
        <div>
From Product Detail {id}
        </div>
    );
};

export default ProductDetail;