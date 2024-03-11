import useAuth from "@/Hooks/useAuth"
import Input from "@/Utils/AuthForm/Input"

const UserProfile = () => {
    const { userData } = useAuth()
    console.log(userData);
    return <section className="w-full">
        <div className="w-1/2 h-1/2 border-2 mx-auto">
            <p>Name : {userData?.username}</p>
        </div>
    </section>

}
export default UserProfile