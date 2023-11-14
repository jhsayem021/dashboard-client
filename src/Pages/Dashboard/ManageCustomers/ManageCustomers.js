import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageCustomer = () => {
    const [deletingCustomer, setDeletingCustomer] = useState(null);
    const closeModal = () => {
        setDeletingCustomer(null);
    }
    const { data: customers = [], isLoading, refetch } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            try {
                const res = await fetch('https://dashboard-server-ndgk.onrender.com/customers', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch (er) {

            }
        }
    })

    const handleCustomerDelete = (customer) => {
        console.log(customer)
        fetch(`https://dashboard-server-ndgk.onrender.com/customer/${customer._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {

                    refetch();
                    toast.success(`${customer.name} delete successfully`)
                }

            })

    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h1 className='text-3xl '>Manage Customer</h1>

            <div className="overflow-x-auto my-10">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th></th>
                            <td></td>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Nid number</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            customers.map((customer, i) => <tr
                                key={customer._id}
                            >
                                <th>{i + 1}</th>
                                <td><div className="avatar">
                                    <div className="rounded-full w-20">
                                        <img src={customer.image} alt="" />
                                    </div>
                                </div></td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>{customer.nid}</td>
                                <td>
                                    <label onClick={() => setDeletingCustomer(customer)} htmlFor="Confirmation-modal" className="btn btn-xs btn-error ">Delete</label>

                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            {
                deletingCustomer && <ConfirmationModal
                    title={`Are you sure want to Delete`}
                    message={`If you delete, ${deletingCustomer?.name} it can't be undone`}
                    successAction={handleCustomerDelete}
                    modalData={deletingCustomer}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }

        </div>
    );
};

export default ManageCustomer;