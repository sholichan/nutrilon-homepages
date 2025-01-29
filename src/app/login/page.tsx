"use client";
import Image from "next/image";
import logo from "../../../public/img/NRLogo.png";
import group from "../../../public/img/Group2.png";
// import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  //   const [selectedOption, setSelectedOption] = useState("no");
  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Nama tidak boleh kosong"),
      phone: Yup.string().required("Nomor hp tidak boleh kosong"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await fetch(
          "https://api.nutrilon.qyubit.com/api/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        const result = await response.json();
        console.log(result);
        const id = result.data.id;
        if (result.success === true) {
          router.push(`/games/${id}`);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  return (
    <div className="relative h-svh w-screen ">
      <Image
        src={logo}
        alt={"logo"}
        width={273}
        height={188}
        className="absolute top-[10%] w-[40%] left-1/2 -translate-x-1/2"
      />

      <div className="absolute bg-white p-8 rounded-2xl top-[35%] w-[60%] left-1/2 -translate-x-1/2 space-y-8">
        <h3 className="text-4xl font-bold mb-8">Isi Data User</h3>
        <div>
          <label
            htmlFor="username"
            className="block mb-2 font-medium text-gray-500 dark:text-white"
          >
            Masukkan Nama
          </label>
          <input
            type="text"
            id="username"
            value={formik.values.username}
            onChange={(v) => {
              formik.setFieldValue("username", v.target.value);
            }}
            className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-xl focus:ring-blue-500 focus:border-blue-500"
          ></input>
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.username}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 font-medium text-gray-500 dark:text-white"
          >
            Masukkan Nomor HP
          </label>
          <input
            type="text"
            id="phone"
            value={formik.values.phone}
            onChange={(v) => formik.setFieldValue("phone", v.target.value)}
            className="block w-full p-2 text-gray-900 border border-gray-500 rounded-lg bg-gray-50 text-xl focus:ring-blue-500 focus:border-blue-500"
          ></input>
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
          )}
        </div>

        {/* <div className="flex w-full justify-center space-x-2 p-1">
          <p>
            Sudah terdaftar di{" "}
            <span className="text-blue-700 font-bold">Nutriclub</span>?
          </p>
          <div className="flex items-center">
            <input
              id="ya"
              type="radio"
              value={formik.values.register}
              name="ya"
              checked={selectedOption === "yes"}
              onChange={() => {
                formik.setFieldValue("register", "yes");
                setSelectedOption("yes");
                console.log(selectedOption);
              }}
              className="w-4 h-4 text-blue-600 bg-gra00 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor="ya"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Ya
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="tidak"
              type="radio"
              value={formik.values.register}
              name="tidak"
              checked={selectedOption === "no"}
              onChange={() => {
                formik.setFieldValue("register", "no");
                setSelectedOption("no");
                console.log(selectedOption);
              }}
              className="w-4 h-4 text-blue-600 bg-gra00 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor="tidak"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Tidak
            </label>
          </div>
        </div> */}
        <button
          className="w-full bg-blue-900 text-gray-200 rounded-md p-2"
          onClick={formik.submitForm}
        >
          Registrasi
        </button>
        <Image
          src={group}
          alt={"group"}
          width={273}
          height={188}
          className="w-full"
        />
      </div>
    </div>
  );
}
