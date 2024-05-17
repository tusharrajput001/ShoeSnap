import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import Navbar from '../../components/navbar/Navbar';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ name: '', email: '', password: '' });

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const validate = () => {
        let valid = true;
        let errors = {};

        if (!name) {
            errors.name = "Name is required";
            valid = false;
        }

        if (!email) {
            errors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid";
            valid = false;
        }

        if (!password) {
            errors.password = "Password is required";
            valid = false;
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const signup = async () => {
        if (!validate()) return;

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            };
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);
            toast.success("Signup Successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setName("");
            setEmail("");
            setPassword("");
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Account already exists with this email", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                console.log(error);
                toast.error("Signup failed. Please try again.", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (    
        <>
        <Navbar/>
        <section className="vh-100" >
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black border-0">
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-5xl font-bold ">Sign up</p>
                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input placeholder='Your Name' type="text" id="form3Example1c" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input placeholder='Your Email' type="email" id="form3Example3c" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input placeholder='Password' type="password" id="form3Example4c" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg bg-customOrange" onClick={signup}>
                                                    {loading ? <Loader /> : 'Register'}
                                                </button>
                                            </div>
                                        </form>
                                        <p className="text-center mb-0">Already have an account? <Link className='text-customOrange font-bold' to="/login">Login</Link></p>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Signup;
