import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import jsPDF from "jspdf";
import "jspdf-autotable";
import Loading from '../../Shared/Loading/Loading';


const Revenuestatictis = () => {


  const [updatingRevenue, setUpdatingRevenue] = useState([]);
  const [searchResult, setSearchResult] = useState(false);
  const [noDataString, setNoDataString] = useState("");
  const [dateOne, setDateOne] = useState(null);
  const [dateTwo, setDateTwo] = useState(null);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let t = 0;
  let inputdate1;
  let inputdate2;

  const { data: customerPayment = [], isLoading, refetch } = useQuery({
    queryKey: ['customerPayment'],
    queryFn: async () => {
      const res = await fetch('https://dashboard-server-ndgk.onrender.com/customerPayment')
      const data = await res.json();
      return data;
    }
  })
  refetch();
  // setUpdatingCustomer(customerPayment)
  console.log(customerPayment);
  const handleForm = e => {
    e.preventDefault();
    const form = e.target;
    inputdate1 = new Date(form.date1.value).getTime();
    inputdate2 = new Date(form.date2.value).getTime();
    setDateOne(new Date(form.date1.value));
    setDateTwo(new Date(form.date2.value))
    if (((form.date1.value === '') || (form.date2.value === '')) || ((inputdate2 - inputdate1) <= 0)) {
      toast('Please Provide valid date range')
    } else {
      setUpdatingRevenue(customerPayment.filter(customer => ((inputdate1 <= (new Date(customer.date).getTime())) && (inputdate2 >= (new Date(customer.date).getTime())))))
      console.log(updatingRevenue);

      if (updatingRevenue.length === 0) {
        setSearchResult(true);
        setNoDataString("No data found ");
      }
    }
    console.log(updatingRevenue);
  }

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const title = `Revenue Report of "${dateOne.getDate()} ${months[dateOne.getMonth()]} ${dateOne.getFullYear()}" from "${dateTwo.getDate()} ${months[dateTwo.getMonth()]} ${dateTwo.getFullYear()}"`;
    const subTotal = `Total = ${sumArray(updatingRevenue)}`
    const headers = [["NAME", "LAST BILLING DATE", "PAYMENT"]];
    const data = updatingRevenue.map(customer => [customer.name, customer.date, customer.amount]);
    let content = {
      startY: 80,
      head: headers,
      body: data
    };
    doc.text(title, marginLeft, 40);
    doc.text(subTotal, marginLeft, 60);
    doc.autoTable(content);
    doc.save("report.pdf")
  }
  function sumArray(array) {
    let sum = 0;

    /*loop over array and add each item to sum
    */
    for (const item of array) {
      sum += parseFloat(item.amount);
    }

    // return the result 
    console.log(sum);
    return sum;
  }
  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <div className=''>
        <div className="">

          <h3 className="text-3xl font-bold mb-10"> Revenue </h3>

          <form onSubmit={handleForm}  >
            <div className='flex'>
              <div className='grid gap-2 grid-cols-2 '>
                <div>
                  <label htmlFor="">From </label>
                  <input name="date1" type="datetime-local" className="input input-bordered w-1/2 ml-3" />
                </div>
                <div>
                  <label htmlFor="">To </label>
                  <input name="date2" type="datetime-local" className="input input-bordered w-1/2 ml-3" />
                </div>
              </div>
              <div className=''>
                <input type="submit" value="Submit" className="btn btn-accent text-white   " />
              </div>

            </div>
            <div className='my-6'>
              {
                (updatingRevenue.length === 0)
                  ?
                  <h1 className='text-2xl'>Total: {((updatingRevenue.length === 0) ? sumArray(customerPayment) : sumArray(updatingRevenue))
                  } </h1>
                  :
                  <h1 className='text-2xl' >{` From "${dateOne?.getDate()} ${months[dateOne?.getMonth()]} ${dateOne?.getFullYear()}" to "${dateTwo?.getDate()} ${months[dateTwo?.getMonth()]} ${dateTwo?.getFullYear()}" `} <br /> {` Total  = ${sumArray(updatingRevenue)}`}</h1>
              }
            </div>


            <div className="overflow-x-auto my-10">
              {
                updatingRevenue.length === 0 ? '' : <button className='btn btn-primary mb-5' onClick={() => exportPDF()}>Export Data</button>
              }
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    {/* <td></td> */}
                    <th>Name</th>

                    <th>Last billing Date</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    updatingRevenue.length === 0 ?
                      (
                        (searchResult === false && (updatingRevenue.length === 0)) ? (customerPayment.map((customer, i) => <tr
                          key={customer._id}
                        >
                          <th>{i + 1}</th>
                          <td>{customer.name}</td>
                          <td>{customer?.date ? (customer?.date) : <p className='text-primary' >New customer</p>}</td>
                          <td>{customer?.amount}</td>
                        </tr>)) : <> </>
                      ) :

                      updatingRevenue.map((customer, i) => <tr
                        key={customer._id}
                      >
                        <th>{i + 1}</th>
                        <td>{customer.name}</td>
                        <td>{customer?.date ? (customer?.date) : <p className='text-primary' >New customer</p>}</td>
                        <td>{customer?.amount}</td>
                      </tr>
                      )
                  }
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
      <div>
      </div>
    </div>
  );

};

export default Revenuestatictis;