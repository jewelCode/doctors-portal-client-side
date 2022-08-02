import React from 'react';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    
    const navigate = useNavigate();
    let signInError;


    if (loading || gLoading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || updateError) {
        signInError = <p>{error?.message || gError?.message || updateError?.message}</p>
    }

    if (user || gUser) {
        console.log(user || gUser)
    }


    const onSubmit = async data => {
        console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name});
        console.log('update done')
        navigate('/appointment');
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div class="card w-96 bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="text-center text-2xl font-bold">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input
                                {...register("name", {
                                    required: {
                                        value: true,
                                        messege: "name is required"
                                    }
                                })}
                                type="text"
                                placeholder="Your Name"
                                class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                                {errors.name?.type === 'required' && <span class="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">E-mail</span>
                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        messege: "Email is Required"
                                    },
                                    pattern: {
                                        value: /[A-Za-z]{3}/,
                                        message: "Provide a Valid Email"
                                    }
                                })}
                                type="email"
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
                        <input class="btn w-full max-w-xs text-white" type="submit" value="Sign Up" />
                    </form>
                    <p><small>Already Have an Account? <Link className="text-primary" to="/login">Please Login</Link></small></p>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} class="btn btn-outline">Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;