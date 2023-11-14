
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
    const navigate = useNavigate()
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleAddCustomer = (data) => {
        const formData = new FormData();
        console.log(data.image[0])
        const image = data.image[0];
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                console.log(imageData);
                if (imageData.success) {
                    console.log(imageData.data.url);
                    const customer = {
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        address: data.address,
                        nid: data.nid,
                        image: imageData.data.url
                    }

                    // post Customer

                    fetch('https://dashboard-server-ndgk.onrender.com/customer', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(customer)

                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            toast.success(`${data.name} added successful`);
                            navigate('/dashboard/managecustomer')

                        })


                }
            })

    }

    return (
        <div className=' w-80 mx-auto  '>
            <h1 className="text-3xl mb-5">Add Customer</h1>

            <form onSubmit={handleSubmit(handleAddCustomer)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email" {...register("email", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Phone</span></label>
                    <input type="phone" {...register("phone", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Address</span></label>
                    <input type="address" {...register("address", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Nid number</span></label>
                    <input type="nid" {...register("nid", {
                        required: true
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                </div>


                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
                </div>


                <input className='btn btn-accent w-full mt-4' value="Add Doctor" type="submit" />

            </form>
        </div>
    );
};

export default AddCustomer;