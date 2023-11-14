import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import UpdatePaymentModal from './UpdatePaymentModal';
import Loading from '../../Shared/Loading/Loading';


const UpdateCustomerPayment = () => {
    const [updatingCustomer, setUpdatingCustomer] = useState(null);

    const { data: customers = [], isLoading, refetch } = useQuery({
        queryKey: ['customers'],
        queryFn: async () => {
            const res = await fetch('https://dashboard-server-ndgk.onrender.com/customers')
            const data = await res.json();

            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }


    customers.map(customer => {
        if (customer.date === 'undefined') {
            customer.date = 'New Customer';
            customer.status = 'Unpaid';
        }
        else {
            var date = new Date();
            let date1 = new Date(date).getTime();
            console.log(date.toString())
            let date2 = new Date(customer.date).getTime();
            let timeDifference;
            var d = new Date(customer.date).getDate();
            var m = (new Date(customer.date).getMonth()) + 1;
            var y = new Date(customer.date).getFullYear();
            if (date1 > date2) {
                console.log(date1 + '>' + date2)
                timeDifference = date1 - date2;
                console.log(timeDifference)
                if (timeDifference >= 1 && timeDifference <= 86340000) {
                    console.log('date are equel')
                    customer.status = 'Paid';

                    customer.date = (d + '-' + m + '-' + y);
                    console.log(date);
                    console.log(customer.date);
                    console.log(customer.status);
                }
                else {
                    console.log(date, 'is grater then', customer.date);
                    customer.status = 'Unpaid';
                    customer.date = (d + '-' + m + '-' + y);
                    console.log(date);
                    console.log(customer.date);
                    console.log(customer.status);
                }

            }
            else if (date1 < date2) {
                console.log(date2 + '>' + date1)
                timeDifference = date2 - date1;
                console.log(timeDifference)
                if (timeDifference >= 1 && timeDifference <= 86340000) {
                    console.log('date are equel')
                    customer.status = 'Paid';
                    customer.date = (d + '-' + m + '-' + y);
                    console.log(customer.date);
                    console.log(customer.status);
                }
                else {
                    console.log(date, 'is less then', customer.date);
                    customer.status = 'Paid';
                    customer.date = (d + '-' + m + '-' + y);
                    console.log(customer.date);
                    console.log(customer.status);
                }
            }
        }
    })
    return (
        <div>
            <div className="overflow-x-auto my-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            {/* <td></td> */}
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Last billing Date</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            customers.
                                map((customer, i) => <tr
                                    key={customer._id}
                                >
                                    <th>{i + 1}</th>
                                    <td>{customer.name}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer?.date ? (customer?.date) : <p className='text-primary' >New customer</p>}</td>
                                    <td>{customer?.amount ? ((customer.status === 'Paid') ? customer?.amount : <p  >Please pay {customer?.amount} Taka</p>) : <p className='text-primary' >New customer</p>}</td>
                                    <td  >{customer?.status
                                        ? ((customer.status === 'Paid') ? <p className='text-green-500'>{customer?.status}</p> :
                                            <p className='text-rose-500'>{customer?.status}</p>)
                                        : <p className='text-rose-500' >Unpaid</p>
                                    }</td>
                                    <td>
                                        {
                                            !(customer?.status === 'Paid') && <label onClick={() => setUpdatingCustomer(customer)} htmlFor="update-modal" className="btn btn-xs btn-error ">update Payment</label>
                                        }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
                {
                    updatingCustomer && <UpdatePaymentModal
                        setUpdatingCustomer={setUpdatingCustomer}
                        updatingCustomer={updatingCustomer}
                        refetch={refetch}
                    ></UpdatePaymentModal>
                }

            </div>

        </div>
    );
};

export default UpdateCustomerPayment;