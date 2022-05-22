import axios from "axios";
import { useState } from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";


export default function Register() {
    const [username, setUsername] = useState("test");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const { data: session } = useSession()

    function handleInputChanged(e){
        setUsername(e.target.value);
    }
   function buttonClicked(){
        axios.put("user/username", {name: username },).catch(i => {if (i.response.status === 500){
        setError("Username already exists, please choose another username")}
        else{
            setError("Unexpected error occured, please try again later")
        }
        });
    }

    function ChangeConfirmed()
    {
       session.username = username;
        const router = useRouter();
        router.replace('/')
    }

        return <>
            {success && error && <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>{error}</strong>
                <button onClick={ChangeConfirmed} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> }
            {!success && error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{error}</strong>
                <button onClick={ChangeConfirmed} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div> }
                <form>
                    <label>To use the application, please choose an username</label>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input type="text" value={username} onChange={handleInputChanged} className="form-control" placeholder="Enter Username"/>
                    </div>
                    <button onClick={buttonClicked} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </>
}
