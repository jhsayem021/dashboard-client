import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Loading from '../../Shared/Loading/Loading';

const Users = () => {

  const [deletingUser, setDeletingUser] = useState(null);
  const closeModal = () => {
    setDeletingUser(null);
  }
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://dashboard-server-ndgk.onrender.com/users')
      const data = await res.json();
      return data;
    }
  })
  const handleMakeAdmin = id => {
    console.log(id)
    fetch(`https://dashboard-server-ndgk.onrender.com/users/admin/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success(' Successfully Make admin')
          refetch();
        }
      })

  }
  const handleUserDelete = (user) => {
    console.log(user)
    fetch(`https://dashboard-server-ndgk.onrender.com/users/${user._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.deletedCount > 0) {

          console.log(user.name)

          toast.success(`${user.name} delete successfully`)
          refetch();
        }

      })
  }
  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div>
      <h1 className="text-3xl">All Users</h1>
      <div className="overflow-x-auto my-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, i) => <tr
                key={user._id}
              >
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{
                  user?.role !== 'admin' &&
                  <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>MakeAdmin</button>}</td>
                <td>
                  <label onClick={() => setDeletingUser(user)} htmlFor="Confirmation-modal" className="btn btn-xs btn-error ">Delete</label>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
      {
        deletingUser && <ConfirmationModal
          title={`Are you sure want to Delete`}
          message={`If you delete, ${deletingUser?.name} it can't be undone`}
          successAction={handleUserDelete}
          modalData={deletingUser}
          closeModal={closeModal}
        ></ConfirmationModal>
      }



    </div>
  );
};

export default Users;