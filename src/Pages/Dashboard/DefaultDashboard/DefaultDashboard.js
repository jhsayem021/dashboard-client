import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import UpdateCustomerPayment from '../UpdateCustomerPayment/UpdateCustomerPayment';
const DefaultDashboard = () => {
  const [updatingRevenue, setUpdatingRevenue] = useState([]);
  // const [todayIncome, setTodayIncome] = useState(0);
  const { data: customerPayment = [], isLoading, refetch } = useQuery({
    queryKey: ['customerPayment'],
    queryFn: async () => {
      const res = await fetch('https://dashboard-server-ndgk.onrender.com/customerPayment')
      const data = await res.json();

      return data;
    }
  })

  const { data: allexpense = [] } = useQuery({
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
  refetch();
  console.log(customerPayment)
  console.log(allexpense)
  let todayIncome = 0;
  let monthlyIncome = 0;
  let todayExpense = 0;
  let monthlyExpense = 0;

  customerPayment.map(customer => {

    var date = new Date();
    let date1 = new Date(date).getTime();
    console.log(date.toString())
    let date2 = new Date(customer?.entryDate).getTime();
    let timeDifference;

    if (date1 > date2) {
      console.log(date1 + '>' + date2)
      timeDifference = date1 - date2;
      console.log(timeDifference)
      if ((timeDifference >= 1) && (timeDifference <= 86340000)) {
        console.log('date are equel')
        console.log(customer?.entryDate)
        todayIncome = (parseFloat(customer?.amount) + todayIncome);
        // setTodayIncome(todayIncome1)
        console.log(todayIncome);
      }
      if ((timeDifference >= 1) && (timeDifference <= 2590200000)) {
        console.log('date are equel')
        console.log(customer?.entryDate)
        monthlyIncome = (parseFloat(customer?.amount) + monthlyIncome);
        console.log(monthlyIncome);
      }



    }
    else if (date1 < date2) {
      console.log(date2 + '>' + date1)
      timeDifference = date2 - date1;
      console.log(timeDifference)
      if ((timeDifference >= 1) && (timeDifference <= 86340000)) {
        console.log('date are equel')
        console.log(customer?.entryDate)
        todayIncome = (parseFloat(customer?.amount) + todayIncome);

        console.log(todayIncome);
      }
      if ((timeDifference >= 1) && (timeDifference <= 2590200000)) {
        console.log('date are equel')
        console.log(customer?.entryDate)
        monthlyIncome = (parseFloat(customer?.amount) + monthlyIncome);
        console.log(monthlyIncome);
      }
    }



  })

  allexpense.map(expense => {

    var date = new Date();
    let date1 = new Date(date).getTime();
    console.log(date.toString())
    let date2 = new Date(expense?.date).getTime();
    let timeDifference;

    if (date1 > date2) {
      console.log(date1 + '>' + date2)
      timeDifference = date1 - date2;
      console.log(timeDifference)
      if ((timeDifference >= 1) && (timeDifference <= 86340000)) {
        console.log('date are equel')
        console.log(expense?.date)
        todayExpense = (parseFloat(expense?.cost) + todayExpense);
        // setTodayIncome(todayIncome1)
        console.log(parseFloat(expense?.cost));
      }
      if ((timeDifference >= 1) && (timeDifference <= 2590200000)) {
        console.log('date are equel')
        console.log(expense?.date)
        monthlyExpense = (parseFloat(expense?.cost) + monthlyExpense);
        console.log(monthlyExpense);
      }



    }
    else if (date1 < date2) {
      console.log(date2 + '>' + date1)
      timeDifference = date2 - date1;
      console.log(timeDifference)
      if ((timeDifference >= 1) && (timeDifference <= 86340000)) {
        console.log('date are equel')
        console.log(expense?.date)
        todayExpense = (parseFloat(expense?.cost) + todayExpense);

        console.log(todayExpense);
      }
      if ((timeDifference >= 1) && (timeDifference <= 2590200000)) {
        console.log('date are equel')
        console.log(expense?.date)
        monthlyExpense = (parseFloat(expense?.cost) + monthlyExpense);
        console.log(monthlyExpense);
      }
    }



  })

  if (isLoading) {
    return <Loading></Loading>
  }
  return (
    <div>
      <h1 className='text-3xl mx-auto w-96 mb-10'>Welcome to your Dashboard</h1>
      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow h-32 card bg-rose-300 w-sm rounded-box place-items-center mr-2">Today Income  <p>{todayIncome} Taka</p> </div>

        <div className="grid flex-grow h-32 card bg-indigo-300 rounded-box place-items-center mr-2">Today Expense <p>{todayExpense} Taka</p></div>
        <div className="grid flex-grow h-32 card bg-green-300 rounded-box place-items-center mr-2">Monthly Income <p>{monthlyIncome} Taka</p> </div>

        <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center mr-2">Monthly Expense <p>{monthlyExpense} Taka</p></div>
      </div>
      <UpdateCustomerPayment></UpdateCustomerPayment>
    </div>
  );
};

export default DefaultDashboard;