import useAxiosSecure from "@/Hooks/useAxiosSecure";
import ImageInput from "@/Utils/AuthForm/ImageInput";
import Input from "@/Utils/AuthForm/Input";
import SecondaryButton from "@/Utils/AuthForm/SecondaryButton";
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
            const formData = new FormData();
            formData.append("productName", productData.productName);
            formData.append("description", productData.description);
            formData.append("price", productData.price);
            formData.append("fabrics", productData.fabrics);
            formData.append("gender", productData.gender);
            formData.append("availAbleOnStock", productData.availAbleOnStock);
            productData.availableSize.forEach((size) => {
                formData.append("availableSize", size);
            });
            for (let i = 0; i < e.target.productImages.files.length; i++) {
                formData.append("productImages", e.target.productImages.files[i]);
            }
    
            // Send formData to the backend
            const response = await axiosSecure.post('/products/addProduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 200) {
                toast.success("Product Added Successfully", { id: toastId });
                e.target.reset();
                setProductData({
                    productName: "",
                    description: "",
                    price: "",
                    fabrics: "",
                    gender: "",
                    availAbleOnStock: 0,
                    availableSize: []
                });
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
    return (
        <section className=" lg:w-1/2 shadow-[0_0_50px_#D1CECD] rounded-lg  h-full container py-6 px-10">
            <form onSubmit={handleSubmit} className="mt-10 pb-10 mx-auto space-y-6 grid grid-cols-1 gap-3 justify-center h-full">
                <h1 className="text-center text-xl font-semibold">Add New Product</h1>
                <Input type="text" name={"Product Name"} onChange={(e) => setProductData({ ...productData, productName: e.target.value })} />
                <Input type="text" name={"description"} onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
                <Input type="number" name={"price"} onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
                <Input type="number" name={"availAble On Stock"} onChange={(e) => setProductData({ ...productData, availAbleOnStock: e.target.value })} />
                <Input type="text" name={"Build Material"} onChange={(e) => setProductData({ ...productData, fabrics: e.target.value })} />
                <Input type="text" name={"Gender"} onChange={(e) => setProductData({ ...productData, gender: e.target.value })} />
                <div>
                    <h3 className="font-medium my-4">Available Size</h3>
                    <div className=" grid grid-cols-4 md:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 items-center gap-4 lg:gap-0">
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
