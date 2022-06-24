import React from 'react';
import PrimaryButton from '../Shared/PrimaryButton';

const Contact = () => {
    return (
        <div className="p-5" style={{backgroundColor: "#E5E5E5"}}>
            <div className="text-center">
                <h3 style={{color: "#19D3AE"}} className="text-xl">Contact Us</h3>
                <h2 className="text-3xl">Stay Connected With Us</h2>
            </div>
            <div className="flex justify-center mt-10 mb-10">
                <div class="form-control w-full max-w-xs gap-5 text-center">
                    <input type="text" placeholder="Email Address" class="input input-bordered w-full max-w-xs" />
                    <input type="text" placeholder="Subject" class="input input-bordered w-full max-w-xs" />
                    <textarea class="textarea textarea-bordered" placeholder="Your Messege"></textarea>
                    <PrimaryButton>Submit</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Contact;