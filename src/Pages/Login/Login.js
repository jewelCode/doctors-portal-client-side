import React from 'react';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    let signInError;

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (loading || gLoading) {
        return <Loading></Loading>
    }

    if (error || gError) {
        signInError = <p>{error?.message || gError?.message}</p>
    }

    if (user || gUser) {
        navigate(from, { replace: true });
    }


    const onSubmit = (data) => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password)
        console.log(data)
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="text-center text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">E-mail</span>
                            </label>
                            <input
                                {...register("Email", {
                                    required: {
                                        value: true,
                                        messege: "Email is Required"
                                    },
                                    pattern: {
                                        value: /[A-Za-z]{3}/,
                                        message: "Provide a Valid Email"
                                    }
                                })}
                                type="text"
                                placeholder="Your Email"
                                class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                                {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}

                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        messege: "Password is Required"
                                    },
                                    minlength: {
                                        value: 6,
                                        messege: "Password must be at least 6 characters"
                                    }
                                })}
                                type="text"
                                placeholder="Your Password"
                                class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                                {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        {signInError}
                        <input class="btn w-full max-w-xs text-white" type="submit" value="Login" />
                    </form>
                    <p><small>New to Doctors Portal <Link className="text-primary" to="/signup">Create New Account</Link></small></p>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} class="btn btn-outline">Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;