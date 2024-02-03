"use client";
import { downloadGeneratedPdf, generatePdfApi, getUserApi } from "@/api/apis";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Input,
} from "@nextui-org/react";
import ProductModal from "@/components/modal";
import { useSelector } from "react-redux";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";

function Page() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>();
  const [receipantName, setReceipantName] = useState("");
  const [_id, setId] = useState(false);
  const [downloadId, setDownloadId] = useState("");
  const router = useRouter();
  // const []
  //   const [productData, setProductData] = useState([]);
  const productDetails: any = useSelector((state: any) => {
    return state.product.productDetails;
  });
  useEffect(() => {
    let token = localStorage.getItem("token");

    async function getData() {
      axios
        .get(getUserApi, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUserData(res.data.decode);
          setLoading(false);
        })
        .catch((err: any) => {
          toast.error("Please log in again...");
          router.push("/login");
        });
    }
    getData();
  }, []);
  const onGenerate = async () => {
    if (receipantName.length <= 0) {
      toast.error("Please enter recepipant name...");
      return;
    }
    if (productDetails.length <= 0) {
      toast.error("Please enter at least 1 item...");
      return;
    }
    let formattedData = {
      email: userData.email,
      products: productDetails.map((product: any) => {
        return {
          name: product.name,
          quantity: product.quantity,
          unit_cost: product.rate,
          line_total: product.total,
          description: product.description,
        };
      }),
      tax: 18,
      total_amount_with_gst: 15,
      from: "Invoice",
      to: receipantName,
      logo: "https://anyapi.io/assets/logo.png",
      number: 1,
    };
    let newPromise = new Promise((resolve, reject) => {
      try {
        axios
          .post(generatePdfApi, formattedData)
          .then((res) => {
            console.log(res.data);
            setId(true);
            setDownloadId(res.data.id);
            // toast.success(`Click on download to download the invoice pdf`);
            resolve("Done");
          })
          .catch((err) => {
            toast.error("Please try again...");
            reject("Error");
          });
      } catch (error) {
        toast.error("Please try again...");
        reject("Error");
      }
    });
    toast.promise(newPromise, {
      success: "Click download to download invoice pdf",
      error: "Please try again...",
      loading: "Invoice generating",
    });
  };

  const downloadPDF = async () => {
    let newPromise = new Promise(async (resolve, reject) => {
      try {
        fetch(downloadGeneratedPdf, {
          headers: {
            _id: downloadId,
          },
        })
          .then(async (res: any) => {
            // console.log(res);
            if (res.status == 200) {
              console.log(res.status);
              const blob = await res.blob();
              console.log(blob);
              const blobUrl = window.URL.createObjectURL(blob);
              console.log(blobUrl);
              const link = document.createElement("a");
              link.href = blobUrl;
              link.download = `${Date.now()}`;

              document.body.appendChild(link);
              link.click();

              document.body.removeChild(link);

              window.URL.revokeObjectURL(blobUrl);
              resolve("Done");
            } else {
              reject("Error");
            }
            // resolve("done");
          })
          .catch((err) => {
            reject("Error");
          });
        // console.log(response);
        // resolve("Done");
      } catch (error) {
        reject("Error");
      }
    });
    toast.promise(newPromise, {
      success: "Pdf downloaded",
      error: "Please try again...",
      loading: "Downloading pdf...",
    });
  };
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "quantity",
      label: "Quantity",
    },
    {
      key: "rate",
      label: "Rate",
    },
    {
      key: "total",
      label: "Total",
    },
  ];
  if (loading) {
    return (
      <>
        <div className="h-screen flex-col flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="mt-4">Loading data...</span>
        </div>
      </>
    );
  }
  return (
    <div className="max-w-5xl mt-5  mx-auto py-5 px-4">
      <div className="my-4">
        <label htmlFor="" className="">
          Receipant name
        </label>
        <Input
          onChange={(e: any) => {
            setReceipantName(e.target.value);
          }}
          className="max-w-xs mt-2"
          placeholder="Enter receipant name"
        />
      </div>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={productDetails}>
          {(item: any) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex gap-4 mt-4 items-center">
        <ProductModal />
        <Button onClick={onGenerate} variant="ghost">
          Generate
        </Button>
        <Button
          onClick={downloadPDF}
          disabled={!_id}
          variant={_id ? "flat" : "ghost"}
        >
          Download
        </Button>
      </div>
    </div>
  );
}

export default Page;
