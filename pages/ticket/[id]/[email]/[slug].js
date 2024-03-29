import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { HiMail, HiCalendar, HiBookmark, HiClock, HiPencilAlt, HiSpeakerphone } from "react-icons/hi";
import { doc, getDoc } from "@firebase/firestore";
import db from "../../../../utils/firebase";
import { registerAttendee } from "../../../../utils/util";
import { useRouter } from "next/router";
import RegClosed from "../../../../components/RegClosed";
import ErrorPage from "../../../../components/ErrorPage";
import Loading from "../../../../components/Loading";

export async function getServerSideProps(context) {
  const docRef = doc(db, "events", context.query.id);
  const docSnap = await getDoc(docRef);
  let firebaseEvent = {};
  if (docSnap.exists()) {
    firebaseEvent = docSnap.data();
  } else {
    console.log("No such document!");
  }

  const attendeeIndex = firebaseEvent.attendees.findIndex(
    (attendee) => attendee.email === context.query.email
  );

  return {
    props: { event: firebaseEvent, attendeeIndex },
  };
}

const TicketPage = ({ event, attendeeIndex }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [trans, setTrans] = useState("");
  const router = useRouter();

  if (loading) {
    return <Loading title="Generating your ticket🤞🏼" />;
  }
  if (!event.title) {
    return <ErrorPage />;
  }

  if (event.disableRegistration) {
    return <RegClosed event={event} />;
  }

  if (attendeeIndex === -1) {
    // Redirect to the desired URL (in this case, '/')
    router.push("/");
    return null; // Return null or a loading indicator while redirecting
  }

  return (
    <div>
      <Head>
        <title>{`${event.title} | Events`}</title>
        <meta
          name="description"
          content="An event ticketing system built with NextJS and Firebase"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full flex items-center justify-between min-h-[100vh] relative">
        <div className="md:w-[60%] w-full flex flex-col items-center justify-center min-h-[100vh] px-[30px] py-[30px] relative">
          <h2 className="text-2xl font-medium mb-3">Welcome to {event.title}</h2>
          <form className="w-full flex flex-col justify-center">
            <label htmlFor="name">Full name</label>
            <div className="w-full relative">
              <input
                type="text"
                name="name"
                value={event.attendees[attendeeIndex].name}
                className="border px-10 py-2 mb-3 rounded-md w-full"
                required
              />
              <FaUserAlt className=" absolute left-4 top-3 text-gray-300" />
            </div>
            <label htmlFor="email">Date</label>
            <div className="w-full relative">
              <input
                name="date"
                value={event.date}
                className="border px-10 py-2 mb-3 rounded-md w-full"
                disabled
              />
              <HiCalendar className=" absolute left-4 top-3 text-gray-300 text-xl" />
            </div>
            <label htmlFor="email">Time</label>
            <div className="w-full relative">
              <input
                name="time"
                value={event.time}
                className="border px-10 py-2 mb-3 rounded-md w-full"
                disabled
              />
              <HiClock className=" absolute left-4 top-3 text-gray-300 text-xl" />
            </div>
            <label htmlFor="email">Venue</label>
            <div className="w-full relative">
              <input
                name="time"
                value={event.venue}
                className="border px-10 py-2 mb-3 rounded-md w-full"
                disabled
              />
              <HiBookmark className=" absolute left-4 top-3 text-gray-300 text-xl" />
            </div>
            <label htmlFor="email">Note</label>
            <div className="w-full relative">
              <input
                name="text"
                value={event.note}
                className="border px-10 py-2 mb-3 rounded-md w-full"
                disabled
              />
              <HiPencilAlt className=" absolute left-4 top-3 text-gray-300 text-xl" />
            </div>
            <label htmlFor="email">Description</label>
            <div className="w-full relative">
              <input
                name="text"
                value={event.description}
                className="border px-10 py-2 mb-3 rounded-md w-full"
                disabled
              />
              <HiSpeakerphone className=" absolute left-4 top-3 text-gray-300 text-xl" />
            </div>
            <div className="text-center">
              <p>Your entry code : {event.attendees[attendeeIndex].passcode}</p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${event.attendees[attendeeIndex].passcode}`}
                alt="UPI QR Code"
                style={{
                  display: "block",
                  margin: "0 auto",
                  width: "300px",
                  height: "300px",
                }}
              />
            </div>
          </form>
          <div className="absolute bottom-5 left-5">
            <p className="opacity-50 text-sm">
              <Link href="/">{event.title}</Link> &copy; Copyright{" "}
              {new Date().getFullYear()}{" "}
            </p>
          </div>
        </div>
        <div className="login md:w-[40%] h-[100vh] relative">
          <div className="absolute bottom-5 right-5">
            <a
              href="https://github.com/bugxploitoff"
              target="_blank"
              className="text-gray-100"
            >
              Built by Bugxploit
            </a>
          </div>
        </div>
        {success && (
          <div className="w-full h-[100vh] dim absolute top-0 flex items-center justify-center z-40">
            <div className="w-[400px] bg-white h-[300px] flex items-center justify-center flex-col rounded-md shadow-[#FFD95A] shadow-md">
              <h2 className="text-2xl font-extrabold mb-4 text-center">
                Registered Successfully! 🎉
              </h2>
              <p className="text-center mb-6">
                Check your email for your ticket and event information.
              </p>
              <button
                className="px-4 py-2 bg-[#FFD95A] rounded-md"
                onClick={() => setSuccess(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TicketPage;
