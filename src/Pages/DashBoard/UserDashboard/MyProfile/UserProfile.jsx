import useAuth from "@/Hooks/useAuth"
import useAxios from "@/Hooks/useAxios"
import { useState } from "react"

const UserProfile = () => {
    const { userData, user } = useAuth()
    const [update, setUpdate] = useState(false)
    const axios = useAxios()
    const [updatedData, setUpdatedData] = useState({ username: "", userEmail: "" })

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const userEmail = e.target.userEmail.value;
        setUpdatedData((prev) => ({ ...prev, username, userEmail }));
        axios.post("/updateUserData")
    };

    return (
        <section className="w-full">
            <form onSubmit={handleSubmit} className="w-1/2 h-full border-2 mx-auto flex flex-col justify-center items-center gap-4 ">
                <img className="mx-auto w-32 h-32 rounded-xl" src={user.photoURL || userData.photo} alt="" />
                <p> Name : <input name="username" disabled={!update} type="text" className="disabled:bg-transparent bg-transparent border-2 disabled:border-0 focus:outline-none" defaultValue={userData?.username} /></p>
                <p> Email : <input name="userEmail" title="Please enter a valid email address" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" disabled={!update} type="text" className="disabled:bg-transparent bg-transparent border-2 disabled:border-0 focus:outline-none" required defaultValue={userData?.userEmail} /></p>
                {update ? <button type="submit">Submit</button> : <button type="button" onClick={() => setUpdate(!update)}>Update Info</button>}
            </form>
        </section>
    );
}

export default UserProfile;
