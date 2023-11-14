import React from 'react';
import { toast } from 'react-hot-toast';

const UpdatePaymentModal = ({ setUpdatingCustomer, updatingCustomer, refetch }) => {
    const { name, phone, _id } = updatingCustomer;
    const handleForm = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const amount = form.amount.value;
        const date = form.date.value;
        var today = new Date();
        const entryDate = today.toString();
        const status = null;
        const updateCustomerPayment = {
            id: _id,
            name,
            phone,
            amount,
            date,
            status,
        }
        const singleCustomerPayment = {
            spid: _id,
            name,
            amount,
            date,
            entryDate
        }
        console.log(updateCustomerPayment)

        fetch(`https://dashboard-server-ndgk.onrender.com/updatepayments`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateCustomerPayment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log(data);
                    toast('Payment update successfully')
                    refetch();
                    setUpdatingCustomer(null);
                }
                else {
                    toast(data.message)
                }
            })
        fetch(`https://dashboard-server-ndgk.onrender.com/updatepaymentsdate`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(singleCustomerPayment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log(data);
                    refetch();
                    setUpdatingCustomer(null);
                }
                else {
                    toast(data.message)
                }
            })
    }
    return (
        <>
            <input type="checkbox" id="update-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="update-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-10"> Please Provide payment data carefully </h3>
                    <form onSubmit={handleForm} className='grid gap-4 grid-cols-1' >
                        <input name="name" value={name} disabled type="text" placeholder="name" className="input input-bordered w-full" />
                        <input name="phone" value={phone} disabled type="text" placeholder="phone" className="input input-bordered w-full" />
                        <input name="amount" type="text" placeholder="amount" className="input input-bordered w-full" />
                        <label htmlFor="">Last billing date</label>
                        <input type="datetime-local" name="date" placeholder="date" className="input input-bordered w-full" />
                        <input type="submit" value="Submit" className="btn btn-accent text-white w-full" />
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdatePaymentModal;