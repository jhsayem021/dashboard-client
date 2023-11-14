import React from 'react';

const ConfirmationModal = ({title , message, closeModal, successAction , modalData }) => {
    return (
        <div>
           


{/* Put this part before </body> tag */}
<input type="checkbox" id="Confirmation-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="py-4">{message}</p>
    <div className="modal-action">
      <label onClick={()=>successAction(modalData)} htmlFor="Confirmation-modal" className="btn btn-success">Delete</label>
      <button onClick={closeModal}  className='btn btn-outline'> cancel</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default ConfirmationModal;