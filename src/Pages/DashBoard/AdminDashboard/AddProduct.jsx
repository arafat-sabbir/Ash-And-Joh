import useAxiosSecure from "@/Hooks/useAxiosSecure";
import ImageInput from "@/Utils/AuthForm/ImageInput";
import Input from "@/Utils/AuthForm/Input";
import SecondaryButton from "@/Utils/AuthForm/SecondaryButton";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const AddProduct = () => {
    const [productData, setProductData] = useState({
        productName: "",
        description: "",
        price: "",
        fabrics: "",
        gender: "",
        availAbleOnStock: 0,
        availableSize: []
    });
    const imageHostingKey = import.meta.env.VITE_IMAGE_HOST_KEY;
    const imageHostingAPi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
    const [imagePreview, setImagePreview] = useState(null);
    const [imageName, setImageName] = useState(null);
    const axiosSecure = useAxiosSecure();

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
        const toastId = toast.loading("Adding Product");

        try {
            const selectedImages = e.target.productImages.files;

            const productImages = await Promise.all(
                Array.from(selectedImages).map(async (image) => {
                    const formData = new FormData();
                    formData.append('image', image);

                    const hostedPhoto = await axios.post(imageHostingAPi, formData, {
                        headers: {
                            'content-type': 'multipart/form-data'
                        }
                    });

                    return hostedPhoto.data.data.display_url;
                })
            );

            // Verify uploaded image URLs
            console.log("Uploaded images:", productImages);

            // Update productData with all uploaded image URLs
            setProductData(prevState => {
                console.log("data with image", { ...prevState, productImages: productImages });
                return { ...prevState, productImages: productImages };
            });
            console.log("data with image", productData);
            // Send product data to the backend
            const response = await axiosSecure.post('/products/addProduct', productData);
            console.log(response.data);
            if (response.status === 200) {
                toast.success("Product Added Successfully", { id: toastId });
                e.target.reset();
                setProductData(prevState => ({
                    ...prevState,
                    productImages: [] // Clear productImages state
                }));
                setImagePreview(null); // Clear imagePreview state
            } else {
                toast.error(response.data.message || "Error Adding Product", { id: toastId });
            }
            console.log("Backend Response:", response.data);
        } catch (error) {
            console.error("Error uploading images or sending product data:", error);
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

    console.log(productData);
    return (
        <section className="h-full">
            <form onSubmit={handleSubmit} className="w-1/2 mx-auto space-y-6 flex flex-col justify-center h-full">
                <h1 className="text-center ">Add New Product</h1>
                <Input type="text" name={"Product Name"} onChange={(e) => setProductData({ ...productData, productName: e.target.value })} />
                <Input type="text" name={"description"} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
                <Input type="number" name={"price"} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
                <Input type="number" name={"availAble On Stock"} onChange={(e) => setProductData({ ...productData, availAbleOnStock: e.target.value })} />
                <Input type="text" name={"Build Material"} onChange={(e) => setProductData({ ...productData, fabrics: e.target.value })} />
                <Input type="text" name={"Gender"} onChange={(e) => setProductData({ ...productData, gender: e.target.value })} />
                <div>
                    <h3 className="font-medium my-4">Available Size</h3>
                    <div className="flex items-center gap-8">
                        <div className="flex gap-2">
                            <input type="checkbox" value={"S"} onChange={handleAvailableSize} className="checkbox  checkbox-neutral" />
                            <span>S</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" value={"M"} onChange={handleAvailableSize} className="checkbox  checkbox-neutral" />
                            <span>M</span>
                        </div> <div className="flex gap-2">
                            <input type="checkbox" value={"L"} onChange={handleAvailableSize} className="checkbox  checkbox-neutral" />
                            <span>L</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" value={"XL"} onChange={handleAvailableSize} className="checkbox  checkbox-neutral" />
                            <span>XL</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" value={"XXL"} onChange={handleAvailableSize} className="checkbox checkbox-neutral" />
                            <span>XXL</span>
                        </div>
                    </div>
                </div>
                {/* Input field for image selection */}
                <ImageInput name="productImages" imageName={imageName} imagePreview={imagePreview} onChange={handleImageChange} label={"Upload Product Images"} />
                <SecondaryButton title={"Add Product"} type="submit" />
            </form>
        </section>
    );
};

export default AddProduct;
