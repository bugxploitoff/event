import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useTable } from "react-table";
import { updateRegLink, updatePaymentStatus } from "../utils/util"; // Import the function to update payment status
import DisableReg from "./DisableReg";

const Attendees = ({
  attendees,
  id,
  click,
  setClick,
  disableRegModal,
  setDisableRegModal,
}) => {
  const [passcode, setPasscode] = useState("");
  const [attendeeState, setAttendees] = useState(attendees);
  const data = React.useMemo(() => attendeeState);
  const columns = React.useMemo(
    () => [
      {
        Header: "Passcode",
        accessor: "passcode",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Payment Verification",
        accessor: "payment", // Add this column for payment verification
        Cell: ({ row }) => (
          <button
            className={`p-2 rounded-md ${
              row.original.payment ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handlePaymentVerification(row.original)}
          >
            {row.original.payment ? "Verified" : "Verify"}
          </button>
        ),
      },
    ],
    []
  );

  const table = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    table;

  const handleSearch = () => {
    const result = attendeeState.filter((item) =>
      item.passcode.startsWith(passcode)
    );
    if (result.length > 0 && passcode !== "") {
      setAttendees(result);
    }
    if (passcode === "") {
      setAttendees(attendees);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = attendeeState.filter((item) =>
      item.passcode.startsWith(passcode)
    );
    if (result.length > 0 && passcode !== "") {
      setAttendees(result);
    }
    if (passcode === "") {
      setAttendees(attendees);
    }
  };

  // Function to handle payment verification
  const handlePaymentVerification = (attendee) => {
    // Toggle the payment status
    const updatedPaymentStatus = !attendee.payment;

    // Update the payment status in Firebase
    updatePaymentStatus(id, attendee.id, updatedPaymentStatus)
      .then(() => {
        // Update the local state with the new payment status
        const updatedAttendees = attendeeState.map((item) =>
          item.id === attendee.id ? { ...item, payment: updatedPaymentStatus } : item
        );
        setAttendees(updatedAttendees);
      })
      .catch((error) => {
        console.error("Error updating payment status: ", error);
      });
  };

  return (
    <div className=' bg-white w-full p-8'>
      <div className='flex flex-col md:flex-row items-center justify-between  mb-6'>
        <h2 className='text-3xl font-bold md:mb-auto mb-4'>
          List of Attendees
        </h2>
        {!click && (
          <button
            className={`p-4 ${
              click && "hidden"
            } text-white rounded-md bg-[#C07F00]`}
            onClick={() => setDisableRegModal(true)}
          >
            Disable Registration
          </button>
        )}
      </div>
      {disableRegModal && (
        <DisableReg
          setDisableRegModal={setDisableRegModal}
          setClick={setClick}
          updateRegLink={updateRegLink}
          id={id}
        />
      )}

      <form
        className='w-full flex items-center justify-center mb-6'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          className='border-[1px] w-[80%] rounded-lg py-2 px-4 mr-3'
          placeholder='Search via Passcode'
          value={passcode}
          onChange={(e) => {
            setPasscode(e.target.value);
            handleSearch();
          }}
        />
        <button className='border-[1px] p-3 rounded-full'>
          <BsSearch className='text-2xl' />
        </button>
      </form>
      <div className='overflow-y-scroll max-h-[450px]'>
        <table className='relative' {...getTableProps()}>
          <thead className='sticky top-0 bg-white z-10'>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendees;
