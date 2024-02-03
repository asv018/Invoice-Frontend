// import React from 'react'
"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { addProduct } from "@/store/slice";
import { useDispatch } from "react-redux";
function ProductModal({ productData, setProductData }: any) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState({
    name: undefined,
    quantity: undefined,
    rate: undefined,
    description: "",
  });
  const onProductDetailChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = (onClose: any) => {
    const { name, quantity, rate } = data;
    if (!name || !quantity || !rate) {
      toast.error("Please enter details");
      return;
    }
    dispatch(addProduct(data));
    setData({
      name: undefined,
      rate: undefined,
      quantity: undefined,
      description: "",
    });
    onClose();
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add product
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add product
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  name="name"
                  onChange={onProductDetailChange}
                  placeholder="Enter product name"
                  variant="bordered"
                />
                <Input
                  name="quantity"
                  onChange={onProductDetailChange}
                  placeholder="Enter product quantity"
                  type="number"
                  variant="bordered"
                />
                <Input
                  name="rate"
                  onChange={onProductDetailChange}
                  placeholder="Enter product rate"
                  type="number"
                  variant="bordered"
                />
                <Input
                  name="description"
                  onChange={onProductDetailChange}
                  value={data.description}
                  placeholder="Enter product description"
                  type="text"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button onClick={() => onSubmit(onClose)} color="primary">
                  Add Product
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProductModal;
