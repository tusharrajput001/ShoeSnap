import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex mt-40 mb-60 justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>

                            <h1 className='text-5xl font-bold text-center m-16'>Sign in</h1>

                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                               
                            </div>

                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                
                            </div>

                            

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn bg-customOrange btn-primary btn-lg"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} onClick={login}>Login</button>
                                <p className="large fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                                    className="link-danger">Register</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Login;
