import { Image } from "lucide-react";
const ImageInput = ({ id, name, label, onChange, width, height, imageName, imagePreview, ...inputProps }) => {
    return (
        <div className="bg-slate-300/50 rounded-xl">
            <input
                id={`image_${id}`}
                name={name}
                accept="image/*"
                multiple="true"
                type="file"
                {...inputProps}
                onChange={onChange}
                className="hidden"
            />
            {/* Label for the image input */}
            {label && (
                <p className="absolute -top-2 left-2 bg-foreground px-1 text-[12px] leading-none">
                    {label}
                </p>
            )}

            <label
                htmlFor={`image_${id}`}
                className="flex  flex-col items-center justify-center rounded-lg  p-2 text-base text-textColor-light hover:cursor-pointer w-full "
            >
                {/* Render image preview if available */}
                <div className="flex flex-wrap gap-4 justify-items-center justify-center items-center">
                    {imagePreview ? imagePreview.map((preview, index) => (
                        <div key={index} className="relative my-2">
                            <div className="h-full w-full overflow-hidden rounded-lg" style={{ width: `${width || 122}px`, height: `${height || 122}px` }}>
                                <img src={preview} alt={imageName[index] || "Image Preview"} className="h-full w-full object-cover" />
                            </div>
                            <p className="truncate text-sm" style={{ width: `${width - 20 || 100}px` }}>
                                {imageName[index]}
                            </p>
                        </div>
                    )) :
                        <>
                            {/* Default image upload container */}
                            <div
                                className="flex h-full w-full items-center justify-center rounded-lg bg-background"
                                style={{ width: `${width || 122}px`, height: `${height || 122}px` }}
                            >
                                {/* Default image upload icon */}
                                <Image size={80} />
                            </div>
                            {/* Text for uploading image */}
                            <p className="text-sm">{label}</p>
                        </>
                    }
                </div>
            </label>
        </div>
    );
};

export default ImageInput;