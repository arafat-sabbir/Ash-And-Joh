import { useLocation, useParams } from "react-router-dom";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import ImageInput from "@/Utils/AuthForm/ImageInput";
import Input from "@/Utils/AuthForm/Input";
import SecondaryButton from "@/Utils/AuthForm/SecondaryButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditProduct = () => {
    const {id} = useParams()
    const {state:PrevProductData} = useLocation()
    console.log(PrevProductData.availableSize);
    const [productData, setProductData] = useState({
        productName: PrevProductData.productName,
        description: PrevProductData.description,
        price: PrevProductData.price,
        fabrics: PrevProductData.fabrics,
        gender: PrevProductData.gender,
        availableSize: PrevProductData.availableSize,
        availAbleOnStock: PrevProductData.availAbleOnStock // Add availAbleOnStock
    });
    
    const [imagePreview, setImagePreview] = useState(null);
    const [imageName, setImageName] = useState(null);
    const axiosSecure = useAxiosSecure();
    useEffect(()=>{
        setImagePreview(PrevProductData.productImages)
        setProductData(PrevProductData)
    },[])
    console.log(productData,"productData");
    const handleImageChange = (event) => {
        const selectedImages = event.target.files;
        console.log(selectedImages);
        let previewImages = [];
        let imageNames = [];
        if (selectedImages) {
            // Iterate through selected images
            for (let i = 0; i < selectedImages.length; i++) {
                const reader = new FileReader();
                const selectedImage = selectedImages[i];
                reader.onload = () => {
                    // Update image preview state
                    previewImages.push(reader.result);
                    setImagePreview([...previewImages]);
                    // Update image name state
                    imageNames.push(selectedImage.name);
                    setImageName([...imageNames]);
                };
                reader.readAsDataURL(selectedImage);
            }
        } else {
            // Reset image preview and name states if no image selected
            setImagePreview(null);
            setImageName(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("productName", productData.productName);
            formData.append("description", productData.description);
            formData.append("price", productData.price);
            formData.append("fabrics", productData.fabrics);
            formData.append("gender", productData.gender);
            formData.append("availAbleOnStock", productData.availAbleOnStock);
            // Append each available size individually
            productData.availableSize.forEach((size) => {
                formData.append("availableSize[]", size);
            });
            // Append each image separately
            for (let i = 0; i < imagePreview.length; i++) {
                formData.append("productImages", imagePreview[i]);
            }
            console.log(formData,"faldj");
            // Send formData to the backend
            // const response = await axiosSecure.patch(`/products/editProduct/${id}`, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });
            
            // if (response.status === 200) {
            //     toast.success("Product Updated Successfully", { id: toastId });
            //     e.target.reset();
            //     setProductData({
            //         productName: "",
            //         description: "",
            //         price: "",
            //         fabrics: "",
            //         gender: "",
            //         availAbleOnStock: 0,
            //         availableSize: []
            //     });
            //     setImagePreview(null); // Clear imagePreview state
            // } else {
            //     toast.error(response.data.message || "Error Updating Product", { id: toastId });
            // }
            // console.log("Backend Response:", response.data);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };
    
    

    const handleAvailableSize = (e) => {
        const size = e.target.value;
        if (e.target.checked) {
            setProductData(prevState => ({
                ...prevState,
                availableSize: [...prevState.availableSize, size] // Add size to availableSize array
            }));
        } else {
            setProductData(prevState => ({
                ...prevState,
                availableSize: prevState.availableSize.filter((facility) => facility !== size) // Remove size from availableSize array
            }));
        }
    };

    return (
        <section className="h-full">
            <form onSubmit={handleSubmit} className="w-1/2 mx-auto space-y-6 flex flex-col justify-center h-full">
                <h1 className="text-center ">Edit  Product</h1>
                <Input type="text" defaultValue={PrevProductData.productName} name={"Product Name"} onChange={(e) => setProductData({ ...productData, productName: e.target.value })} />
                <Input defaultValue={PrevProductData.description} type="text" name={"description"} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
                <Input  defaultValue={PrevProductData.price} type="number" name={"price"} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
                <Input defaultValue={PrevProductData.fabrics} type="text" name={"Build Material"} onChange={(e) => setProductData({ ...productData, fabrics: e.target.value })} />
                <Input type="text" name={"Gender"}  defaultValue={PrevProductData.gender}  onChange={(e) => setProductData({ ...productData, gender: e.target.value })} />
                <Input type="number" name={"availAble On Stock"} defaultValue={PrevProductData.availAbleOnStock} onChange={(e) => setProductData({ ...productData, availAbleOnStock: e.target.value })} />
                <div>
                    <h3 className="font-medium my-4">Available Size</h3>
                    <div className="flex items-center gap-8">
                        <div className="flex gap-2">
                            <input type="checkbox" value="S" onChange={handleAvailableSize} checked={productData.availableSize.includes("S")} className="checkbox  checkbox-neutral" />
                            <span>S</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" value="M" onChange={handleAvailableSize} checked={productData.availableSize.includes("M")} className="checkbox  checkbox-neutral" />
                            <span>M</span>
                        </div> 
                        <div className="flex gap-2">
                            <input type="checkbox" value="L" onChange={handleAvailableSize} checked={productData.availableSize.includes("L")} className="checkbox  checkbox-neutral" />
                            <span>L</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" value="XL" onChange={handleAvailableSize} checked={productData.availableSize.includes("XL")} className="checkbox  checkbox-neutral" />
                            <span>XL</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" value="XXL" onChange={handleAvailableSize} checked={productData.availableSize.includes("XXL")} className="checkbox checkbox-neutral" />
                            <span>XXL</span>
                        </div>
                    </div>
                </div>
                                <ImageInput name="productImages" imageName={imageName} imagePreview={imagePreview} onChange={handleImageChange} label={"Upload Product Images"} />
                <SecondaryButton title={"Edit Product"} type="submit" />
            </form>
        </section>
    );
};

export default EditProduct;

