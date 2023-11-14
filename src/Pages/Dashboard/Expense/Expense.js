import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const Expense = () => {
    const navigate = useNavigate()
    const { register, resetField, handleSubmit, formState: { errors } } = useForm();
    const expenseType = ['Tea expense', 'Utility Bill', 'Router buy', 'Cable buy', 'Hub buy']
    const { data: allexpense = [], isLoading, refetch } = useQuery({
        queryKey: ['allexpense'],
        queryFn: async () => {
            try {
                const res = await fetch('https://dashboard-server-ndgk.onrender.com/allexpense', {
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

    const handleAddExpense = (data) => {

        const expense = {
            expense: data.expense,
            cost: data.cost,
            date: data.date,
            name: data.name,
        }
        console.log(expense)

        fetch('https://dashboard-server-ndgk.onrender.com/expense', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(expense)

        })
            .then(res => res.json())
            .then(result => {
                console.log(result)

                toast.success(`Expense added successfully`);

                refetch()

            })
        resetField("date");
        resetField("cost");
        resetField("name");
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='  flex  justify-evenly '>
            <div>
                <h1 className="text-3xl mb-5">Expense</h1>
                <form className='' onSubmit={handleSubmit(handleAddExpense)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Expense type</span></label>
                        <select
                            {...register('expense')}
                            className="select select-bordered w-full max-w-xs">
                            {
                                expenseType.map((expense, i) => <option
                                    key={i}
                                    value={expense}
                                >{expense}</option>)
                            }
                        </select>
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label htmlFor="" className="label"><span className="label-text">Expense date</span></label>
                        <input type="datetime-local" name="date" {...register("date", {
                            required: true
                        })} placeholder="date" className="input input-bordered w-full" />
                        {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Expense By</span></label>
                        <input type="test" {...register("name", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Cost in BDT</span></label>
                        <input type="text" {...register("cost", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {/* {errors.email && <p className='text-red-500'>{errors.email.message}</p>} */}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Add Data" type="submit" />
                </form>
            </div>

            <div className="overflow-x-auto my-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Expense Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Expense By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allexpense.map((expense, i) => <tr
                                key={i}
                            >
                                <th>{i + 1}</th>
                                <td>{expense.expense}</td>
                                <td>{expense.cost}</td>
                                <td>{expense.date}</td>
                                <td>{expense.name}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Expense;