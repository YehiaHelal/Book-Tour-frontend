import Footer from "../footer/Footer";
import axios from "axios";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const userData = useLoaderData();
  const [orderbackData, SetOrderBackData] = useState([]);
  const [showOrderback, SetShowOrderback] = useState(false);
  const [showEdityourInformationTap, SetShowEdityourInformationTap] =
    useState(false);

  const data = useActionData();
  // console.log(data);

  // console.log(userData.data.user);
  // console.log(userData.data.user.email);

  async function handlegetpastorders() {
    const res = await axios.post(
      "https://www.rtourbk.shoponlinemarket.cloud/api/orders/getuserorders",
      { message: "hello" },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          "Access-Control-Allow-Headers":
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
        },
      }
    );
    if (res.status === 200) {
      console.log("order back successfully");
      SetOrderBackData(res);
      SetShowEdityourInformationTap(false);
      SetShowOrderback(true);
    }
  }
  function handleEditYourInformation() {
    SetShowOrderback(false);
    SetShowEdityourInformationTap(true);
  }

  return (
    <div>
      <div className="article-main">
        <div className="profile-page-main-component">
          <div className="user-profile-page">
            <h3>Profile Page:</h3>

            <p>Email : {userData.data.user.email}</p>
            <p>Name : {userData.data.user.name}</p>
            <p className="profile-last-p">
              Address : {userData.data.user.address}
            </p>

            <button onClick={handlegetpastorders}>View your past orders</button>
            <p></p>
            <button onClick={handleEditYourInformation}>
              Edit your information
            </button>
          </div>

          <div className="user-profile-page-right">
            {showOrderback &&
              // console.log(orderbackData.data.orders) &&
              orderbackData.data.orders.map((item, index) => {
                return (
                  <div key={item._id}>
                    <p>Booking number: {index + 1} </p>
                    <p>Tour: {item.orderProducts.toString()}</p>
                    <p>
                      Numbers of Bookings for each tour:{" "}
                      {item.numberofitems.toString()}
                    </p>
                    <p>Booking Total Price: ${item.orderTotalValue}</p>
                    ------
                  </div>
                );
              })}
            {showEdityourInformationTap && (
              <div className="component-default-edit-your-information">
                <h3>Edit your information tab:</h3>
                <Form method="post" action="/profile">
                  <label>
                    <span>Name:</span>
                    <input type="name" name="name" required />
                  </label>
                  <label>
                    <span>Address:</span>
                    <input type="address" name="address" required />
                  </label>

                  <button>Submit</button>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="at-the-end">
        <Footer />
      </div>
    </div>
  );
}

export const ProfileLoader = async ({}) => {
  const res = await axios.post(
    "https://www.rtourbk.shoponlinemarket.cloud/api/users/profile",
    { message: "hello" },
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      },
    }
  );

  return res;
};

export const ProfileAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    name: data.get("name"),
    address: data.get("address"),
  };

  const datas = await axios.post(
    "https://www.rtourbk.shoponlinemarket.cloud/api/users/updateinfo",
    {
      submission,
    },
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      },
    }
  );

  return datas;
};
