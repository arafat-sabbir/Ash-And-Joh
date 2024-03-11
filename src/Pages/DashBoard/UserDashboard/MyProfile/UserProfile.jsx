import useAuth from "@/Hooks/useAuth"
import Input from "@/Utils/AuthForm/Input"
import { useState } from "react"

const UserProfile = () => {
    const { userData, user } = useAuth()
    const [update, setUpdate] = useState(false)
    console.log(update);
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted");
        setUpdate(!update) // This will only log if form is submitted
    }
    return (
        <section className="w-full">
            <form onSubmit={handleSubmit} className="w-1/2 h-full border-2 mx-auto flex flex-col justify-center items-center gap-4 ">
                <img className="mx-auto w-32 h-32 rounded-xl" src={user.photoURL || userData.photo} alt="" />
                <p> Name : <input disabled={!update} type="text" className="disabled:bg-transparent bg-transparent border-2 disabled:border-0 focus:outline-none" defaultValue={userData?.username} /></p>
                <p> Email : <input disabled={!update} type="text" className="disabled:bg-transparent bg-transparent border-2 disabled:border-0 focus:outline-none" defaultValue={userData?.userEmail} /></p>
                {update ? <button type="submit">Submit</button> : <button type="button" onClick={() => setUpdate(!update)}>Update Info</button>}
            </form>
        </section>
    );
}

export default UserProfile;
