import useAuth from "@/Hooks/useAuth";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import SecondaryButton from "@/Utils/AuthForm/SecondaryButton";
import { useState } from "react";
import { toast } from "sonner";
import { LuUpload } from "react-icons/lu";

const UserProfile = () => {
  const { userData, user, setUserData } = useAuth();
  const [update, setUpdate] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [imagePreview, setImagePreview] = useState(null);
  const [photoName, setPhotoName] = useState(null);

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setPhotoName(selectedImage.name);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
      setPhotoName(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (e.target.profileImage.files[0]) {
      formData.append("profileImage", e.target.profileImage.files[0]);
    }
    formData.append("username", e.target.username.value);

    const toastId = toast.loading("Updating Profile");

    try {
      const res = await axiosSecure.put(
        `/user/updateUserData/${userData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserData(res.data.user)
      toast.success("Profile Updated", { id: toastId });
      setUpdate(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile", { id: toastId });
    }
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-4">
      <div className="w-1/2 h-full  mx-auto flex flex-col justify-center items-center gap-4 ">
        <form onSubmit={handleSubmit} className="space-y-4 border-2 px-32 py-10" >
          <img className="mx-auto w-32 h-32 rounded-xl" src={userData.profilePicture || user.photoURL} alt="" />
          <p className="flex items-center"> Name: <input required name="username" disabled={!update} type="text" className="disabled:bg-transparent bg-transparent border-2 input input-bordered disabled:border-0 disabled:text-black focus:outline-none" defaultValue={userData?.username} /></p>
          <p className="flex gap-2"> Email: <span>{userData?.userEmail}</span></p>

          <div className={`form-control ${update ? "block" : "hidden"}`}>
            <label className="label">
              <span className="label-text">Photo</span>
            </label>
            <div className="relative w-full mb-20 mx-auto">
              <label className="label absolute cursor-pointer -z-1 input pt-2 opacity-100   input-bordered bg-gray-100 hover:bg-gray-100 border-2 border-gray-300 w-full h-36 ">
                <img src={imagePreview || userData.profilePicture} className="h-32 w-44" alt="profile image" />
                <span className="label-text ">{photoName?.slice(0, 30) || (<div className="flex justify-center items-center gap-2"><LuUpload size={26} /> <p>Upload Profile Picture</p></div>)}</span>
              </label>
              <input
                onChange={handlePhotoUpload}
                accept="image/*"
                type="file"
                placeholder="upload your Photo"
                name="profileImage"
                required
                className="input w-full h-20  cursor-pointer pt-2 z-50 opacity-0 input-bordered bg-gray-100 hover:bg-gray-100 "
              />
            </div>
          </div>
          <div className="flex justify-center items-center"> {update && <SecondaryButton title={"Submit"} className={"mx-auto"} />}</div>
        </form>
        {update ? "" : <SecondaryButton title={"Update Info"} onClick={() => setUpdate(!update)} />}
      </div>
    </section>
  );
}

export default UserProfile;
