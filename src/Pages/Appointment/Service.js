import React from 'react';

const Service = ({ service, setTreatment }) => {
    const { name, slots } = service;
    return (
        <div class="card lg:max-w-lg bg-base-100 shadow-xl text-center">
            <div class="card-body">
                <h2 class="card-title text-secondary text-center">{name}</h2>
                <p>
                    {
                        slots.length > 0
                            ? <span>{slots[0]}</span> : <span className="text-red-500">Try another date</span>
                    }
                </p>
                <p>{slots.length} {slots.length > 1 ? "spaces" : "space"} Availavble</p>
                <div class="card-actions justify-center">
                    <label
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(service)}
                        htmlFor="booking-modal" class="btn btn-secondary text-white text-uppercase">Book Appointment
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Service;