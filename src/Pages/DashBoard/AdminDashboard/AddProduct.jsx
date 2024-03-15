import ImageInput from "@/Utils/AuthForm/ImageInput";
import Input from "@/Utils/AuthForm/Input";
import SecondaryButton from "@/Utils/AuthForm/SecondaryButton";
import axios from "axios";

import { useState } from "react";

const AddProduct = () => {
    const [productData, setProductData] = useState({ productName: "", description: "", brand: "", price: "", availableSize: "", availableColor: "", fabrics: "", gender: "", productImages: [] })
    const imageHostingKey = import.meta.env.VITE_IMAGE_HOST_KEY;
    const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
    const [imagePreview, setImagePreview] = useState(null);
    const [imageName, setImageName] = useState(null);

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
    
        // Create FormData object
        const formData = new FormData();
        const selectedImages = e.target.productImages.files;
    
        // Iterate through selected images
        for (let i = 0; i < selectedImages.length; i++) {
            const selectedImage = selectedImages[i];
    
            // Append each image to FormData object
            formData.append('image', selectedImage);
        }
    
        try {
            // Array to store uploaded image URLs
            const uploadedImageUrls = [];
    
            // Send a POST request for each image to the imgbb API
            for (let i = 0; i < selectedImages.length; i++) {
                const hostedPhoto = await axios.post(imageHostingAPi, formData, {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                });
    
                // Extract URL from the response and add it to the array
                const imageUrl = hostedPhoto.data.data.display_url;
                uploadedImageUrls.push(imageUrl);
            }
    
            // Update productData with all uploaded image URLs
            setProductData({ ...productData, productImages: uploadedImageUrls });
    
            // Proceed with other form data submission or processing
            console.log("Uploaded images:", uploadedImageUrls);
    
            // Example: Send productData to server or perform other actions
            // await sendProductDataToServer(productData);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };
    
    console.log(productData);
    return (
        <section className="h-full">
            <form onSubmit={handleSubmit} className="w-1/2 mx-auto space-y-6 flex flex-col justify-center h-full">
                <h1 className="text-center ">Add New Product</h1>
                <Input type="text" name={"Product Name"} onChange={(e) => setProductData({ ...productData, productName: e.target.value })} />
                <Input type="text" name={"description"} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
                <Input type="number" name={"price"} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
                <Input type="text" name={"Available Sizes"} onChange={(e) => setProductData({ ...productData, availableSize: e.target.value })} />
                <Input type="text" name={"Available Colors"} onChange={(e) => setProductData({ ...productData, availableColor: e.target.value })} />
                <Input type="text" name={"Build Material"} onChange={(e) => setProductData({ ...productData, fabrics: e.target.value })} />
                <Input type="text" name={"Gender"} onChange={(e) => setProductData({ ...productData, gender: e.target.value })} />
                {/* Input field for image selection */}
                <ImageInput name="productImages" imageName={imageName} imagePreview={imagePreview} onChange={handleImageChange} label={"Upload Product Images"} />
                <SecondaryButton title={"Add Product"} type="submit" />
            </form>
        </section>
    );
};

export default AddProduct;